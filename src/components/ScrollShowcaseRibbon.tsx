import React from 'react';
import { Camera, Sparkles, MapPin, Phone } from 'lucide-react';

export const ScrollShowcaseRibbon: React.FC = () => {
  const items = [
    'ALPHA STUDIO BURAYU MARIAM',
    'PREMIER INDOOR & OUTDOOR PORTRAITS',
    'CALL 0939390867',
    '8K ULTRA-RESOLUTION OPTICS',
    'PROFESSIONAL RETOUCHING & COLOR GRADE',
    'BURAYU MARIAM LOCATION',
  ];

  return (
    <div className="relative overflow-hidden py-4 bg-[#0d0d10] border-y border-neutral-900 select-none">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="inline-flex items-center gap-4 mx-4 text-xs font-mono font-bold tracking-widest text-neutral-400">
            <span className="text-red-500">◆</span>
            <span className="hover:text-white transition-colors">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
