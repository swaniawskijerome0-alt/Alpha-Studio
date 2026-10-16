/**
 * Realistic Camera Shutter Audio Generator using Web Audio API.
 * Synthesizes a mechanical DSLR / mirrorless shutter click without any external audio asset dependencies.
 */
class ShutterAudioEngine {
  private ctx: AudioContext | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playShutterSound() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. First curtain click (high snap)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      // Noise burst for mechanical texture
      const bufferSize = this.ctx.sampleRate * 0.06;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Second curtain click (mechanical closure after 70ms)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      const closeTime = now + 0.07;
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(950, closeTime);
      osc2.frequency.exponentialRampToValueAtTime(60, closeTime + 0.05);

      gain2.gain.setValueAtTime(0.6, closeTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, closeTime + 0.06);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(closeTime);
      osc2.stop(closeTime + 0.06);
    } catch {
      // Audio playback fails gracefully if muted or disallowed by browser
    }
  }
}

export const shutterAudio = new ShutterAudioEngine();
