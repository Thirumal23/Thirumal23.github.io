import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/soundManager';
import { speechHandler } from '../../utils/speechHandler';
import { Volume2, VolumeX, FastForward, CheckCircle2, ShieldCheck } from 'lucide-react';
import './BootSequence.css';

const BOOT_STEPS = [
  { id: 'core', label: 'AURELION Digital Butler Core', detail: 'Firmware v2.4 initialized' },
  { id: 'ui', label: 'Interface Subsystem Check', detail: 'Tactical HUD & CSS tokens verified' },
  { id: 'projects', label: 'Project Archive Loading', detail: '8 verified engineering initiatives indexed' },
  { id: 'modules', label: 'Engineering Modules Initialized', detail: 'KiCad viewer & motor telemetry ready' },
  { id: 'voice', label: 'Voice & Speech Subsystems', detail: 'SpeechSynthesis & Web Speech APIs checked' },
  { id: 'ready', label: 'All Telemetry Nominal', detail: 'AURELION awaiting your commands' }
];

export default function BootSequence({ onComplete, soundEnabled, onToggleSound, reducedMotion }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const intervalTime = 420;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (soundEnabled) {
          soundManager.playBootStep(prev);
        }
        setCompletedSteps((c) => [...c, BOOT_STEPS[prev]?.id]);

        if (next >= BOOT_STEPS.length) {
          clearInterval(timer);
          setTimeout(() => {
            if (dontShowAgain) {
              localStorage.setItem('aurelion_skip_boot', 'true');
            }
            onComplete();
          }, 350);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, soundEnabled, reducedMotion, dontShowAgain]);

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('aurelion_skip_boot', 'true');
    }
    soundManager.playClick();
    onComplete();
  };

  const progressPercent = Math.min(100, Math.round((currentStepIndex / BOOT_STEPS.length) * 100));

  return (
    <div className="boot-overlay" role="dialog" aria-modal="true" aria-label="Aurelion System Boot">
      <div className="boot-container tactical-panel tactical-panel-corner">
        {/* Header HUD */}
        <div className="boot-header">
          <div className="boot-emblem">
            <svg viewBox="0 0 100 100" className="boot-logo-svg">
              <circle cx="50" cy="50" r="42" stroke="var(--border-subtle)" strokeWidth="3" fill="none" />
              <circle cx="50" cy="50" r="34" stroke="var(--reactor-cyan)" strokeWidth="2" strokeDasharray="10 5" className="boot-ring-spin" fill="none" />
              <circle cx="50" cy="50" r="24" stroke="var(--electric-blue)" strokeWidth="1.5" fill="none" />
              <polygon points="50,24 55,42 75,45 58,55 64,75 50,62 36,75 42,55 25,45 45,42" fill="none" stroke="var(--gold-accent)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="6" fill="var(--reactor-cyan)" />
            </svg>
          </div>
          <div className="boot-titles">
            <span className="telemetry-tag">AURELION // EXECUTIVE SYSTEM INIT</span>
            <h2>COMMAND SYSTEM INITIALIZATION</h2>
            <p className="boot-subtitle">Engineering Portfolio of Thirumal N — SRM IST ECE</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="boot-progress-wrap">
          <div className="boot-progress-info mono">
            <span>SEQUENCE EXECUTION</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="boot-progress-track">
            <div className="boot-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Diagnostic Checklist */}
        <div className="boot-checklist mono">
          {BOOT_STEPS.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            const isCurrent = idx === currentStepIndex;
            return (
              <div 
                key={step.id} 
                className={`boot-step-row ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}
              >
                <div className="boot-step-icon">
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : (
                    <span className="boot-step-bullet">{idx + 1}</span>
                  )}
                </div>
                <div className="boot-step-text">
                  <div className="boot-step-title">{step.label}</div>
                  <div className="boot-step-detail">{step.detail}</div>
                </div>
                <div className="boot-step-status">
                  {isDone ? '[READY]' : isCurrent ? '[LOADING]' : '[PENDING]'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls footer */}
        <div className="boot-footer">
          <div className="boot-toggles">
            <button 
              type="button" 
              className={`btn-tactical btn-tactical-outline btn-compact ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
              aria-label={soundEnabled ? "Mute boot sound effects" : "Enable boot sound effects"}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>SOUND: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <label className="boot-checkbox-label mono">
              <input 
                type="checkbox" 
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Remember Skip Preference</span>
            </label>
          </div>

          <button 
            type="button" 
            className="btn-tactical btn-tactical-gold"
            onClick={handleSkip}
          >
            <FastForward size={14} />
            <span>SKIP BOOT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
