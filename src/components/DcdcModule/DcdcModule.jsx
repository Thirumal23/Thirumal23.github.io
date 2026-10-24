import React from 'react';
import { 
  Award, 
  Users, 
  Kanban, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { DCDC_DATA, PROFILE_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import './DcdcModule.css';

export default function DcdcModule({ onNavigateProjects, onNavigateContact }) {
  return (
    <div className="dcdc-module-container">
      {/* Header Banner */}
      <div className="dcdc-hero-card tactical-panel tactical-panel-corner">
        <div className="dcdc-hero-left">
          <div className="dcdc-emblem-box">
            <Award size={36} className="text-gold" />
          </div>
          <div>
            <div className="dcdc-status-row mono">
              <span className="telemetry-tag">OFFICIAL APPOINTMENT // EXECUTIVE LEADERSHIP</span>
              <span className="status-dot online" />
            </div>
            <h1 className="dcdc-hero-title">{DCDC_DATA.role.toUpperCase()}</h1>
            <h2 className="dcdc-club-title">{DCDC_DATA.organization}</h2>
            <p className="dcdc-lead-desc">
              {DCDC_DATA.overview}
            </p>
          </div>
        </div>

        <div className="dcdc-actions-box">
          <VoiceSectionBriefing 
            sectionKey="dcdc"
            customText={AURELION_DIALOGUE.detailedIntroductions['dcdc']}
          />
          <button
            type="button"
            className="btn-tactical btn-tactical-gold mono"
            onClick={() => { soundManager.playClick(); onNavigateProjects(); }}
          >
            <Cpu size={14} />
            <span>VIEW CLUB-ALIGNED PROJECTS</span>
          </button>
        </div>
      </div>

      {/* Leadership Pillars Matrix */}
      <div className="dcdc-pillars-grid">
        {DCDC_DATA.responsibilities.map((resp, idx) => (
          <div key={idx} className="pillar-card tactical-panel tactical-panel-corner">
            <div className="pillar-header mono">
              <span className="pillar-index text-gold">PILLAR 0{idx + 1}</span>
              <Compass size={16} className="text-cyan" />
            </div>
            <h3 className="pillar-title">{resp.title}</h3>
            <p className="pillar-desc">{resp.desc}</p>
          </div>
        ))}
      </div>

      {/* Strategic Focus Areas & Collaborative Methodology */}
      <div className="dcdc-method-grid">
        <div className="method-card tactical-panel">
          <div className="card-top-tag mono">
            <span>CORE INITIATIVE FOCUS DOMAINS</span>
            <span className="telemetry-tag">DCDC SPRINT SCOPES</span>
          </div>
          <div className="focus-areas-list mono">
            {DCDC_DATA.focusAreas.map((area, idx) => (
              <div key={idx} className="focus-row">
                <CheckCircle2 size={15} className="text-success" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="method-card tactical-panel">
          <div className="card-top-tag mono">
            <span>LEADERSHIP ETHOS & CROSS-DISCIPLINARY COLLABORATION</span>
            <span className="telemetry-tag">OPERATIONAL PHILOSOPHY</span>
          </div>
          <p className="ethos-text">
            At DCDC, engineering excellence merges with human-centered interaction design. 
            My responsibility as Project Head is to translate conceptual ideas into robust hardware prototypes, align technical architectures across team members, and ensure that every subsystem satisfies rigorous engineering criteria while communicating its utility clearly.
          </p>
          <div className="ethos-badge mono">
            <ShieldCheck size={14} className="text-cyan" />
            <span>VERIFIED APPOINTMENT AT SRM IST RAMAPURAM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
