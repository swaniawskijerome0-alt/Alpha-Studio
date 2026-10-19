import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Calendar,
  LogOut,
  LogIn,
  Clock,
  Shirt,
  Sparkles,
  Camera,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { db } from '../lib/firebase.ts';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const { user, signIn, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'snapshots'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadUserData();
    }
  }, [isOpen, user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      const isStudioOwner = user.email === 'swaniawskijerome0@gmail.com';

      // 1. Fetch bookings from Firestore
      const bookingsRef = collection(db, 'bookings');
      const qBookings = isStudioOwner
        ? query(bookingsRef)
        : query(bookingsRef, where('userId', '==', user.uid));
      const snapBookings = await getDocs(qBookings);
      setBookings(snapBookings.docs.map((d) => d.data()));

      // 2. Fetch snapshots from Firestore
      const snapshotsRef = collection(db, 'snapshots');
      const qSnapshots = isStudioOwner
        ? query(snapshotsRef)
        : query(snapshotsRef, where('userId', '==', user.uid));
      const snapSnaps = await getDocs(qSnapshots);
      setSnapshots(snapSnaps.docs.map((d) => d.data()));
    } catch (err) {
      console.warn('Error fetching Firestore user records:', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (!isOpen) return null;

  const isOwner = user?.email === 'swaniawskijerome0@gmail.com';

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#111114] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3.5">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-14 h-14 rounded-2xl border-2 border-red-500/80 object-cover shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user?.displayName ? user.displayName[0] : <User className="w-6 h-6" />}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {user ? user.displayName || 'Alpha Studio Client' : 'Studio Guest Account'}
                </h3>
                {isOwner ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800/80 rounded-md">
                    Studio Director
                  </span>
                ) : user ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-red-950 text-red-400 border border-red-800/80 rounded-md">
                    Verified
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {user ? user.email : 'Sign in with Google to sync your bookings and portrait sessions'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://t.me/Gmichael_1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#229ED9]/20 hover:bg-[#229ED9] text-[#64B5F6] hover:text-white rounded-lg text-xs font-semibold border border-[#229ED9]/40 transition-colors"
              title="Chat directly with Bereket"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@Gmichael_1</span>
            </a>

            {user ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {user ? (
          <div className="pt-6">
            {/* Tabs */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80 gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bookings ({bookings.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('snapshots')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'snapshots'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Captured Snaps ({snapshots.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                + New Booking
              </button>
            </div>

            {loadingData ? (
              <div className="text-center py-10 space-y-2">
                <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400">Loading your studio data from Firestore...</p>
              </div>
            ) : activeTab === 'bookings' ? (
              /* Bookings list */
              <div>
                {bookings.length > 0 ? (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {bookings.map((b, i) => (
                      <div
                        key={b.id || i}
                        className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{b.sessionType}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              {b.status || 'Confirmed'}
                            </span>
                          </div>
                          <div className="text-neutral-300 flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-red-500" />
                              {b.date || 'Upcoming'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-red-500" />
                              {b.timeSlot}
                            </span>
                            {(b.specificAttire || b.attireCategory) && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="flex items-center gap-1">
                                  <Shirt className="w-3 h-3 text-red-500" />
                                  {b.specificAttire || b.attireCategory}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-neutral-500 block">Location</span>
                          <span className="text-xs text-neutral-300 font-semibold">Burayu, Mariam</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-3 bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-800">
                    <Calendar className="w-8 h-8 text-neutral-500 mx-auto" />
                    <div>
                      <h4 className="text-sm font-bold text-white">No active reservations yet</h4>
                      <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                        Reserve your indoor, outdoor (from 6,000 ETB), or cultural dress shoot in Burayu Mariam.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Book a Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Snapshots list */
              <div>
                {snapshots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                    {snapshots.map((s, i) => (
                      <div
                        key={s.id || i}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group shadow-md"
                      >
                        <div className="aspect-square bg-black overflow-hidden relative">
                          <img
                            src={s.imageUrl}
                            alt="Captured portrait"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400">
                            Stored in DB
                          </div>
                        </div>
                        <div className="p-2 text-left">
                          <span className="text-[10px] font-bold text-white block truncate">
                            {s.clientName || 'Client Photo'}
                          </span>
                          <span className="text-[9px] text-neutral-400 block truncate">
                            {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-3 bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-800">
                    <Camera className="w-8 h-8 text-neutral-500 mx-auto" />
                    <div>
                      <h4 className="text-sm font-bold text-white">No camera snapshots yet</h4>
                      <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                        Touch the camera snapshot button in the studio viewfinder to capture your photo and store it directly in our database.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Unauthenticated State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto border border-red-600/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Sign In with Google</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Connect your account to view your confirmed portrait bookings, captured studio camera snapshots, and direct messages with Architect Bereket.
              </p>
            </div>
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl hover:bg-neutral-200 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-red-600" />
              <span>Sign In with Google Account</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
