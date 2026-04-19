'use client';

import { Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-navy p-2 rounded-lg group-hover:bg-brand-emerald transition-colors">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-black tracking-tight leading-none uppercase transition-colors ${isScrolled ? 'text-brand-navy' : 'text-white'}`}>SHANE&apos;S</h1>
            <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-[0.2em]">Exterior Services</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>Services</Link>
          <Link href="#calculator" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>ROI Calculator</Link>
          <Link href="#testimonials" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>Testimonials</Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="tel:5137023990" 
            className="flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-brand-navy/20"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">(513) 702-3990</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
