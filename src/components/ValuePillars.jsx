import React from 'react';
import { Sprout, ShieldCheck, ThermometerSun, Bike, Sparkles, Award } from 'lucide-react';

export default function ValuePillars() {
  const pillars = [
    {
      icon: Sprout,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: '150-Mile Farm Radius',
      tagline: 'Harvested at dawn, chopped by noon',
      description: 'We source greens, heritage grains, and root vegetables exclusively from 14 organic family farms within 150 miles of our kitchens.'
    },
    {
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      title: '0% Seed Oils. Period.',
      tagline: 'Pure EVOO & California avocado oil',
      description: 'You will never find canola, soy, or sunflower oils here. Every scratch dressing is blended daily with cold-pressed unrefined oils.'
    },
    {
      icon: ThermometerSun,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      title: 'Dual-Chamber Thermal Bowls',
      tagline: 'Warm grains hot, tender greens crisp',
      description: 'Our proprietary compostable sugarcane bowls isolate hot roasted grains from chilled delicate greens until you toss and enjoy.'
    },
    {
      icon: Bike,
      color: 'bg-stone-100 text-stone-800 border-stone-200',
      title: 'Zero-Emission Speed',
      tagline: 'Average delivery in 24 minutes',
      description: 'Dedicated electric cargo couriers navigate congested city blocks to deliver your meal faster and with zero carbon footprint.'
    }
  ];

  return (
    <section id="standards-section" className="py-16 bg-white border-y border-harvest-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-harvest-ochre" />
            <span>The Wildgrove Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-harvest-dark tracking-tight">
            How Fast Casual Should Have Always Been
          </h2>
          <p className="text-sm sm:text-base text-harvest-earth/70 mt-3">
            No corner-cutting, no industrial preservatives, and no soggy greens. Just uncompromising nutrition delivered with culinary artistry.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="relative rounded-2xl p-6 bg-harvest-cream/50 border border-harvest-border/70 hover:border-harvest-forest/40 hover:bg-white hover:shadow-soft transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 group-hover:scale-110 transition-transform duration-300 ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-harvest-dark mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-harvest-terracotta mb-3">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-harvest-earth/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-harvest-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-harvest-sage">
                  <Award className="w-3.5 h-3.5 text-harvest-leaf" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
