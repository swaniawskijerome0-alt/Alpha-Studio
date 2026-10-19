import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Camera,
  RefreshCw,
  Send,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  Upload,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';
import { db } from '../lib/firebase.ts';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.tsx';

interface LiveCameraSnapModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerGlobalFlash: () => void;
}

export const LiveCameraSnapModal: React.FC<LiveCameraSnapModalProps> = ({
  isOpen,
  onClose,
  triggerGlobalFlash,
}) => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const [clientName, setClientName] = useState(user?.displayName || '');
  const [clientPhone, setClientPhone] = useState('');
  const [note, setNote] = useState('Inquiry for Outdoor / Studio Session');
  const [isSaving, setIsSaving] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSentSuccess(false);
      setCapturedImage(null);
      if (!clientName && user?.displayName) {
        setClientName(user.displayName);
      }
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async (facing: 'user' | 'environment') => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this device/browser');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: unknown) {
      console.warn('Camera access unavailable:', err);
      setIsCameraActive(false);
      setCameraError('Camera access unavailable or permission denied. You can take or upload a photo below.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
  };

  // Capture frame from video feed
  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    shutterAudio.playShutterSound();
    triggerGlobalFlash();

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    // Scale to max 800px width/height for fast transmission & optimal Firestore document storage
    const maxDim = 800;
    let targetWidth = width;
    let targetHeight = height;
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        targetWidth = maxDim;
        targetHeight = Math.round((height / width) * maxDim);
      } else {
        targetHeight = maxDim;
        targetWidth = Math.round((width / height) * maxDim);
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // If user facing camera, mirror it horizontally like a real selfie viewfinder
      if (facingMode === 'user') {
        ctx.translate(targetWidth, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      setCapturedImage(dataUrl);
    }
  };

  // Upload fallback if camera is not preferred or denied
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    shutterAudio.playShutterSound();
    triggerGlobalFlash();

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        const maxDim = 800;
        let targetWidth = img.width;
        let targetHeight = img.height;
        if (img.width > maxDim || img.height > maxDim) {
          if (img.width > img.height) {
            targetWidth = maxDim;
            targetHeight = Math.round((img.height / img.width) * maxDim);
          } else {
            targetHeight = maxDim;
            targetWidth = Math.round((img.width / img.height) * maxDim);
          }
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setCapturedImage(dataUrl);
        }
      };
      img.src = uploadEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsSentSuccess(false);
    if (!isCameraActive) {
      startCamera(facingMode);
    }
  };

  // Direct save to Firestore database
  const handleSendToDatabase = async () => {
    if (!capturedImage) return;
    setIsSaving(true);
    shutterAudio.playShutterSound();

    try {
      const snapshotId = `snap_${Date.now()}`;
      await setDoc(doc(db, 'snapshots', snapshotId), {
        id: snapshotId,
        imageUrl: capturedImage,
        clientName: clientName.trim() || user?.displayName || 'Studio Client',
        clientPhone: clientPhone.trim() || 'N/A',
        userId: user ? user.uid : 'guest_client',
        userEmail: user?.email || '',
        note: note.trim() || 'Direct photo capture via Alpha Studio camera',
        status: 'received',
        createdAt: new Date().toISOString(),
      });

      setIsSentSuccess(true);
    } catch (err) {
      console.error('Error saving snapshot to Firestore:', err);
      alert('Unable to store snapshot to database right now. Please message Bereket directly on Telegram @Gmichael_1.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#101014] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-7 my-auto">
        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="user"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-neutral-800">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-500 mb-1">
            <Camera className="w-4 h-4" />
            <span>Alpha Studio Live Camera & Snapshot</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Direct Photo Capture & Database Store
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Capture your photo directly through our studio viewfinder. It will be sent straight to our database store for Architect Bereket to review!
          </p>
        </div>

        {/* Success State */}
        {isSentSuccess ? (
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">
                Photo Successfully Sent to Studio Database!
              </h4>
              <p className="text-xs text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your portrait has been stored in Alpha Studio's database. Architect Bereket Belay has received it and will follow up with your customized portrait session plan.
              </p>
            </div>

            {/* Preview of Stored Image */}
            {capturedImage && (
              <div className="max-w-[220px] mx-auto rounded-xl overflow-hidden border border-neutral-700 shadow-xl aspect-square bg-neutral-950">
                <img src={capturedImage} alt="Captured portrait" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Direct Telegram Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://t.me/Gmichael_1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#229ED9]/30"
              >
                <Send className="w-4 h-4" />
                <span>Chat with Bereket on Telegram: @Gmichael_1</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors"
              >
                Take Another
              </button>
            </div>
          </div>
        ) : (
          /* Capture / Preview Viewport */
          <div className="space-y-5 pt-4">
            {/* Viewfinder Monitor Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-neutral-800 aspect-[4/3] flex items-center justify-center shadow-2xl">
              {capturedImage ? (
                /* Still photo preview */
                <img
                  src={capturedImage}
                  alt="Captured snapshot preview"
                  className="w-full h-full object-cover"
                />
              ) : isCameraActive ? (
                /* Live camera stream */
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />
              ) : (
                /* Fallback if camera unavailable */
                <div className="p-6 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    {cameraError || 'Camera stream is loading or permission is requested...'}
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload or Take Photo</span>
                  </button>
                </div>
              )}

              {/* Viewfinder Overlay HUD */}
              <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <div className="bg-black/70 backdrop-blur px-2 py-0.5 rounded text-white flex items-center gap-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>ALPHA-CAM LIVE · BURAYU</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur px-2 py-0.5 rounded text-red-400 font-bold border border-white/10">
                    DIRECT DB SYNC
                  </div>
                </div>

                {/* Corner Framing Marks */}
                <div className="absolute inset-5 pointer-events-none">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50" />
                </div>

                {/* Flip camera control (if live camera active) */}
                {isCameraActive && !capturedImage && (
                  <div className="self-end pointer-events-auto">
                    <button
                      onClick={toggleCameraFacing}
                      className="p-2 rounded-lg bg-black/70 hover:bg-black text-white border border-white/15 transition-colors cursor-pointer"
                      title="Switch Front/Back Camera"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar Under Viewfinder */}
            {!capturedImage ? (
              <div className="flex items-center justify-center gap-3">
                {isCameraActive && (
                  <button
                    onClick={handleSnapPhoto}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 active:scale-95 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 animate-pulse" />
                    <span>Capture Snapshot Now</span>
                  </button>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose from Gallery</span>
                </button>
              </div>
            ) : (
              /* Review & Send to Database Form */
              <div className="space-y-4 bg-neutral-950 p-4 rounded-2xl border border-neutral-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Bereket / Client"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. 0939390867"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Inquiry / Session Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Outdoor Golden Hour (6,000 ETB) or Traditional shoot"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleRetake}
                    className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors cursor-pointer"
                  >
                    Retake Photo
                  </button>

                  <button
                    onClick={handleSendToDatabase}
                    disabled={isSaving}
                    className="flex-2 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Sending to Database...' : 'Send Direct to Database Store'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
