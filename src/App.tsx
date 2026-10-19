import React, { useState, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { ScrollShowcaseRibbon } from './components/ScrollShowcaseRibbon.tsx';
import { IndoorOutdoorShowcase } from './components/IndoorOutdoorShowcase.tsx';
import { InteractiveStudio } from './components/InteractiveStudio.tsx';
import { PortfolioGallery } from './components/PortfolioGallery.tsx';
import { ServicesPricing } from './components/ServicesPricing.tsx';
import { PortraitGuide } from './components/PortraitGuide.tsx';
import { AboutFounder } from './components/AboutFounder.tsx';
import { LocationContact } from './components/LocationContact.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { UserAccountModal } from './components/UserAccountModal.tsx';
import { LiveCameraSnapModal } from './components/LiveCameraSnapModal.tsx';
import { Phone, Calendar, Send, Camera } from 'lucide-react';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Indoor Signature Studio');
  const [isFlashActive, setIsFlashActive] = useState(false);

  // Global camera shutter flash effect
  const triggerGlobalFlash = useCallback(() => {
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 350);
  }, []);

  const handleOpenBooking = (pkgName?: string) => {
    if (pkgName) {
      setSelectedPackage(pkgName);
    }
    setIsBookingOpen(true);
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('portraits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Top Reading Progress Bar tracking user scroll */}
      <ScrollProgressBar />

      {/* Global Camera Flash Overlay */}
      {isFlashActive && (
        <div className="fixed inset-0 z-[100] bg-white animate-shutter-flash pointer-events-none" />
      )}

      {/* Top Bar Navigation with Google Auth, Telegram & Booking */}
      <Navbar
        onBookClick={() => handleOpenBooking()}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Split-Screen Hero with Direct Camera Snap & Telegram */}
        <Hero
          onBookClick={() => handleOpenBooking()}
          onExploreGallery={handleScrollToGallery}
          triggerGlobalFlash={triggerGlobalFlash}
          onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
        />

        {/* Animated Marquee Ribbon */}
        <ScrollShowcaseRibbon />

        {/* Media-First Curated Portfolio Gallery */}
        <PortfolioGallery
          onBookSession={() => handleOpenBooking()}
          triggerGlobalFlash={triggerGlobalFlash}
        />

        {/* Indoor vs Outdoor Specialized Showcase (Starts from 6,000 ETB) */}
        <IndoorOutdoorShowcase
          onBookType={(type) => handleOpenBooking(type)}
        />

        {/* Interactive Virtual Lighting & Backdrop Simulator */}
        <InteractiveStudio
          triggerGlobalFlash={triggerGlobalFlash}
          onBookSession={() => handleOpenBooking('Indoor Signature Studio')}
        />

        {/* Meet the Founder: Architect Bereket Belay */}
        <AboutFounder
          onBookClick={() => handleOpenBooking('Signature Session with Bereket')}
        />

        {/* Transparent Session Pricing Packages */}
        <ServicesPricing
          onSelectPackage={(pkg) => handleOpenBooking(pkg)}
        />

        {/* Client Portrait Preparation & Posing Guide */}
        <PortraitGuide />

        {/* Physical Studio Location in Burayu Mariam, Direct Hotline & Telegram */}
        <LocationContact
          onBookClick={() => handleOpenBooking()}
        />
      </main>

      {/* Footer with Telegram & Contacts */}
      <Footer onBookClick={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultPackage={selectedPackage}
        triggerGlobalFlash={triggerGlobalFlash}
      />

      {/* User Account & Saved Data Modal (Firebase Auth & Firestore) */}
      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Direct Camera Photo Capture & Store to Firestore Database */}
      <LiveCameraSnapModal
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        triggerGlobalFlash={triggerGlobalFlash}
      />

      {/* Floating Quick Action Strip for Mobile */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#121216]/95 backdrop-blur-md border border-neutral-800 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-1.5">
        <a
          href="tel:0939390867"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-semibold hover:text-white"
          title="Direct Call"
        >
          <Phone className="w-3.5 h-3.5 text-red-500" />
          <span className="truncate">0939390867</span>
        </a>

        {/* Telegram Direct Link @Gmichael_1 */}
        <a
          href="https://t.me/Gmichael_1"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9] border border-[#229ED9]/40 text-[#64B5F6] hover:text-white flex items-center justify-center transition-colors"
          title="Direct Telegram Chat: @Gmichael_1"
        >
          <Send className="w-4 h-4" />
        </a>

        {/* Live Camera Snap */}
        <button
          onClick={() => setIsLiveCameraOpen(true)}
          className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-red-500/50 text-red-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Snap Photo & Store to Database"
        >
          <Camera className="w-4 h-4 text-red-500" />
        </button>

        {/* Book Shoot */}
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="truncate">Book</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
