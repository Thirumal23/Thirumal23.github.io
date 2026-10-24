/**
 * AURELION Centralized Voice Service (AurelionVoiceService)
 * Single source of truth for speech synthesis (TTS) and speech recognition (STT)
 * across the entire application (Suit HUD, Command Core, Projects, 3D PCB Lab, etc.)
 */

// Known male voice indicators to prioritize for mature butler delivery
const MALE_NAME_PATTERNS = [
  /\bmale\b/i,
  /\bgeorge\b/i,
  /\boliver\b/i,
  /\bdaniel\b/i,
  /\barthur\b/i,
  /\bbrian\b/i,
  /\bryan\b/i,
  /\bguy\b/i,
  /\bdavid\b/i,
  /\bmark\b/i,
  /\brichard\b/i,
  /\bthomas\b/i,
  /\bjames\b/i,
  /\bcharles\b/i,
  /\bwilliam\b/i,
  /\bbenjamin\b/i,
  /\balfie\b/i,
  /\beric\b/i,
  /\bsteffan\b/i,
  /\bconnor\b/i,
  /\bpaul\b/i,
  /\bchristopher\b/i
];

// Known female voice indicators to strictly penalize/exclude
const FEMALE_NAME_PATTERNS = [
  /\bfemale\b/i,
  /\bhazel\b/i,
  /\bsusan\b/i,
  /\bzira\b/i,
  /\beva\b/i,
  /\bcatherine\b/i,
  /\bjenny\b/i,
  /\baria\b/i,
  /\bsonia\b/i,
  /\blibby\b/i,
  /\bheera\b/i,
  /\bneerja\b/i,
  /\bpriya\b/i,
  /\bvictoria\b/i,
  /\bsamantha\b/i,
  /\bkaren\b/i,
  /\bmoira\b/i,
  /\bfiona\b/i,
  /\btessa\b/i,
  /\bstephanie\b/i,
  /\bzariyah\b/i,
  /\bnatasha\b/i,
  /\bserena\b/i,
  /\bmary\b/i
];

class AurelionVoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.selectedVoice = null;
    this.subscribers = new Set();

    // Persisted preferences
    const savedEnabled = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('aurelion_voice_enabled') !== 'false'
      : true;
    const savedRate = typeof localStorage !== 'undefined' 
      ? parseFloat(localStorage.getItem('aurelion_voice_rate') || '0.98')
      : 0.98;
    const savedPitch = typeof localStorage !== 'undefined' 
      ? parseFloat(localStorage.getItem('aurelion_voice_pitch') || '0.92')
      : 0.92;
    const savedVolume = typeof localStorage !== 'undefined' 
      ? parseFloat(localStorage.getItem('aurelion_voice_volume') || '1.0')
      : 1.0;

    this.enabled = savedEnabled;
    this.rate = Math.max(0.5, Math.min(2.0, savedRate));
    this.pitch = Math.max(0.5, Math.min(1.5, savedPitch));
    this.volume = Math.max(0.0, Math.min(1.0, savedVolume));

    this.isSpeaking = false;
    this.isListening = false;
    this.currentText = '';
    this.hasMaleVoice = false;
    this.voiceQualityReport = 'Detecting speech synthesis engine...';

    // Speech recognition handle
    this.recognition = null;

    this.initVoices();
  }

  /**
   * Initialize and score platform voices with prioritization for male British English
   */
  initVoices() {
    if (!this.synth) {
      this.voiceQualityReport = 'SpeechSynthesis API not supported in this environment.';
      return;
    }

    const rankVoices = () => {
      const rawVoices = this.synth.getVoices();
      if (!rawVoices || rawVoices.length === 0) return;

      this.voices = rawVoices;

      // Score each voice
      const scoredVoices = rawVoices.map(v => {
        let score = 0;
        const name = v.name || '';
        const lang = (v.lang || '').replace('_', '-').toLowerCase();

        const isKnownFemale = FEMALE_NAME_PATTERNS.some(p => p.test(name));
        const isKnownMale = MALE_NAME_PATTERNS.some(p => p.test(name));

        if (isKnownFemale) {
          score -= 1000; // Heavily penalize female voices
        }

        if (isKnownMale) {
          score += 200; // Strong bonus for explicit male names
        }

        // British English bonus
        if (lang === 'en-gb') {
          score += 150;
        } else if (lang.startsWith('en-')) {
          score += 50;
        }

        // Natural or neural voices often offer better inflection
        if (/natural|neural|online|multilingual/i.test(name)) {
          score += 30;
        }

        return { voice: v, score, isKnownMale, isKnownFemale };
      });

      // Sort descending by score
      scoredVoices.sort((a, b) => b.score - a.score);

      // Check for user-selected voice in localStorage first
      const savedUri = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('aurelion_selected_voice_uri') 
        : null;

      let chosen = null;
      if (savedUri) {
        chosen = this.voices.find(v => v.voiceURI === savedUri);
      }

      // If no valid saved voice, choose top-ranked male or best fallback
      if (!chosen && scoredVoices.length > 0) {
        chosen = scoredVoices[0].voice;
      }

      this.selectedVoice = chosen || null;

      // Assess quality and update report
      if (chosen) {
        const topCandidate = scoredVoices.find(s => s.voice.voiceURI === chosen.voiceURI);
        const isBritish = (chosen.lang || '').toLowerCase().startsWith('en-gb');
        const isMale = topCandidate ? topCandidate.isKnownMale : false;

        this.hasMaleVoice = isMale;
        if (isBritish && isMale) {
          this.voiceQualityReport = `British Male Butler (${chosen.name})`;
        } else if (isMale) {
          this.voiceQualityReport = `English Male Voice (${chosen.name})`;
        } else if (isBritish) {
          this.voiceQualityReport = `British English (${chosen.name}) [Platform Default]`;
        } else {
          this.voiceQualityReport = `System Speech Engine (${chosen.name})`;
        }
      } else {
        this.voiceQualityReport = 'No platform voices detected yet.';
      }

      this.notifySubscribers();
    };

    // Load immediately
    rankVoices();

    // Listen for asynchronous voiceschanged event
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = rankVoices;
    }

    // Safety fallback polls for browsers where onvoiceschanged does not fire promptly
    setTimeout(rankVoices, 100);
    setTimeout(rankVoices, 500);
    setTimeout(rankVoices, 1500);
  }

  // Reactive subscription pattern for React components
  subscribe(callback) {
    this.subscribers.add(callback);
    // Initial emit
    callback(this.getState());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach(cb => {
      try {
        cb(state);
      } catch (err) {
        console.warn('AurelionVoiceService subscriber error:', err);
      }
    });
  }

  getState() {
    return {
      enabled: this.enabled,
      isSpeaking: this.isSpeaking,
      isListening: this.isListening,
      selectedVoice: this.selectedVoice,
      voices: this.voices,
      rate: this.rate,
      pitch: this.pitch,
      volume: this.volume,
      hasMaleVoice: this.hasMaleVoice,
      voiceQualityReport: this.voiceQualityReport,
      currentText: this.currentText
    };
  }

  selectVoice(voiceUri) {
    const v = this.voices.find(voice => voice.voiceURI === voiceUri);
    if (v) {
      this.selectedVoice = v;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('aurelion_selected_voice_uri', voiceUri);
      }
      this.initVoices(); // Re-evaluate report
    }
  }

  setRate(val) {
    this.rate = Math.max(0.5, Math.min(2.0, val));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aurelion_voice_rate', this.rate.toString());
    }
    this.notifySubscribers();
  }

  setPitch(val) {
    this.pitch = Math.max(0.5, Math.min(1.5, val));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aurelion_voice_pitch', this.pitch.toString());
    }
    this.notifySubscribers();
  }

  setVolume(val) {
    this.volume = Math.max(0.0, Math.min(1.0, val));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aurelion_voice_volume', this.volume.toString());
    }
    this.notifySubscribers();
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aurelion_voice_enabled', this.enabled ? 'true' : 'false');
    }
    if (!this.enabled) {
      this.stop();
    }
    this.notifySubscribers();
  }

  /**
   * Speak a dialogue string cleanly with cancellation of prior speech
   * and safe browser state machine synchronization.
   */
  speak(text, onEndCallback = null) {
    if (!this.enabled || !this.synth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    if (!text || typeof text !== 'string') return;

    try {
      // Cancel previous utterance to prevent overlapping voices
      this.synth.cancel();

      // Small async delay allows browser speech engine to clear its state
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
          }
          utterance.rate = this.rate;
          utterance.pitch = this.pitch;
          utterance.volume = this.volume;

          utterance.onstart = () => {
            this.isSpeaking = true;
            this.currentText = text;
            this.notifySubscribers();
          };

          utterance.onend = () => {
            this.isSpeaking = false;
            this.currentText = '';
            this.notifySubscribers();
            if (onEndCallback) onEndCallback();
          };

          utterance.onerror = (e) => {
            // Ignore interruption errors caused by cancel()
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
              console.warn('Speech synthesis utterance error:', e.error);
            }
            this.isSpeaking = false;
            this.currentText = '';
            this.notifySubscribers();
            if (onEndCallback) onEndCallback();
          };

          this.synth.speak(utterance);
        } catch (innerErr) {
          this.isSpeaking = false;
          this.notifySubscribers();
          if (onEndCallback) onEndCallback();
        }
      }, 35);
    } catch (err) {
      this.isSpeaking = false;
      this.notifySubscribers();
      if (onEndCallback) onEndCallback();
    }
  }

  /**
   * Immediately cancel any active speech
   */
  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (err) {
        console.warn('Speech cancel error:', err);
      }
    }
    this.isSpeaking = false;
    this.currentText = '';
    this.notifySubscribers();
  }

  /**
   * Speak a test preview phrase using the currently selected voice
   */
  previewVoice() {
    const previewPhrases = [
      "AURELION voice synthesis operational, sir. All core reactor systems synchronized.",
      "Good evening, sir. Subsystem telemetry is online and ready for your inspection.",
      "AURELION speech channel nominal, sir. Awaiting your directive."
    ];
    const phrase = previewPhrases[Math.floor(Math.random() * previewPhrases.length)];
    this.speak(phrase);
  }

  // Speech Recognition (STT) Methods
  isSpeechRecognitionSupported() {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  startListening(onFinalCallback, onErrorCallback) {
    if (!this.isSpeechRecognitionSupported()) {
      if (onErrorCallback) onErrorCallback('Speech recognition not supported in this browser.');
      return;
    }

    try {
      this.stopListening();
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.notifySubscribers();
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        this.isListening = false;
        this.notifySubscribers();
        if (onFinalCallback) onFinalCallback(transcript);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        this.notifySubscribers();
        if (onErrorCallback) onErrorCallback(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.notifySubscribers();
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      this.notifySubscribers();
      if (onErrorCallback) onErrorCallback(err.message || 'Recognition error');
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {}
      this.recognition = null;
    }
    this.isListening = false;
    this.notifySubscribers();
  }
}

// Export singleton instance
export const aurelionVoiceService = new AurelionVoiceService();
export default aurelionVoiceService;
