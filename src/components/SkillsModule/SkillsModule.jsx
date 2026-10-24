import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Code2, 
  BarChart3, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import './SkillsModule.css';

export default function SkillsModule({ onOpenPcbLab }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const tabs = [
    { id: 'ALL', label: 'ALL DISCIPLINES' },
    { id: 'embedded', label: 'EMBEDDED & ELECTRONICS' },
    { id: 'programming', label: 'PROGRAMMING & WEB' },
    { id: 'dataAi', label: 'DATA SCIENCE & AI' },
    { id: 'engineeringInterests', label: 'ENGINEERING DOMAINS' }
  ];

  return (
    <div className="skills-module-container">
      {/* Header Card */}
      <div className="skills-header-card tactical-panel tactical-panel-corner">
        <div className="skills-header-left">
          <div className="skills-icon-box">
            <Layers size={26} className="text-cyan" />
          </div>
          <div>
            <div className="skills-tag-row mono">
              <span className="telemetry-tag">TECHNICAL COMPETENCY MATRIX</span>
              <span className="status-dot online" />
            </div>
            <h2>ENGINEERING SKILLS & INSTRUMENTATION</h2>
            <p className="skills-sub">
              Verified proficiencies across hardware EDA, embedded firmware, data science pipelines, and software development.
            </p>
          </div>
        </div>

        <div className="skills-header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <VoiceSectionBriefing 
            sectionKey="skills"
            customText={AURELION_DIALOGUE.detailedIntroductions['skills']}
          />
          <button
            type="button"
            className="btn-tactical btn-tactical-gold mono"
            onClick={onOpenPcbLab}
          >
            <Cpu size={14} />
            <span>INSPECT KICAD PCB WORKFLOW</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="skills-tabs-bar mono">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`skills-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setActiveTab(tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Matrix Display */}
      <div className="skills-sections-list">
        {Object.entries(SKILLS_DATA).map(([catKey, category]) => {
          if (activeTab !== 'ALL' && activeTab !== catKey) return null;
          return (
            <div key={catKey} className="skills-category-block tactical-panel">
              <div className="category-header mono">
                <div className="cat-title-row">
                  <span className="cat-title">{category.category}</span>
                  <span className="telemetry-tag">{category.items.length} SKILLS</span>
                </div>
              </div>

              <div className="skills-cards-grid">
                {category.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="skill-card tactical-panel"
                    onMouseEnter={() => {
                      soundManager.playTerminal();
                      setHoveredSkill(skill);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="skill-card-top mono">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level-badge">{skill.level}</span>
                    </div>

                    <p className="skill-highlight">
                      {skill.highlight}
                    </p>

                    <div className="skill-footer mono">
                      <span className="telemetry-tag">VERIFIED PROFICIENCY</span>
                      <CheckCircle2 size={13} className="text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Detail Sticky Telemetry Inspector */}
      {hoveredSkill && (
        <div className="skill-telemetry-toast tactical-panel mono">
          <Info size={14} className="text-cyan" />
          <span>INSPECTING: {hoveredSkill.name} [{hoveredSkill.level}] — {hoveredSkill.highlight}</span>
        </div>
      )}
    </div>
  );
}
