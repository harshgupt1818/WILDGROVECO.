import React, { useState } from 'react';
import { Sparkles, Check, Plus, Minus, ArrowRight, RotateCcw, Flame, Leaf, Award } from 'lucide-react';
import { BUILD_YOUR_OWN_OPTIONS } from '../data/menuData';

export default function BuildYourOwn({ onAddToCart, isOpen, onClose }) {
  const [selectedBases, setSelectedBases] = useState(['b1']); // default Kale
  const [selectedWarm, setSelectedWarm] = useState(['w1']); // default Delicata squash
  const [selectedProtein, setSelectedProtein] = useState('p1'); // default Pasture Chicken
  const [selectedToppings, setSelectedToppings] = useState(['c1']); // default Avocado
  const [selectedDressing, setSelectedDressing] = useState('d1'); // default Maple Cider
  const [bowlName, setBowlName] = useState('My Signature Wildgrove Bowl');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const BASE_PRICE = 13.50;

  // Toggle helpers
  const toggleBase = (id) => {
    if (selectedBases.includes(id)) {
      if (selectedBases.length > 1) {
        setSelectedBases(selectedBases.filter(b => b !== id));
      }
    } else {
      if (selectedBases.length < 2) {
        setSelectedBases([...selectedBases, id]);
      } else {
        setSelectedBases([selectedBases[1], id]);
      }
    }
  };

  const toggleWarm = (id) => {
    if (selectedWarm.includes(id)) {
      setSelectedWarm(selectedWarm.filter(w => w !== id));
    } else {
      setSelectedWarm([...selectedWarm, id]);
    }
  };

  const toggleTopping = (id) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter(t => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  // Calculations
  const chosenBases = BUILD_YOUR_OWN_OPTIONS.bases.filter(b => selectedBases.includes(b.id));
  const chosenWarm = BUILD_YOUR_OWN_OPTIONS.warmToppings.filter(w => selectedWarm.includes(w.id));
  const chosenProtein = BUILD_YOUR_OWN_OPTIONS.proteins.find(p => p.id === selectedProtein);
  const chosenToppings = BUILD_YOUR_OWN_OPTIONS.crunchAndCheese.filter(t => selectedToppings.includes(t.id));
  const chosenDressing = BUILD_YOUR_OWN_OPTIONS.dressings.find(d => d.id === selectedDressing);

  const warmPrice = chosenWarm.reduce((sum, w) => sum + w.price, 0);
  const proteinPrice = chosenProtein ? chosenProtein.price : 0;
  const toppingPrice = chosenToppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = BASE_PRICE + warmPrice + (proteinPrice > 4.5 ? proteinPrice - 4.5 : 0) + toppingPrice;

  const totalCalories = 
    chosenBases.reduce((s, b) => s + b.cal, 0) +
    chosenWarm.reduce((s, w) => s + w.cal, 0) +
    (chosenProtein ? chosenProtein.cal : 0) +
    chosenToppings.reduce((s, t) => s + t.cal, 0) +
    (chosenDressing ? chosenDressing.cal : 0);

  const totalProtein = 
    (chosenProtein ? chosenProtein.protein : 0) +
    (chosenBases.some(b => b.type === 'grains') ? 7 : 3);

  const handleCreateBowl = () => {
    const customBowlItem = {
      id: `custom-${Date.now()}`,
      cartItemId: `custom-bowl-${Date.now()}`,
      name: bowlName.trim() || 'Custom Wildgrove Bowl',
      category: 'bowls',
      tagline: `${chosenProtein?.name || 'Plant'} with ${chosenBases.map(b => b.name).join(' & ')}`,
      description: `Custom bowl with ${chosenBases.map(b => b.name).join(', ')}, roasted ${chosenWarm.map(w => w.name).join(', ')}, ${chosenProtein?.name}, ${chosenToppings.map(t => t.name).join(', ')}, tossed in ${chosenDressing?.name}.`,
      price: totalPrice,
      calories: totalCalories,
      protein: totalProtein,
      image: chosenBases.some(b => b.type === 'grains')
        ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      isCustom: true,
      quantity: 1,
      farm: 'Custom Farm Selection'
    };

    onAddToCart(customBowlItem);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      if (onClose) onClose();
    }, 1200);
  };

  const resetSelections = () => {
    setSelectedBases(['b1']);
    setSelectedWarm(['w1']);
    setSelectedProtein('p1');
    setSelectedToppings(['c1']);
    setSelectedDressing('d1');
  };

  return (
    <section id="byo-section" className="py-20 bg-white border-b border-harvest-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-ochreLight border border-harvest-ochre/30 text-harvest-dark text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-harvest-ochre" />
            <span>The Wildgrove Kitchen Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-harvest-dark tracking-tight">
            Build Your Own Signature Bowl
          </h2>
          <p className="text-sm sm:text-base text-harvest-earth/70 mt-3">
            Pair regenerative greens with warm steaming heirloom grains, slow-roasted vegetables, and chef-made dressings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ingredient Steps */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Step 1: Bases */}
            <div className="bg-harvest-cream/50 rounded-3xl p-6 sm:p-7 border border-harvest-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-harvest-forest text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-harvest-dark">
                    Select Up to 2 Bases (Greens & Warm Grains)
                  </h3>
                </div>
                <span className="text-xs font-medium text-harvest-sage">
                  {selectedBases.length}/2 selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_YOUR_OWN_OPTIONS.bases.map(base => {
                  const isChecked = selectedBases.includes(base.id);
                  return (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => toggleBase(base.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        isChecked
                          ? 'bg-harvest-forest text-white border-harvest-forest shadow-sm'
                          : 'bg-white text-harvest-earth hover:border-harvest-forest/40 border-harvest-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <span className="text-xs sm:text-sm font-bold leading-snug">{base.name}</span>
                        {isChecked && <Check className="w-4 h-4 shrink-0 text-emerald-300" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-80 pt-1 border-t border-current/20">
                        <span>{base.type === 'grains' ? '🔥 Warm Grains' : '🥗 Crisp Green'}</span>
                        <span>{base.cal} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Warm Roasted Veggies */}
            <div className="bg-harvest-cream/50 rounded-3xl p-6 sm:p-7 border border-harvest-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-harvest-forest text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-harvest-dark">
                    Warm Roasted Roots & Vegetables
                  </h3>
                </div>
                <span className="text-xs text-harvest-terracotta font-semibold">Slow-roasted in olive oil</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_YOUR_OWN_OPTIONS.warmToppings.map(item => {
                  const isChecked = selectedWarm.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleWarm(item.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'bg-harvest-terracotta text-white border-harvest-terracotta shadow-sm'
                          : 'bg-white text-harvest-earth hover:border-harvest-terracotta/40 border-harvest-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-semibold">{item.name}</span>
                        {isChecked && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-80">
                        <span>+{item.price > 0 ? `$${item.price.toFixed(2)}` : 'Included'}</span>
                        <span>{item.cal} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Protein */}
            <div className="bg-harvest-cream/50 rounded-3xl p-6 sm:p-7 border border-harvest-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-harvest-forest text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-harvest-dark">
                    Clean Protein (Pick 1 Primary)
                  </h3>
                </div>
                <span className="text-xs font-medium text-harvest-forest">Pasture-raised & Wild-caught</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_YOUR_OWN_OPTIONS.proteins.map(protein => {
                  const isChecked = selectedProtein === protein.id;
                  return (
                    <button
                      key={protein.id}
                      type="button"
                      onClick={() => setSelectedProtein(protein.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'bg-harvest-dark text-white border-harvest-dark shadow-sm'
                          : 'bg-white text-harvest-earth hover:border-harvest-forest/40 border-harvest-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs sm:text-sm font-bold">{protein.name}</span>
                        {isChecked && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-80">
                        <span className="font-semibold text-emerald-400">+{protein.protein}g protein</span>
                        <span>{protein.cal} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Crunch & Cheese */}
            <div className="bg-harvest-cream/50 rounded-3xl p-6 sm:p-7 border border-harvest-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-harvest-forest text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-harvest-dark">
                    Crunch, Cheeses & Avocado
                  </h3>
                </div>
                <span className="text-xs font-medium text-harvest-sage">Select any</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_YOUR_OWN_OPTIONS.crunchAndCheese.map(item => {
                  const isChecked = selectedToppings.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleTopping(item.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'bg-harvest-sprout border-harvest-leaf text-harvest-forest font-semibold'
                          : 'bg-white text-harvest-earth hover:border-harvest-sage border-harvest-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm">{item.name}</span>
                        {isChecked && <Check className="w-4 h-4 text-harvest-leaf" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-harvest-sage">
                        <span>+${item.price.toFixed(2)}</span>
                        <span>{item.cal} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Scratch Dressing */}
            <div className="bg-harvest-cream/50 rounded-3xl p-6 sm:p-7 border border-harvest-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-harvest-forest text-white text-xs font-bold flex items-center justify-center">5</span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-harvest-dark">
                    Scratch Dressing (100% Seed-Oil Free)
                  </h3>
                </div>
                <span className="text-xs text-harvest-clay font-medium">Extra Virgin Olive Oil base</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_YOUR_OWN_OPTIONS.dressings.map(d => {
                  const isChecked = selectedDressing === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDressing(d.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'bg-harvest-forest text-white border-harvest-forest shadow-sm'
                          : 'bg-white text-harvest-earth hover:border-harvest-forest/40 border-harvest-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-semibold">{d.name}</span>
                        {isChecked && <Check className="w-4 h-4 text-emerald-300" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-80">
                        <span>{d.oil}</span>
                        <span>{d.cal} kcal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Add to Cart */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-harvest-border/90 shadow-float">
              
              <div className="flex items-center justify-between pb-4 border-b border-harvest-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-harvest-sprout text-harvest-forest flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-harvest-dark">Your Custom Bowl</h4>
                    <span className="text-[11px] text-harvest-sage">Freshly assembled to order</span>
                  </div>
                </div>
                <button
                  onClick={resetSelections}
                  className="text-xs text-harvest-terracotta hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Bowl Name Input */}
              <div className="my-4">
                <label className="text-[11px] uppercase font-bold text-harvest-sage block mb-1">
                  Name Your Creation
                </label>
                <input
                  type="text"
                  value={bowlName}
                  onChange={(e) => setBowlName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-harvest-border text-xs sm:text-sm font-bold text-harvest-dark bg-harvest-cream/40 focus:outline-none focus:ring-2 focus:ring-harvest-forest"
                  placeholder="e.g. Elena's Power Fuel Bowl"
                />
              </div>

              {/* Macro & Calorie Badges */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-harvest-sprout/60 border border-harvest-sageLight/50 text-center my-4">
                <div>
                  <span className="text-[10px] text-harvest-forest font-bold uppercase block">Calories</span>
                  <span className="text-base font-extrabold text-harvest-dark font-display">{totalCalories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-harvest-forest font-bold uppercase block">Clean Protein</span>
                  <span className="text-base font-extrabold text-harvest-forest font-display">{totalProtein}g</span>
                </div>
              </div>

              {/* Selected Ingredients Breakdown */}
              <div className="space-y-2.5 text-xs text-harvest-earth/80 py-2">
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-harvest-dark">Bases:</span>
                  <span className="text-right text-harvest-earth font-medium">
                    {chosenBases.map(b => b.name).join(', ') || 'None'}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-harvest-dark">Warm Veggies:</span>
                  <span className="text-right text-harvest-earth font-medium">
                    {chosenWarm.map(w => w.name).join(', ') || 'None'}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-harvest-dark">Clean Protein:</span>
                  <span className="text-right text-harvest-forest font-bold">
                    {chosenProtein?.name || 'None'}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-harvest-dark">Toppings:</span>
                  <span className="text-right text-harvest-earth font-medium">
                    {chosenToppings.map(t => t.name).join(', ') || 'None'}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-harvest-dark">Dressing:</span>
                  <span className="text-right text-harvest-terracotta font-semibold">
                    {chosenDressing?.name || 'None'}
                  </span>
                </div>
              </div>

              {/* Total & Add to Bag CTA */}
              <div className="pt-5 mt-4 border-t border-harvest-border/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-bold text-harvest-sage">Estimated Total</span>
                  <span className="text-2xl font-black font-display text-harvest-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCreateBowl}
                  className={`w-full py-4 rounded-full font-bold text-sm shadow-soft transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-harvest-forest text-white hover:bg-harvest-forestHover hover:shadow-float'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added Custom Bowl!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-harvest-ochre" />
                      <span>Add Custom Bowl to Bag</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
