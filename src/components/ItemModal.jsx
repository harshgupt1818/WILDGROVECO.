import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [dressingAmount, setDressingAmount] = useState('Medium');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const addonOptions = [
    { id: 'avocado', name: 'Extra Half Hass Avocado', price: 2.50, cal: 120 },
    { id: 'protein', name: 'Double Clean Protein', price: 4.50, cal: 180 },
    { id: 'feta', name: 'Whipped Feta / Goat Cheese', price: 1.75, cal: 75 },
    { id: 'pecans', name: 'Spiced Candied Maple Pecans', price: 1.50, cal: 95 },
    { id: 'egg', name: 'Soft-Boiled Pasture Organic Egg', price: 1.75, cal: 70 },
  ];

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (item.price + addonsTotal) * quantity;
  const totalCalories = item.calories + selectedAddons.reduce((sum, a) => sum + a.cal, 0);

  const handleAdd = () => {
    const customizedItem = {
      ...item,
      cartItemId: `${item.id}-${Date.now()}`,
      dressingPreference: dressingAmount,
      addons: selectedAddons,
      specialInstructions: notes.trim(),
      price: item.price + addonsTotal,
      quantity: quantity
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-harvest-border max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-harvest-dark hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full bg-harvest-creamMuted">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-harvest-forest">
                  {item.category === 'bowls' ? '🔥 Warm Grain Bowl' : '🥗 Fresh Salad'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-black/40 backdrop-blur">
                  🌱 {item.farm}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                {item.name}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Description & Macros */}
            <div>
              <p className="text-sm sm:text-base text-harvest-earth/80 leading-relaxed">
                {item.description}
              </p>

              {/* Nutritional Breakdown Bar */}
              <div className="grid grid-cols-4 gap-2 mt-4 p-3 rounded-2xl bg-harvest-cream/80 border border-harvest-border/60 text-center">
                <div>
                  <div className="text-[10px] text-harvest-sage uppercase font-semibold">Calories</div>
                  <div className="text-sm font-bold text-harvest-dark">{totalCalories}</div>
                </div>
                <div>
                  <div className="text-[10px] text-harvest-sage uppercase font-semibold">Protein</div>
                  <div className="text-sm font-bold text-harvest-forest">{item.protein}g</div>
                </div>
                <div>
                  <div className="text-[10px] text-harvest-sage uppercase font-semibold">Carbs</div>
                  <div className="text-sm font-bold text-harvest-dark">{item.carbs}g</div>
                </div>
                <div>
                  <div className="text-[10px] text-harvest-sage uppercase font-semibold">Healthy Fat</div>
                  <div className="text-sm font-bold text-harvest-clay">{item.fat}g</div>
                </div>
              </div>
            </div>

            {/* Ingredients List */}
            <div>
              <h4 className="text-xs font-bold text-harvest-dark uppercase tracking-wider mb-2">
                Bowl Ingredients:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-harvest-sprout text-harvest-forest border border-harvest-sageLight/50"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Dressing Toss Preference */}
            {item.dressing && (
              <div className="pt-2 border-t border-harvest-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-harvest-dark uppercase tracking-wider">
                    Dressing Toss Level:
                  </h4>
                  <span className="text-xs text-harvest-terracotta font-medium">
                    {item.dressing}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['Light', 'Medium', 'Heavy', 'On the Side'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDressingAmount(lvl)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                        dressingAmount === lvl
                          ? 'bg-harvest-forest text-white border-harvest-forest shadow-sm'
                          : 'bg-white text-harvest-earth/80 border-harvest-border hover:bg-harvest-sprout'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Add-ons */}
            <div className="pt-2 border-t border-harvest-border/50">
              <h4 className="text-xs font-bold text-harvest-dark uppercase tracking-wider mb-3">
                Upgrade Your Bowl:
              </h4>
              <div className="space-y-2">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isChecked 
                          ? 'bg-harvest-sprout border-harvest-leaf text-harvest-forest' 
                          : 'bg-white border-harvest-border hover:border-harvest-sage text-harvest-earth'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-harvest-forest border-harvest-forest text-white' : 'border-harvest-border'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-harvest-terracotta">
                        +${addon.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="pt-2 border-t border-harvest-border/50">
              <label htmlFor="modal-notes" className="block text-xs font-bold text-harvest-dark uppercase tracking-wider mb-2">
                Special Kitchen Instructions (Optional):
              </label>
              <input
                id="modal-notes"
                type="text"
                placeholder="e.g., No red onions, dressing mixed well..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-harvest-border bg-harvest-cream/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-harvest-forest"
              />
            </div>

          </div>
        </div>

        {/* Fixed Footer Bar */}
        <div className="p-4 sm:p-6 bg-harvest-cream/90 border-t border-harvest-border/60 flex items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-harvest-border shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded-full flex items-center justify-center text-harvest-forest hover:bg-harvest-sprout disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-harvest-dark w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-harvest-forest hover:bg-harvest-sprout"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag CTA Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-6 rounded-full bg-harvest-forest text-white font-bold text-sm sm:text-base hover:bg-harvest-forestHover shadow-soft transition-all duration-200 flex items-center justify-between"
          >
            <span>Add to Delivery Bag</span>
            <span>${itemTotal.toFixed(2)}</span>
          </button>

        </div>

      </div>
    </div>
  );
}
