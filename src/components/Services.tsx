'use client';

import { Home, Shield, Maximize, Droplets, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    title: 'Lifetime Roofing',
    description: 'Protect your biggest investment with architectural shingles designed for Cincinnati’s unpredictable weather. Guaranteed for a lifetime.',
    icon: Shield,
    benefits: ['Wind Resistant', 'Fire Rated', 'Lifetime Material Warranty'],
    roi: '82% ROI'
  },
  {
    title: 'Insulated Siding',
    description: 'Transform your curb appeal and slash energy costs with premium moisture-resistant siding tailored for long-term durability.',
    icon: Home,
    benefits: ['Energy Efficient', 'Low Maintenance', 'Fade Resistant'],
    roi: '98% ROI'
  },
  {
    title: 'Energy-Star Windows',
    description: 'Stop heat loss with custom-fit, double-pane vinyl windows. Clearer views, lower bills, and maximum home security.',
    icon: Maximize,
    benefits: ['UV Protection', 'Noise Reduction', 'Enhanced Security'],
    roi: '88% ROI'
  },
  {
    title: 'Seamless Gutters',
    description: 'Our custom aluminum systems manage heavy rainfall effortlessly, preventing foundation damage and landscape erosion.',
    icon: Droplets,
    benefits: ['Clog-Free Options', 'Heavy-Duty Brackets', 'Perfect Transitions'],
    roi: '72% ROI'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-emerald font-bold tracking-[0.2em] uppercase text-sm mb-4">Core Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Designed for Cincinnati, <br className="hidden md:block" /> Built to Last.</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From historic homes to modern builds, we provide the specific exterior solutions that Ohio homeowners trust for value and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="glass-card bg-white border border-slate-200 group hover:border-brand-emerald transition-all duration-500">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-navy group-hover:bg-brand-emerald group-hover:text-white transition-all duration-500">
                <service.icon className="w-8 h-8" />
              </div>
              <div className="mb-4">
                <span className="text-[10px] font-bold text-brand-emerald bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">{service.roi} Potential</span>
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-4">{service.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a 
            href="#calculator" 
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-5 rounded-2xl font-bold shadow-2xl relative group transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute -top-3 -right-3 bg-brand-emerald p-2 rounded-full transform group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            Bundle more services and save even more! 🏡✨
          </a>
        </div>
      </div>
    </section>
  );
}
