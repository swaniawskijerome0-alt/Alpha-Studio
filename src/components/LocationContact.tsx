import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Car,
  ExternalLink,
  Bus,
  Copy,
  Check,
  Compass,
  Sparkles,
  Send,
} from 'lucide-react';
import { Logo } from './Logo.tsx';

interface LocationContactProps {
  onBookClick: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onBookClick }) => {
  const [mapView, setMapView] = useState<'google' | 'landmarks' | 'scenic'>('google');
  const [copiedCoords, setCopiedCoords] = useState(false);

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Burayu+Mariam+Ethiopia';
  const coordinatesText = '9.0617° N, 38.6495° E';

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText('9.0617, 38.6495');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <section id="location" className="py-24 bg-[#0a0a0a] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Studio Location</span>
            <span aria-hidden="true">·</span>
            <span>Burayu, Mariam, Ethiopia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Visit Alpha Studio in Burayu, Mariam
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Located at <strong className="text-white">Burayu, Mariam (Ethiopia)</strong> in Oromia, just minutes from western Addis Ababa. Complete with professional indoor strobe stages, a traditional & modern dress vanity dressing suite, and free private parking.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Studio Details & Direct Contact */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Studio Logo Badge */}
              <div className="pb-4 border-b border-neutral-800/80">
                <Logo size="md" variant="dark" />
              </div>

              {/* Exact Physical Address Card */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Physical Address & Landmarks
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Burayu, Mariam, Ethiopia
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      Near Burayu Mariam Church (Qulqulluu Maariyaam Burayyuu), along the main paved Burayu avenue. Only 15 minutes west from Winget square & Autobis Tera (Addis Ababa).
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={handleCopyCoords}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-[11px] font-mono text-neutral-300 transition-colors"
                        title="Click to copy GPS coordinates"
                      >
                        {copiedCoords ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Coordinates Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-400" />
                            <span>GPS: {coordinatesText}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Telephone Line */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Direct Studio Phone Line
                    </span>
                    <a
                      href="tel:0939390867"
                      className="text-2xl font-mono font-bold text-white hover:text-red-500 transition-colors inline-block mt-0.5"
                    >
                      0939390867
                    </a>
                    <span className="text-xs text-neutral-400 block mt-0.5">
                      Calls & inquiries open daily · Ethio Telecom direct
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-900 text-neutral-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Operating Hours
                    </span>
                    <div className="text-xs font-semibold text-neutral-200 mt-0.5 space-y-0.5">
                      <p>Monday – Saturday: 8:30 AM – 8:00 PM</p>
                      <p>Sunday: 9:00 AM – 7:30 PM (Golden Hour Sessions)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit & Commute Info */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Getting to Burayu Mariam
                </span>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <Bus className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Minibus / Public Transport:</strong> Regular direct minibuses run continuously from Winget, Merkato, and Autobis Tera straight to <em>Burayu Mariam</em>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>By Personal Vehicle / Ride:</strong> Follow the main paved road towards Ambo; dedicated customer parking is available right in front of our studio building.
                    </span>
                  </div>
                </div>
              </div>

              {/* Studio Amenities */}
              <div className="pt-3 border-t border-neutral-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Studio Facilities at Burayu Mariam
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Traditional & Modern Vanity Room</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Private Dressing Suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Free Client Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Air-Conditioned Lounge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row gap-3">
              <a
                href="https://t.me/Gmichael_1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#229ED9]/30 flex items-center justify-center gap-2"
                title="Direct Telegram Chat: @Gmichael_1"
              >
                <Send className="w-4 h-4" />
                <span>Telegram: @Gmichael_1</span>
              </a>
              <a
                href="tel:0939390867"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call 0939390867</span>
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                <span>Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Burayu, Mariam Ethiopia Map Card */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Header above map with view switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Burayu, Mariam · Oromia, Ethiopia
                  </h3>
                  <span className="text-[11px] text-neutral-400 block">
                    Lat 9.0617° N · Long 38.6495° E
                  </span>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs w-full sm:w-auto">
                <button
                  onClick={() => setMapView('google')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    mapView === 'google'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Interactive Map
                </button>
                <button
                  onClick={() => setMapView('landmarks')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    mapView === 'landmarks'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Transit & Route
                </button>
                <button
                  onClick={() => setMapView('scenic')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    mapView === 'scenic'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Scenic Spots
                </button>
              </div>
            </div>

            {/* Map Frame Container */}
            <div className="relative w-full h-[380px] sm:h-[430px] rounded-2xl overflow-hidden border border-neutral-800 bg-[#121216]">
              {mapView === 'google' && (
                /* Live Embedded Google Maps focused directly on Burayu, Mariam, Ethiopia */
                <iframe
                  title="Burayu Mariam Ethiopia Location Map"
                  src="https://maps.google.com/maps?q=Burayu,Mariam,Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              )}

              {mapView === 'landmarks' && (
                /* Stylized artistic transit map from Addis Ababa / Winget to Burayu Mariam */
                <div className="relative w-full h-full flex flex-col justify-between p-6 bg-[#131318]">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

                  {/* SVG Road Paths */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Main highway from Addis Ababa / Winget */}
                    <path
                      d="M -30 320 Q 180 260 380 230 T 780 180"
                      stroke="#2f2f3d"
                      strokeWidth="28"
                      fill="none"
                    />
                    <path
                      d="M -30 320 Q 180 260 380 230 T 780 180"
                      stroke="#dc2626"
                      strokeWidth="4"
                      strokeDasharray="10 8"
                      fill="none"
                    />

                    {/* Mariam church junction branch */}
                    <path
                      d="M 380 50 L 380 390"
                      stroke="#262633"
                      strokeWidth="20"
                      fill="none"
                    />
                    <path
                      d="M 380 50 L 380 390"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      fill="none"
                    />
                  </svg>

                  {/* Top landmark bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="bg-black/90 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded-xl text-left">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                        Addis Ababa (Winget / Autobis Tera)
                      </span>
                      <span className="text-xs font-semibold text-neutral-300">
                        Departure Corridor → 15 Min Drive
                      </span>
                    </div>

                    <div className="bg-black/90 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded-xl text-right">
                      <span className="text-[10px] font-mono uppercase text-red-400 block font-bold">
                        Burayu Mariam Church
                      </span>
                      <span className="text-xs font-semibold text-neutral-300">
                        Historical Landmark Anchor
                      </span>
                    </div>
                  </div>

                  {/* Central studio pin */}
                  <div className="relative z-10 flex flex-col items-center my-auto">
                    <div className="p-4 bg-red-600 text-white rounded-2xl shadow-2xl shadow-red-600/60 flex items-center justify-center border-2 border-white animate-bounce">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="mt-2 bg-black/95 backdrop-blur-md border border-red-600/60 px-5 py-2.5 rounded-2xl shadow-2xl text-center">
                      <span className="text-base font-black text-white tracking-wide block">
                        ALPHA STUDIO
                      </span>
                      <span className="text-xs text-red-400 font-bold block font-mono">
                        Burayu, Mariam, Ethiopia
                      </span>
                      <span className="text-[11px] text-neutral-300 font-semibold mt-0.5 block">
                        Phone: 0939390867
                      </span>
                    </div>
                  </div>

                  {/* Bottom route summary */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-neutral-300 bg-black/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-800">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Compass className="w-3.5 h-3.5 text-red-500" />
                      Direct paved road access with private customer parking on-site
                    </span>
                    <span className="font-mono text-red-400 font-bold text-[11px]">
                      Burayu Town · Oromia
                    </span>
                  </div>
                </div>
              )}

              {mapView === 'scenic' && (
                /* Scenic Outdoor Portrait Spots around Burayu Mariam */
                <div className="relative w-full h-full p-6 bg-[#131318] flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        Nearby Outdoor Shoot Spots in Burayu
                      </h4>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-white">1. Burayu Mariam Church & Pine Groves</strong>
                          <span className="text-[10px] text-red-400 font-mono">2 Min from Studio</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Towering evergreen eucalyptus and pine groves with soft filtered sunbeams. Perfect for traditional Wandaboo cultural dress and graduation gowns.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-white">2. Gefersa Reservoir Scenic Sunset Ridge</strong>
                          <span className="text-[10px] text-amber-400 font-mono">8 Min from Studio</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Breathtaking waterside horizons, open skies, and golden hour backlight reflection. Ideal for couples, bridal, and editorial outdoor portraits.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-white">3. Burayu Terraced Green Hills</strong>
                          <span className="text-[10px] text-emerald-400 font-mono">5 Min from Studio</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Vibrant rolling green topography with scenic walking paths. Incredible natural depth with creamy 85mm f/1.4 lens bokeh.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>All outdoor shoots include transportation coordination from the studio</span>
                    <button
                      onClick={onBookClick}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[11px] uppercase tracking-wider"
                    >
                      Book Shoot
                    </button>
                  </div>
                </div>
              )}

              {/* Floating badges on top of map container */}
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono text-neutral-200 flex items-center gap-2 pointer-events-none">
                <Navigation className="w-3.5 h-3.5 text-red-500" />
                <span>Burayu, Mariam, Ethiopia</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono text-neutral-200 flex items-center gap-2 pointer-events-none">
                <Car className="w-3.5 h-3.5 text-emerald-400" />
                <span>On-Site Studio Parking</span>
              </div>
            </div>

            {/* Directions assistance bar below map */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-bold text-white block">Directions to Alpha Studio (Burayu Mariam)</span>
                <span className="text-neutral-400 text-[11px]">
                  Coming from Addis Ababa (Winget / Autobis Tera)? Follow the main road to Burayu Mariam junction and look for the Alpha Studio red camera sign.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-md shadow-red-600/20"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
