import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import ValuePillars from './components/ValuePillars';
import MenuSection from './components/MenuSection';
import ItemModal from './components/ItemModal';
import BuildYourOwn from './components/BuildYourOwn';
import FarmMap from './components/FarmMap';
import DeliveryChecker from './components/DeliveryChecker';
import Testimonials from './components/Testimonials';
import SubscriptionClub from './components/SubscriptionClub';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { MENU_ITEMS } from './data/menuData';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      ...MENU_ITEMS[0],
      cartItemId: 'initial-item-1',
      dressingPreference: 'Medium',
      addons: [],
      quantity: 1,
      price: MENU_ITEMS[0].price
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [deliveryZip, setDeliveryZip] = useState('10012');
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      // Check if exact same item and dressing exists
      const existingIndex = prev.findIndex(
        i => i.id === item.id && 
             i.dressingPreference === item.dressingPreference &&
             JSON.stringify(i.addons || []) === JSON.stringify(item.addons || [])
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += (item.quantity || 1);
        return updated;
      } else {
        return [...prev, { ...item, cartItemId: item.cartItemId || `${item.id}-${Date.now()}` }];
      }
    });

    showToast(`Added ${item.name} to your delivery bag!`);
  };

  const handleQuickAdd = (item) => {
    handleAddToCart({
      ...item,
      cartItemId: `${item.id}-${Date.now()}`,
      dressingPreference: 'Standard',
      addons: [],
      quantity: 1,
      price: item.price
    });
  };

  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems(prev => prev.map(item => 
        (item.cartItemId === cartItemId || item.id === cartItemId)
          ? { ...item, quantity: newQty }
          : item
      ));
    }
  };

  const handleRemoveItem = (cartItemId) => {
    setCartItems(prev => prev.filter(item => 
      item.cartItemId !== cartItemId && item.id !== cartItemId
    ));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-harvest-cream flex flex-col font-sans selection:bg-harvest-forest selection:text-harvest-sprout">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-harvest-dark text-white text-xs sm:text-sm font-semibold shadow-float border border-white/20 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBuildYourOwn={() => scrollToSection('byo-section')}
        onScrollToSection={scrollToSection}
        deliveryZip={deliveryZip}
        onOpenZipModal={() => scrollToSection('delivery-section')}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          onOpenBuildYourOwn={() => scrollToSection('byo-section')}
          onQuickAdd={handleQuickAdd}
          onScrollToSection={scrollToSection}
          onSelectItem={(item) => setSelectedModalItem(item)}
        />

        <OurStory onScrollToSection={scrollToSection} />

        <MenuSection
          onSelectItem={(item) => setSelectedModalItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <ValuePillars />

        <BuildYourOwn
          onAddToCart={handleAddToCart}
          isOpen={false}
          onClose={() => {}}
        />

        <FarmMap />

        <DeliveryChecker
          deliveryZip={deliveryZip}
          setDeliveryZip={setDeliveryZip}
        />

        <Testimonials />

        <SubscriptionClub />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenBuildYourOwn={() => scrollToSection('byo-section')}
      />

      {/* Interactive Item Customization Modal */}
      {selectedModalItem && (
        <ItemModal
          item={selectedModalItem}
          onClose={() => setSelectedModalItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        deliveryZip={deliveryZip}
      />

    </div>
  );
}
