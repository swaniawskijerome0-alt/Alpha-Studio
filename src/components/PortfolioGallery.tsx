import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, Heart, X, Sparkles, MapPin, Share2, Award, Check, Crosshair } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'traditional' | 'indoor' | 'graduation';
  categoryLabel: string;
  image: string;
  colSpan?: string;
  exif: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    lighting: string;
  };
  location: string;
  description: string;
  featured?: boolean;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g-oromo-wandaboo',
    title: 'Ethiopian Traditional Dress · Wandaboo & Siqqee',
    category: 'traditional',
    categoryLabel: 'Ethiopian Traditional (Arsi & Oromia)',
    image: '/src/assets/images/portfolio_oromo_traditional_1791912459604.jpg',
    colSpan: 'lg:col-span-6',
    exif: {
      lens: '85mm f/1.4 Art',
      aperture: 'f/1.8',
      shutter: '1/1600s',
      iso: '100',
      lighting: 'Golden Hour Backlit Sunlight + Silver Reflector',
    },
    location: 'Burayu Scenic Hills, Oromia, Ethiopia',
    description: 'Majestic Ethiopian traditional dress (Wandaboo) crafted with authentic black, red, and white geometric embroidery, ornate Callee beaded necklace, headdress, and ceremonial Siqqee staff.',
    featured: true,
  },
  {
    id: 'g-oromo-festive',
    title: 'Cultural Elegance · Beaded Callee & Headpiece',
    category: 'traditional',
    categoryLabel: 'Ethiopian Traditional Attire',
    image: '/src/assets/images/portfolio_oromo_celebration_1791912460722.jpg',
    colSpan: 'lg:col-span-6',
    exif: {
      lens: '50mm f/1.2 Master',
      aperture: 'f/2.0',
      shutter: '1/1250s',
      iso: '100',
      lighting: 'Natural Diffused Sunset Glow over Burayu',
    },
    location: 'Scenic Gardens, Burayu, Ethiopia',
    description: 'Breathtaking Ethiopian traditional gown showcasing intricate embroidery, vibrant Callee beadwork, forehead headpiece, and warm authentic smile in Burayu greenery.',
    featured: true,
  },
  {
    id: 'g-traditional-maroon',
    title: 'Royal Maroon Attire · Ceremonial Staff',
    category: 'traditional',
    categoryLabel: 'Ethiopian Traditional & Heritage',
    image: '/src/assets/images/portfolio_traditional_cultural_1791911977871.jpg',
    colSpan: 'lg:col-span-4',
    exif: {
      lens: '85mm f/1.4 Portrait',
      aperture: 'f/1.8',
      shutter: '1/1000s',
      iso: '100',
      lighting: 'Lush Forest Soft Diffused Sunlight',
    },
    location: 'Burayu Forest Path, Mariam, Ethiopia',
    description: 'Deep maroon cultural traditional dress with geometric beadwork collar, ceremonial staff, and matching cultural headpiece photographed in Burayu natural park.',
    featured: true,
  },
  {
    id: 'g-male-studio',
    title: 'Warm Earth Signature · Studio Stool',
    category: 'indoor',
    categoryLabel: 'Indoor Studio',
    image: '/src/assets/images/portfolio_male_studio_1791911974699.jpg',
    colSpan: 'lg:col-span-4',
    exif: {
      lens: '85mm f/1.4 GM',
      aperture: 'f/2.0',
      shutter: '1/200s',
      iso: '100',
      lighting: 'Profoto Softbox 45° Key + Warm Earth Backdrop',
    },
    location: 'Alpha Studio Main Hall, Burayu Mariam, Ethiopia',
    description: 'Crisp contemporary indoor studio portrait celebrating warm skin tones, stylish casual jacket, and soft directional studio strobe lighting.',
    featured: true,
  },
  {
    id: 'g-bw-fashion',
    title: 'Monochrome High Stool · Studio Editorial',
    category: 'indoor',
    categoryLabel: 'Indoor Studio',
    image: '/src/assets/images/portfolio_bw_fashion_1791911975854.jpg',
    colSpan: 'lg:col-span-4',
    exif: {
      lens: '50mm f/1.2 Art',
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: '100',
      lighting: 'High-Contrast Silver Beauty Dish + Gradient Gray Backdrop',
    },
    location: 'Alpha Studio Stage B, Burayu Mariam, Ethiopia',
    description: 'Iconic black and white studio portrait on tall vintage stool. Tailored double-breasted dress and boots with rich silver tones and clean shadows.',
    featured: true,
  },
  {
    id: 'g-grad-confetti',
    title: 'Triumph & Confetti · Graduation Celebration',
    category: 'graduation',
    categoryLabel: 'Graduation & Milestones',
    image: '/src/assets/images/portfolio_grad_confetti_1791911977470.jpg',
    colSpan: 'lg:col-span-6',
    exif: {
      lens: '24-70mm f/2.8 II',
      aperture: 'f/2.8',
      shutter: '1/2000s',
      iso: '200',
      lighting: 'High-Speed Sync Fill Flash + Natural Sunlight',
    },
    location: 'Burayu Garden Amphitheater, Ethiopia',
    description: 'High-speed freezing of celebration confetti burst in mid-air. Radiant smiles, academic cap, and vibrant outdoor festive energy.',
    featured: true,
  },
  {
    id: 'g-grad-steps',
    title: 'Academic Milestone · Over-the-Shoulder',
    category: 'graduation',
    categoryLabel: 'Graduation & Milestones',
    image: '/src/assets/images/portfolio_grad_over_shoulder_1791911976006.jpg',
    colSpan: 'lg:col-span-6',
    exif: {
      lens: '105mm f/1.4 Bokeh Master',
      aperture: 'f/1.4',
      shutter: '1/1250s',
      iso: '80',
      lighting: 'Afternoon Backlit Sunlight + Golden Stone Reflection',
    },
    location: 'Campus Stone Steps, Burayu, Ethiopia',
    description: 'Classic over-the-shoulder university graduation portrait holding diploma degree folder, black academic cap, and crimson sash.',
    featured: true,
  },
];

