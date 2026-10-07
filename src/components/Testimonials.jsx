import React, { useState } from 'react';
import { Star, Quote, ChevronDown, ChevronUp, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/menuData';

export default function Testimonials() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="reviews-section" className="py-20 bg-harvest-cream/50 border-b border-harvest-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-harvest-terracotta text-harvest-terracotta" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-harvest-dark tracking-tight">
            Over 18,000 Bowls Delivered This Month
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-harvest-ochre">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-harvest-dark">
              4.92 out of 5 stars
            </span>
            <span className="text-xs text-harvest-sage">
              (Verified Neighborhood Diners)
            </span>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 border border-harvest-border/80 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-harvest-ochre">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-harvest-sand/80" />
                </div>
                <p className="text-sm text-harvest-earth/80 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-harvest-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-harvest-sprout"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-harvest-dark">{t.name}</h3>
                    <p className="text-[11px] text-harvest-sage font-medium">{t.title} • {t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Accordion Section */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-harvest-dark">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-harvest-earth/70 mt-1">
              Everything you need to know about our sourcing, delivery, and bowls.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-harvest-border bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-harvest-dark hover:text-harvest-forest"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-harvest-forest shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-harvest-sage shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-harvest-earth/80 leading-relaxed border-t border-harvest-border/40 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
