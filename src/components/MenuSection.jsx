import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  Leaf, 
  Search, 
  Plus, 
  Check, 
  Heart, 
  Activity,
  Info
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export default function MenuSection({ onSelectItem, onQuickAdd }) {
  const [activeCategory, setActiveCategory] = useState('Veg Salads');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});
  const [justAddedId, setJustAddedId] = useState(null);

  // Exact 5 interactive filter buttons requested by user:
  // 'All', 'Veg Salads', 'Non-Veg Salads', 'Veg Bowls', and 'Non-Veg Bowls'
  const filterButtons = [
    { label: 'All', value: 'All', icon: Sparkles, count: MENU_ITEMS.length },
    { label: 'Veg Salads', value: 'Veg Salads', icon: Leaf, count: MENU_ITEMS.filter(i => i.menuType === 'veg-salad').length },
    { label: 'Non-Veg Salads', value: 'Non-Veg Salads', icon: Leaf, count: MENU_ITEMS.filter(i => i.menuType === 'non-veg-salad').length },
    { label: 'Veg Bowls', value: 'Veg Bowls', icon: Flame, count: MENU_ITEMS.filter(i => i.menuType === 'veg-bowl').length },
    { label: 'Non-Veg Bowls', value: 'Non-Veg Bowls', icon: Flame, count: MENU_ITEMS.filter(i => i.menuType === 'non-veg-bowl').length },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter matching
      if (activeCategory === 'Veg Salads' && item.menuType !== 'veg-salad') return false;
      if (activeCategory === 'Non-Veg Salads' && item.menuType !== 'non-veg-salad') return false;
      if (activeCategory === 'Veg Bowls' && item.menuType !== 'veg-bowl') return false;
      if (activeCategory === 'Non-Veg Bowls' && item.menuType !== 'non-veg-bowl') return false;

      // Search query filtering
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIng = item.ingredients?.some(ing => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    onQuickAdd(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1400);
  };

  return (
    <section id="menu-section" className="py-20 lg:py-24 bg-harvest-cream/50 scroll-mt-20 border-b border-harvest-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf className="w-3.5 h-3.5 text-harvest-leaf" />
              <span>Chef-Crafted Daily Menu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-harvest-dark tracking-tight">
              Fresh Salads & Warm Bowls
            </h2>
            <p className="text-sm sm:text-base text-harvest-earth/70 mt-2 max-w-xl">
              Clean desk lunches made with regenerative greens, ancient grains, and house-made scratch dressings with 0% seed oils.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-harvest-sage absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chickpeas, feta, kale..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-harvest-border focus:outline-none focus:ring-2 focus:ring-harvest-forest text-xs sm:text-sm text-harvest-dark placeholder-harvest-sage/70 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-harvest-sage hover:text-harvest-dark"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 5 Interactive Category Filter Buttons at the Top */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterButtons.map((btn) => {
            const isActive = activeCategory === btn.value;
            const Icon = btn.icon;
            return (
              <button
                key={btn.value}
                onClick={() => setActiveCategory(btn.value)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shadow-xs ${
                  isActive
                    ? 'bg-harvest-forest text-white shadow-soft scale-102 ring-2 ring-harvest-forest/20'
                    : 'bg-white text-harvest-earth/80 hover:bg-harvest-sprout/60 hover:text-harvest-forest border border-harvest-border/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-harvest-sage'}`} />
                <span>{btn.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-harvest-cream text-harvest-sage'
                }`}>
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        {activeCategory === 'Veg Salads' && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-center justify-between text-xs sm:text-sm text-harvest-forest shadow-xs">
            <span className="font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Showing all <strong>4 Signature Veg Salads</strong> packed with plant-powered nutrition and active vitamins.
            </span>
            <span className="text-xs text-harvest-sage font-medium hidden sm:inline">
              100% Seed-Oil Free • Cold-Pressed Dressings
            </span>
          </div>
        )}

        {activeCategory === 'Non-Veg Salads' && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-center justify-between text-xs sm:text-sm text-harvest-dark shadow-xs">
            <span className="font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-harvest-terracotta"></span>
              Showing all <strong>4 Signature Non-Veg Salads</strong> packed with clean pastured proteins and essential Vitamins B12 & D.
            </span>
            <span className="text-xs text-harvest-sage font-medium hidden sm:inline">
              Pasture-Raised Poultry & Wild-Caught Seafood
            </span>
          </div>
        )}

        {activeCategory === 'Veg Bowls' && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-center justify-between text-xs sm:text-sm text-harvest-dark shadow-xs">
            <span className="font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Showing all <strong>4 Signature Veg Bowls</strong> packed with warm ancient grains, plant proteins, and Vitamins Iron & C.
            </span>
            <span className="text-xs text-harvest-sage font-medium hidden sm:inline">
              Dual-Chamber Thermal Insulation • 100% Seed-Oil Free
            </span>
          </div>
        )}

        {activeCategory === 'Non-Veg Bowls' && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-center justify-between text-xs sm:text-sm text-harvest-dark shadow-xs">
            <span className="font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-harvest-terracotta"></span>
              Showing all <strong>4 Signature Non-Veg Bowls</strong> packed with clean proteins, ancient grains, and Vitamins Omega-3 & B.
            </span>
            <span className="text-xs text-harvest-sage font-medium hidden sm:inline">
              Wild-Caught Seafood & Pastured Poultry
            </span>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-harvest-border/60">
            <Leaf className="w-12 h-12 text-harvest-sage mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold font-display text-harvest-dark">No dishes in this category</h3>
            <p className="text-sm text-harvest-sage mt-1">Try selecting another filter or clearing your search.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2.5 rounded-full bg-harvest-forest text-white text-xs font-bold"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Responsive Grid Layout to Display Food Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {filteredItems.map(item => {
            const isJustAdded = justAddedId === item.id;
            const isFav = !!favorites[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group relative bg-white rounded-3xl border border-harvest-border/90 overflow-hidden shadow-soft hover:shadow-float hover:border-harvest-forest/40 transition-all duration-300 flex flex-col sm:flex-row justify-between cursor-pointer"
              >
                
                {/* Left: Appetizing Image Container */}
                <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden bg-harvest-creamMuted shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 via-transparent to-transparent opacity-60"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-xs flex items-center gap-1.5 ${
                      item.isVeg 
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/30' 
                        : 'bg-stone-900/90 text-amber-300 border border-amber-400/30'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-harvest-terracotta'}`}></span>
                      <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur text-harvest-dark border border-harvest-border/40 shadow-xs flex items-center gap-1">
                      {item.category === 'bowls' ? (
                        <>
                          <Flame className="w-3 h-3 text-harvest-terracotta fill-harvest-terracotta" />
                          <span>Warm Bowl</span>
                        </>
                      ) : (
                        <>
                          <Leaf className="w-3 h-3 text-emerald-600" />
                          <span>Salad</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-harvest-earth hover:text-harvest-terracotta flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-harvest-terracotta text-harvest-terracotta' : ''}`} />
                  </button>

                  {/* Bottom Image Calorie Pill */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] text-white">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md font-semibold">
                      {item.calories} kcal
                    </span>
                  </div>
                </div>

                {/* Right: Details, Ingredients Description & Highly Visible Nutritional Tag */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    
                    {/* Header Row: Title & Price */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display text-harvest-dark group-hover:text-harvest-forest transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-black font-display text-harvest-dark shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Brief Description of the Ingredients */}
                    <p className="text-xs sm:text-sm text-harvest-earth/80 leading-relaxed mt-1">
                      {item.description}
                    </p>

                    {/* Key Ingredients Pill List */}
                    {item.ingredients && (
                      <div className="flex flex-wrap gap-1.5 my-3">
                        {item.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-harvest-sprout text-harvest-forest border border-harvest-sageLight/60"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* HIGHLY VISIBLE NUTRITIONAL TAG SECTION (Requested by User) */}
                    {/* Specifically displays: 'Carbs: Xg | Protein: Xg | Vitamins: A, C, K' */}
                    <div className="my-3.5 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-emerald-950 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs sm:text-[13px] font-bold tracking-tight text-emerald-950">
                          Carbs: <strong className="text-harvest-dark font-extrabold">{item.carbs}g</strong> | Protein: <strong className="text-harvest-dark font-extrabold">{item.protein}g</strong> | Vitamins: <strong className="text-emerald-800 font-extrabold">{item.vitamins || 'A, C, K'}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Dressing & Sourcing details */}
                    <div className="text-[11px] text-harvest-sage font-medium flex items-center gap-1.5">
                      <span>🌱 Dressing:</span>
                      <span className="text-harvest-earth font-semibold">{item.dressing}</span>
                    </div>

                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 mt-4 border-t border-harvest-border/60 flex items-center justify-between gap-3">
                    <span className="text-xs text-harvest-sage font-medium">
                      Chopped fresh to order
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className={`h-9 px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-harvest-forest text-white hover:bg-harvest-forestHover hover:scale-[1.02]'
                        }`}
                        title="Add directly to cart"
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectItem(item)}
                        className="h-9 w-9 rounded-full bg-harvest-cream text-harvest-forest hover:bg-harvest-sand/50 flex items-center justify-center transition-colors text-xs font-semibold"
                        title="Customize ingredients & dressings"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* HIGHLY VISIBLE 'ORDER NOW' CONVERSION SECTION (Requested by User) */}
        <div id="order-now" className="mt-16 sm:mt-20 scroll-mt-24">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-harvest-dark via-harvest-forest to-harvest-dark text-white p-8 sm:p-12 lg:p-16 border border-harvest-moss shadow-float text-center">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FC8019]/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E23744]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              
              {/* Conversion Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Instant Desk & Home Delivery</span>
                <span className="text-white/40">•</span>
                <span className="text-harvest-ochre font-medium">Avg 24 Mins</span>
              </div>

              {/* Catchy Subheading Requested by User */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight mb-4 leading-tight">
                Craving a healthy meal? <br className="hidden sm:inline" />
                <span className="text-emerald-300 italic font-normal">Get it delivered fresh and fast.</span>
              </h3>

              <p className="text-sm sm:text-base text-harvest-sprout/80 max-w-xl mx-auto mb-10 leading-relaxed">
                Skip the lines and fuel your workday. Order our chef-crafted salads and warm grain bowls directly through your favorite delivery platform.
              </p>

              {/* Two Large Clickable Buttons Side-by-Side */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 w-full max-w-xl">
                
                {/* 1. SWIGGY BUTTON (Orange themed: #FC8019) */}
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-center justify-center gap-3.5 px-8 py-5 rounded-2xl bg-[#FC8019] hover:bg-[#e47313] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-[#FC8019]/40 hover:scale-102 transition-all duration-300 active:scale-98"
                >
                  {/* Swiggy Stylized Icon / Delivery Bag */}
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07A4.002 4.002 0 0 1 8 13h2a2 2 0 1 0 4 0c0-1.1-.9-2-2-2-2.21 0-4-1.79-4-4 0-1.85 1.28-3.41 3-3.86V3h2v1.14A4.002 4.002 0 0 1 16 8h-2a2 2 0 1 0-4 0c0 1.1.9 2 2 2 2.21 0 4 1.79 4 4 0 1.85-1.28 3.41-3 3.93z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-medium tracking-wider uppercase opacity-90 leading-none">Deliver via</span>
                    <span className="text-lg sm:text-xl font-extrabold font-display leading-tight">Order on Swiggy</span>
                  </div>
                </a>

                {/* 2. ZOMATO BUTTON (Red themed: #E23744) */}
                <a
                  href="https://www.zomato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-center justify-center gap-3.5 px-8 py-5 rounded-2xl bg-[#E23744] hover:bg-[#c92834] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-[#E23744]/40 hover:scale-102 transition-all duration-300 active:scale-98"
                >
                  {/* Zomato Stylized Fork/Heart Icon */}
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-medium tracking-wider uppercase opacity-90 leading-none">Deliver via</span>
                    <span className="text-lg sm:text-xl font-extrabold font-display leading-tight">Order on Zomato</span>
                  </div>
                </a>

              </div>

              {/* Delivery Assurance Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-harvest-sprout/70">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> 100% Spill-Proof Dual-Chamber Bowls
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> 0% Industrial Seed Oils
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Live Courier Tracking
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
