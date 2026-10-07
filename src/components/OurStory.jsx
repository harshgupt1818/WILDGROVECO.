import React from 'react';
import { Heart, Sparkles, Clock, CheckCircle2, ArrowRight, Briefcase, Zap } from 'lucide-react';

export default function OurStory({ onScrollToSection }) {
  return (
    <section id="our-story" className="py-20 lg:py-24 bg-white border-b border-harvest-border scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Professional yet Warm Female Founder Image */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Decorative Warm Accent */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-harvest-sprout rounded-3xl -z-10 transform -rotate-3"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-harvest-terracottaLight/70 rounded-3xl -z-10 transform rotate-2"></div>
            
            {/* Main Founder Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-harvest-border shadow-float">
              <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-harvest-creamMuted">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Founder of Wildgrove Bowl Co. - Former HR Professional"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Bottom Card on Founder Photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-sm text-harvest-dark">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-base text-harvest-dark">
                        Maya Lin
                      </div>
                      <div className="text-xs text-harvest-sage font-medium flex items-center gap-1.5 mt-0.5">
                        <Briefcase className="w-3.5 h-3.5 text-harvest-terracotta" />
                        <span>Founder & Former HR Director</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-harvest-sprout text-harvest-forest border border-harvest-sageLight/50">
                      Corporate to Clean Food
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mission Badge */}
            <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur border border-harvest-border shadow-soft rounded-2xl p-3.5 flex items-center gap-3 hidden sm:flex max-w-xs animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-harvest-sprout text-harvest-forest flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-harvest-leaf text-harvest-leaf" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-harvest-dark">Made For The 9-to-5</div>
                <div className="text-[11px] text-harvest-sage leading-tight mt-0.5">
                  Clean nutrition engineered to prevent the afternoon desk fatigue.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Story & Encouraging Mission */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-harvest-ochre" />
              <span>Our Story & Mission</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-harvest-dark tracking-tight leading-tight mb-6">
              Healthy Eating Shouldn’t Be a Full-Time Job
            </h2>

            {/* Featured Quote / Bio requested */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-harvest-cream/80 border-l-4 border-harvest-forest border-harvest-border/80 mb-6 shadow-xs">
              <p className="text-base sm:text-lg lg:text-xl font-medium text-harvest-dark font-sans leading-relaxed italic">
                “Founded by an HR professional who understands the hustle of corporate life, our mission is to provide clean, healthy, and accessible desk lunches. We believe that eating healthy shouldn’t be a full-time job.”
              </p>
            </div>

            {/* Encouraging Narrative */}
            <p className="text-sm sm:text-base text-harvest-earth/80 leading-relaxed mb-6">
              Between back-to-back calendar invites, tight project deadlines, and packed agendas, lunch all too often turns into rushed takeout, sodium-heavy meals, or skipped nutrition entirely. We built this kitchen because your busy ambition deserves real, vibrant fuel—not a 2 PM energy crash.
            </p>

            {/* Health-focused & Encouraging Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              
              <div className="p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-harvest-sprout text-harvest-leaf flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-harvest-dark">Sustained Desk Energy</h4>
                  <p className="text-xs text-harvest-earth/70 mt-1 leading-snug">
                    Zero heavy refined carbs or inflammatory seed oils. Wholesome ancient grains and lean proteins that keep your mind sharp all afternoon.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-harvest-border/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-harvest-terracottaLight text-harvest-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-harvest-dark">Speed Without Compromise</h4>
                  <p className="text-xs text-harvest-earth/70 mt-1 leading-snug">
                    Delivered straight to your office reception or front door in under 25 minutes, warm and crisp in eco-friendly dual-chamber packaging.
                  </p>
                </div>
              </div>

            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onScrollToSection('menu-section')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest-forest text-white font-bold text-sm shadow-soft hover:bg-harvest-forestHover hover:shadow-float transition-all group"
              >
                <span>Explore Today’s Lunch Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-xs font-semibold text-harvest-sage flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-harvest-leaf" />
                <span>100% Scratch Kitchen • Pre-Order or On-Demand</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
