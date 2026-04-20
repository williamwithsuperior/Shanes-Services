'use client';

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  X,
  ArrowRight,
  Home,
  Droplets,
  Mail,
  Send,
  Zap,
  Hammer,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

type Step =
  | 'idle'
  | 'service'
  | 'sqft'
  | 'condition'
  | 'zip'
  | 'email'
  | 'submitting'
  | 'success';

export default function SmartQuoteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [data, setData] = useState({
    service: '',
    sqft: '',
    windowCount: '',
    name: '',
    zip: '',
    phone: '',
  });

  // Start the conversation when opened
  useEffect(() => {
    if (isOpen && step === 'idle') {
      setStep('service');
    }
  }, [isOpen, step]);

  const handleNext = (updates: Partial<typeof data>) => {
    setData(prev => ({ ...prev, ...updates }));
    
    // Conditional step logic
    if (step === 'service') {
      setStep('sqft');
    }
    else if (step === 'sqft') setStep('condition'); // 'condition' step will now be name collection
    else if (step === 'condition') setStep('zip');
    else if (step === 'zip') setStep('email'); // Step name 'email' now collects phone
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: 'bot@shanesexteriors.com',
          preferredStartDate: 'ASAP',
          serviceInterested: data.service,
          estimatedCost: 0,
          estimatedROI: 0,
          propertySpecs: { 
            zip: data.zip, 
            dimension: data.service === 'Windows' ? `${data.windowCount} Windows` : `${data.sqft} SqFt` 
          },
          source: 'SmartBot',
        }),
      });
      
      if (res.ok) {
        setStep('success');
      } else {
        alert('Something went wrong. Please try again.');
        setStep('email');
      }
    } catch {
      alert('Network error. Please try again.');
      setStep('email');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-navy text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group animate-bounce-slow"
      >
        <div className="bg-brand-emerald p-2 rounded-full group-hover:rotate-12 transition-transform">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold whitespace-nowrap">Get a Free Quote</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] flex flex-col items-end">
      <div className="glass-dark border-brand-white/10 w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[600px] animate-in fade-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="bg-brand-navy p-6 flex justify-between items-center border-b border-brand-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-brand-emerald p-2 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Project Assistant</h3>
              <p className="text-brand-emerald text-xs font-medium uppercase tracking-widest">Active Scope Engine</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'service' && (
            <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
              <h4 className="text-white text-xl font-bold mb-4">
                Which part of your home's exterior is showing the most wear?
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {['Roof', 'Siding', 'Windows', 'Gutters'].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleNext({ service: s })}
                    className="p-6 rounded-2xl bg-brand-navy border border-brand-white/20 hover:bg-brand-emerald hover:border-brand-emerald transition-all text-left flex flex-col gap-3 group shadow-2xl"
                  >
                    <div className="bg-brand-emerald/10 p-2 rounded-lg w-fit group-hover:bg-white/20 transition-colors">
                      <Home className="w-6 h-6 text-brand-emerald group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-extrabold text-white text-lg tracking-tight">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'sqft' && (
            <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
              <h4 className="text-white text-xl font-bold mb-2">
                {data.service === 'Windows'
                  ? "How many windows are you looking to replace?"
                  : "Roughly how many square feet is your home?"}
              </h4>
              <p className="text-slate-400 text-sm mb-6">
                {data.service === 'Windows'
                  ? "This helps accurately gauge the material load and installation window."
                  : "This helps me calculate material load and labor intensity."}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = data.service === 'Windows' ? data.windowCount : data.sqft;
                  if (val) handleNext({});
                }}
                className="relative"
              >
                <input
                  autoFocus
                  type="number"
                  placeholder={data.service === 'Windows' ? "e.g. 12" : "e.g. 2500"}
                  className="w-full bg-brand-navy/50 border border-brand-white/10 rounded-2xl px-6 py-4 text-white text-2xl font-bold focus:ring-2 focus:ring-brand-emerald outline-none"
                  value={data.service === 'Windows' ? data.windowCount : data.sqft}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (data.service === 'Windows') setData(prev => ({ ...prev, windowCount: val }));
                    else setData(prev => ({ ...prev, sqft: val }));
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3 bg-brand-emerald p-3 rounded-xl text-white hover:bg-emerald-600 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {step === 'condition' && (
            <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
              <h4 className="text-white text-xl font-bold mb-2">
                What is your full name?
              </h4>
              <p className="text-slate-400 text-sm mb-6">We'll use this to personalize your project scope and estimate.</p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (data.name) handleNext({});
                }}
                className="relative"
              >
                <input 
                  autoFocus
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-brand-navy/50 border border-brand-white/10 rounded-2xl px-6 py-4 text-white text-2xl font-bold focus:ring-2 focus:ring-brand-emerald outline-none"
                  value={data.name}
                  onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-3 bg-brand-emerald p-3 rounded-xl text-white hover:bg-emerald-600 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {step === 'zip' && (
            <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
              <h4 className="text-white text-xl font-bold mb-2">
                What is your property zip code?
              </h4>
              <p className="text-slate-400 text-sm mb-6">Needed to calculate local material costs and energy rebates.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (data.zip.length === 5) handleNext({});
                }}
                className="relative"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="45202"
                  maxLength={5}
                  className="w-full bg-brand-navy/50 border border-brand-white/10 rounded-2xl px-6 py-4 text-white text-2xl font-bold focus:ring-2 focus:ring-brand-emerald outline-none tracking-widest px-8"
                  value={data.zip}
                  onChange={(e) => setData(prev => ({ ...prev, zip: e.target.value }))}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3 bg-brand-emerald p-3 rounded-xl text-white hover:bg-emerald-600 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-5 duration-300">
              <div className="bg-brand-emerald/10 border border-brand-emerald/30 rounded-2xl p-4 mb-4">
                <p className="text-brand-emerald font-bold text-sm mb-1">Success! Scope Ready.</p>
                <p className="text-slate-300 text-xs">
                  Based on local material costs in {data.zip}, your project qualifies for a Digital Estimate.
                </p>
              </div>
              <h4 className="text-white text-xl font-bold mb-2">
                What is the best phone number to reach you?
              </h4>
              <div className="relative">
                <input
                  autoFocus
                  required
                  type="tel"
                  placeholder="(513) 702-XXXX"
                  className="w-full bg-brand-navy/50 border border-brand-white/10 rounded-2xl px-6 py-4 text-white text-lg font-medium focus:ring-2 focus:ring-brand-emerald outline-none"
                  value={data.phone}
                  onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-emerald hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                Claim My Estimate
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}

          {step === 'submitting' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-brand-emerald border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white font-bold">Generating Preliminary Scope...</p>
              <p className="text-slate-400 text-sm italic mt-2">Forwarding details to Resend...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center animate-in zoom-in duration-500">
              <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h4 className="text-white text-2xl font-bold mb-2">Success!</h4>
              <p className="text-slate-400 mb-8 px-4">
                We've received your request for <span className="text-brand-emerald font-bold">{data.service}</span>. Our team will text or call you at <span className="text-brand-emerald font-bold">{data.phone}</span> shortly with your estimate.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-emerald font-bold hover:underline"
              >
                Close Assistant
              </button>
            </div>
          )}
        </div>

        {/* Branding Footer */}
        <div className="bg-brand-navy/50 p-4 border-t border-brand-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 opacity-50">
            <ShieldCheck className="w-3 h-3 text-brand-emerald" />
            <span className="text-[10px] text-white uppercase tracking-tighter">Secure Analysis Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
