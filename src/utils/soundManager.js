/**
 * AURELION Web Audio Synthesizer
 * Zero external audio files required. Clean procedural synthesizer.
 * Default: Sound OFF per user specification.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = false; // Default OFF
    this.volume = 0.25;
    this.humOsc = null;
    this.humGain = null;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (this.enabled) {
      this.initContext();
    } else {
      this.stopReactorHum();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.humGain && this.ctx) {
      this.humGain.gain.setValueAtTime(this.volume * 0.04, this.ctx.currentTime);
    }
  }

  // Crisp futuristic UI tap
  playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  // Terminal chirp
  playTerminal() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(960, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1440, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(this.volume * 0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  // Command Acknowledged (calm two-tone chime)
  playAcknowledge() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [
        { f: 659.25, time: 0 },
        { f: 880.00, time: 0.08 },
        { f: 1046.50, time: 0.16 }
      ].forEach(({ f, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + time);
        gain.gain.setValueAtTime(this.volume * 0.18, t + time);
        gain.gain.exponentialRampToValueAtTime(0.001, t + time + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + time);
        osc.stop(t + time + 0.18);
      });
    } catch {}
  }

  // Subsystem boot beep
  playBootStep(index = 0) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 440 + index * 110;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      gain.gain.setValueAtTime(this.volume * 0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // Cinematic Startup Power Pulse (Subtle reactor wake-up swell)
  playPowerPulse() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 1.2);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 1.4);
    } catch {}
  }

  // Cinematic Relay / Solenoid Latch
  playRelayClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'square';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(1800, t);
      osc2.frequency.setValueAtTime(320, t);
      gain.gain.setValueAtTime(this.volume * 0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.05);
      osc2.stop(t + 0.05);
    } catch {}
  }

  // Restrained HUD Scanning Tone
  playScanTone() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.linearRampToValueAtTime(1600, t + 0.18);
      gain.gain.setValueAtTime(this.volume * 0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {}
  }

  // Cinematic Navigation Destination Activation (Holographic warp chime)
  playNavActivate() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [
        { f: 523.25, time: 0 },    // C5
        { f: 659.25, time: 0.07 }, // E5
        { f: 783.99, time: 0.14 }, // G5
        { f: 1046.50, time: 0.21 },// C6
        { f: 1567.98, time: 0.30 } // G6
      ].forEach(({ f, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + time);
        gain.gain.setValueAtTime(this.volume * 0.2, t + time);
        gain.gain.exponentialRampToValueAtTime(0.001, t + time + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + time);
        osc.stop(t + time + 0.35);
      });
    } catch {}
  }

  // Tactical Reticle Target Lock
  playHudLock() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [0, 0.08].forEach(time => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, t + time);
        gain.gain.setValueAtTime(this.volume * 0.1, t + time);
        gain.gain.exponentialRampToValueAtTime(0.001, t + time + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + time);
        osc.stop(t + time + 0.05);
      });
    } catch {}
  }

  // Subtle background reactor ambience
  startReactorHum() {
    if (!this.enabled || this.humOsc) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      this.humOsc = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      this.humOsc.type = 'sawtooth';
      this.humOsc.frequency.setValueAtTime(65, this.ctx.currentTime); // Low 65Hz hum

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.humGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.humGain.gain.linearRampToValueAtTime(this.volume * 0.035, this.ctx.currentTime + 1.5);

      this.humOsc.connect(filter);
      filter.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      this.humOsc.start();
    } catch {}
  }

  stopReactorHum() {
    if (this.humOsc && this.ctx) {
      try {
        this.humGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.humOsc) {
            this.humOsc.stop();
            this.humOsc.disconnect();
            this.humOsc = null;
            this.humGain = null;
          }
        }, 500);
      } catch {
        this.humOsc = null;
        this.humGain = null;
      }
    }
  }

  // Subtle alert
  playAlert() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(330, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(this.volume * 0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }
}

export const soundManager = new SoundManager();
