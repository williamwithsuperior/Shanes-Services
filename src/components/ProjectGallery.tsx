'use client';

import { useState } from 'react';
import { Camera, ArrowUpRight, Filter } from 'lucide-react';
import Image from 'next/image';

const CATEGORIES = ['All', 'Roofing', 'Siding', 'Windows', 'Gutters'];

const PROJECTS = [
  {
    id: 1,
    title: 'Modern Siding Upgrade',
    category: 'Siding',
    location: 'Indian Hill, OH',
    image: '/projects/siding-1.jpg',
  },
  {
    id: 2,
    title: 'Lifetime Roof Installation',
    category: 'Roofing',
    location: 'Mason, OH',
    image: '/projects/roof-1.jpg',
  },
  {
    id: 3,
    title: 'Energy-Star Window Suite',
    category: 'Windows',
    location: 'Anderson Township, OH',
    image: '/projects/windows-1.jpg',
  },
  {
    id: 4,
    title: 'Seamless Gutter System',
    category: 'Gutters',
    location: 'Cincinnati, OH',
    image: '/projects/gutters-1.jpg',
  },
  {
    id: 5,
    title: 'Contemporary Siding',
    category: 'Siding',
    location: 'Loveland, OH',
    image: '/projects/siding-2.jpg',
  },
  {
    id: 6,
    title: 'Charcoal Shingle Roof',
    category: 'Roofing',
    location: 'Kenwood, OH',
    image: '/projects/roof-2.jpg',
  },
  {
    id: 7,
    title: 'Custom Window Suite',
    category: 'Windows',
    location: 'Blue Ash, OH',
    image: '/projects/windows-2.jpg',
  },
  {
    id: 8,
    title: 'Impact Gutter Guard',
    category: 'Gutters',
    location: 'Montgomery, OH',
    image: '/projects/gutters-2.jpg',
  },
];

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-brand-emerald font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Recent Transformations.</h3>
            <p className="text-lg text-slate-600">
              Explore our latest exterior projects across the Greater Cincinnati area. Each transformation is built for maximum equity and lifetime protection.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeCategory === cat
                  ? 'bg-brand-navy text-white shadow-xl'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-white mb-1">{project.title}</h4>
                <p className="text-slate-300 text-sm font-medium">{project.location}</p>
              </div>

              {/* Icon Top Right */}
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 p-2 pl-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-500">Were always looking for our next project!</p>
            <a 
              href="#calculator"
              className="bg-brand-emerald text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all"
            >
              Book a quote now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
