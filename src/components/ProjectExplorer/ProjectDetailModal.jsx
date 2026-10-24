import React from 'react';
import { X, ExternalLink, Cpu, Layers, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

export default function ProjectDetailModal({ project, onClose, onOpenMedinvSpecial, onOpenPcbLab }) {
  if (!project) return null;

  return (
    <div className="project-modal-backdrop" role="dialog" aria-modal="true">
      <div className="project-modal-container tactical-panel tactical-panel-corner">
        {/* Modal Header */}
        <div className="project-modal-header">
          <div className="modal-title-wrap">
            <span className="telemetry-tag">{project.code} // {project.category}</span>
            <div className="modal-title-row">
              <h3>{project.name}</h3>
              <span className="status-badge mono">{project.statusBadge}</span>
            </div>
            <p className="modal-sub">{project.subtitle}</p>
          </div>

          <button 
            type="button" 
            className="btn-modal-close" 
            onClick={() => { soundManager.playClick(); onClose(); }}
            aria-label="Close Project Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          {/* Executive Summary */}
          <div className="modal-section">
            <span className="section-label mono">SYSTEM OVERVIEW</span>
            <p className="modal-text">{project.summary}</p>
          </div>

          {/* Problem & Solution */}
          <div className="modal-two-col">
            <div className="modal-card tactical-panel">
              <span className="card-k mono text-cyan">PROBLEM STATEMENT</span>
              <p>{project.problem}</p>
            </div>
            <div className="modal-card tactical-panel">
              <span className="card-k mono text-gold">IMPLEMENTED / PROPOSED SOLUTION</span>
              <p>{project.solution || project.details}</p>
            </div>
          </div>

          {/* Highlights or Architecture */}
          {project.highlights && (
            <div className="modal-section">
              <span className="section-label mono">ENGINEERING HIGHLIGHTS & CONTRIBUTIONS</span>
              <div className="modal-bullets mono">
                {project.highlights.map((h, i) => (
                  <div key={i} className="modal-bullet-row">
                    <CheckCircle2 size={14} className="text-success" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture block if available */}
          {project.architecture && (
            <div className="modal-section">
              <span className="section-label mono">SYSTEM HARDWARE & SENSING ARCHITECTURE</span>
              <div className="modal-arch-grid mono">
                {Object.entries(project.architecture).map(([k, v]) => (
                  <div key={k} className="arch-item">
                    <span className="arch-k">{k.toUpperCase()}:</span>
                    <span className="arch-v">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conference citation for HR Analytics */}
          {project.conference && (
            <div className="modal-conference-card tactical-panel mono">
              <span className="conf-label text-gold">CONFERENCE PROCEEDINGS // VERIFIED PRESENTATION</span>
              <div className="conf-title">"{project.conference.title}"</div>
              <div className="conf-meta">Presented at {project.conference.name}</div>
              <div className="conf-mentor">Mentorship: {project.conference.mentorship}</div>
            </div>
          )}

          {/* Status Note or In-development disclaimer */}
          {project.statusNote && (
            <div className="modal-note-box mono">
              <AlertTriangle size={14} className="text-warning" />
              <span>DEVELOPMENT STATUS: {project.statusNote}</span>
            </div>
          )}

          {/* Tags */}
          <div className="modal-tags-row mono">
            {project.tags.map((t, idx) => (
              <span key={idx} className="project-tag">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="project-modal-footer">
          {project.id === 'medinv' && (
            <button
              type="button"
              className="btn-tactical btn-tactical-gold mono"
              onClick={() => {
                onClose();
                onOpenMedinvSpecial();
              }}
            >
              <span>OPEN FULL MEDINV IOT DASHBOARD</span>
              <ArrowRight size={14} />
            </button>
          )}

          {project.id === 'medinv' && (
            <button
              type="button"
              className="btn-tactical btn-tactical-outline mono"
              onClick={() => {
                onClose();
                onOpenPcbLab();
              }}
            >
              <Cpu size={14} />
              <span>INSPECT PCB LAYOUT</span>
            </button>
          )}

          <button
            type="button"
            className="btn-tactical btn-tactical-outline mono"
            onClick={() => { soundManager.playClick(); onClose(); }}
          >
            <span>CLOSE DOSSIER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
