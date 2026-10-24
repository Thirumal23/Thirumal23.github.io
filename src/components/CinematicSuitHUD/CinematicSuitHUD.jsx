import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  FolderGit2, 
  Award, 
  Layers, 
  Radio, 
  Cpu, 
  Terminal as TermIcon, 
  PhoneCall, 
  Compass, 
  CheckCircle2, 
  Mic, 
  Volume2, 
  VolumeX, 
  FastForward 
} from 'lucide-react';
import { soundManager } from '../../utils/soundManager';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import { parseCommand } from '../../utils/commandRouter';
import { PROFILE_DATA } from '../../data/portfolioData';
import SuitReactorCore from './SuitReactorCore';
import HolographicNavigationPanel from './HolographicNavigationPanel';
import SuitHUDOverlay from './SuitHUDOverlay';
import './CinematicSuitHUD.css';

const HUD_DESTINATIONS = [
  {
    id: 'command-center',
    code: 'NAV-01',
    title: 'COMMAND CORE',
    description: 'Central executive dashboard, reactor telemetry, and live status feeds.',
    icon: Sparkles,
    systemTag: 'SYS-CORE',
    positionClass: 'pos-bottom-left',
    accentColor: '#56E7FF'
  },
  {
    id: 'projects',
    code: 'NAV-02',
    title: 'PROJECTS (8)',
    description: '8 verified initiatives including MEDINV, KINEX, and CMRL TVS.',
    icon: FolderGit2,
    systemTag: 'SYS-PRJ',
    positionClass: 'pos-left-top',
    accentColor: '#FFB45C'
  },
  {
    id: 'dcdc',
    code: 'NAV-03',
    title: 'DCDC LEADERSHIP',
    description: 'Project Head at DCDC. Technical team collaboration and sprint coordination.',
    icon: Award,
    systemTag: 'SYS-LEAD',
    positionClass: 'pos-right-top',
    accentColor: '#FFB45C'
  },
  {
    id: 'skills',
    code: 'NAV-04',
    title: 'SKILLS & EDA',
    description: 'KiCad PCB design, Python, C, SQL, and embedded systems architecture.',
    icon: Layers,
    systemTag: 'SYS-EDA',
    positionClass: 'pos-left-mid',
    accentColor: '#56E7FF'
  },
  {
    id: 'experience',
    code: 'NAV-05',
    title: 'EXPERIENCE',
    description: 'Beau Roi Tech & CMRL internships, SRM academics (9.54 CGPA).',
    icon: Radio,
    systemTag: 'SYS-EXP',
    positionClass: 'pos-left-bottom',
    accentColor: '#4C8DFF'
  },
  {
    id: 'pcb-lab',
    code: 'NAV-06',
    title: '3D PCB LAB',
    description: 'Universal project-aware 3D circuit inspection lab with layer stackup controls.',
    icon: Cpu,
    systemTag: 'SYS-HW',
    positionClass: 'pos-right-mid',
    accentColor: '#63F2B2'
  },
  {
    id: 'terminal',
    code: 'NAV-07',
    title: 'TERMINAL',
    description: 'Tactical engineering CLI with 14 verified local commands.',
    icon: TermIcon,
    systemTag: 'SYS-CLI',
    positionClass: 'pos-right-bottom',
    accentColor: '#56E7FF'
  },
  {
    id: 'contact',
    code: 'NAV-08',
    title: 'CONTACT',
    description: 'Direct communications array, verified mailto transmission, and social channels.',
    icon: PhoneCall,
    systemTag: 'SYS-COMMS',
    positionClass: 'pos-bottom-right',
    accentColor: '#4C8DFF'
  }
];