interface PortfolioGalleryProps {
  onBookSession: () => void;
  triggerGlobalFlash: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onBookSession,
  triggerGlobalFlash,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'traditional' | 'indoor' | 'graduation'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, number>>({
    'g-oromo-wandaboo': 348,
    'g-oromo-festive': 295,
    'g-traditional-maroon': 312,
    'g-male-studio': 198,
    'g-bw-fashion': 247,
    'g-grad-confetti': 285,
    'g-grad-steps': 226,
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const filteredItems = activeFilter === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeFilter);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserLiked((prev) => {
      const isLiked = !!prev[id];
      const updated = !isLiked;
      setFavorites((fPrev) => ({
        ...fPrev,
        [id]: (fPrev[id] || 0) + (updated ? 1 : -1),
      }));
      return { ...prev, [id]: updated };
    });
  };

  const handleOpenItem = (item: GalleryItem) => {
    shutterAudio.playShutterSound();
    triggerGlobalFlash();
    setSelectedItem(item);
  };

  const handleShare = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="portraits" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Official Alpha Studio Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Burayu, Mariam, Ethiopia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ethiopian Traditional & Modern Portraits
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
              Explore authentic portrait sessions photographed right here at <strong className="text-white">Alpha Studio</strong> in Burayu, Mariam—celebrating every cultural tradition in Ethiopia (Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, Gojjam, Wollo, Tigray, Harar, Sidama, Wolaita, and more) as well as contemporary modern dress.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'traditional', label: 'Traditional (All Regions)' },
              { id: 'indoor', label: 'Indoor Studio' },
              { id: 'graduation', label: 'Graduation & Modern' },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id as typeof activeFilter);
                    shutterAudio.playShutterSound();
                  }}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryTabPill"
                      className="absolute inset-0 bg-red-600 rounded-lg shadow-md shadow-red-600/30 -z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Media Bento Grid with Staggered Scroll-Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.65,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => handleOpenItem(item)}
              className={`${item.colSpan || 'lg:col-span-6'} group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 cursor-pointer shadow-xl hover:border-red-600/60 hover:shadow-2xl hover:shadow-red-950/30 transition-all`}
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80';
                  }}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/10">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>Burayu Mariam, Ethiopia</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShare(item, e)}
                      title="Copy link"
                      className="p-1.5 bg-black/60 backdrop-blur-md rounded-md hover:bg-black/90 transition-colors border border-white/10 text-neutral-300 hover:text-white"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] hover:bg-black/90 transition-colors border border-white/10"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          userLiked[item.id] ? 'fill-red-500 text-red-500' : 'text-neutral-300'
                        }`}
                      />
                      <span className="tabular-nums font-mono font-medium">{favorites[item.id]}</span>
                    </button>
                  </div>
                </div>

                {/* Authentic Studio Watermark Tag in Corner */}
                <div className="absolute right-3 bottom-24 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none select-none">
                  <div className="bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5 shadow-md">
                    <span className="text-[9px] font-bold tracking-widest text-white uppercase font-sans">
                      ALPHA STUDIO
                    </span>
                    <span className="text-[8px] font-mono text-red-400 font-bold">0939390867</span>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="text-[11px] font-mono text-red-400 font-bold tracking-wider uppercase mb-1">
                    {item.categoryLabel} · {item.exif.lens}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Sheen sweep animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheen" />
                </div>

                {/* Viewfinder Corner Brackets that appear on hover */}
                <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500/80" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500/80" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500/80" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500/80" />
                </div>

                {/* Center Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-red-600/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl backdrop-blur-md">
                    <Crosshair className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Inspect Focus & EXIF</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll-Revealed CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 text-left max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
              <Award className="w-4 h-4" />
              <span>Burayu Mariam Photography Destination</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Book Your Traditional or Modern Dress Shoot Today
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
              Choose from any traditional dress across Ethiopia—<strong className="text-white">Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, Gojjam, Wollo, Tigray, Harar, Sidama, Wolaita</strong>, or sleek <strong className="text-white">Modern Attire</strong>. Complete with our vanity dressing suite and scenic outdoor shoots in Burayu Mariam.
            </p>
            {/* Quick Ethnic Tradition Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {[
                'Gurage',
                'Arsi',
                'Wollega',
                'Illu Ababor',
                'Jimma',
                'Gonder',
                'Gojjam',
                'Wollo',
                'Tigray',
                'Modern Dress',
              ].map((style) => (
                <span
                  key={style}
                  className="px-2 py-0.5 text-[10px] font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-md"
                >
                  {style}
                </span>
              ))}
              <span className="text-[10px] text-neutral-500 italic">+ Any Ethiopian Ethnic Attire</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
            <button
              onClick={onBookSession}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/30 whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Your Session</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl max-h-[94vh] flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: Big Media View */}
              <div className="lg:w-3/5 bg-black flex items-center justify-center relative overflow-hidden max-h-[55vh] lg:max-h-none">
                <img
                  src={selectedItem.image}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80';
                  }}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />

                {/* Studio watermark overlay in modal */}
                <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-widest font-sans">
                    ALPHA STUDIO
                  </span>
                  <span className="text-xs font-mono text-red-500 font-bold">0939390867</span>
                </div>
              </div>

              {/* Right: Technical EXIF & Portrait Notes */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
                      {selectedItem.categoryLabel}
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{selectedItem.location}</span>
                  </div>

                  {/* EXIF Data Panel */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Camera & Strobe Specs (EXIF)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 block">OPTICAL LENS</span>
                        <span className="text-neutral-200 font-bold">{selectedItem.exif.lens}</span>
                      </div>
                      <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 block">APERTURE</span>
                        <span className="text-red-400 font-bold">{selectedItem.exif.aperture}</span>
                      </div>
                      <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 block">SHUTTER SPEED</span>
                        <span className="text-neutral-200 font-bold">{selectedItem.exif.shutter}</span>
                      </div>
                      <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 block">ISO SPEED</span>
                        <span className="text-neutral-200 font-bold">{selectedItem.exif.iso}</span>
                      </div>
                    </div>
                    <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80 text-xs">
                      <span className="text-[10px] font-mono text-neutral-500 block">LIGHTING ARRANGEMENT</span>
                      <span className="text-neutral-300 text-[11px]">{selectedItem.exif.lighting}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onBookSession();
                    }}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 text-center"
                  >
                    Book This Style Session
                  </button>
                  <a
                    href="tel:0939390867"
                    className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-all border border-neutral-800 text-center"
                  >
                    Call Photographer: 0939390867
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
