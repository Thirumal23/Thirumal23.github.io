import React, { useState, useEffect, Suspense, lazy } from 'react';
import TopNav from './components/Header/TopNav';
import CinematicSuitHUD from './components/CinematicSuitHUD/CinematicSuitHUD';
import CommandCenter from './components/CommandCenter/CommandCenter';
import ProjectExplorer from './components/ProjectExplorer/ProjectExplorer';
import MedinvSpecialModule from './components/ProjectExplorer/MedinvSpecialModule';
import DcdcModule from './components/DcdcModule/DcdcModule';
import SkillsModule from './components/SkillsModule/SkillsModule';
import ExperienceTimeline from './components/ExperienceTimeline/ExperienceTimeline';
import ContactModule from './components/ContactModule/ContactModule';
import CommandPalette from './components/CommandPalette/CommandPalette';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import ProjectDetailModal from './components/ProjectExplorer/ProjectDetailModal';

const PCBViewer = lazy(() => import('./components/PCBScene/PCBViewer'));
const EngineeringTerminal = lazy(() => import('./components/EngineeringTerminal/EngineeringTerminal'));

import { PROFILE_DATA, PROJECTS_DATA } from './data/portfolioData';
import { soundManager } from './utils/soundManager';
import { aurelionVoiceService } from './services/AurelionVoiceService';
import { Shield, Sparkles, Terminal as TermIcon, ExternalLink } from 'lucide-react';
import './App.css';

