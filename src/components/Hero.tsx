import React, { useState } from 'react';
import { Camera, Calendar, Phone, Sparkles, MapPin, Aperture } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

interface HeroProps {
  onBookClick: () => void;
  onExploreGallery: () => void;
  triggerGlobalFlash: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreGallery,
  triggerGlobalFlash,
}) => {
  const [shutterCount, setShutterCount] = useState(1);
  const [isSnapping, setIsSnapping] = useState(false);

  const handleShutterClick = () => {
    setIsSnapping(true);
    shutterAudio.playShutterSound();
    triggerGlobalFlash();
    setShutterCount((prev) => prev + 1);
    setTimeout(() => setIsSnapping(false), 300);
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0e0e11] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Subtle Studio Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Clean Editorial Kicker (no pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Burayu Mariam</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Premier Portrait Studio</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Indoor & Outdoor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Stunning Portraits That Capture Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">Purest Essence.</span>
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Welcome to <span className="text-white font-semibold">Alpha Studio</span> in Burayu Mariam. We blend dramatic indoor studio strobe lighting with radiant natural outdoor golden hours to craft professional, heirloom portraits.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-xl shadow-red-600/25 active:scale-95 group"
              >
                <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Book a Portrait Session</span>
              </button>

              <button
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all hover:border-neutral-700 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span style={{ backgroundColor: '#e11717' }}>View Portfolio</span>
              </button>
            </div>

            {/* Direct Telephone Contact Box */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:0939390867"
                className="inline-flex items-center gap-3 py-2 px-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-red-600/50 text-xs text-neutral-300 hover:text-white transition-all group"
              >
                <span className="p-1.5 rounded-md bg-red-600/10 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">Direct Studio Line</span>
                  <span className="text-sm font-bold tracking-wider text-white">0939390867</span>
                </div>
              </a>

              <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 pl-2 border-l border-neutral-800">
                <span className="text-neutral-500">Open Daily</span>
                <span className="font-semibold text-neutral-200">8:30 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Interactive Visual Container */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative group rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-2xl">
              {/* Media image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/11] overflow-hidden">
                <img
                  src="/src/assets/images/hero_portrait_studio_1791910452336.jpg"
                  alt="Alpha Studio professional portrait session in Burayu Mariam"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Interactive Shutter Trigger Button overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-left">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-red-400">
                      Signature Studio Session
                    </span>
                    <span className="text-xs font-medium text-neutral-200">
                      Indoor Chiaroscuro & Strobe Rig
                    </span>
                  </div>

                  <button
                    onClick={handleShutterClick}
                    title="Click to trigger camera shutter"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 ${
                      isSnapping
                        ? 'bg-white text-black scale-95'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                    }`}
                  >
                    <Camera className="w-4 h-4 animate-pulse" />
                    <span>Snap Shutter (#{shutterCount})</span>
                  </button>
                </div>

                {/* Floating Optical Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <Aperture className="w-3.5 h-3.5 text-red-500" />
                  <span>85mm f/1.4 · ISO 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metrics Row below the Hero Split (Required by Photography Design Guidelines) */}
        <div className="mt-16 pt-8 border-t border-neutral-900 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              0939390867
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Burayu Mariam Hotline
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-red-500 tracking-tight tabular-nums">
              Indoor & Outdoor
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Dual Studio Specialties
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              8K Master
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Ultra High-Resolution Optics
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight tabular-nums">
              100% Bespoke
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Editorial Color Grading
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
