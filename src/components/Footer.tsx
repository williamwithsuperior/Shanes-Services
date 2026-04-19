'use client';

import { CheckCircle2, MessageCircle, Share2, Camera, Users, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="bg-brand-emerald p-2 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight leading-none uppercase">SHANE&apos;S</h2>
                <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-[0.2em]">Exterior Services</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Proudly serving Cincinnati to Dayton homeowners with premium exterior solutions and industry-leading warranties.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-brand-emerald transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-brand-emerald">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link href="#services" className="hover:text-white transition-colors">Residential Services</Link></li>
              <li><Link href="#calculator" className="hover:text-white transition-colors">Equity Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-brand-emerald">Service Areas</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>Cincinnati, OH</li>
              <li>Dayton, OH</li>
              <li>Mason, OH</li>
              <li>West Chester, OH</li>
              <li>Hamilton, OH</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-brand-emerald">Contact Us</h4>
            <ul className="space-y-6 text-sm text-slate-300">
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-emerald shrink-0" />
                <a href="tel:5137023990" className="hover:text-white transition-colors">(513) 702-3990</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Shane&apos;s Exterior Services. All Rights Reserved. Fully Licensed & Insured in Ohio.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <span>Fully Licensed & Insured in Ohio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
