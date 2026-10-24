import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  FolderGit2, 
  Copy, 
  Check, 
  Send, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
import { PROFILE_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import './ContactModule.css';

export default function ContactModule() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleCopy = (key, text) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Operator / Sender name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid return email address required.';
    if (!formData.subject.trim()) errs.subject = 'Transmission subject required.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Message body must exceed 10 characters.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!validate()) {
      soundManager.playAlert();
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#56E7FF', '#FFB45C', '#63F2B2']
      });
    } catch {}

    // Formats authentic mailto link to preserve transparency
    const mailtoUrl = `mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(
      `[Portfolio Dispatch] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setSubmissionStatus('DISPATCHED');
    soundManager.playAcknowledge();
  };

  return (
    <div className="contact-module-container">
      {/* Header Banner */}
      <div className="contact-hero-card tactical-panel tactical-panel-corner">
        <div className="contact-hero-left">
          <div className="contact-icon-box">
            <PhoneCall size={26} className="text-cyan" />
          </div>
          <div>
            <div className="contact-tag-row mono">
              <span className="telemetry-tag">TRANSMISSION ARRAY // VERIFIED CHANNELS</span>
              <span className="status-dot online" />
            </div>
            <h2>COMMUNICATIONS & COLLABORATION ARRAY</h2>
            <p className="contact-sub">
              Open to engineering collaborations, embedded IoT research initiatives, data analytics sprints, and professional opportunities.
            </p>
          </div>
        </div>

        <div className="contact-hero-actions">
          <VoiceSectionBriefing 
            sectionKey="contact"
            customText={AURELION_DIALOGUE.detailedIntroductions['contact']}
          />
        </div>
      </div>

      {/* Main Grid: Direct Channels vs Form */}
      <div className="contact-grid">
        {/* Left: Verified Channels */}
        <div className="channels-col">
          <div className="channel-card tactical-panel">
            <div className="card-top-tag mono">
              <span>PRIMARY DIRECT DISPATCH</span>
              <span className="telemetry-tag">DIRECT EMAIL</span>
            </div>
            <div className="channel-info-row">
              <Mail size={18} className="text-cyan" />
              <div className="channel-text">
                <span className="channel-label mono">SRM ACADEMIC MAIL</span>
                <span className="channel-val">{PROFILE_DATA.contact.email}</span>
              </div>
              <button
                type="button"
                className="btn-copy mono"
                onClick={() => handleCopy('email1', PROFILE_DATA.contact.email)}
                title="Copy to clipboard"
              >
                {copiedKey === 'email1' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copiedKey === 'email1' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="channel-info-row">
              <Mail size={18} className="text-gold" />
              <div className="channel-text">
                <span className="channel-label mono">PERSONAL MAIL</span>
                <span className="channel-val">{PROFILE_DATA.contact.altEmail}</span>
              </div>
              <button
                type="button"
                className="btn-copy mono"
                onClick={() => handleCopy('email2', PROFILE_DATA.contact.altEmail)}
                title="Copy to clipboard"
              >
                {copiedKey === 'email2' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copiedKey === 'email2' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          <div className="channel-card tactical-panel">
            <div className="card-top-tag mono">
              <span>SOCIAL & CODE NETWORKS</span>
              <span className="telemetry-tag">PUBLIC FEEDS</span>
            </div>

            <div className="channel-link-row">
              <FolderGit2 size={18} className="text-cyan" />
              <div className="channel-text">
                <span className="channel-label mono">GITHUB PROFILE</span>
                <span className="channel-val">github.com/Thirumal23</span>
              </div>
              <a 
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactical btn-compact btn-tactical-outline mono"
              >
                <span>OPEN</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="channel-link-row">
              <LinkedinIcon size={18} className="text-cyan" />
              <div className="channel-text">
                <span className="channel-label mono">LINKEDIN PROFILE</span>
                <span className="channel-val">thirumal-nandakumar-68269b213</span>
              </div>
              <a 
                href={PROFILE_DATA.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactical btn-compact btn-tactical-outline mono"
              >
                <span>CONNECT</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="channel-link-row">
              <MapPin size={18} className="text-gold" />
              <div className="channel-text">
                <span className="channel-label mono">LOCATION BASE</span>
                <span className="channel-val">{PROFILE_DATA.contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Validated Message Dispatch Form */}
        <div className="form-col">
          <form className="contact-form tactical-panel tactical-panel-corner" onSubmit={handleSubmit}>
            <div className="card-top-tag mono">
              <span>TRANSMIT DIRECTIVE MESSAGE</span>
              <span className="telemetry-tag">MAILTO DISPATCH</span>
            </div>

            {submissionStatus === 'DISPATCHED' && (
              <div className="form-status-alert mono success">
                <Check size={16} className="text-success" />
                <span>
                  Directive formatted! Opening system email client to transmit directly to {PROFILE_DATA.contact.email}.
                </span>
              </div>
            )}

            <div className="form-row">
              <div className="form-field">
                <label className="field-label mono">SENDER NAME / CALLSIGN *</label>
                <input
                  type="text"
                  className={`field-input mono ${formErrors.name ? 'error' : ''}`}
                  placeholder="e.g. Dr. John Doe / Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && <span className="field-err mono">{formErrors.name}</span>}
              </div>

              <div className="form-field">
                <label className="field-label mono">RETURN EMAIL *</label>
                <input
                  type="email"
                  className={`field-input mono ${formErrors.email ? 'error' : ''}`}
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formErrors.email && <span className="field-err mono">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label mono">COMMUNICATION SUBJECT *</label>
              <input
                type="text"
                className={`field-input mono ${formErrors.subject ? 'error' : ''}`}
                placeholder="e.g. IoT Prototype Collaboration / Engineering Role"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
              {formErrors.subject && <span className="field-err mono">{formErrors.subject}</span>}
            </div>

            <div className="form-field">
              <label className="field-label mono">DIRECTIVE DETAILS / INQUIRY BODY *</label>
              <textarea
                rows={5}
                className={`field-input field-textarea mono ${formErrors.message ? 'error' : ''}`}
                placeholder="State your technical inquiry, project opportunity, or meeting request..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              {formErrors.message && <span className="field-err mono">{formErrors.message}</span>}
            </div>

            <div className="form-footer">
              <div className="form-transparency-note mono">
                <ShieldCheck size={14} className="text-cyan" />
                <span>STATIC HOSTING TRANSPARENCY: DIRECT CLIENT MAILTO PROTOCOL</span>
              </div>

              <button type="submit" className="btn-tactical btn-tactical-gold mono">
                <Send size={14} />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
