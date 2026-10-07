import React, { useState } from 'react';
import { MapPin, Sprout, ArrowUpRight, CheckCircle2, Award, Heart } from 'lucide-react';
import { FARMS } from '../data/menuData';

export default function FarmMap() {
  const [activeFarmIndex, setActiveFarmIndex] = useState(0);
  const activeFarm = FARMS[activeFarmIndex];

  return (
    <section id="farms-section" className="py-20 bg-harvest-cream/40 border-b border-harvest-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Sprout className="w-3.5 h-3.5 text-harvest-leaf" />
            <span>Dirt-First Traceability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-harvest-dark tracking-tight">
            Meet the Regenerative Farmers Behind Every Bowl
          </h2>
          <p className="text-sm sm:text-base text-harvest-earth/70 mt-3">
            We believe you should know the exact soil where your greens and grains were grown. Every ingredient is sourced within 150 miles of our prep kitchens.
          </p>
        </div>

        {/* Farm Interactive Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Farm Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {FARMS.map((farm, index) => (
              <div
                key={farm.name}
                onClick={() => setActiveFarmIndex(index)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  activeFarmIndex === index
                    ? 'bg-white border-harvest-forest shadow-soft ring-1 ring-harvest-forest/20'
                    : 'bg-white/60 hover:bg-white border-harvest-border/70 hover:border-harvest-sage'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeFarmIndex === index
                    ? 'bg-harvest-forest text-white'
                    : 'bg-harvest-sprout text-harvest-forest'
                }`}>
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold font-display text-harvest-dark">
                      {farm.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-harvest-sprout text-harvest-forest">
                      {farm.badge}
                    </span>
                  </div>
                  <div className="text-xs text-harvest-sage flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-harvest-terracotta shrink-0" />
                    <span>{farm.location}</span>
                  </div>
                  <div className="text-xs text-harvest-earth/80 mt-2 font-medium">
                    <strong>Grown for us:</strong> {farm.items.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Farm Spotlight Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-harvest-border shadow-float">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={activeFarm.image}
                  alt={activeFarm.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white text-harvest-forest mb-2 shadow-sm">
                    {activeFarm.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display">
                    {activeFarm.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-harvest-sprout/90 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-300" />
                    <span>{activeFarm.location}</span>
                  </div>
                </div>
              </div>

              {/* Spotlight Details */}
              <div className="p-6 sm:p-8 bg-white grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-harvest-sage mb-2">
                    Harvest Schedule
                  </h4>
                  <div className="text-sm font-semibold text-harvest-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-leaf" />
                    <span>{activeFarm.harvest}</span>
                  </div>
                  <p className="text-xs text-harvest-earth/70 mt-1.5 leading-relaxed">
                    Soil tested every quarter for microbial density and zero synthetic pesticide residue.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-harvest-sage mb-2">
                    Signature Crops
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFarm.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-harvest-sprout text-harvest-forest font-medium border border-harvest-sageLight/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Transparency Stat Callouts */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-harvest-forest text-harvest-sprout border border-harvest-moss">
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-extrabold font-display text-white">150 Mi</div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">Max Sourcing Radius</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-extrabold font-display text-white">0%</div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">Industrial Seed Oils</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-extrabold font-display text-white">100%</div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">Plastic-Free Sugarcane Bowls</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-4xl font-extrabold font-display text-white">24 Min</div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">Avg Cargo Courier Dropoff</div>
          </div>
        </div>

      </div>
    </section>
  );
}
