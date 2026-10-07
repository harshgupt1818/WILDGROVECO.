import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Flame, Leaf, Clock, Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export default function Hero({ onOpenBuildYourOwn, onQuickAdd, onScrollToSection, onSelectItem }) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [addedItemAnimation, setAddedItemAnimation] = useState(false);

  const heroBowls = [
    MENU_ITEMS.find(item => item.id === 'mediterranean-chickpea-salad') || MENU_ITEMS[0],
    MENU_ITEMS.find(item => item.id === 'miso-salmon-bowl') || MENU_ITEMS[1],
    MENU_ITEMS.find(item => item.id === 'quinoa-power-greens') || MENU_ITEMS[2],
  ];

  const currentBowl = heroBowls[selectedHeroIndex];

  const handleHeroAdd = (bowl) => {
    onQuickAdd(bowl);
    setAddedItemAnimation(true);
    setTimeout(() => setAddedItemAnimation(false), 1500);
  };

  return (
    <section 
      id="home-hero" 
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-harvest-dark"
    >
      {/* High-quality, mouth-watering background image of fresh, colorful salads */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2400&q=85"
          alt="Fresh, colorful organic salad bowl with wholesome ingredients"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-glow"
        />
        {/* Vibrant cinematic scrim overlay for contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-harvest-dark/95 via-harvest-dark/85 to-harvest-dark/60 lg:to-harvest-dark/45"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-harvest-dark/80"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Headline, Subtitle, and Primary Button */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm text-harvest-sprout text-xs sm:text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-300">100% Regenerative Organic Produce</span>
              <span className="text-white/40">•</span>
              <span className="text-harvest-ochre font-medium">0% Seed Oils</span>
            </div>

            {/* Bold, Catchy Headline requested by user */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] mb-6">
              Fresh, Wholesome Meals <br />
              <span className="italic font-normal text-emerald-300">for Your Busy Day</span>
            </h1>

            {/* Engaging Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-harvest-sprout/90 max-w-2xl font-normal leading-relaxed mb-8">
              Chef-crafted organic salads, warm heirloom grain bowls, and cold-pressed dressings made from local regenerative family farms. Delivered crisp to your desk or doorstep in 25 minutes.
            </p>

            {/* Action Buttons: Primary "Explore Menu" Button requested */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              
              {/* Primary Button */}
              <button
                onClick={() => onScrollToSection('menu-section')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-harvest-terracotta text-white font-bold text-base shadow-soft hover:bg-harvest-terracottaHover hover:shadow-float transition-all duration-300 group transform hover:-translate-y-0.5"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={onOpenBuildYourOwn}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold text-base shadow-sm hover:bg-white/25 hover:border-white/50 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-harvest-ochre" />
                <span>Build Custom Bowl</span>
              </button>
            </div>

            {/* Trust Badges & Metrics Row */}
            <div className="pt-6 border-t border-white/15 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-white">
              
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-harvest-dark">EK</div>
                  <div className="w-7 h-7 rounded-full bg-harvest-terracotta text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-harvest-dark">MC</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-harvest-dark">SL</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 text-harvest-ochre">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-white mt-0.5">
                    4.9/5 <span className="font-normal text-harvest-sprout/70">(18,400+ meals)</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur text-emerald-400 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">100% Seed-Oil Free</span>
                  <span className="text-[11px] text-harvest-sprout/70">Pure EVOO & Avocado</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur text-harvest-terracotta flex items-center justify-center border border-white/10">
                  <Clock className="w-4 h-4 text-harvest-ochre" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">25 Min Delivery</span>
                  <span className="text-[11px] text-harvest-sprout/70">Zero-emission bikes</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Hero Column: Interactive Featured Bowl Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Bowl Switcher Tabs */}
            <div className="flex items-center justify-center gap-1.5 p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm mb-4 max-w-md mx-auto">
              {heroBowls.map((bowl, index) => (
                <button
                  key={bowl.id}
                  onClick={() => setSelectedHeroIndex(index)}
                  className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-center truncate ${
                    selectedHeroIndex === index
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {bowl.id === 'mediterranean-chickpea-salad' ? 'Chickpea Med' : bowl.id === 'miso-salmon-bowl' ? 'Warm Salmon' : 'Quinoa Power'}
                </button>
              ))}
            </div>

            {/* Featured Dish Platter Card */}
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl overflow-hidden group">
              
              {/* Category Badge on Image */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-harvest-forest border border-harvest-border/50 shadow-sm flex items-center gap-1.5">
                  {currentBowl.category === 'bowls' ? (
                    <>
                      <Flame className="w-3.5 h-3.5 text-harvest-terracotta fill-harvest-terracotta" />
                      <span>Warm Grain Bowl</span>
                    </>
                  ) : (
                    <>
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Vibrant Salad</span>
                    </>
                  )}
                </span>
                {currentBowl.seasonal && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-harvest-ochre text-white shadow-sm">
                    Today's Harvest
                  </span>
                )}
              </div>

              {/* Main Image with Zoom on Hover */}
              <div 
                className="relative h-64 sm:h-72 w-full overflow-hidden bg-harvest-creamMuted cursor-pointer"
                onClick={() => onSelectItem(currentBowl)}
              >
                <img
                  src={currentBowl.image}
                  alt={currentBowl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Farm Origin Ribbon */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    🌱 {currentBowl.farm}
                  </span>
                  <span className="bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full font-bold text-emerald-300 border border-emerald-400/20">
                    {currentBowl.protein}g Clean Protein
                  </span>
                </div>
              </div>

              {/* Card Details & Quick Add */}
              <div className="p-5 sm:p-6 text-harvest-dark">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 
                      onClick={() => onSelectItem(currentBowl)}
                      className="text-xl sm:text-2xl font-bold text-harvest-dark font-display hover:text-harvest-forest cursor-pointer transition-colors leading-tight"
                    >
                      {currentBowl.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-harvest-earth/70 mt-1 line-clamp-2">
                      {currentBowl.tagline}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end shrink-0">
                    <span className="text-2xl font-black text-harvest-dark font-display">
                      ${currentBowl.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-harvest-sage font-medium">
                      {currentBowl.calories} kcal
                    </span>
                  </div>
                </div>

                {/* Ingredients Tags */}
                <div className="flex flex-wrap gap-1.5 my-3.5">
                  {currentBowl.ingredients.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-harvest-sprout text-harvest-moss border border-harvest-sageLight/50"
                    >
                      {ing}
                    </span>
                  ))}
                  {currentBowl.ingredients.length > 4 && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-harvest-cream text-harvest-clay">
                      +{currentBowl.ingredients.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-3 pt-3 border-t border-harvest-border/50">
                  <button
                    onClick={() => handleHeroAdd(currentBowl)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                      addedItemAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-harvest-forest text-white hover:bg-harvest-forestHover'
                    }`}
                  >
                    {addedItemAnimation ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Quick Add • ${currentBowl.price.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => onSelectItem(currentBowl)}
                    className="py-3 px-4 rounded-xl font-semibold text-xs text-harvest-forest bg-harvest-sprout hover:bg-harvest-sageLight/40 transition-colors"
                  >
                    Customize
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