export default function App() {
  // Show Suit HUD on every fresh page load or browser reload by default
  const [showSuitHUD, setShowSuitHUD] = useState(() => {
    return localStorage.getItem('aurelion_disable_hud_intro') !== 'true';
  });
  const [activeSection, setActiveSection] = useState('command-center');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // App Settings State
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(false); // Default OFF
  const [reducedMotion, setReducedMotion] = useState(false);
  const [use3D, setUse3D] = useState(true);

  // Modals & Panels
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Voice States
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  // Initialize and load persisted user preferences
  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem('aurelion_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme === 'light' ? 'theme-light' : '';

    // Check system prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      document.body.classList.add('reduced-motion');
    }

    // Subscribe to centralized voice service
    const unsubscribeVoice = aurelionVoiceService.subscribe((vState) => {
      setIsVoiceSpeaking(vState.isSpeaking);
      setIsVoiceListening(vState.isListening);
    });

    // Global Key Listener for Ctrl+K / Cmd+K and H for Suit HUD
    const handleGlobalKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundManager.playClick();
        setCommandPaletteOpen(prev => !prev);
      } else if ((e.key === 'h' || e.key === 'H') && !isInput) {
        e.preventDefault();
        soundManager.playPowerPulse();
        setShowSuitHUD(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleToggleTheme = () => {
    soundManager.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('aurelion_theme', nextTheme);
    document.documentElement.className = nextTheme === 'light' ? 'theme-light' : '';
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.setEnabled(nextVal);
    if (nextVal) {
      soundManager.playAcknowledge();
    }
  };

  const handleToggleReducedMotion = () => {
    soundManager.playClick();
    const next = !reducedMotion;
    setReducedMotion(next);
    if (next) {
      document.body.classList.add('reduced-motion');
      setUse3D(false);
    } else {
      document.body.classList.remove('reduced-motion');
      setUse3D(true);
    }
  };

  const handleToggle3D = () => {
    soundManager.playClick();
    setUse3D(!use3D);
  };

  const handleOpenProject = (projId) => {
    if (projId === 'medinv') {
      setActiveSection('medinv');
    } else {
      setSelectedProjectId(projId);
    }
  };

  const selectedProject = selectedProjectId 
    ? PROJECTS_DATA.find(p => p.id === selectedProjectId)
    : null;

  return (
    <div className={`app-root ${theme === 'light' ? 'theme-light' : ''}`}>
      {/* Full-Screen Suit HUD and Cinematic Startup Activation Sequence */}
      {showSuitHUD && (
        <CinematicSuitHUD
          onNavigate={(destId) => {
            setActiveSection(destId);
            setShowSuitHUD(false);
          }}
          onClose={() => {
            setShowSuitHUD(false);
          }}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          reducedMotion={reducedMotion}
          use3D={use3D}
        />
      )}

      {/* Main Top Navigation Header */}
      <TopNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenHUD={() => setShowSuitHUD(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isVoiceSpeaking={isVoiceSpeaking}
        isVoiceListening={isVoiceListening}
      />

      {/* Main Dynamic Viewport */}
      <main className="main-content-viewport" id="main-content">
        <Suspense fallback={
          <div className="module-loading-state mono">
            <div className="status-dot online pulse-icon" />
            <span>AURELION // INITIALIZING SUBSYSTEM TELEMETRY...</span>
          </div>
        }>
          {activeSection === 'command-center' && (
            <CommandCenter
              activeSection={activeSection}
              onNavigate={setActiveSection}
              onOpenProject={handleOpenProject}
              onOpenHUD={() => setShowSuitHUD(true)}
              isVoiceSpeaking={isVoiceSpeaking}
              isVoiceListening={isVoiceListening}
              soundEnabled={soundEnabled}
              reducedMotion={reducedMotion}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectExplorer
              onOpenMedinvSpecial={() => setActiveSection('medinv')}
              onOpenPcbLab={() => setActiveSection('pcb-lab')}
            />
          )}

          {activeSection === 'medinv' && (
            <MedinvSpecialModule
              onOpenPcbLab={() => setActiveSection('pcb-lab')}
              onBack={() => setActiveSection('projects')}
            />
          )}

          {activeSection === 'dcdc' && (
            <DcdcModule
              onNavigateProjects={() => setActiveSection('projects')}
              onNavigateContact={() => setActiveSection('contact')}
            />
          )}

          {activeSection === 'skills' && (
            <SkillsModule
              onOpenPcbLab={() => setActiveSection('pcb-lab')}
            />
          )}

          {activeSection === 'experience' && (
            <ExperienceTimeline />
          )}

          {activeSection === 'pcb-lab' && (
            <PCBViewer />
          )}

          {activeSection === 'terminal' && (
            <EngineeringTerminal
              onNavigate={setActiveSection}
              onToggleTheme={handleToggleTheme}
              currentTheme={theme}
              onOpenHUD={() => setShowSuitHUD(true)}
            />
          )}

          {activeSection === 'contact' && (
            <ContactModule />
          )}
        </Suspense>
      </main>

      {/* Global Project Detail Modal if triggered from Reactor or Explorer */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
          onOpenMedinvSpecial={() => {
            setSelectedProjectId(null);
            setActiveSection('medinv');
          }}
          onOpenPcbLab={() => {
            setSelectedProjectId(null);
            setActiveSection('pcb-lab');
          }}
        />
      )}

      {/* Command Palette Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={setActiveSection}
        onOpenProject={handleOpenProject}
        onOpenHUD={() => setShowSuitHUD(true)}
        onToggleTheme={handleToggleTheme}
        currentTheme={theme}
      />

      {/* System Settings Modal */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        use3D={use3D}
        onToggle3D={handleToggle3D}
      />

      {/* Executive Command Center Footer */}
      <footer className="command-footer tactical-panel mono" role="contentinfo">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-emblem-text">AURELION // TACTICAL ARCHITECTURE</span>
            <span className="footer-sub">
              Engineering Command Center & Portfolio of {PROFILE_DATA.name} — B.Tech ECE with Data Science, SRM IST Ramapuram.
            </span>
          </div>

          <div className="footer-links">
            <a 
              href={PROFILE_DATA.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              GitHub // Thirumal23
            </a>
            <span className="footer-sep">|</span>
            <a 
              href={PROFILE_DATA.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              LinkedIn Profile
            </a>
            <span className="footer-sep">|</span>
            <button 
              type="button" 
              className="footer-link-btn"
              onClick={() => { soundManager.playClick(); setActiveSection('terminal'); }}
            >
              Terminal CLI
            </button>
          </div>

          <div className="footer-right">
            <span className="telemetry-tag">HOST: THIRUMAL23.GITHUB.IO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
