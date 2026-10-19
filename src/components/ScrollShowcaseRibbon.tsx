import React from 'react';
import { Camera, Sparkles, MapPin, Phone, Aperture, Flame } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

export const ScrollShowcaseRibbon: React.FC = () => {
  const items = [
    { text: 'ALPHA STUDIO BURAYU MARIAM', icon: Sparkles },
    { text: 'PREMIER INDOOR CHIAROSCURO & OUTDOOR SUNSET', icon: Flame },
    { text: 'HOTLINE: 0939390867', icon: Phone },
    { text: '8K ULTRA-RESOLUTION PRIME LENSES', icon: Aperture },
    { text: 'PROFESSIONAL RETOUCHING & COLOR GRADE', icon: Camera },
    { text: 'ETHIOPIAN TRADITIONAL & EDITORIAL STYLING', icon: MapPin },
  ];

  const handleItemClick = () => {
    shutterAudio.playShutterSound();
  };

  return (
    <div className="relative overflow-hidden py-4 bg-[#0d0d10] border-y border-neutral-900 select-none group">
      {/* Edge gradient masks for luxury editorial look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Marquee row with pause-on-hover */}
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={handleItemClick}
              title="Click to snap shutter"
              className="inline-flex items-center gap-3 mx-4 text-xs font-mono font-bold tracking-widest text-neutral-400 hover:text-white transition-all cursor-pointer py-1 px-2.5 rounded-lg hover:bg-neutral-900/60"
            >
              <span className="text-red-500">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span>{item.text}</span>
              <span className="text-neutral-700 font-sans">✦</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
