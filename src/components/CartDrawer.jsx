import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Tag, 
  Bike, 
  Sparkles, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  deliveryZip
}) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [orderType, setOrderType] = useState('delivery');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 35.00;
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = promoApplied ? (subtotal * discountPercent) : 0;
  const deliveryFee = orderType === 'pickup' || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 3.99;
  const tax = (subtotal - discountAmount) * 0.08875; // NYC sales tax
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + (cartItems.length > 0 ? tax : 0));

  const progressToFreeDelivery = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'WILD15' || code === 'WILDGROVE15' || code === 'HARVEST15') {
      setPromoApplied(true);
      setDiscountPercent(0.15);
    } else if (code === 'WILD50' || code === 'HARVEST50') {
      setPromoApplied(true);
      setDiscountPercent(0.50);
    } else {
      alert('Invalid promo code. Try "WILD15" for 15% off your order!');
    }
  };

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderCompleted(true);
    }, 1200);
  };

  const handleResetOrder = () => {
    onClearCart();
    setOrderCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-harvest-border animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-harvest-border/60 bg-harvest-cream/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-harvest-forest text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-harvest-dark">
                Your Delivery Bag
              </h2>
              <span className="text-xs text-harvest-sage">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} {cartItems.length === 1 ? 'dish' : 'dishes'} selected
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-harvest-border text-harvest-earth hover:bg-harvest-sand/40 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Completed Confirmation View */}
        {orderCompleted ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-display text-harvest-dark mb-2">
              Order Dispatched!
            </h3>
            <p className="text-xs sm:text-sm text-harvest-earth/80 max-w-xs mb-6">
              Our line cooks are chopping your greens at the SoHo Micro-Kitchen. Electric bike courier arrives in <strong>22 minutes</strong>!
            </p>

            <div className="w-full p-4 rounded-2xl bg-harvest-cream border border-harvest-border text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-harvest-sage">
                <span>Order Reference:</span>
                <span className="font-bold text-harvest-dark">#WGB-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-harvest-sage">
                <span>Destination:</span>
                <span className="font-bold text-harvest-dark">{deliveryZip || 'SoHo, NYC'}</span>
              </div>
              <div className="flex justify-between text-harvest-sage">
                <span>Dual-Chamber Bowl:</span>
                <span className="font-bold text-emerald-700">100% Compostable Bagasse</span>
              </div>
            </div>

            <button
              onClick={handleResetOrder}
              className="w-full py-3.5 rounded-full bg-harvest-forest text-white font-bold text-sm hover:bg-harvest-forestHover transition-colors"
            >
              Order Another Fresh Bowl
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Items Section */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
              
              {/* Order Type Toggle: Delivery vs Pickup */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-harvest-cream border border-harvest-border">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    orderType === 'delivery'
                      ? 'bg-harvest-forest text-white shadow-sm'
                      : 'text-harvest-earth/80 hover:text-harvest-forest'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Electric Courier (25m)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    orderType === 'pickup'
                      ? 'bg-harvest-forest text-white shadow-sm'
                      : 'text-harvest-earth/80 hover:text-harvest-forest'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Store Pickup (10m)</span>
                </button>
              </div>

              {/* Free Delivery Bar */}
              {orderType === 'delivery' && (
                <div className="p-3 rounded-2xl bg-harvest-sprout border border-harvest-sageLight/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-harvest-forest mb-1.5">
                    {remainingForFreeDelivery === 0 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Free courier delivery unlocked!
                      </span>
                    ) : (
                      <span>Add ${remainingForFreeDelivery.toFixed(2)} more for <strong>FREE Delivery</strong></span>
                    )}
                  </div>
                  <div className="w-full h-2 rounded-full bg-harvest-sageLight/50 overflow-hidden">
                    <div 
                      className="h-full bg-harvest-leaf rounded-full transition-all duration-300"
                      style={{ width: `${progressToFreeDelivery}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-harvest-sprout text-harvest-sage mx-auto flex items-center justify-center mb-3">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-display text-harvest-dark">Your bag is empty</h3>
                  <p className="text-xs text-harvest-sage mt-1">Explore our chef-crafted bowls and salads.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId || item.id}
                      className="p-3.5 rounded-2xl border border-harvest-border bg-white shadow-xs flex gap-3 items-start"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-harvest-creamMuted"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-harvest-dark truncate">
                            {item.name}
                          </h4>
                          <span className="text-xs font-extrabold text-harvest-dark font-display shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Customization Details */}
                        {item.dressingPreference && (
                          <div className="text-[11px] text-harvest-sage mt-0.5">
                            Dressing: <span className="font-medium text-harvest-dark">{item.dressingPreference}</span>
                          </div>
                        )}
                        {item.addons && item.addons.length > 0 && (
                          <div className="text-[10px] text-harvest-terracotta mt-0.5 line-clamp-1">
                            +{item.addons.map(a => a.name).join(', ')}
                          </div>
                        )}

                        {/* Quantity Adjusters */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-harvest-border/40">
                          <div className="flex items-center gap-2 bg-harvest-cream/80 px-2 py-0.5 rounded-lg border border-harvest-border/60">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                              className="text-harvest-forest hover:text-harvest-dark"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-harvest-dark w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                              className="text-harvest-forest hover:text-harvest-dark"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.cartItemId || item.id)}
                            className="text-harvest-sage hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              {cartItems.length > 0 && (
                <div className="pt-2">
                  {!promoApplied ? (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-harvest-sage absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Promo code (Try WILD15)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-harvest-border text-xs uppercase font-semibold text-harvest-dark focus:outline-none focus:ring-1 focus:ring-harvest-forest"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-harvest-cream border border-harvest-border text-harvest-dark font-bold text-xs hover:bg-harvest-sand/40"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Code '{promoCode.toUpperCase()}' Applied (-{(discountPercent * 100)}%)
                      </span>
                      <button
                        onClick={() => { setPromoApplied(false); setDiscountPercent(0); }}
                        className="text-[11px] underline text-emerald-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Checkout Calculations */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-harvest-border/60 bg-harvest-cream/40 space-y-2">
                <div className="flex justify-between text-xs text-harvest-earth/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-harvest-dark">${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                    <span>Autumn Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-harvest-earth/80">
                  <span>Courier Delivery ({orderType === 'pickup' ? 'Pickup' : 'Zero-Emission Bike'})</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-harvest-earth/80">
                  <span>Estimated Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-harvest-border/50 flex justify-between items-center">
                  <div>
                    <span className="text-xs uppercase font-bold text-harvest-sage block">Total Amount</span>
                    <span className="text-xl font-black font-display text-harvest-dark">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isCheckingOut}
                    className="py-3 px-6 rounded-full bg-harvest-forest hover:bg-harvest-forestHover text-white font-bold text-sm shadow-soft flex items-center gap-2 transition-all"
                  >
                    {isCheckingOut ? (
                      <span>Transmitting to Kitchen...</span>
                    ) : (
                      <>
                        <span>Place Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
