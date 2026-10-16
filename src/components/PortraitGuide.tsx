import React, { useState } from 'react';
import { Sparkles, Shirt, Palette, Smile, Camera, Award } from 'lucide-react';

export const PortraitGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'oromo' | 'outfits' | 'colors' | 'posing' | 'checklist'>('oromo');

  const guides = {
    oromo: {
      title: 'Ethiopian Traditional & Modern Dress Preparation',
      subtitle: 'Everything you need to know for your traditional attire (Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder) or modern dress session',
      tips: [
        {
          label: 'Regional Attires (Gurage, Arsi, Wollega, Gonder & More)',
          text: 'Whether you are wearing Gurage embroidered dresses, Arsi & Wollega Wandaboo gowns, Jimma cultural velvet, or Gonder Habesha Kemis with fine Tibeb embroidery, iron or steam your pieces before arrival. You can also finish steaming in our private dressing suite.',
        },
        {
          label: 'Beads, Headpieces & Ceremonial Props',
          text: 'Bring your complete regional accessories—beaded Callee necklaces, silver/gold forehead headpieces, Netela or Gabi shawls, and ceremonial Siqqee or Chaachuu staffs. Our vanity mirror has daylight-balanced lighting for delicate placement.',
        },
        {
          label: 'Traditional + Modern Dual Outfits',
          text: 'Clients love combining their traditional heritage outfit with a second modern high-fashion look (evening gown, sleek suit, or casual chic). You can switch looks effortlessly in our private vanity suite.',
        },
      ],
    },
    outfits: {
      title: 'What to Wear for Indoor vs Outdoor Sessions',
      subtitle: 'Wardrobe strategies for crisp studio strobes and natural sunlight',
      tips: [
        {
          label: 'Indoor Studio Sessions',
          text: 'Solid rich colors, structured blazers, textured knits, and elegant silhouettes look immaculate under studio strobes. Avoid busy micro-stripes which cause optical moiré.',
        },
        {
          label: 'Outdoor Golden Hour',
          text: 'Flowing fabrics, earth tones (olive, terracotta, cream, mustard), and layers that catch the natural breeze in Burayu hills. Movement creates breathtaking candid moments.',
        },
        {
          label: 'Multiple Outfits',
          text: 'Bring 2–3 options on hangers. You can transition from a sharp professional look to a relaxed casual or cultural attire easily in our private dressing suite.',
        },
      ],
    },
    colors: {
      title: 'Studio Color Harmony & Palette Guide',
      subtitle: 'Coordinating tones with our backdrops and natural light',
      tips: [
        {
          label: 'Best Tones for Dark Backdrops',
          text: 'Emerald green, deep burgundy, navy, jewel tones, and crisp white create stunning high-contrast separation on our dark velvet backgrounds.',
        },
        {
          label: 'Golden Hour Harmony',
          text: 'Warm neutrals, creams, burnt oranges, soft pastels, and metallic accents glow magically when backlit by natural sunset over Burayu.',
        },
        {
          label: 'Accessories & Jewelry',
          text: 'Gold, silver, and traditional beads catch studio catchlights beautifully. Bring your favorite watches, statement earrings, or heirloom jewelry.',
        },
      ],
    },
    posing: {
      title: 'Posing & Expression Guidance',
      subtitle: 'Natural coaching from our master photographers',
      tips: [
        {
          label: 'Zero Pressure Guidance',
          text: 'Never worry about not knowing how to pose! Our master photographers direct every micro-angle: jawline placement, posture, and hands.',
        },
        {
          label: 'The Natural Jawline Secret',
          text: 'Slightly extending your forehead toward the camera creates a clean, defined jawline and eliminates unflattering shadows under the chin.',
        },
        {
          label: 'Authentic Smiles',
          text: 'We shoot between movements, capturing real laughter, quiet contemplation, and confident gazes instead of stiff frozen poses.',
        },
      ],
    },
    checklist: {
      title: 'Pre-Session Preparation Checklist',
      subtitle: 'Ensuring your shoot day is seamless and relaxed',
      tips: [
        {
          label: 'The Night Before',
          text: 'Stay hydrated and get a restful sleep to keep eyes bright and skin radiant. Steam or iron your chosen outfits in advance.',
        },
        {
          label: 'Hair & Makeup',
          text: 'Arrive with hair and makeup ready or 20 minutes prior if you wish to use our lighted vanity mirror for touch-ups in Burayu Mariam.',
        },
        {
          label: 'Arrival at Burayu Mariam',
          text: 'Arrive 10 minutes before your slot to relax, enjoy a complimentary refreshment, and review the creative shot list with your photographer.',
        },
      ],
    },
  };

  const current = guides[activeTab];

  return (
    <section className="py-20 bg-[#0c0c0e] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Studio Guide</span>
            <span aria-hidden="true">·</span>
            <span>Alpha Studio Burayu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Help You Create Stunning Portraits
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            From Ethiopian traditional heritage attire (Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, etc.) to modern studio fashion, our expert preparation guidance guarantees picture-perfect results.
          </p>

          {/* Interactive tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab('oromo')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'oromo'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Traditional & Modern Attire</span>
            </button>
            <button
              onClick={() => setActiveTab('outfits')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'outfits'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>Outfit Advice</span>
            </button>
            <button
              onClick={() => setActiveTab('colors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'colors'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Color Harmony</span>
            </button>
            <button
              onClick={() => setActiveTab('posing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'posing'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Posing & Direction</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Shoot Day Checklist</span>
            </button>
          </div>
        </div>

        {/* Guide Content Display */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {current.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {current.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {current.tips.map((tip, idx) => (
              <div key={idx} className="bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-mono text-red-500 font-bold uppercase tracking-wider block">
                  Tip {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white">{tip.label}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>

          {activeTab === 'oromo' && (
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-amber-950/30 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-300">
                <span className="font-bold text-white block">Special Cultural & Styling Offer:</span>
                Complimentary 20-minute vanity suite preparation with steam iron, mirrors, and dressing room included with every Ethiopian Traditional or Modern Dress session.
              </div>
              <a
                href="tel:0939390867"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl whitespace-nowrap transition-colors"
              >
                Inquire via 0939390867
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
