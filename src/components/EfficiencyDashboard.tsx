'use client';

import { Zap, Wind, Thermometer, ShieldCheck, ArrowRight, Gauge, MousePointer2, Home, Droplets, Maximize, Shield } from 'lucide-react';
import { useState } from 'react';

type ServiceCategory = 'Roofing' | 'Siding' | 'Windows' | 'Gutters';

const SERVICE_DATA = {
  Roofing: {
    title: 'Lifetime Thermal Shield',
    description: 'Traditional roofs trap massive amounts of heat in your attic, forcing your HVAC to run 40% harder than necessary.',
    infographic: '/efficiency-roof.png',
    statusQuo: {
      title: 'Heat Trapping & Ice Dams',
      desc: 'Clogged ventilation and poor insulation lead to attic rot and massive energy spikes.',
      points: [
        { title: 'Thermal Build-up', desc: 'Attics can reach 150°F, radiating heat directly into your living space.', icon: Thermometer, color: 'text-rose-500', border: 'border-rose-500/20' },
        { title: 'Ice Dam Risk', desc: 'Uneven roof temps cause snow melt to refreeze, ripping apart your shingles.', icon: Wind, color: 'text-rose-500', border: 'border-rose-500/20' }
      ],
      cost: 'Trapped heat shortens shingle life by 50% and doubles cooling costs in summer.'
    },
    solution: {
      title: 'Balanced Intake & Exhaust',
      desc: 'Our systems use ridge vents and reflective shingles to create a constant flow of fresh air.',
      points: [
        { title: 'Solar Reflection', desc: 'Specialized shingles reflect UV rays instead of absorbing them as heat.', icon: ShieldCheck, color: 'text-brand-emerald', border: 'border-brand-emerald/20' },
        { title: 'Active Ventilation', desc: 'Soffit-to-ridge flow keeps attic temp within 10° of the outside air.', icon: Zap, color: 'text-brand-emerald', border: 'border-brand-emerald/20' }
      ],
      payoff: 'Extend shingle lifespan to 50+ years and maintain a stable home temperature year-round.'
    }
  },
  Siding: {
    title: 'The Home Insulation Blanket',
    description: 'Adding a thermal barrier to your walls is like putting a premium winter coat on your home, stopping energy loss instantly.',
    infographic: '/efficiency-siding.png',
    statusQuo: {
      title: 'Thermal Bridging & Rot',
      desc: 'Standard siding allows heat to escape through your studs, wasting thousands in energy.',
      points: [
        { title: 'Thermal Leaks', desc: 'Heat "bleeds" through your wall framing every second of the day.', icon: Thermometer, color: 'text-rose-500', border: 'border-rose-500/20' },
        { title: 'Moisture Seepage', desc: 'Poor barriers trap humidity behind the wall, inviting structural rot.', icon: Wind, color: 'text-rose-500', border: 'border-rose-500/20' }
      ],
      cost: 'Your walls account for up to 35% of your home\'s total energy loss every winter.'
    },
    solution: {
      title: 'Insulated Shield Matrix',
      desc: 'Our premium siding features a thick kontoured foam backing for maximum R-value.',
      points: [
        { title: 'R-3.0 Insulation', desc: 'Adds a high-density thermal blanket that stops framing energy loss.', icon: ShieldCheck, color: 'text-brand-emerald', border: 'border-brand-emerald/20' },
        { title: 'Breathable Barrier', desc: 'Advanced house wrap allows moisture out but keeps wind and rain out.', icon: Zap, color: 'text-brand-emerald', border: 'border-brand-emerald/20' }
      ],
      payoff: 'Reduce exterior noise by 45% and slash wall energy loss by up to 30% permanently.'
    }
  },
  Windows: {
    title: 'Smart-Glass Barrier System',
    description: 'Upgrade your home envelope from 1980s fragility to 2026 Energy Standards with Argon-insulated barriers.',
    infographic: '/efficiency-window.png',
    statusQuo: {
      title: 'Draughty Status Quo',
      desc: 'Traditional windows act like filters rather than barriers, sucking in cold Ohio air.',
      points: [
        { title: 'Thermal Bridge', desc: 'Single thin panes radiate your interior heat directly into the night.', icon: Thermometer, color: 'text-rose-500', border: 'border-rose-500/20' },
        { title: 'Draught Zones', desc: 'Shrunken seals create actual holes in your wall that suck in freezing air.', icon: Wind, color: 'text-rose-500', border: 'border-rose-500/20' }
      ],
      cost: 'Your furnace must constantly cycle to replace leaking air, causing massive bill spikes.'
    },
    solution: {
      title: 'Multi-Chambered Isolation',
      desc: 'High-performance thermal shields designed to reflect and retain your interior climate.',
      points: [
        { title: 'Argon Barrier', desc: 'Heavy inert gas stops thermal transfer in its tracks between panes.', icon: ShieldCheck, color: 'text-brand-emerald', border: 'border-brand-emerald/20' },
        { title: 'Low-E Coating', desc: 'Micro-thin silver coating reflects 90% of heat while maintaining clarity.', icon: Zap, color: 'text-brand-emerald', border: 'border-brand-emerald/20' }
      ],
      payoff: 'Reflection of expensive furnace heat back into your living space and 2026 energy ratings.'
    }
  },
  Gutters: {
    title: 'Foundation Defense Engine',
    description: 'Redirect thousands of gallons of water away from your foundation to prevent catastrophic structural damage.',
    infographic: '/efficiency-gutters.png',
    statusQuo: {
      title: 'Drainage Failure & Cracks',
      desc: 'Overflowing gutters dump water directly onto your foundation, causing shifting and leaks.',
      points: [
        { title: 'Basement Flooding', desc: 'Hydrostatic pressure forces groundwater through your basement walls.', icon: Thermometer, color: 'text-rose-500', border: 'border-rose-500/20' },
        { title: 'Soil Erosion', desc: 'Water pools at the corners, washing away the soil that holds your home up.', icon: Wind, color: 'text-rose-500', border: 'border-rose-500/20' }
      ],
      cost: 'Foundation repairs typically cost $15k-$50k. Clogged gutters are the primary cause.'
    },
    solution: {
      title: 'High-Velocity Drainage',
      desc: 'Our seamless systems manage heavy rainfall effortlessly with high-flow downspouts.',
      points: [
        { title: 'Seamless Flow', desc: 'Zero joints means zero leaks. Water is contained and controlled.', icon: ShieldCheck, color: 'text-brand-emerald', border: 'border-brand-emerald/20' },
        { title: 'Gutter Guards', desc: 'Maintenance-free systems ensure your drainage always works at 100%.', icon: Zap, color: 'text-brand-emerald', border: 'border-brand-emerald/20' }
      ],
      payoff: 'Protect your biggest investment from the inside out and prevent expensive foundation rot.'
    }
  }
};

