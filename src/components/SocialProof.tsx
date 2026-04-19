'use client';

import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Robert Miller',
    location: 'Indian Hill, OH',
    quote: 'The ROI calculator was spot on. Our home value increased exactly as predicted after the new siding and roofing installation. Truly professional team.',
    rating: 5
  },
  {
    name: 'Sarah Jenkins',
    location: 'Mason, OH',
    quote: 'Best exterior contractor in Cincinnati. They managed the entire roof replacement in two days. The cleanup was so thorough, you’d never know they were here.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    location: 'Anderson Township, OH',
    quote: 'Energy bills dropped by 30% after replacing our 20-year-old windows. The lifetime warranty gives us immense peace of mind. Highly recommended.',
    rating: 5
  }
];

export default function SocialProof() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-brand-emerald font-bold tracking-[0.2em] uppercase text-sm mb-4 text-left">Real Results</h2>
            <h3 className="text-4xl font-black text-brand-navy mb-6">Trusted by Cincinnati Homeowners.</h3>
            <p className="text-lg text-slate-600 mb-8">
              Don't just take our word for it. We've helped thousands of Ohio families protect their homes and grow their equity.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="text-3xl font-black text-brand-navy">4.9/5</div>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Average Google Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-brand-navy">100%</div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Guaranteed Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className={`glass-card bg-slate-50 border-0 p-8 relative ${index === 0 ? 'md:col-span-2' : ''}`}>
                <Quote className="absolute top-4 right-4 w-12 h-12 text-brand-emerald/10" />
                <div className="flex text-amber-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg font-medium text-brand-navy mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-black text-brand-navy">{testimonial.name}</p>
                  <p className="text-sm text-brand-emerald font-bold uppercase tracking-wider">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Badges */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           {/* Placeholder for Trust Badges */}
           <div className="text-xl font-black italic tracking-tighter">CERTIFIED MASTER ELITE</div>
           <div className="text-xl font-black italic tracking-tighter">BBB ACCREDITED A+</div>
           <div className="text-xl font-black italic tracking-tighter">OWENS CORNING PRIDE</div>
           <div className="text-xl font-black italic tracking-tighter">ENERGY STAR PARTNER</div>
        </div>
      </div>
    </section>
  );
}
