import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  Search, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  Eye, 
  Sparkles,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import ProjectDetailModal from './ProjectDetailModal';
import MedinvSpecialModule from './MedinvSpecialModule';
import './ProjectExplorer.css';

export default function ProjectExplorer({ onOpenPcbLab, initialProjectId, initialSubView = 'explorer' }) {
  const [subView, setSubView] = useState(initialSubView);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(
    initialProjectId ? PROJECTS_DATA.find(p => p.id === initialProjectId) : null
  );

  const categories = [
    'ALL',
    'IoT / Embedded Healthcare',
    'AI / Assistive Embedded',
    'Embedded & Control Systems',
    'Data Analytics & Research',
    'IoT & Microcontrollers'
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (project) => {
    soundManager.playClick();
    setActiveModalProject(project);
  };

  if (subView === 'medinv') {
    return (
      <MedinvSpecialModule 
        onOpenPcbLab={onOpenPcbLab} 
        onBack={() => setSubView('explorer')} 
      />
    );
  }

  return (
    <div className="project-explorer-container">
      {/* Header bar */}
      <div className="explorer-header-card tactical-panel tactical-panel-corner">
        <div className="explorer-header-left">
          <div className="explorer-icon-box">
            <FolderGit2 size={26} className="text-cyan" />
          </div>
          <div>
            <div className="explorer-tag-row mono">
              <span className="telemetry-tag">ENGINEERING ARCHIVE // 8 INITIATIVES</span>
              <span className="status-dot online" />
            </div>
            <h2>PROJECT LABORATORY & EXPERIMENTAL ARCHIVE</h2>
            <p className="explorer-sub">
              Verified hardware prototypes, IoT systems, research publications, and embedded systems engineered by Thirumal N.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="explorer-header-right">
          <VoiceSectionBriefing 
            sectionKey="projects" 
            customText={AURELION_DIALOGUE.detailedIntroductions['projects']} 
          />

          {/* Search input */}
          <div className="explorer-search-box">
            <Search size={15} className="text-muted" />
            <input
              type="text"
              className="explorer-search-input mono"
              placeholder="Search projects by sensor, tag, or MCU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>
        </div>
      </div>

      {/* MEDINV Flagship Showcase Banner Inside Projects */}
      <div className="medinv-flagship-spotlight tactical-panel tactical-panel-corner">
        <div className="medinv-spot-left">
          <div className="spot-badge mono">FEATURED FLAGSHIP INITIATIVE // PRJ-01</div>
          <h3 className="spot-title">MEDINV: SMART MEDICINE DISPENSING SYSTEM</h3>
          <p className="spot-desc">
            IoT scheduled medication management system engineered with precision rotary motor kinematics, DS3231 RTC synchronization, caregiver telemetry, and non-volatile state memory.
          </p>
        </div>
        <div className="medinv-spot-actions">
          <button 
            type="button" 
            className="btn-tactical btn-tactical-outline mono"
            onClick={() => {
              soundManager.playPowerPulse();
              aurelionVoiceService.speak(AURELION_DIALOGUE.projectDossiers['medinv']);
            }}
          >
            <Volume2 size={13} className="text-cyan" />
            <span>EXPLAIN MEDINV</span>
          </button>
          <button 
            type="button" 
            className="btn-tactical btn-tactical-gold mono"
            onClick={() => { soundManager.playClick(); setSubView('medinv'); }}
          >
            <span>LAUNCH IOT DISPENSER SIMULATION</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="explorer-filter-bar mono">
        <span className="filter-label"><Filter size={14} /> FILTER:</span>
        <div className="filter-chips-list">
          {['ALL', 'Embedded', 'IoT', 'Data Analytics', 'AI / CV'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-card-grid">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id} 
            className={`project-card tactical-panel tactical-panel-corner ${proj.featured ? 'card-featured' : ''}`}
            onClick={() => handleOpenDetail(proj)}
            role="button"
            tabIndex={0}
          >
            <div className="project-card-top mono">
              <span className="proj-code text-gold">{proj.code}</span>
              <div className="card-top-actions">
                <button
                  type="button"
                  className="btn-card-audio mono"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playPowerPulse();
                    aurelionVoiceService.speak(AURELION_DIALOGUE.projectDossiers[proj.id] || proj.summary);
                  }}
                  title={`Listen to AURELION briefing on ${proj.name}`}
                  aria-label={`Listen to briefing on ${proj.name}`}
                >
                  <Volume2 size={11} className="text-cyan" />
                  <span>VOICE</span>
                </button>
                <span className="proj-status-badge">{proj.statusBadge}</span>
              </div>
            </div>

            <div className="project-card-header">
              <h3 className="proj-name">{proj.name}</h3>
              <span className="proj-sub">{proj.subtitle}</span>
            </div>

            <p className="proj-summary">
              {proj.summary}
            </p>

            {/* Tags */}
            <div className="proj-tags-list mono">
              {proj.tags.slice(0, 4).map((t, idx) => (
                <span key={idx} className="card-tag">
                  #{t}
                </span>
              ))}
              {proj.tags.length > 4 && (
                <span className="card-tag-more">+{proj.tags.length - 4}</span>
              )}
            </div>

            {/* Card Footer */}
            <div className="project-card-footer mono">
              <span className="card-category">{proj.category}</span>
              <span className="inspect-link">
                <span>INSPECT DOSSIER</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onOpenMedinvSpecial={onOpenMedinvSpecial}
          onOpenPcbLab={onOpenPcbLab}
        />
      )}
    </div>
  );
}
