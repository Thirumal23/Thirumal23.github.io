import React, { useState, Suspense, lazy } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Radio, 
  Terminal as TermIcon, 
  FolderGit2, 
  ExternalLink, 
  Award, 
  GraduationCap, 
  Layers, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Eye, 
  ChevronRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { PROFILE_DATA, DCDC_DATA, PROJECTS_DATA, SKILLS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import ReactorFallback from './ReactorFallback';
import AurelionPanel from './AurelionPanel';
import './CommandCenter.css';

const Reactor3D = lazy(() => import('./Reactor3D'));

export default function CommandCenter({ 
  activeSection = 'command-center',
  onNavigate, 
  onOpenProject, 
  onOpenHUD,
  isVoiceSpeaking, 
  isVoiceListening,
  soundEnabled,
  reducedMotion
}) {
  const [use3D, setUse3D] = useState(!reducedMotion);

  const handleAction = (action, target) => {
    switch (action) {
      case 'NAV_PROJECTS':
        onNavigate('projects');
        break;
      case 'OPEN_PROJECT_MEDINV':
        onNavigate('medinv');
        break;
      case 'OPEN_PROJECT_KINEX':
        onOpenProject('kinex');
        break;
      case 'OPEN_PROJECT_CMRL':
        onOpenProject('cmrl-tvs');
        break;
      case 'NAV_SKILLS':
        onNavigate('skills');
        break;
      case 'NAV_EXPERIENCE':
        onNavigate('experience');
        break;
      case 'NAV_DCDC':
        onNavigate('dcdc');
        break;
      case 'NAV_PCB':
        onNavigate('pcb-lab');
        break;
      case 'NAV_EDUCATION':
        onNavigate('experience');
        break;
      case 'NAV_CONTACT':
        onNavigate('contact');
        break;
      case 'NAV_HOME':
        onNavigate('command-center');
        break;
      case 'OPEN_HUD':
        if (onOpenHUD) onOpenHUD();
        break;
      case 'OPEN_GITHUB':
        window.open(PROFILE_DATA.contact.github, '_blank', 'noopener,noreferrer');
        break;
      default:
        break;
    }
  };

  const medinvProject = PROJECTS_DATA.find(p => p.id === 'medinv');
  const cmrlProject = PROJECTS_DATA.find(p => p.id === 'cmrl-tvs');

  return (
    <div className="command-center-wrap">
      {/* Top Telemetry Strip */}
      <div className="hud-telemetry-strip mono">
        <div className="telemetry-cell">
          <span className="telemetry-label">SYSTEM STATE</span>
          <span className="telemetry-val text-success">
            <span className="status-dot online" /> NOMINAL // 100%
          </span>
        </div>
        <div className="telemetry-cell">
          <span className="telemetry-label">OPERATOR</span>
          <span className="telemetry-val">{PROFILE_DATA.name.toUpperCase()}</span>
        </div>
        <div className="telemetry-cell">
          <span className="telemetry-label">ACADEMIC CGPA</span>
          <span className="telemetry-val text-gold">{PROFILE_DATA.academics.overallCGPA} / 10.0</span>
        </div>
        <div className="telemetry-cell">
          <span className="telemetry-label">ACTIVE INITIATIVES</span>
          <span className="telemetry-val text-cyan">8 VERIFIED PROJECTS</span>
        </div>
        <div className="telemetry-cell">
          <span className="telemetry-label">LEADERSHIP</span>
          <span className="telemetry-val">PROJECT HEAD @ DCDC</span>
        </div>
      </div>

      {/* Main Command Grid: 3 Columns */}
      <div className="command-grid-layout">
        
        {/* Left Column: Operator Dossier & Quick Actions */}
        <div className="command-col command-col-operator">
          <div className="operator-card tactical-panel tactical-panel-corner">
            <div className="card-top-tag mono">
              <span>PERSONNEL IDENT: {PROFILE_DATA.callsign}</span>
              <span className="telemetry-tag">SRM IST ECE</span>
            </div>

            <div className="operator-header">
              <div className="operator-avatar-box">
                <div className="operator-avatar-inner">
                  <Cpu size={32} className="text-cyan" />
                </div>
              </div>
              <div className="operator-meta">
                <h1 className="operator-name">{PROFILE_DATA.name}</h1>
                <p className="operator-degree">{PROFILE_DATA.degree}</p>
                <div className="operator-location mono">{PROFILE_DATA.contact.location}</div>
              </div>
            </div>

            <p className="operator-bio">
              {PROFILE_DATA.summary}
            </p>

            {/* Quick Metrics Bar */}
            <div className="operator-stats-grid mono">
              <div className="stat-box">
                <span className="stat-num text-cyan">9.54</span>
                <span className="stat-desc">CGPA</span>
              </div>
              <div className="stat-box">
                <span className="stat-num text-gold">Top 5</span>
                <span className="stat-desc">THREX HACK</span>
              </div>
              <div className="stat-box">
                <span className="stat-num text-success">2x SIH</span>
                <span className="stat-desc">INNOVATION</span>
              </div>
              <div className="stat-box">
                <span className="stat-num text-cyan">ITDECC</span>
                <span className="stat-desc">CONF '25</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="operator-actions-row">
              <button 
                type="button" 
                className="btn-tactical btn-tactical-gold"
                onClick={() => { soundManager.playPowerPulse(); if (onOpenHUD) onOpenHUD(); }}
                title="Deploy Suit HUD & Holographic Navigation Hub"
              >
                <Compass size={14} className="pulse-icon" />
                <span>SUIT HUD</span>
              </button>

              <a 
                href={PROFILE_DATA.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-tactical btn-tactical-outline"
                onClick={() => soundManager.playClick()}
              >
                <FolderGit2 size={14} />
                <span>GITHUB</span>
                <ExternalLink size={12} />
              </a>

              <button 
                type="button" 
                className="btn-tactical btn-tactical-outline"
                onClick={() => { soundManager.playClick(); onNavigate('contact'); }}
              >
                <span>CONTACT</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Terminal launcher banner */}
            <div 
              className="terminal-quick-banner mono"
              onClick={() => { soundManager.playClick(); onNavigate('terminal'); }}
              role="button"
              tabIndex={0}
            >
              <TermIcon size={16} className="text-cyan" />
              <div className="term-banner-text">
                <span className="term-prompt">aurelion:~$ Launch Interactive CLI</span>
                <span className="term-sub">14 Working Local Commands (medinv, kinex, dcdc...)</span>
              </div>
              <ChevronRight size={14} className="text-muted" />
            </div>
          </div>

          {/* DCDC Leadership Spotlight */}
          <div 
            className="dcdc-spotlight tactical-panel"
            onClick={() => { soundManager.playClick(); onNavigate('dcdc'); }}
            role="button"
            tabIndex={0}
          >
            <div className="dcdc-spot-header">
              <Award size={18} className="text-gold" />
              <span className="telemetry-tag">LEADERSHIP APPOINTMENT</span>
            </div>
            <h3 className="dcdc-spot-title">PROJECT HEAD — DCDC</h3>
            <p className="dcdc-spot-desc">
              Digital Communication and Design Club. Leading technical project conceptualization, cross-disciplinary team coordination, and prototyping sprints.
            </p>
            <div className="dcdc-spot-link mono">
              <span>EXPLORE DCDC PROFILE</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Center Column: Core Reactor Interface */}
        <div className="command-col command-col-reactor">
          <div className="reactor-module-box tactical-panel tactical-panel-corner">
            {/* Reactor Controls Header */}
            <div className="reactor-header-bar mono">
              <div className="reactor-title-wrap">
                <span className="status-dot online" />
                <span className="reactor-title">AURELION ARC REACTOR // INTELLIGENCE CORE</span>
              </div>
              <div className="reactor-mode-toggle">
                <button
                  type="button"
                  className={`btn-tactical btn-compact ${use3D ? 'btn-tactical-gold' : 'btn-tactical-outline'}`}
                  onClick={() => { soundManager.playClick(); setUse3D(!use3D); }}
                  title="Toggle 3D WebGL vs 2D Tactical Vector Canvas"
                >
                  <Eye size={12} />
                  <span>MODE: {use3D ? '3D WEBGL' : '2D VECTOR'}</span>
                </button>
              </div>
            </div>

            {/* Reactor Canvas / Scene */}
            <div className="reactor-viewport">
              {use3D ? (
                <Suspense fallback={<ReactorFallback onSelectProject={onOpenProject} onSelectSection={onNavigate} />}>
                  <Reactor3D onSelectProject={onOpenProject} />
                </Suspense>
              ) : (
                <ReactorFallback onSelectProject={onOpenProject} onSelectSection={onNavigate} />
              )}
            </div>

            {/* Quick Nodes Instruction Strip */}
            <div className="reactor-instructions mono">
              <span>INTERACTIVE ORBIT: CLICK ANY COMPONENT NODE TO LOAD ENGINEERING DOSSIER</span>
              <button 
                type="button" 
                className="btn-tactical btn-compact btn-tactical-outline"
                onClick={() => { soundManager.playClick(); onNavigate('projects'); }}
              >
                <span>OPEN PROJECT LAB (8)</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Quick Spotlight Grid below Reactor */}
          <div className="sub-spotlight-grid">
            {/* MEDINV Spotlight */}
            <div 
              className="spotlight-card tactical-panel"
              onClick={() => { soundManager.playClick(); onNavigate('medinv'); }}
              role="button"
              tabIndex={0}
            >
              <div className="spotlight-tag mono text-gold">FEATURED // PRJ-01</div>
              <h4>MEDINV DISPENSER</h4>
              <p>IoT scheduled medication system with rotary stepper mechanism and caregiver telemetry.</p>
              <div className="spotlight-footer mono">
                <span>OPEN SYSTEM DOSSIER</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* CMRL Metro Spotlight */}
            <div 
              className="spotlight-card tactical-panel"
              onClick={() => { soundManager.playClick(); onOpenProject('cmrl-tvs'); }}
              role="button"
              tabIndex={0}
            >
              <div className="spotlight-tag mono text-cyan">PROTOTYPE // PRJ-03</div>
              <h4>CMRL METRO TVS</h4>
              <p>Miniature tunnel ventilation control panel replicating SLI, TVS, IBP, and SCR modes.</p>
              <div className="spotlight-footer mono">
                <span>INSPECT CONTROL PANEL</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AURELION Digital Butler */}
        <div className="command-col command-col-aurelion">
          <AurelionPanel 
            activeSection={activeSection}
            onExecuteAction={handleAction}
            isSpeaking={isVoiceSpeaking}
            isListening={isVoiceListening}
            soundEnabled={soundEnabled}
          />

          {/* Technical Competencies Snapshot */}
          <div className="skills-quick-card tactical-panel">
            <div className="card-top-tag mono">
              <span>CORE COMPETENCY MATRIX</span>
              <span className="telemetry-tag">VERIFIED</span>
            </div>
            <div className="skills-tag-flow">
              {['KiCad PCB', 'Python', 'ESP32', 'C', 'SQL', 'Power BI', 'Arduino', 'Pandas', 'NumPy', 'IoT'].map((s, idx) => (
                <span key={idx} className="skill-chip mono">
                  {s}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="btn-tactical btn-tactical-outline btn-full-width mono"
              onClick={() => { soundManager.playClick(); onNavigate('skills'); }}
            >
              <Layers size={14} />
              <span>VIEW FULL SKILLS & EDA MATRIX</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
