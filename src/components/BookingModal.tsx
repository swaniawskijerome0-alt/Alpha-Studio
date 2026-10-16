import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Sparkles,
  CheckCircle2,
  MapPin,
  Shirt,
} from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  triggerGlobalFlash: () => void;
}

const TRADITIONAL_REGIONS = [
  'Gurage Traditional Dress',
  'Arsi Traditional Dress',
  'Wollega Traditional Dress',
  'Illu Ababor Traditional Dress',
  'Jimma Traditional Dress',
  'Gonder Traditional Dress (Habesha Kemis / Kaba)',
  'Gojjam Traditional Dress',
  'Wollo Traditional Dress',
  'Tigray Traditional Dress (Tilfi)',
  'Harari Traditional Dress',
  'Sidama Traditional Dress',
  'Wolaita Traditional Dress',
  'Afar / Somali Traditional Attire',
  'Custom / Other Ethiopian Regional Attire',
];

const MODERN_STYLES = [
  'Modern Evening Gown & Formal Suit',
  'Modern Chic Casual & Streetwear',
  'Corporate & Executive Headshots',
  'Graduation Cap & Modern Gown',
  'Creative Editorial & Avant-Garde',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultPackage = 'Indoor Signature Studio',
  triggerGlobalFlash,
}) => {
  const getInitialPackage = (pkg: string) => {
    if (pkg.includes('Oromo') || pkg.includes('Traditional')) {
      return 'Traditional & Cultural Dress Session (Any Region)';
    }
    return pkg;
  };

  const [sessionType, setSessionType] = useState(() => getInitialPackage(defaultPackage));
  const [attireCategory, setAttireCategory] = useState<'traditional' | 'modern' | 'both'>('traditional');
  const [specificAttire, setSpecificAttire] = useState<string>('Gurage Traditional Dress');
  const [customAttireNote, setCustomAttireNote] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:30 AM');
  const [name, setName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSessionType(getInitialPackage(defaultPackage));
    }
  }, [isOpen, defaultPackage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    shutterAudio.playShutterSound();
    triggerGlobalFlash();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-xl w-full bg-[#111114] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-500 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve Your Shoot</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Book Session at Alpha Studio
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Burayu Mariam Studio (Ethiopia) · Direct Phone: 0939390867
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Session Type */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Select Session Experience
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="Signature Session with Bereket">Signature Session with Architect Bereket (Master Direction)</option>
                  <option value="Traditional & Cultural Dress Session (Any Region)">Traditional & Cultural Dress Session (Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, etc.)</option>
                  <option value="Modern Dress & High Fashion Session">Modern Dress & High Fashion Session</option>
                  <option value="Indoor Signature Studio">Indoor Signature Studio (Burayu Hall)</option>
                  <option value="Outdoor Golden Hour">Outdoor Golden Hour (Scenic Burayu)</option>
                  <option value="Alpha Elite Dual (Indoor + Outdoor)">Alpha Elite Dual (Indoor + Outdoor)</option>
                  <option value="Weddings & Celebrations">Weddings & Celebrations</option>
                  <option value="Executive & Model Headshots">Executive & Model Headshots</option>
                  <option value="Architectural & Space Documentation">Architectural & Space Documentation</option>
                </select>
              </div>

              {/* Attire & Dress Choice (Ethiopian Traditional vs Modern) */}
              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-red-500" />
                    <span>Choose Your Attire Style</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">Any Ethnic Region or Modern</span>
                </div>

                {/* Category Selector Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setAttireCategory('traditional');
                      setSpecificAttire('Gurage Traditional Dress');
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      attireCategory === 'traditional'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Traditional
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAttireCategory('modern');
                      setSpecificAttire('Modern Evening Gown & Formal Suit');
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      attireCategory === 'modern'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Modern Dress
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAttireCategory('both');
                      setSpecificAttire('Traditional + Modern Combination');
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      attireCategory === 'both'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Both Looks
                  </button>
                </div>

                {/* Quick Selection Pills */}
                {attireCategory === 'traditional' && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
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
                      ].map((region) => {
                        const fullName = `${region} Traditional Dress`;
                        const isSelected = specificAttire.startsWith(region);
                        return (
                          <button
                            key={region}
                            type="button"
                            onClick={() => setSpecificAttire(fullName)}
                            className={`px-2 py-1 text-[10px] font-medium rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-red-600/20 text-red-400 border-red-500'
                                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            {region}
                          </button>
                        );
                      })}
                    </div>

                    <select
                      value={specificAttire}
                      onChange={(e) => setSpecificAttire(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                    >
                      {TRADITIONAL_REGIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {attireCategory === 'modern' && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {['Evening Gown', 'Suit & Tie', 'Casual Chic', 'Graduation'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setSpecificAttire(style)}
                          className={`px-2 py-1 text-[10px] font-medium rounded-lg border transition-all ${
                            specificAttire.includes(style)
                              ? 'bg-red-600/20 text-red-400 border-red-500'
                              : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>

                    <select
                      value={specificAttire}
                      onChange={(e) => setSpecificAttire(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                    >
                      {MODERN_STYLES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {attireCategory === 'both' && (
                  <input
                    type="text"
                    value={customAttireNote}
                    onChange={(e) => setCustomAttireNote(e.target.value)}
                    placeholder="e.g. Gurage Traditional + Modern Evening Dress"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                )}
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>Time Window</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="09:00 AM">Morning Session (09:00 AM)</option>
                    <option value="11:30 AM">Midday Strobe (11:30 AM)</option>
                    <option value="02:30 PM">Afternoon Studio (02:30 PM)</option>
                    <option value="05:00 PM">Golden Sunset Hour (05:00 PM)</option>
                    <option value="06:30 PM">Evening Glamour (06:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Abebech / Daniel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Your Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 0939390867"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Special Notes / Styling Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your specific cultural tradition, dress accessories, number of people, or preferred backdrop colors..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30 active:scale-95"
                >
                  Confirm & Reserve Shoot
                </button>
                <a
                  href="tel:0939390867"
                  className="w-full sm:w-auto py-3 px-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span>Call Directly</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-600/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                RESERVATION RECEIVED
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                See You at Alpha Studio!
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Your appointment for{' '}
                <strong className="text-white">{sessionType}</strong> on{' '}
                <strong className="text-white">{date || 'Upcoming Date'} ({timeSlot})</strong> is recorded.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl text-left text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-neutral-300">
                <Shirt className="w-4 h-4 text-red-500 shrink-0" />
                <span>
                  Attire Selected:{' '}
                  <strong className="text-white">
                    {attireCategory === 'both'
                      ? customAttireNote || 'Traditional & Modern Dual Looks'
                      : specificAttire}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Location: Burayu, Mariam (Alpha Studio, Ethiopia)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>Our Studio Contact: 0939390867</span>
              </div>
              <div className="text-[11px] text-neutral-400 pt-1">
                Our master photographer will give you a quick confirmation call at {clientPhone} to discuss styling, vanity suite preparation, and transit.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="tel:0939390867"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Studio Now (0939390867)</span>
              </a>
              <button
                onClick={handleReset}
                className="py-3 px-5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
