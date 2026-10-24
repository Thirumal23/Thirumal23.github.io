import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  FastForward, 
  ShieldCheck, 
  Radio, 
  Crosshair, 
  Compass, 
  Cpu 
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';

export default function SuitHUDOverlay({
  phase,
  systemMessages,
  soundEnabled,
  onToggleSound,
  soundVolume,
  onChangeVolume,
  isVoiceListening,
  onToggleVoiceInput,
  onSkipIntro,
  hoveredDestination
}) {
  return (
    <div className="suit-hud-overlay" pointerEvents="none">
      {/* Visor Lens Curvature Framing Brackets */}
      <div className="visor-bracket top-left" />
      <div className="visor-bracket top-right" />
      <div className="visor-bracket bottom-left" />
      <div className="visor-bracket bottom-right" />

      {/* Visor Horizon Curved Line */}
      <div className="visor-horizon-arc" />

      {/* Top Telemetry Header Bar */}
      <div className="suit-top-telemetry mono">
        <div className="hud-tele-left">
          <div className="suit-brand-badge">
            <span className="status-dot online pulse-icon" />
            <span className="suit-brand-title">AURELION // SUIT HUD v2.4</span>
          </div>
          <span className="hud-sep">|</span>
          <span className="suit-operator-tag">OPERATOR: {PROFILE_DATA.name.toUpperCase()}</span>
          <span className="hud-sep">|</span>
          <span className="suit-acad-tag">SRM IST ECE // CGPA {PROFILE_DATA.academics.overallCGPA}</span>
        </div>

        <div className="hud-tele-right">
          {/* Audio Controls */}
          <button
            type="button"
            className={`btn-hud-control ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
            title={soundEnabled ? "Mute interface audio" : "Enable procedural interface audio"}
            aria-label="Toggle Interface Audio"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>AUDIO: {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            className={`btn-hud-control ${isVoiceListening ? 'active-voice pulse-btn' : ''}`}
            onClick={onToggleVoiceInput}
            title="Speak directives directly to Aurelion"
            aria-label="Toggle voice input"
          >
            {isVoiceListening ? <MicOff size={14} /> : <Mic size={14} />}
            <span>{isVoiceListening ? 'LISTENING' : 'VOICE HUD'}</span>
          </button>

          {/* Skip Intro */}
          <button
            type="button"
            className="btn-hud-control btn-hud-skip"
            onClick={onSkipIntro}
            title="Skip sequence directly to command core"
          >
            <FastForward size={14} />
            <span>SKIP INTRO</span>
          </button>
        </div>
      </div>

      {/* Circular Targeting Reticle (Center HUD) */}
      <div className="suit-central-reticle">
        <div className="reticle-ring ring-outer" />
        <div className="reticle-ring ring-inner" />
        <div className="reticle-crosshair ch-x" />
        <div className="reticle-crosshair ch-y" />
        <div className="reticle-coords mono">
          <span>AZ: 042° // EL: +18°</span>
          <span className="reticle-target-tag">
            {hoveredDestination ? `TARGET LOCK: ${hoveredDestination.code}` : 'SYSTEM CALIBRATED'}
          </span>
        </div>
      </div>

      {/* Boot Initialization Terminal Readout (Bottom-Left during Phases 1, 2, 3) */}
      {phase !== 'navigationReady' && phase !== 'transitioning' && (
        <div className="suit-init-readout mono">
          <div className="readout-header">
            <Cpu size={14} className="text-cyan" />
            <span>EXECUTIVE BOOT PROTOCOL</span>
          </div>
          <div className="readout-lines">
            {systemMessages.map((msg, i) => (
              <div key={i} className="readout-line">
                <span className="text-cyan">&gt;</span> {msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Destination Status Ticker (Bottom-Center in Navigation Mode) */}
      {phase === 'navigationReady' && (
        <div className="suit-destination-ticker mono">
          <Compass size={14} className="text-cyan pulse-icon" />
          <span>
            {hoveredDestination 
              ? `HOLOGRAPHIC VECTOR: ${hoveredDestination.title.toUpperCase()} // PRESS ENTER OR CLICK TO ENGAGE` 
              : 'ALL 8 HOLOGRAPHIC DESTINATIONS READY // AWAITING OPERATOR DIRECTIVE'}
          </span>
        </div>
      )}
    </div>
  );
}
