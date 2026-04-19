'use client';

import Calculator from './Calculator';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function CalculatorWrapper() {
  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-emerald font-bold tracking-[0.2em] uppercase text-sm mb-4">Interactive Tools</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">4-in-1 Exterior Equity Calculator</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get an instant estimate of your project cost and the projected equity added to your home value based on real-time Zillow market data.
          </p>
        </div>

        <div className="relative">
          {/* Background Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-emerald/5 rounded-full blur-[80px] -z-10" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-navy/5 rounded-full blur-[80px] -z-10" />
          
          <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(10,25,47,0.1)] border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-emerald via-brand-navy to-brand-emerald" />
            <div className="p-4 md:p-12">
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="w-12 h-12 text-brand-emerald animate-spin" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Initializing Calculator Engine...</p>
                </div>
              }>
                <Calculator />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>*Estimates provided are for informational purposes. Final quotes require an on-site inspection by a certified Superior Products technician.</p>
        </div>
      </div>
    </section>
  );
}
