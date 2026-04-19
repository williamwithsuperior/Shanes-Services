'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function LeadCapture({ 
  projectCost, 
  addedValue, 
  service,
  propertyData 
}: { 
  projectCost: number; 
  addedValue: number; 
  service: string;
  propertyData: any;
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const leadData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      preferredStartDate: formData.get('startDate'),
      serviceInterested: service,
      estimatedCost: projectCost,
      estimatedROI: addedValue,
      propertySpecs: propertyData,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('idle');
      alert('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-card bg-emerald-50 border-emerald-200 text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-brand-navy mb-2">You're All Set!</h4>
        <p className="text-emerald-800 text-sm">
          Your guaranteed quote request for {service} has been received. One of our experts will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card border-t-4 border-t-emerald-500 shadow-xl bg-white">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-extrabold text-brand-navy mb-1">Get My Guaranteed Quote</h3>
        <p className="text-sm text-slate-500">Lock in 2026 rates for your {service} project today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Full Name</label>
          <input required name="name" type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" placeholder="Jane Doe" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Phone</label>
            <input required name="phone" type="tel" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" placeholder="(513) 702-3990" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Email</label>
            <input required name="email" type="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white placeholder:text-slate-400" placeholder="jane@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Preferred Start Date</label>
          <select required name="startDate" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900">
            <option value="">Select a timeframe...</option>
            <option value="ASAP">As soon as possible</option>
            <option value="1_month">Within 1 month</option>
            <option value="3_months">Within 3 months</option>
            <option value="just_researching">Just researching</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2 group mt-2"
        >
          {status === 'submitting' ? 'Submitting...' : 'Claim My Quote'}
          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-[10px] text-center text-slate-400 mt-3">
          By submitting, you agree to receive communications from Superior Products-Exteriors.
        </p>
      </form>
    </div>
  );
}