export default function CinematicSuitHUD({
  onNavigate,
  onClose,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  use3D = true
}) {
  const [phase, setPhase] = useState('booting'); // 'booting' | 'calibrating' | 'navigationReady' | 'transitioning'
  const [systemMessages, setSystemMessages] = useState(['INITIALIZING AURELION SUIT PROTOCOL...']);
  const [hoveredDestination, setHoveredDestination] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const containerRef = useRef(null);

  // Sequence Timeline
  useEffect(() => {
    if (reducedMotion) {
      setPhase('navigationReady');
      return;
    }

    // Play startup power pulse sound
    if (soundEnabled) {
      soundManager.playPowerPulse();
    }

    const t1 = setTimeout(() => {
      setSystemMessages(prev => [...prev, 'ESTABLISHING QUANTUM SENSOR BUS...']);
      if (soundEnabled) soundManager.playBootStep(1);
    }, 600);

    const t2 = setTimeout(() => {
      setSystemMessages(prev => [...prev, 'LOADING VERIFIED ENGINEERING ARCHIVE (8 PROJECTS)...']);
      if (soundEnabled) soundManager.playBootStep(2);
    }, 1200);

    const t3 = setTimeout(() => {
      setSystemMessages(prev => [...prev, 'INITIALIZING VISUAL SUIT HUD & REACTOR CORE...']);
      if (soundEnabled) soundManager.playRelayClick();
      setPhase('calibrating');
    }, 2000);

    const t4 = setTimeout(() => {
      setSystemMessages(prev => [...prev, 'CALIBRATION COMPLETE // DEPLOYING HOLOGRAPHIC NAVIGATION']);
      if (soundEnabled) {
        soundManager.playScanTone();
        soundManager.startReactorHum();
      }
      setPhase('navigationReady');

      // Vocalize calm British Butler greeting if speech enabled
      aurelionVoiceService.speak("AURELION online, sir. Visual interface initialized, and engineering navigation systems ready.");
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      soundManager.stopReactorHum();
    };
  }, [reducedMotion, soundEnabled]);

  // Keyboard Navigation: Arrow keys, Enter, Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase !== 'navigationReady') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        soundManager.playTerminal();
        setFocusedIndex(prev => {
          const next = (prev + 1) % HUD_DESTINATIONS.length;
          setHoveredDestination(HUD_DESTINATIONS[next]);
          return next;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        soundManager.playTerminal();
        setFocusedIndex(prev => {
          const next = (prev - 1 + HUD_DESTINATIONS.length) % HUD_DESTINATIONS.length;
          setHoveredDestination(HUD_DESTINATIONS[next]);
          return next;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const target = HUD_DESTINATIONS[focusedIndex];
        if (target) handleSelectDestination(target);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        soundManager.playClick();
        if (onClose) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, focusedIndex, onClose]);

  // Voice command dispatcher inside HUD
  const handleToggleVoiceInput = () => {
    soundManager.playClick();
    if (isVoiceListening) {
      aurelionVoiceService.stopListening();
      setIsVoiceListening(false);
    } else {
      setIsVoiceListening(true);
      aurelionVoiceService.startListening(
        (finalTranscript) => {
          setIsVoiceListening(false);
          const cmd = parseCommand(finalTranscript);
          if (cmd && cmd.action) {
            handleActionFromCommand(cmd.action);
          }
        },
        () => setIsVoiceListening(false)
      );
    }
  };

  const handleActionFromCommand = (action) => {
    let destId = null;
    switch (action) {
      case 'NAV_PROJECTS':
      case 'OPEN_PROJECT_MEDINV':
      case 'OPEN_PROJECT_KINEX':
      case 'OPEN_PROJECT_CMRL':
        destId = 'projects';
        break;
      case 'NAV_DCDC':
        destId = 'dcdc';
        break;
      case 'NAV_SKILLS':
        destId = 'skills';
        break;
      case 'NAV_PCB':
        destId = 'pcb-lab';
        break;
      case 'NAV_EXPERIENCE':
      case 'NAV_EDUCATION':
        destId = 'experience';
        break;
      case 'NAV_TERMINAL':
        destId = 'terminal';
        break;
      case 'NAV_CONTACT':
        destId = 'contact';
        break;
      case 'NAV_HOME':
        destId = 'command-center';
        break;
      default:
        break;
    }

    if (destId) {
      const dest = HUD_DESTINATIONS.find(d => d.id === destId);
      if (dest) handleSelectDestination(dest);
    }
  };

  // Select destination with cinematic forward expansion
  const handleSelectDestination = (destination) => {
    if (phase === 'transitioning') return;

    soundManager.playNavActivate();
    setSelectedDestination(destination);
    setPhase('transitioning');

    // Spoken destination arrival announcement via unified male butler voice
    const arrivalPhrase = AURELION_DIALOGUE.arrivals[destination.id] || `Accessing ${destination.title}, sir.`;
    aurelionVoiceService.speak(arrivalPhrase);

    // Smooth forward camera transition delay before switching view
    setTimeout(() => {
      soundManager.stopReactorHum();
      onNavigate(destination.id);
      if (onClose) onClose();
    }, 600);
  };

  const handleSkipIntro = () => {
    soundManager.playClick();
    soundManager.stopReactorHum();
    aurelionVoiceService.stop();
    if (phase === 'booting' || phase === 'calibrating') {
      setPhase('navigationReady');
    } else {
      aurelionVoiceService.speak(AURELION_DIALOGUE.arrivals['command-center']);
      onNavigate('command-center');
      if (onClose) onClose();
    }
  };

  return (
    <div 
      className={`cinematic-hud-wrapper ${phase}`}
      ref={containerRef}
      role="dialog"
      aria-label="AURELION Suit Activation and Holographic Navigation Hub"
    >
      {/* Background Matrix & Scanning Grid */}
      <div className="suit-hud-backdrop" />
      <div className="suit-hud-scanline" />
      <div className="suit-ambient-radial" />

      {/* Visor & Targeting Overlay */}
      <SuitHUDOverlay
        phase={phase}
        systemMessages={systemMessages}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        isVoiceListening={isVoiceListening}
        onToggleVoiceInput={handleToggleVoiceInput}
        onSkipIntro={handleSkipIntro}
        hoveredDestination={hoveredDestination}
      />

      {/* Central Reactor Core (Three.js 3D / 2D fallback) */}
      <div className="suit-central-reactor-wrap">
        <SuitReactorCore
          use3D={use3D && !reducedMotion}
          pulseIntensity={phase === 'calibrating' ? 2 : 1.2}
          activePanelIndex={hoveredDestination ? HUD_DESTINATIONS.indexOf(hoveredDestination) : null}
          phase={phase}
        />

        {/* Central AURELION Holographic Emblem in Phase 1 */}
        {phase === 'booting' && (
          <div className="suit-boot-emblem-reveal">
            <svg viewBox="0 0 100 100" className="boot-insignia-svg">
              <circle cx="50" cy="50" r="42" stroke="var(--border-subtle)" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="50" r="34" stroke="var(--reactor-cyan)" strokeWidth="2" strokeDasharray="8 6" className="spin-clockwise" fill="none" />
              <circle cx="50" cy="50" r="24" stroke="var(--electric-blue)" strokeWidth="1.5" fill="none" />
              <polygon points="50,22 55,42 75,45 58,55 64,75 50,62 36,75 42,55 25,45 45,42" fill="none" stroke="var(--gold-accent)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="6" fill="var(--reactor-cyan)" />
            </svg>
            <span className="boot-glow-dot" />
          </div>
        )}
      </div>

      {/* Connecting Circuit Vector Lines (Connecting Reactor to Panels) */}
      <svg className="suit-circuit-lines-svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="traceGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#56E7FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFB45C" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Radiating geometric lines from center (800, 450) to HUD panel zones */}
        {phase === 'navigationReady' && (
          <g className="circuit-lines-group">
            <line x1="800" y1="450" x2="290" y2="180" className={`circuit-trace ${hoveredDestination?.id === 'projects' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="260" y2="410" className={`circuit-trace ${hoveredDestination?.id === 'skills' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="290" y2="660" className={`circuit-trace ${hoveredDestination?.id === 'experience' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="1310" y2="180" className={`circuit-trace ${hoveredDestination?.id === 'dcdc' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="1340" y2="410" className={`circuit-trace ${hoveredDestination?.id === 'pcb-lab' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="1310" y2="660" className={`circuit-trace ${hoveredDestination?.id === 'terminal' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="530" y2="720" className={`circuit-trace ${hoveredDestination?.id === 'command-center' ? 'active' : ''}`} />
            <line x1="800" y1="450" x2="1070" y2="720" className={`circuit-trace ${hoveredDestination?.id === 'contact' ? 'active' : ''}`} />
          </g>
        )}
      </svg>

      {/* 8 Floating Holographic Navigation Panels (Visible in Phase 4 & 5) */}
      {(phase === 'navigationReady' || phase === 'transitioning') && (
        <div className="suit-holographic-panels-grid">
          {HUD_DESTINATIONS.map((dest, idx) => {
            const isHovered = hoveredDestination?.id === dest.id;
            const isSelected = selectedDestination?.id === dest.id;
            const isAnySelected = !!selectedDestination;

            return (
              <HolographicNavigationPanel
                key={dest.id}
                destination={dest}
                index={idx}
                isHovered={isHovered}
                isSelected={isSelected}
                isAnySelected={isAnySelected}
                onHover={(d) => {
                  soundManager.playTerminal();
                  setHoveredDestination(d);
                  setFocusedIndex(idx);
                }}
                onLeave={() => setHoveredDestination(null)}
                onSelect={handleSelectDestination}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
