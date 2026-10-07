import React, { useState } from 'react';
import { 
  Leaf, 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Check, 
  Heart, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Send,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function Footer({ onScrollToSection, onOpenBuildYourOwn }) {
  const [tipsEmail, setTipsEmail] = useState('');
  const [tipsSubscribed, setTipsSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleTipsSubscribe = (e) => {
    e.preventDefault();
    if (!tipsEmail || !tipsEmail.includes('@')) return;
    setTipsSubscribed(true);
  };

  const handleCopyEmail = (emailStr) => {
    navigator.clipboard?.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer id="footer-section" className="relative bg-gradient-to-b from-harvest-forest/95 via-harvest-dark to-[#0E1B14] text-harvest-sprout pt-20 pb-12 border-t border-emerald-900/40 overflow-hidden">
      
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-harvest-terracotta/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. NEWSLETTER SIGNUP: 'Weekly Healthy Living Tips' (Requested by User) */}
        <div className="mb-16 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Newsletter Pitch */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>The Wildgrove Journal</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-snug">
                Weekly Healthy Living Tips
              </h3>

              <p className="text-sm sm:text-base text-harvest-sprout/75 max-w-lg leading-relaxed">
                Stay energized during your corporate hustle. Get dietitian-crafted desk lunch guides, macro balance hacks, and seasonal farm harvest stories delivered every Thursday morning.
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs text-harvest-sage">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> Zero Spam
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> 1-Click Unsubscribe
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> 15,000+ Readers
                </span>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="lg:col-span-6">
              {!tipsSubscribed ? (
                <form onSubmit={handleTipsSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg lg:ml-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-harvest-sage" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your work or personal email..."
                      value={tipsEmail}
                      onChange={(e) => setTipsEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-harvest-sage text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-2xl bg-harvest-terracotta hover:bg-harvest-terracottaHover text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-harvest-terracotta/30 hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  >
                    <span>Subscribe Free</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-left max-w-lg lg:ml-auto shadow-inner animate-fade-in">
                  <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-sm mb-1">
                    <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
                    <span>Welcome to Weekly Healthy Living Tips!</span>
                  </div>
                  <p className="text-xs text-harvest-sprout/80 leading-relaxed">
                    You're subscribed! Keep an eye on your inbox for our latest clean lunch guide and seasonal farm recipes.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER GRID */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Social Media Icons for Brand Building (Requested by User) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-harvest-forest border border-emerald-400/30 flex items-center justify-center shadow-md shadow-emerald-950/50">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-white block">
                  WILDGROVE BOWL CO.
                </span>
                <span className="text-[11px] text-emerald-400 font-medium tracking-wider uppercase block">
                  Clean Desk Lunches & Grain Bowls
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-harvest-sprout/70 leading-relaxed pr-2">
              Founded by an HR professional who understands corporate hustle. We deliver clean, nutrient-dense salads and warm grain bowls cooked with 0% industrial seed oils to keep modern professionals thriving.
            </p>

            {/* SOCIAL MEDIA ICONS (Instagram, Facebook) FOR BRAND BUILDING */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-harvest-sprout block mb-3">
                Connect & Build Community
              </span>
              <div className="flex items-center gap-3">
                
                {/* Instagram Button */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-[#833AB4]/80 hover:via-[#FD1D1D]/80 hover:to-[#F77737]/80 border border-white/10 hover:border-white/30 text-harvest-sprout hover:text-white transition-all duration-300 shadow-sm hover:scale-[1.03]"
                  title="Follow Wildgrove on Instagram"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    {/* Inline Instagram SVG */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Instagram</span>
                </a>

                {/* Facebook Button */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-white/30 text-harvest-sprout hover:text-white transition-all duration-300 shadow-sm hover:scale-[1.03]"
                  title="Follow Wildgrove on Facebook"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    {/* Inline Facebook SVG */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Facebook</span>
                </a>

              </div>
            </div>
          </div>

          {/* Column 2: 'Contact Us' Email & Support (Requested by User) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>

            <p className="text-xs text-harvest-sprout/70 leading-relaxed">
              Have questions about allergen customizations, office group catering, or feedback? Reach out directly:
            </p>

            {/* Clickable Email Card */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-harvest-sage uppercase tracking-wider">
                  Customer & Desk Care
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Under 2h Reply
                </span>
              </div>
              <a 
                href="mailto:hello@wildgrovebowls.com"
                className="text-sm font-bold text-white hover:text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>hello@wildgrovebowls.com</span>
              </a>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyEmail('hello@wildgrovebowls.com')}
                  className="text-[11px] text-harvest-sprout/60 hover:text-white underline underline-offset-2 transition-colors"
                >
                  {copiedEmail ? '✓ Copied to clipboard' : 'Click to copy address'}
                </button>
              </div>
            </div>

            {/* Corporate Catering Note */}
            <div className="text-xs text-harvest-sprout/70 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-harvest-sage shrink-0" />
                <span>Mon – Fri: 8:00 AM – 8:00 PM EST</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-harvest-sage shrink-0" />
                <span>NYC Kitchen Pods: SoHo • Flatiron • Williamsburg</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Menu
            </h4>
            <ul className="space-y-2.5 text-xs text-harvest-sprout/80">
              <li>
                <button 
                  onClick={() => onScrollToSection('menu-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  🥗 Veg Salads (A, C, K)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('menu-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  🍗 Non-Veg Salads (B12, D)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('menu-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  🍲 Veg Bowls (Iron, C)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('menu-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  🥑 Non-Veg Bowls (Omega-3)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('order-now')} 
                  className="text-harvest-ochre hover:text-white transition-colors text-left font-bold"
                >
                  🚀 Order Swiggy / Zomato
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Brand Standards & Story */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Food Philosophy
            </h4>
            <ul className="space-y-2.5 text-xs text-harvest-sprout/80">
              <li>
                <button 
                  onClick={() => onScrollToSection('story-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  About Our Founder & Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('standards-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  100% Seed Oil-Free Pledge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('farms-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  14 Regenerative Partner Farms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('delivery-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Zero-Emission Cargo Couriers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('reviews-section')} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  18,000+ Verified Desk Reviews
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. NUTRITIONAL VALUES DISCLAIMER (Requested by User) */}
        <div className="my-8 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 text-xs text-harvest-sprout/70 leading-relaxed shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-harvest-ochre/20 text-harvest-ochre flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white font-semibold">Nutritional Values Disclaimer: </strong>
              <span>
                All nutritional values and macro breakdowns (Carbohydrates, Protein, Healthy Fats, and Vitamins) displayed on our menu are approximate and calculated based on standardized culinary recipes. Slight variances may naturally occur due to seasonal farm harvest yield, vegetable sizing, handcrafted preparation, and individualized dressing toss amounts.
              </span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-harvest-sage">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Wildgrove Bowl Co.</span>
            <span>•</span>
            <span>Handcrafted desk meals for high performers</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-harvest-sprout/60">
            <button 
              onClick={() => onScrollToSection('menu-section')} 
              className="hover:text-white transition-colors"
            >
              Nutritional Guide
            </button>
            <button 
              onClick={() => onScrollToSection('menu-section')} 
              className="hover:text-white transition-colors"
            >
              Allergen Matrix
            </button>
            <a 
              href="mailto:hello@wildgrovebowls.com?subject=Privacy%20Inquiry" 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="mailto:hello@wildgrovebowls.com?subject=Terms%20Inquiry" 
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
