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
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
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

        </div>
      </div>
    </section>
  );
}
