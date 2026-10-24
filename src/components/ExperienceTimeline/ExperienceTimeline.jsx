import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { 
  PROFILE_DATA, 
  EXPERIENCE_DATA, 
  HACKATHONS_DATA, 
  CERTIFICATIONS_DATA 
} from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import './ExperienceTimeline.css';

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <div className="exp-timeline-container">
      {/* Header Banner */}
      <div className="exp-header-card tactical-panel tactical-panel-corner">
        <div className="exp-header-left">
          <div className="exp-icon-box">
            <Briefcase size={26} className="text-cyan" />
          </div>
          <div>
            <div className="exp-tag-row mono">
              <span className="telemetry-tag">CHRONOLOGY // CAREER & ACADEMICS</span>
              <span className="status-dot online" />
            </div>
            <h2>EXPERIENCE, ACADEMICS & RECOGNITION</h2>
            <p className="exp-sub">
              Verified internships at Beau Roi Technologies & Chennai Metro Rail, academic excellence at SRM IST (9.54 CGPA), hackathon accolades, and technical certifications.
            </p>
          </div>
        </div>

        <div className="exp-header-actions">
          <VoiceSectionBriefing 
            sectionKey="experience"
            customText={AURELION_DIALOGUE.detailedIntroductions['experience']}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="exp-tabs-bar mono">
        <button
          type="button"
          className={`exp-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => { soundManager.playClick(); setActiveTab('experience'); }}
        >
          <Briefcase size={14} />
          <span>INDUSTRY INTERNSHIPS (2)</span>
        </button>

        <button
          type="button"
          className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => { soundManager.playClick(); setActiveTab('education'); }}
        >
          <GraduationCap size={14} />
          <span>ACADEMIC BACKGROUND</span>
        </button>

        <button
          type="button"
          className={`exp-tab-btn ${activeTab === 'hackathons' ? 'active' : ''}`}
          onClick={() => { soundManager.playClick(); setActiveTab('hackathons'); }}
        >
          <Award size={14} />
          <span>HACKATHONS & RECOGNITION</span>
        </button>

        <button
          type="button"
          className={`exp-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => { soundManager.playClick(); setActiveTab('certifications'); }}
        >
          <FileCheck size={14} />
          <span>CERTIFICATIONS & WORKSHOPS</span>
        </button>
      </div>

      {/* Tab 1: Industry Internships */}
      {activeTab === 'experience' && (
        <div className="exp-timeline-body">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="exp-card tactical-panel tactical-panel-corner">
              <div className="exp-card-header">
                <div>
                  <span className="telemetry-tag mono">{exp.type.toUpperCase()}</span>
                  <h3 className="exp-role">{exp.role}</h3>
                  <h4 className="exp-org">{exp.organization}</h4>
                </div>
                <div className="exp-meta-badge mono">
                  <div className="meta-item">
                    <Calendar size={13} className="text-cyan" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={13} className="text-gold" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="exp-contributions-list">
                <span className="list-title mono">KEY TECHNICAL CONTRIBUTIONS:</span>
                {exp.contributions.map((c, i) => (
                  <div key={i} className="contribution-row">
                    <CheckCircle2 size={15} className="text-success" />
                    <p>{c}</p>
                  </div>
                ))}
              </div>

              <div className="exp-skills-applied mono">
                <span className="skills-applied-label">APPLIED TOOLKIT:</span>
                {exp.skillsApplied.map((s, i) => (
                  <span key={i} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Education & Academics */}
      {activeTab === 'education' && (
        <div className="education-grid">
          {/* SRM Degree Card */}
          <div className="edu-card tactical-panel tactical-panel-corner">
            <div className="card-top-tag mono">
              <span>UNDERGRADUATE DEGREE // SRM IST RAMAPURAM</span>
              <span className="telemetry-tag">CURRENT</span>
            </div>
            <div className="edu-header">
              <GraduationCap size={32} className="text-gold" />
              <div>
                <h3 className="edu-title">{PROFILE_DATA.degree}</h3>
                <span className="edu-inst">{PROFILE_DATA.institution}</span>
                <div className="edu-status mono">{PROFILE_DATA.academics.status}</div>
              </div>
            </div>

            {/* GPA Breakdown Matrix */}
            <div className="cgpa-highlight-box mono">
              <div className="cgpa-score">
                <span className="cgpa-val text-gold">{PROFILE_DATA.academics.overallCGPA}</span>
                <span className="cgpa-scale">/ 10.0 OVERALL CGPA</span>
              </div>
              <div className="sem-gpa-grid">
                {PROFILE_DATA.academics.semesters.map((s, i) => (
                  <div key={i} className="sem-box">
                    <span className="sem-name">{s.sem}</span>
                    <span className="sem-val text-cyan">{s.gpa}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="edu-disclaimer mono">
              <ShieldCheck size={14} className="text-success" />
              <span>OFFICIAL SRM RAMAPURAM ACADEMIC RECORDS</span>
            </div>
          </div>

          {/* Schooling Card */}
          <div className="edu-card tactical-panel">
            <div className="card-top-tag mono">
              <span>SECONDARY & HIGHER SECONDARY SCHOOLING</span>
              <span className="telemetry-tag">CBSE BOARD</span>
            </div>

            <div className="schooling-list mono">
              {PROFILE_DATA.academics.schooling.map((sch, i) => (
                <div key={i} className="school-row tactical-panel">
                  <div className="school-left">
                    <span className="school-std">{sch.standard}</span>
                    {sch.stream && <span className="school-stream">{sch.stream}</span>}
                  </div>
                  <span className="school-score text-cyan">{sch.score}</span>
                </div>
              ))}
            </div>

            {/* ITDECC 2025 Presentation Card */}
            <div className="conference-box tactical-panel">
              <div className="conf-top mono">
                <Star size={14} className="text-gold" />
                <span className="text-gold">INTERNATIONAL CONFERENCE PRESENTATION</span>
              </div>
              <h4 className="conf-h">ITDECC 2025 — SRM IST RAMAPURAM</h4>
              <p className="conf-p">
                Presented research: <em>"HR Analytics for Strategic Decision-Making: A Comprehensive Data-Driven Study"</em> under mentorship of Dr. Sree Rathna Lakshmi N V S (HOD, ECE).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Hackathons & Competitions */}
      {activeTab === 'hackathons' && (
        <div className="hackathons-grid">
          {HACKATHONS_DATA.map((hack, idx) => (
            <div key={idx} className="hackathon-card tactical-panel tactical-panel-corner">
              <div className="hack-header mono">
                <span className="hack-level text-cyan">{hack.level.toUpperCase()}</span>
                <span className="hack-award text-gold">{hack.recognition}</span>
              </div>
              <h3 className="hack-name">{hack.event}</h3>
              <p className="hack-desc">{hack.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Certifications & Workshops */}
      {activeTab === 'certifications' && (
        <div className="certifications-grid">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <div key={idx} className="cert-card tactical-panel">
              <div className="cert-top mono">
                <CheckCircle2 size={15} className="text-success" />
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <h4 className="cert-title">{cert.title}</h4>
              <div className="cert-footer mono">
                <span className="telemetry-tag">VERIFIED CREDENTIAL</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
