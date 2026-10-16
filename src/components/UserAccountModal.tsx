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
  const [bookings, setBookings] = useState<any[]>([]);
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
      // Fetch user bookings from Firestore
      const bookingsRef = collection(db, 'bookings');
      const qBookings = query(bookingsRef, where('userId', '==', user.uid));
      const snap = await getDocs(qBookings);
      const userBookings = snap.docs.map((d) => d.data());
      setBookings(userBookings);
    } catch (err) {
      console.warn('Error fetching Firestore user records:', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#111114] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10"
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
                {user && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-red-950 text-red-400 border border-red-800/80 rounded-md">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {user ? user.email : 'Sign in with Google to sync your bookings and portrait sessions'}
              </p>
            </div>
          </div>

          <div>
            {user ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {user ? (
          <div className="pt-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>My Studio Bookings ({bookings.length})</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
              >
                + New Booking
              </button>
            </div>

            {loadingData ? (
              <div className="text-center py-10 space-y-2">
                <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400">Loading your studio data from Firestore...</p>
              </div>
            ) : (
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
                        Reserve your indoor, outdoor, or cultural traditional dress shoot in Burayu Mariam.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      Book a Session
                    </button>
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
                Connect your account securely using Firebase Auth to keep track of your portrait sessions, view appointment statuses, and manage your studio reservations in Burayu Mariam.
              </p>
            </div>
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
