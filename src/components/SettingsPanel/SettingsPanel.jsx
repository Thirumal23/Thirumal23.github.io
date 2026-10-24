import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { useAurelionVoice } from '../../hooks/useAurelionVoice';
import { soundManager } from '../../utils/soundManager';
import './SettingsPanel.css';

export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  use3D,
  onToggle3D
}) {
  const {
    enabled: voiceEnabled,
    selectedVoice,
    voices,
    rate,
    pitch,
    volume,
    hasMaleVoice,
    voiceQualityReport,
    setEnabled: setVoiceEnabled,
    selectVoice,
    setRate,
    setPitch,
    setVolume,
    previewVoice
  } = useAurelionVoice();

  const [disableHudIntro, setDisableHudIntro] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const disabled = localStorage.getItem('aurelion_disable_hud_intro') === 'true';
      setDisableHudIntro(disabled);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVoiceSelect = (uri) => {
    soundManager.playClick();
    selectVoice(uri);
  };

  const handleToggleVoice = () => {
    soundManager.playClick();
    setVoiceEnabled(!voiceEnabled);
  };

  const handleToggleHudIntro = () => {
    soundManager.playClick();
    const nextVal = !disableHudIntro;
    setDisableHudIntro(nextVal);
    if (nextVal) {
      localStorage.setItem('aurelion_disable_hud_intro', 'true');
    } else {
      localStorage.removeItem('aurelion_disable_hud_intro');
    }
  };

  const handleTestVoice = () => {
    soundManager.playClick();
    previewVoice();
  };

  return (
    <div className="settings-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="settings-container tactical-panel tactical-panel-corner" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-row">
            <SlidersHorizontal size={18} className="text-cyan" />
            <h3>SYSTEM CONFIGURATION & CALIBRATION</h3>
          </div>
          <button 
            type="button" 
            className="btn-modal-close" 
            onClick={() => { soundManager.playClick(); onClose(); }}
            aria-label="Close Settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="settings-body">
          {/* Section: AURELION Speech */}
          <div className="settings-section">
            <div className="section-title-wrap">
              <span className="section-title mono text-cyan">AURELION UNIFIED VOICE SERVICE</span>
              <span className="telemetry-tag">{voiceQualityReport}</span>
            </div>

            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">AURELION SPEECH SYNTHESIS</span>
                <span className="setting-sub">Audible digital butler arrivals, explanations, and dossiers</span>
              </div>
              <button
                type="button"
                className={`btn-tactical btn-compact ${voiceEnabled ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={handleToggleVoice}
              >
                {voiceEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>

            {voiceEnabled && (
              <>
                <div className="settings-row vertical">
                  <div className="voice-label-row">
                    <span className="setting-label mono">ACTIVE MALE BUTLER VOICE:</span>
                    <span className="voice-status-note mono">
                      {hasMaleVoice ? '✓ Male Voice Verified' : 'Standard Voice Engine'}
                    </span>
                  </div>

                  <select
                    className="settings-select mono"
                    value={selectedVoice?.voiceURI || ''}
                    onChange={(e) => handleVoiceSelect(e.target.value)}
                  >
                    {voices.map((v) => {
                      const isGB = (v.lang || '').toLowerCase().startsWith('en-gb');
                      const isMale = /male|george|oliver|daniel|arthur|brian|ryan|guy|david|mark/i.test(v.name);
                      const isFemale = /female|hazel|susan|zira|eva|catherine|jenny|aria|sonia|libby|heera|priya|victoria/i.test(v.name);
                      
                      let tag = '';
                      if (isMale && isGB) tag = ' [★ UK MALE BUTLER]';
                      else if (isMale) tag = ' [MALE]';
                      else if (isFemale) tag = ' [FEMALE]';
                      else if (isGB) tag = ' [UK Standard]';

                      return (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang}){tag}
                        </option>
                      );
                    })}
                  </select>

                  <div className="voice-platform-notice mono">
                    <Info size={12} className="text-cyan" />
                    <span>
                      Browser platforms provide varying speech engines. AURELION prioritizes mature British-English male voices across every page and suit HUD sequence.
                    </span>
                  </div>
                </div>

                <div className="settings-slider-row">
                  <div className="slider-label mono">
                    <span>SPEECH RATE (PACING)</span>
                    <span>{rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.02"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="tactical-slider"
                  />
                </div>

                <div className="settings-slider-row">
                  <div className="slider-label mono">
                    <span>SPEECH PITCH (RESONANCE)</span>
                    <span>{pitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.25"
                    step="0.02"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="tactical-slider"
                  />
                </div>

                <div className="settings-slider-row">
                  <div className="slider-label mono">
                    <span>SPEECH VOLUME</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="tactical-slider"
                  />
                </div>

                <button
                  type="button"
                  className="btn-tactical btn-tactical-gold btn-compact mono self-start"
                  onClick={handleTestVoice}
                >
                  <Volume2 size={13} />
                  <span>PREVIEW CALIBRATED VOICE</span>
                </button>
              </>
            )}
          </div>

          {/* Section: Audio & UI Sounds */}
          <div className="settings-section">
            <span className="section-title mono text-gold">AUDIO & PROCEDURAL EFFECTS</span>
            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">SYNTHESIZED UI SOUND FX</span>
                <span className="setting-sub">Web Audio terminal chirps, relay clicks, and boot pulses</span>
              </div>
              <button
                type="button"
                className={`btn-tactical btn-compact ${soundEnabled ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={onToggleSound}
              >
                {soundEnabled ? 'ON' : 'OFF (DEFAULT)'}
              </button>
            </div>
          </div>

          {/* Section: Visual Display & 3D */}
          <div className="settings-section">
            <span className="section-title mono text-cyan">DISPLAY & VISUAL PREFERENCES</span>

            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">HUD COLOR THEME</span>
                <span className="setting-sub">Obsidian Dark Command Center vs Daylight High-Contrast</span>
              </div>
              <button
                type="button"
                className="btn-tactical btn-tactical-outline btn-compact mono"
                onClick={onToggleTheme}
              >
                {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
                <span>{theme === 'dark' ? 'DARK OBSIDIAN' : 'LIGHT HUD'}</span>
              </button>
            </div>

            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">CINEMATIC SUIT HUD ON LOAD</span>
                <span className="setting-sub">Display full-screen suit activation sequence upon every page load or browser reload</span>
              </div>
              <button
                type="button"
                className={`btn-tactical btn-compact ${!disableHudIntro ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={handleToggleHudIntro}
              >
                {!disableHudIntro ? 'ENABLED (DEFAULT)' : 'DISABLED'}
              </button>
            </div>

            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">ACCESSIBILITY // REDUCED MOTION</span>
                <span className="setting-sub">Suppresses continuous ring rotations and rapid transitions</span>
              </div>
              <button
                type="button"
                className={`btn-tactical btn-compact ${reducedMotion ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={onToggleReducedMotion}
              >
                {reducedMotion ? 'ACTIVE' : 'STANDARD'}
              </button>
            </div>

            <div className="settings-row">
              <div className="setting-info">
                <span className="setting-label mono">GRAPHICS ENGINE</span>
                <span className="setting-sub">Multi-layer 3D WebGL Core vs 2D Tactical Vector Canvas</span>
              </div>
              <button
                type="button"
                className={`btn-tactical btn-compact ${use3D ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={onToggle3D}
              >
                {use3D ? '3D WEBGL' : '2D CANVAS'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="settings-persist-note mono text-dim">
            <CheckCircle2 size={13} className="text-success" />
            Preferences automatically saved to localStorage
          </span>
          <button
            type="button"
            className="btn-tactical btn-tactical-outline btn-compact mono"
            onClick={() => { soundManager.playClick(); onClose(); }}
          >
            <span>CLOSE CONFIGURATION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
