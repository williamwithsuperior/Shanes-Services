'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, Shield, Maximize, Droplets, ArrowRight, Loader2, DollarSign, AlertCircle, Edit3 } from 'lucide-react';
import LeadCapture from './LeadCapture';

type PropertyData = {
  address: string;
  squareFootage: number;
  yearBuilt: number;
  currentValue: number;
};

type ServiceType = 'siding' | 'roofing' | 'windows' | 'gutters';

const SERVICES = {
  siding: { name: 'Siding', icon: Home, roi: 0.97, calc: (sqft: number) => (sqft * 1.15) * 14.35 },
  roofing: { name: 'Roofing', icon: Shield, roi: 0.62, calc: (sqft: number) => (sqft * 1.5) * 9.25, isEssential: true },
  windows: { name: 'Windows', icon: Maximize, roi: 0.73, calc: (count: number) => count * 1350 },
  gutters: { name: 'Gutters', icon: Droplets, roi: 0.60, calc: (sqft: number) => (Math.sqrt(sqft) * 4 * 1.1) * 22.50, isEssential: true } // Est perimeter
};

const SUPERIOR_DISCOUNT_FACTOR = 0.18; // 18% estimated savings vs industry avg

function CalculatorContent() {
  const searchParams = useSearchParams();
  const addressParam = searchParams.get('address');
  const serviceParam = searchParams.get('service') as ServiceType;

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(
    (serviceParam && SERVICES[serviceParam]) ? [serviceParam] : ['siding']
  );
  
  const toggleService = (service: ServiceType) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? (prev.length > 1 ? prev.filter(s => s !== service) : prev) // keep at least one
        : [...prev, service]
    );
  };
  
  const [address, setAddress] = useState(addressParam || '');
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [windowCount, setWindowCount] = useState(12); // Default 12
  const [isManualMode, setIsManualMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);


  // Fetch address suggestions
  useEffect(() => {
    // Basic debounce to limit API hits
    const timer = setTimeout(async () => {
      // Don't search if too short or if it exactly matches our loaded property (meaning we already selected it)
      if (!address || address.length < 5 || address === propertyData?.address) {
        setSuggestions([]);
        return;
      }
      setIsSearchingAddress(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=5&countrycodes=us`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        if (res.ok) {
          const rawData = await res.json();
          const cleanData = rawData.map((item: any) => {
            const addr = item.address;
            if (!addr) return { ...item, clean_name: item.display_name };
            
            const street = [addr.house_number, addr.road].filter(Boolean).join(' ');
            const city = addr.city || addr.town || addr.village || addr.municipality;
            const state = addr.state;
            const zip = addr.postcode;
            
            const formatted = [street, city, state && zip ? `${state} ${zip}` : state].filter(Boolean).join(', ');
            return {
              ...item,
              clean_name: formatted || item.display_name
            };
          });
          
          setSuggestions(cleanData);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error('Failed to fetch autocomplete:', err);
      } finally {
        setIsSearchingAddress(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [address, propertyData?.address]);

  // Fetch initial property data if URL param exists
  useEffect(() => {
    if (addressParam && !propertyData) {
      handleAnalyze(addressParam);
    }
  }, [addressParam]);

  const handleAnalyze = async (searchAddress: string) => {
    if (!searchAddress) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/property-data?address=${encodeURIComponent(searchAddress)}`);
      if (res.ok) {
        const data = await res.json();
        setPropertyData({
          address: data.address,
          squareFootage: data.squareFootage || 1500, // fallback
          yearBuilt: data.yearBuilt || 2000,
          currentValue: data.currentValue || 250000,
        });
        setIsManualMode(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 429 || res.status === 500) {
          setErrorMsg("Automatic lookup is currently busy. Please enter details manually below to continue.");
          // Enable manual mode with defaults
          enableManualMode();
        } else {
          setErrorMsg(`Error: ${errorData.error || 'Property not found'}.`);
          enableManualMode();
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Network error. Please enter details manually.");
      enableManualMode();
    } finally {
      setLoading(false);
    }
  };

  const enableManualMode = () => {
    setIsManualMode(true);
    if (!propertyData) {
      setPropertyData({
        address: address || 'Current Property',
        squareFootage: 1800,
        yearBuilt: 1995,
        currentValue: 275000
      });
    }
  };

  const updatePropertyField = (field: keyof PropertyData, value: any) => {
    if (!propertyData) return;
    setPropertyData({ ...propertyData, [field]: value });
  };

  // Calculation Helpers
  const getCost = () => {
    if (!propertyData) return 0;
    return selectedServices.reduce((total, service) => {
      const val = service === 'windows' ? windowCount : propertyData.squareFootage;
      return total + SERVICES[service].calc(val);
    }, 0);
  };

  const getAddedValue = () => {
    if (!propertyData) return 0;
    return selectedServices.reduce((total, service) => {
      const val = service === 'windows' ? windowCount : propertyData.squareFootage;
      return total + (SERVICES[service].calc(val) * SERVICES[service].roi);
    }, 0);
  };

  const getROI = () => {
    const cost = getCost();
    if (cost === 0) return 0;
    const baseROI = getAddedValue() / cost;
    // Bundle bonus: +2% for each additional service
    const bundleBonus = (selectedServices.length - 1) * 0.02;
    return baseROI + Math.max(0, bundleBonus);
  };

  const getSuperiorROI = () => {
    const industryCost = getCost();
    if (industryCost === 0) return 0;
    const addedValue = getAddedValue();
    const superiorCost = industryCost * (1 - SUPERIOR_DISCOUNT_FACTOR);
    const baseROI = addedValue / superiorCost;
    const bundleBonus = (selectedServices.length - 1) * 0.02;
    return baseROI + Math.max(0, bundleBonus);
  };

  const getUpgradedValue = () => {
    if (!propertyData) return 250000;
    return propertyData.currentValue + getAddedValue();
  };

  const sqft = propertyData?.squareFootage || 1500;
  const currentValue = propertyData?.currentValue || 250000;
  const yearBuilt = propertyData?.yearBuilt || 2000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Input & Results */}
      <div className="lg:col-span-2 space-y-6">
        {/* Address Input Card */}
        <div className="glass-card">
          <label className="block text-sm font-semibold text-brand-navy mb-2">Property Address for Auto-Calculation</label>
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. 123 Main St, Cincinnati, OH"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 400)} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSuggestions(false);
                    handleAnalyze(address);
                  }
                }}
              />
              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-slate-200 mt-1 rounded-lg shadow-xl overflow-hidden text-left max-h-60 overflow-y-auto">
                  {suggestions.map((s, idx) => (
                    <li 
                      key={idx}
                      className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-sm text-slate-700 border-b last:border-b-0 border-slate-100 transition-colors"
                      onPointerDown={(e) => {
                        e.preventDefault();
                        const finalAddress = s.clean_name || s.display_name;
                        setAddress(finalAddress);
                        setShowSuggestions(false);
                        handleAnalyze(finalAddress);
                      }}
                    >
                      {s.clean_name || s.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button 
              onClick={() => handleAnalyze(address)}
              disabled={loading || !address}
              className="bg-brand-navy hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[120px]"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Analyze'}
            </button>
          </div>
          
          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          {propertyData && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2 uppercase tracking-wider">
                  Property Details 
                  {isManualMode && <span className="text-[10px] bg-brand-navy text-white px-1.5 py-0.5 rounded ml-2">Manual Entry</span>}
                </h4>
                <button 
                  onClick={() => setIsManualMode(!isManualMode)}
                  className="text-xs font-bold text-brand-emerald hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  {isManualMode ? 'Lock Data' : 'Edit Details'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Square Footage</label>
                  {isManualMode ? (
                    <input 
                      type="number" 
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm font-bold text-brand-navy"
                      value={propertyData.squareFootage}
                      onChange={(e) => updatePropertyField('squareFootage', Number(e.target.value))}
                    />
                  ) : (
                    <div className="font-bold text-brand-navy">{propertyData.squareFootage.toLocaleString()} sqft</div>
                  )}
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year Built</label>
                  {isManualMode ? (
                    <input 
                      type="number" 
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm font-bold text-brand-navy"
                      value={propertyData.yearBuilt}
                      onChange={(e) => updatePropertyField('yearBuilt', Number(e.target.value))}
                    />
                  ) : (
                    <div className="font-bold text-brand-navy">{propertyData.yearBuilt}</div>
                  )}
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Current Value ($)</label>
                  {isManualMode ? (
                    <input 
                      type="number" 
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm font-bold text-brand-navy"
                      value={propertyData.currentValue}
                      onChange={(e) => updatePropertyField('currentValue', Number(e.target.value))}
                    />
                  ) : (
                    <div className="font-bold text-brand-navy">${propertyData.currentValue.toLocaleString()}</div>
                  )}
                </div>
              </div>
              
              {yearBuilt < 2006 && selectedServices.includes('siding') && (
                <div className="mt-4 text-red-600 font-bold bg-red-100 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  High Priority Recommendation: Your siding is &gt;20 years old and due for replacement.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Services Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.entries(SERVICES) as [ServiceType, typeof SERVICES[ServiceType]][]).map(([key, service]) => {
            const Icon = service.icon;
            const isActive = selectedServices.includes(key);
            return (
              <div key={key} className="flex flex-col gap-2">
                <button
                  onClick={() => toggleService(key)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                    isActive 
                      ? 'border-brand-emerald bg-emerald-50 text-brand-navy shadow-md' 
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-500'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-8 h-8 mb-2 ${isActive ? 'text-brand-emerald' : ''}`} />
                    {isActive && (
                      <div className="absolute -top-1 -right-1 bg-brand-emerald text-white p-0.5 rounded-full">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-sm">{service.name}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Calculator Content */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
              {selectedServices.length === 1 ? `${SERVICES[selectedServices[0]].name} Industry Estimate` : 'Typical Industry Bundle'}
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Standard Industry ROI</span>
              <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-sm border border-slate-200">
                {(getROI() * 100).toFixed(0)}% ROI
              </span>
            </div>
          </div>

          <div className="mb-8">
            <div className="space-y-2 mb-6">
              {selectedServices.includes('siding') && <p className="text-sm text-slate-600 border-l-2 border-emerald-500 pl-3">Siding replacement protects against Cincinnati&apos;s harsh weather conditions.</p>}
              {selectedServices.includes('roofing') && <p className="text-sm text-slate-600 border-l-2 border-emerald-500 pl-3">Architectural shingles tailored for high durability and long lifespan.</p>}
              {selectedServices.includes('windows') && <p className="text-sm text-slate-600 border-l-2 border-emerald-500 pl-3">Energy-efficient premium vinyl windows.</p>}
              {selectedServices.includes('gutters') && <p className="text-sm text-slate-600 border-l-2 border-emerald-500 pl-3">Seamless aluminum gutter system for heavy rainfall.</p>}
            </div>

            {/* Custom Input for Windows */}
            {selectedServices.includes('windows') && (
              <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold mb-2 text-slate-900">Number of Windows to Replace</label>
                <input 
                  type="number" 
                  min="1"
                  value={windowCount} 
                  onChange={(e) => setWindowCount(Number(e.target.value) || 1)}
                  className="w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2 text-slate-900 bg-white"
                />
              </div>
            )}

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-medium">Typical Industry Estimate</span>
                <span className="text-2xl font-bold text-brand-navy">
                  ${getCost().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 mb-6">
                <span className="font-medium text-emerald-600">Estimated Equity Added</span>
                <span className="text-xl font-bold border-b border-emerald-200">
                  +${getAddedValue().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Price Beat Guarantee & ROI Booster */}
              <div className="bg-emerald-600 text-white p-5 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield className="w-24 h-24 rotate-12" />
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-lg uppercase tracking-wider mb-1">Shane&apos;s Exterior Advantage</div>
                  <p className="text-sm text-emerald-50 opacity-90 leading-relaxed mb-4">
                    Why pay industry average? We guarantee to **beat any written estimate**, turning your maintenance into a high-return investment.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {selectedServices.some(s => (SERVICES[s] as any).isEssential) && (
                      <div className="bg-white/10 px-3 py-1.5 rounded-md border border-white/20 text-xs">
                        <span className="font-bold block uppercase mb-0.5 opacity-70">Equity Status</span>
                        Value Preservation: <span className="font-bold text-emerald-200 uppercase">Critical</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center min-w-[140px]">
                  <div className="text-[10px] font-bold text-emerald-200 uppercase mb-1">Shane&apos;s Projected ROI</div>
                  <div className="text-3xl font-black text-white">{(getSuperiorROI() * 100).toFixed(0)}%</div>
                  <div className="text-[10px] opacity-70 mt-1">ROI Boost: +{((getSuperiorROI() - getROI()) * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dashboard UI & Lead Capture */}
      <div className="space-y-6">
        {/* Equity Meter Widget */}
        <div className="glass-card bg-gradient-to-br from-brand-navy to-slate-900 text-white border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-40"></div>
          
          <h3 className="font-semibold text-slate-300 mb-2">Total Property Value</h3>
          <div className="text-4xl font-extrabold mb-6 tracking-tight flex items-baseline gap-1">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            {(propertyData ? getUpgradedValue() : 250000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Before (Zestimate)</div>
              <div className="font-medium">${currentValue.toLocaleString()}</div>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="text-emerald-400 rotate-90 w-5 h-5" />
            </div>
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3">
              <div className="text-xs text-emerald-300 mb-1 uppercase tracking-wider">After {selectedServices.length > 1 ? 'Bundle' : SERVICES[selectedServices[0]].name}</div>
              <div className="font-medium text-emerald-400">${getUpgradedValue().toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
        </div>

        {/* Sticky Lead Capture */}
        <div className="sticky top-6">
          <LeadCapture 
            projectCost={getCost()} 
            addedValue={getAddedValue()} 
            service={selectedServices.map(s => SERVICES[s].name).join(', ')} 
            propertyData={propertyData} 
          />
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center p-12">
        <Loader2 className="animate-spin w-8 h-8 text-brand-emerald" />
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}
