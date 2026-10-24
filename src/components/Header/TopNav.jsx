import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Volume2, 
  VolumeX, 
  Settings, 
  Cpu, 
  Layers, 
  FolderGit2, 
  UserCheck, 
  Sparkles, 
  PhoneCall, 
  Radio,
  Sliders,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import './TopNav.css';

export default function TopNav({ 
  activeSection, 
  setActiveSection, 
  onOpenCommandPalette, 
  onOpenSettings,
  onOpenHUD,
  soundEnabled,
  onToggleSound,
  isVoiceSpeaking,
  isVoiceListening
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'command-center', label: 'COMMAND CORE', icon: Sparkles },
    { id: 'projects', label: 'PROJECTS (8)', icon: FolderGit2 },
    { id: 'dcdc', label: 'DCDC LEADERSHIP', icon: UserCheck },
    { id: 'skills', label: 'SKILLS & EDA', icon: Layers },
    { id: 'experience', label: 'EXPERIENCE', icon: Radio },
    { id: 'pcb-lab', label: '3D PCB LAB', icon: Cpu },
    { id: 'terminal', label: 'TERMINAL', icon: Terminal },
    { id: 'contact', label: 'CONTACT', icon: PhoneCall },
  ];

  const handleNavClick = (id) => {
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="top-nav-bar" role="banner">
      <div className="nav-container">
        {/* Left: Brand Identity */}
        <div className="nav-brand" onClick={() => handleNavClick('command-center')} role="button" tabIndex={0}>
          <div className="brand-emblem-wrap">
            <svg viewBox="0 0 100 100" className="brand-emblem-svg">
              <circle cx="50" cy="50" r="42" stroke="var(--border-subtle)" strokeWidth="3" fill="none" />
              <circle cx="50" cy="50" r="34" stroke="var(--reactor-cyan)" strokeWidth="2.5" strokeDasharray="10 5" fill="none" className="brand-spin" />
              <circle cx="50" cy="50" r="22" stroke="var(--electric-blue)" strokeWidth="1.5" fill="none" />
              <polygon points="50,22 55,42 75,45 58,55 64,75 50,62 36,75 42,55 25,45 45,42" fill="none" stroke="var(--gold-accent)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="5" fill="var(--reactor-cyan)" />
            </svg>
            <span className="status-dot online brand-status-dot" title="Aurelion Core Nominal" />
          </div>

          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-name">AURELION</span>
              <span className="brand-callsign mono">{PROFILE_DATA.callsign}</span>
            </div>
            <span className="brand-operator mono">OPERATOR: {PROFILE_DATA.name.toUpperCase()}</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link-btn mono ${isActive ? 'active' : ''} ${item.highlight ? 'nav-link-highlight' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={14} className="nav-btn-icon" />
                <span>{item.label}</span>
                {isActive && <div className="nav-link-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Right: Telemetry & Tactical Utilities */}
        <div className="nav-utilities">
          {/* Assistant Voice Status Badge */}
          <div className={`nav-assistant-badge mono ${isVoiceSpeaking ? 'speaking' : isVoiceListening ? 'listening' : 'idle'}`}>
            <Radio size={13} className={isVoiceSpeaking || isVoiceListening ? 'pulse-icon' : ''} />
            <span className="assistant-state-text">
              {isVoiceSpeaking ? 'AURELION VOCALIZING' : isVoiceListening ? 'LISTENING...' : 'VOICE STANDBY'}
            </span>
          </div>

          {/* Holographic Suit HUD Launcher */}
          <button
            type="button"
            className="btn-tactical btn-tactical-gold btn-hud-tool mono"
            onClick={onOpenHUD}
            title="Open Full Holographic Suit HUD & Navigation Hub"
            aria-label="Open Holographic Navigation Hub"
          >
            <Compass size={14} className="pulse-icon" />
            <span>SUIT HUD</span>
          </button>

          {/* Quick Command Palette Button */}
          <button 
            type="button" 
            className="btn-tactical btn-tactical-outline btn-hud-tool mono"
            onClick={onOpenCommandPalette}
            title="Open Command Palette (Ctrl+K or Cmd+K)"
            aria-label="Open Command Palette"
          >
            <Search size={14} />
            <span className="hud-key-badge">Ctrl K</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            type="button"
            className={`btn-icon-hud ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
            title={soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
            aria-label="Toggle UI Audio Effects"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            className="btn-icon-hud"
            onClick={onOpenSettings}
            title="System Configuration Settings"
            aria-label="Open System Settings"
          >
            <Settings size={16} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle btn-icon-hud"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer tactical-panel">
          <div className="mobile-drawer-header mono">
            <span>COMMAND NAVIGATION DIRECTORY</span>
            <span className="telemetry-tag">{currentTime} UTC</span>
          </div>
          <div className="mobile-links-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-link-btn mono ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
