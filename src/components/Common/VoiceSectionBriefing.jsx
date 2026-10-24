import React from 'react';
import { Volume2, Square, Sparkles } from 'lucide-react';
import { useAurelionVoice } from '../../hooks/useAurelionVoice';
import { soundManager } from '../../utils/soundManager';
import './VoiceSectionBriefing.css';

export default function VoiceSectionBriefing({ 
  sectionKey, 
  customText, 
  label = "SPEAK INTRODUCTION" 
}) {
  const { isSpeaking, speak, stop } = useAurelionVoice();

  const handleToggle = () => {
    soundManager.playClick();
    if (isSpeaking) {
      stop();
    } else {
      soundManager.playPowerPulse();
      speak(customText);
    }
  };

  return (
    <div className="voice-section-briefing-wrap mono">
      <button
        type="button"
        className={`btn-tactical btn-compact ${isSpeaking ? 'btn-tactical-gold pulse-btn' : 'btn-tactical-outline'} btn-voice-briefing`}
        onClick={handleToggle}
        title={isSpeaking ? "Silence AURELION vocalization" : "AURELION spoken section introduction & control guide"}
        aria-label={isSpeaking ? "Silence speech" : "Listen to spoken introduction"}
      >
        {isSpeaking ? (
          <>
            <Square size={12} className="text-gold" />
            <span>SILENCE BUTLER</span>
          </>
        ) : (
          <>
            <Volume2 size={13} className="text-cyan" />
            <span>{label}</span>
          </>
        )}
      </button>
    </div>
  );
}