export default function EfficiencyDashboard() {
  const [currentService, setCurrentService] = useState<ServiceCategory>('Windows');
  const [activeTab, setActiveTab] = useState<'status-quo' | 'solution'>('solution');

  const data = SERVICE_DATA[currentService];

  return (
    <section id="efficiency" className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-emerald/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-[120px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-emerald font-bold tracking-[0.2em] uppercase text-sm mb-4">Sustainability & Efficiency Dashboard</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Built for Technology. <br className="hidden md:block" /> Engineered for Savings.</h3>
          
          {/* Service Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
             {(['Roofing', 'Siding', 'Windows', 'Gutters'] as ServiceCategory[]).map(cat => {
               const Icon = cat === 'Roofing' ? Shield : cat === 'Siding' ? Home : cat === 'Windows' ? Maximize : Droplets;
               return (
                 <button
                   key={cat}
                   onClick={() => {
                     setCurrentService(cat);
                     setActiveTab('solution');
                   }}
                   className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border-2 ${currentService === cat ? 'bg-brand-emerald border-brand-emerald text-brand-navy shadow-xl scale-105' : 'bg-transparent border-brand-white/10 text-slate-400 hover:border-brand-white/30'}`}
                 >
                   <Icon className="w-5 h-5" />
                   {cat}
                 </button>
               )
             })}
          </div>
        </div>

        {/* Comparison Dashboard */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-brand-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Infographic Visual Area */}
            <div className="relative h-[400px] lg:h-auto bg-slate-800/50 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-white/10 overflow-hidden">
              <div className="absolute top-8 left-8">
                <div className="flex items-center gap-2 bg-brand-navy/80 backdrop-blur-md px-4 py-2 rounded-full border border-brand-white/10 z-20">
                  <Gauge className="w-4 h-4 text-brand-emerald" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Real-Time Technical Analysis</span>
                </div>
              </div>
              
              <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                 <img 
                  key={data.infographic}
                  src={data.infographic} 
                  alt={`${currentService} Efficiency Infographic`} 
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in duration-700"
                 />
                 
                 {/* Hotspots reveal for Solution mode by default or interaction */}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12">
              <div className="flex gap-2 mb-8 p-1 bg-brand-navy rounded-2xl w-fit">
                <button 
                  onClick={() => setActiveTab('status-quo')}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'status-quo' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  The Status Quo
                </button>
                <button 
                  onClick={() => setActiveTab('solution')}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'solution' ? 'bg-brand-emerald text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  The Solution
                </button>
              </div>

              {activeTab === 'status-quo' ? (
                <div key={`${currentService}-quo`} className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                  <div>
                    <h4 className="text-rose-500 text-xs font-black uppercase tracking-widest mb-2">The Inefficient Household</h4>
                    <h5 className="text-3xl font-black text-white mb-4">{data.statusQuo.title}</h5>
                    <p className="text-slate-400 leading-relaxed">
                      {data.statusQuo.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.statusQuo.points.map((p, i) => (
                      <div key={i} className={`bg-brand-navy p-6 rounded-2xl border ${p.border}`}>
                        <p.icon className={`w-8 h-8 ${p.color} mb-4`} />
                        <h6 className="text-white font-bold mb-2">{p.title}</h6>
                        <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                    <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
                       <Zap className="w-4 h-4" />
                       <span className="text-sm uppercase tracking-widest">Financial Impact</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{data.statusQuo.cost}</p>
                  </div>
                </div>
              ) : (
                <div key={`${currentService}-sol`} className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                  <div>
                    <h4 className="text-brand-emerald text-xs font-black uppercase tracking-widest mb-2 font-bold italic">The Shane Standard</h4>
                    <h5 className="text-3xl font-black text-white mb-4">{data.solution.title}</h5>
                    <p className="text-slate-400 leading-relaxed">
                      {data.solution.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.solution.points.map((p, i) => (
                      <div key={i} className={`bg-brand-navy p-6 rounded-2xl border ${p.border}`}>
                        <p.icon className={`w-8 h-8 ${p.color} mb-4`} />
                        <h6 className="text-white font-bold mb-2">{p.title}</h6>
                        <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-brand-emerald/5 rounded-2xl border border-brand-emerald/10">
                    <div className="flex items-center gap-2 text-brand-emerald font-bold mb-2">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-sm uppercase tracking-widest">Efficiency Payoff</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{data.solution.payoff}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Narrative Footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-emerald border border-brand-white/10">
                    <Zap className="w-6 h-6" />
                </div>
                <div>
                    <h5 className="text-white font-bold mb-1">2026 Energy Standards</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">All materials meet the highest DOE requirements for sustainability and long-term savings.</p>
                </div>
            </div>
            <div className="flex gap-4 items-center justify-end">
                <a 
                    href="#calculator"
                    className="flex items-center gap-3 bg-brand-emerald text-brand-navy px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-emerald/20"
                >
                    Predict My Savings
                    <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
