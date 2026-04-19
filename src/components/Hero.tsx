'use client';

import { ArrowRight, Calculator, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: 'url("/hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-navy via-brand-navy/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-emerald/20 border border-brand-emerald/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-brand-emerald" />
            <span className="text-brand-emerald font-bold text-sm tracking-wide">Proudly Serving Cincinnati to Dayton Homeowners</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            How Much More Is Your <span className="text-brand-emerald">Home Worth</span> Today?
          </h1>
          
          <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl font-medium">
            Discover how premium roofing, siding, and windows can transform your home&apos;s value with Shane&apos;s Exterior Services. Proudly serving homeowners from Cincinnati to Dayton with guaranteed results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#calculator" className="btn-primary text-lg px-8 py-4 group">
              Calculate Your Home's New Value
              <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="#services" className="btn-secondary text-lg border border-white/10 px-8 py-4 bg-white/5 text-white backdrop-blur-sm group">
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-slate-200" />
              ))}
            </div>
            <p className="text-sm text-slate-300">
              <span className="text-white font-bold italic">5,000+</span> Home Renovations Completed in Ohio
            </p>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 py-8 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-bold text-brand-emerald uppercase tracking-widest mb-1">ROI Potential</p>
            <p className="text-2xl font-black text-white">UP TO 98%</p>
          </div>
          <div>
            <p className="text-xs font-bold text-brand-emerald uppercase tracking-widest mb-1">Local Experience</p>
            <p className="text-2xl font-black text-white">52 YEARS</p>
          </div>
          <div>
            <p className="text-xs font-bold text-brand-emerald uppercase tracking-widest mb-1">Project Warranty</p>
            <p className="text-2xl font-black text-white">LIFETIME</p>
          </div>
        </div>
      </div>
    </section>
  );
}
