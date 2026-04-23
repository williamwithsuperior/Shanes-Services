'use client';

import { Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${isScrolled || isMenuOpen ? 'bg-brand-navy' : 'bg-white/10 backdrop-blur-md'}`}>
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-black tracking-tight leading-none uppercase transition-colors ${isScrolled || isMenuOpen ? 'text-brand-navy' : 'text-white'}`}>SHANE&apos;S</h1>
              <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-[0.2em]">Exterior Services</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>Services</Link>
            <Link href="#gallery" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>Recent Transformations</Link>
            <Link href="#calculator" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-emerald' : 'text-white hover:text-brand-emerald'}`}>ROI Calculator</Link>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:5137023990" 
              className="flex items-center gap-2 bg-brand-navy text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4 text-brand-emerald" />
              <span className="hidden xs:inline">(513) 702-3990</span>
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-brand-navy"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 flex flex-col gap-4">
            <Link onClick={() => setIsMenuOpen(false)} href="#services" className="text-lg font-bold text-brand-navy hover:text-brand-emerald py-2 border-b border-slate-50">Services</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="#gallery" className="text-lg font-bold text-brand-navy hover:text-brand-emerald py-2 border-b border-slate-50">Recent Transformations</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="#calculator" className="text-lg font-bold text-brand-navy hover:text-brand-emerald py-2 border-b border-slate-50">ROI Calculator</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
