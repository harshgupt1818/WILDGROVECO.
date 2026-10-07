import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onScrollToSection,
  deliveryZip,
  onOpenZipModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home-hero' },
    { name: 'Our Story', id: 'our-story' },
    { name: 'Menu', id: 'menu-section' },
    { name: 'Order Now', id: 'order-now' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'home-hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'order-now') {
      onScrollToSection('order-now');
    } else {
      onScrollToSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro-announcement ribbon */}
      <div className="bg-harvest-forest text-harvest-sprout text-xs sm:text-sm font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-harvest-moss">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span className="truncate">
          <strong>Autumn Special:</strong> Free Cold-Pressed Botanical Tonic with code <span className="underline decoration-harvest-terracotta underline-offset-2 font-bold text-white">WILD15</span>
        </span>
        <span className="hidden md:inline text-harvest-sage">•</span>
        <span className="hidden md:inline text-xs text-harvest-sageLight">Delivered crisp in 22–28 min</span>
      </div>

      {/* Main Sticky Navigation Bar */}
      <nav className={`transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled 
          ? 'bg-harvest-cream/95 backdrop-blur-md shadow-soft py-3 border-b border-harvest-border/70' 
          : 'bg-harvest-cream/90 backdrop-blur-sm py-4 border-b border-harvest-border/40'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Placeholder for Minimal Text Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Home"
          >
            {/* Minimal Logo Badge / Icon */}
            <div className="w-8 h-8 rounded-lg bg-harvest-forest text-harvest-sprout flex items-center justify-center font-display font-extrabold text-xs shadow-xs group-hover:scale-105 transition-transform duration-300">
              <span className="text-emerald-300">W</span>
            </div>

            {/* Minimal Text Logo Placeholder */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-harvest-dark font-display hover:text-harvest-forest transition-colors leading-none">
                  [YOUR LOGO]
                </span>
                <span className="text-[10px] tracking-wider uppercase font-sans font-bold px-1.5 py-0.5 rounded bg-harvest-sprout text-harvest-forest border border-harvest-sageLight/60 hidden sm:inline-block">
                  Salads & Bowls
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-harvest-sage uppercase font-medium mt-0.5 hidden xs:inline-block">
                Minimal Text Logo Placeholder
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Home, Our Story, Menu, Order Now */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isOrderNow = link.name === 'Order Now';
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                    isOrderNow
                      ? 'px-4 py-1.5 rounded-full bg-harvest-forest text-white hover:bg-harvest-forestHover shadow-xs'
                      : 'text-harvest-earth/80 hover:text-harvest-forest after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-harvest-terracotta hover:after:w-full after:transition-all after:duration-300'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Action Items: Location Zip + Bag Cart */}
          <div className="flex items-center gap-3">
            
            {/* Delivery Zip Location Pill */}
            <button
              onClick={onOpenZipModal}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-harvest-sprout border border-harvest-sageLight text-harvest-forest hover:bg-emerald-50 transition-colors"
              title="Change Delivery Zip Code"
            >
              <MapPin className="w-3.5 h-3.5 text-harvest-terracotta" />
              <span>{deliveryZip ? `Zip: ${deliveryZip}` : 'SoHo Hub • 25m'}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white border border-harvest-border shadow-xs hover:border-harvest-forest text-harvest-dark hover:shadow-soft transition-all duration-200"
              aria-label="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-harvest-forest" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-harvest-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-harvest-dark">
                ${cartTotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-harvest-dark hover:bg-harvest-sand/40 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu with requested links */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-5 border-t border-harvest-border/50 mt-3 flex flex-col gap-2.5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-harvest-border/40 px-2 text-xs">
              <span className="text-harvest-sage font-medium">Quick Delivery Radius</span>
              <button 
                onClick={onOpenZipModal}
                className="font-bold text-harvest-terracotta flex items-center gap-1"
              >
                <MapPin className="w-3 h-3" />
                {deliveryZip ? `Zip: ${deliveryZip}` : 'Check Zip Code'}
              </button>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors ${
                  link.name === 'Order Now'
                    ? 'bg-harvest-forest text-white mt-1 text-center font-bold'
                    : 'text-harvest-earth hover:bg-harvest-sand/30 hover:text-harvest-forest'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
