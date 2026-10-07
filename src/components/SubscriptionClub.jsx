import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionClub() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section id="subscription-section" className="py-20 bg-harvest-forest text-white relative overflow-hidden scroll-mt-20">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-harvest-terracotta/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 md:p-16 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>The Wildgrove Daily Pass</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Eat Clean Daily. Pay Zero Delivery Fees.
          </h2>

          <p className="text-base sm:text-lg text-harvest-sprout/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 3,400+ neighborhood members who fuel their workday with regenerative salads and warm heirloom grain bowls.
          </p>

          {/* Perks list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h4 className="font-bold text-sm text-white">Unlimited Free Delivery</h4>
              <p className="text-xs text-harvest-sprout/70 mt-1">Save $4.99 on every single order with zero minimums.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h4 className="font-bold text-sm text-white">15% Member Discount</h4>
              <p className="text-xs text-harvest-sprout/70 mt-1">Applied automatically to all bowls, salads, and tonics.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h4 className="font-bold text-sm text-white">Priority Kitchen Queue</h4>
              <p className="text-xs text-harvest-sprout/70 mt-1">Your order jumps to the top during the 12–2 PM lunch rush.</p>
            </div>
          </div>

          {/* Email Trial Signup */}
          {!subscribed ? (
            <form onSubmit={handleJoin} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work or personal email..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-harvest-dark text-sm font-medium placeholder-harvest-sage focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-harvest-terracotta hover:bg-harvest-terracottaHover text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 max-w-md mx-auto animate-fadeIn">
              <p className="font-bold text-sm">🎉 You're on the VIP Pass list!</p>
              <p className="text-xs mt-1 text-emerald-300">Check {email} for your 14-day zero-fee activation link.</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-harvest-sprout/60 mt-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cancel anytime in 1-click • No commitment</span>
          </div>

        </div>
      </div>
    </section>
  );
}
