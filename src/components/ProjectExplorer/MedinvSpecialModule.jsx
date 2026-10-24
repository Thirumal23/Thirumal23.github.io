import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  RotateCw, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  Cpu, 
  Layers, 
  Info, 
  Play, 
  RefreshCcw, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import './MedinvSpecialModule.css';

export default function MedinvSpecialModule({ onOpenPcbLab, onBack }) {
  const project = PROJECTS_DATA.find(p => p.id === 'medinv');

  // Interactive Demo State
  const [dispenserState, setDispenserState] = useState('STANDBY // ARMED');
  const [activeSlot, setActiveSlot] = useState(3);
  const [stockRemaining, setStockRemaining] = useState(18);
  const totalSlots = 28;
  const [isDispensing, setIsDispensing] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [overrideActive, setOverrideActive] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([
    { time: '08:00:00', text: 'RTC sync complete. Non-volatile schedule verified.' },
    { time: '08:00:02', text: 'Dispenser state armed. Caregiver IoT telemetry connected.' }
  ]);

  const addLog = (text) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setSimulationLogs(prev => [{ time, text }, ...prev.slice(0, 5)]);
  };

  const handleSimulateDispense = () => {
    if (isDispensing || stockRemaining <= 0) return;
    soundManager.playClick();
    setIsDispensing(true);
    setDispenserState('MOTOR ROTATION IN PROGRESS');
    addLog(`Dose alert initiated for Slot #${activeSlot}. Actuating rotary stepper motor.`);

    setTimeout(() => {
      soundManager.playTerminal();
      setActiveSlot(prev => (prev % totalSlots) + 1);
      setStockRemaining(prev => Math.max(0, prev - 1));
      setDispenserState('DOSE DISPENSED // LOGGED');
      addLog(`Slot #${activeSlot} aligned to chute. Non-volatile index committed to flash.`);

      setTimeout(() => {
        setIsDispensing(false);
        setDispenserState('STANDBY // ARMED');
      }, 1200);
    }, 1800);
  };

  const handleManualOverride = () => {
    soundManager.playAlert();
    setOverrideActive(!overrideActive);
    if (!overrideActive) {
      setDispenserState('EMERGENCY MANUAL OVERRIDE ENGAGED');
      addLog('Hardware override switch triggered. Physical latch released.');
    } else {
      setDispenserState('STANDBY // ARMED');
      addLog('Hardware override reset. Returned to automated RTC schedule.');
    }
  };

  const handleRestock = () => {
    soundManager.playAcknowledge();
    setStockRemaining(totalSlots);
    setAlertActive(false);
    addLog(`Caregiver reload confirmed: Compartments replenished to ${totalSlots} units.`);
  };

  return (
    <div className="medinv-module-container">
      {/* Safety & Medical Disclaimers Banner */}
      <div className="medinv-safety-banner mono">
        <div className="safety-title-row">
          <ShieldAlert size={18} className="text-warning" />
          <span>MANDATORY CLINICAL & ENGINEERING SAFETY NOTICE</span>
        </div>
        <p className="safety-desc">
          MEDINV is an academic engineering concept and prototype demonstration. It is <strong>NOT a medically validated device</strong>. 
          The system strictly executes pre-loaded mechanical slots according to schedules programmed by the patient or authorized caregiver, and <strong>never provides medication, dosage, or therapeutic advice</strong>. 
          Physical fail-safe overrides and non-volatile EEPROM state guards prevent duplicate dispensing during power loss.
        </p>
      </div>

      {/* Main Header Card */}
      <div className="medinv-hero-card tactical-panel tactical-panel-corner">
        <div className="medinv-header-meta">
          <div className="medinv-title-box">
            <span className="telemetry-tag">PROJECT DOSSIER // {project.code}</span>
            <div className="medinv-title-row">
              <h2>{project.name}</h2>
              <span className="status-badge mono">{project.statusBadge}</span>
            </div>
            <p className="medinv-subtitle">{project.subtitle}</p>
          </div>

          <div className="medinv-header-actions">
            <VoiceSectionBriefing
              sectionKey="medinv"
              customText={AURELION_DIALOGUE.detailedIntroductions['medinv']}
              label="EXPLAIN MEDINV"
            />
            {onBack && (
              <button
                type="button"
                className="btn-tactical btn-tactical-gold mono"
                onClick={() => { soundManager.playClick(); onBack(); }}
              >
                <span>RETURN TO ALL PROJECTS</span>
              </button>
            )}
            <button
              type="button"
              className="btn-tactical btn-tactical-outline mono"
              onClick={onOpenPcbLab}
            >
              <Cpu size={14} />
              <span>INSPECT MEDINV PCB</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Overview & Problem/Solution Grid */}
        <div className="medinv-overview-grid">
          <div className="overview-item tactical-panel">
            <span className="overview-tag mono text-cyan">PROBLEM STATEMENT</span>
            <p>{project.problem}</p>
          </div>

          <div className="overview-item tactical-panel">
            <span className="overview-tag mono text-gold">PROPOSED ENGINEERING SOLUTION</span>
            <p>{project.solution}</p>
          </div>
        </div>
      </div>

      {/* Interactive IoT Simulation Dashboard */}
      <div className="medinv-dashboard-box tactical-panel tactical-panel-corner">
        <div className="dash-header-bar mono">
          <div className="dash-title-wrap">
            <span className="status-dot online" />
            <span>MEDINV REAL-TIME IOT TELEMETRY & CONTROLLER DEMONSTRATION</span>
          </div>
          <span className="telemetry-tag">FIRMWARE: ESP32-RTOS // DEMO MODE</span>
        </div>

        <div className="dash-content-grid">
          {/* Rotary Carousel Visualizer */}
          <div className="rotary-visualizer-col">
            <div className="rotary-wheel-wrap">
              <svg viewBox="0 0 240 240" className={`rotary-svg ${isDispensing ? 'spinning-step' : ''}`}>
                <circle cx="120" cy="120" r="110" fill="#070A10" stroke="var(--border-subtle)" strokeWidth="2" />
                <circle cx="120" cy="120" r="95" fill="none" stroke="var(--border-bright)" strokeWidth="1" strokeDasharray="4 6" />
                
                {/* 28 Compartment Pips */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const angle = (i / 14) * Math.PI * 2;
                  const x = 120 + 80 * Math.cos(angle);
                  const y = 120 + 80 * Math.sin(angle);
                  const isCurrent = i + 1 === (activeSlot % 14 || 1);
                  return (
                    <circle 
                      key={i} 
                      cx={x} 
                      cy={y} 
                      r={isCurrent ? 7 : 4} 
                      fill={isCurrent ? "var(--gold-accent)" : "rgba(86, 231, 255, 0.3)"} 
                      stroke={isCurrent ? "#ffffff" : "none"}
                    />
                  );
                })}

                {/* Center Hub */}
                <circle cx="120" cy="120" r="38" fill="var(--bg-titanium)" stroke="var(--reactor-cyan)" strokeWidth="2" />
                <circle cx="120" cy="120" r="14" fill="var(--reactor-cyan)" />
                {/* Pointer Notch */}
                <polygon points="120,60 115,75 125,75" fill="var(--gold-accent)" />
              </svg>

              <div className="rotary-center-status mono">
                <span className="wheel-slot-num">SLOT #{activeSlot}</span>
                <span className="wheel-label">INDEX APERTURE</span>
              </div>
            </div>

            <div className="rotary-control-buttons">
              <button
                type="button"
                className="btn-tactical btn-tactical-gold mono"
                onClick={handleSimulateDispense}
                disabled={isDispensing || stockRemaining <= 0}
              >
                <Play size={14} />
                <span>{isDispensing ? 'DISPENSING...' : 'TRIGGER SCHEDULED DOSE'}</span>
              </button>

              <button
                type="button"
                className={`btn-tactical ${overrideActive ? 'btn-tactical-gold' : 'btn-tactical-outline'} mono`}
                onClick={handleManualOverride}
              >
                <AlertTriangle size={14} />
                <span>{overrideActive ? 'RESET OVERRIDE' : 'MANUAL OVERRIDE'}</span>
              </button>
            </div>
          </div>

          {/* Telemetry Monitor Gauges */}
          <div className="telemetry-gauges-col">
            <div className="gauge-row">
              <div className="telemetry-card tactical-panel">
                <span className="telemetry-label mono">DISPENSER CONTROLLER STATE</span>
                <div className="telemetry-value text-cyan mono">{dispenserState}</div>
                <span className="telemetry-sub mono">A4988 Microstepping Driver // Ready</span>
              </div>

              <div className="telemetry-card tactical-panel">
                <span className="telemetry-label mono">NEXT SCHEDULED DOSE</span>
                <div className="telemetry-value text-gold mono">08:00 AM (SLOT #{activeSlot})</div>
                <span className="telemetry-sub mono">DS3231 Precision RTC Synced</span>
              </div>
            </div>

            <div className="gauge-row">
              {/* Stock Bar */}
              <div className="telemetry-card tactical-panel">
                <div className="stock-header mono">
                  <span className="telemetry-label">MEDICATION STOCK STATUS</span>
                  <span className={stockRemaining < 8 ? 'text-warning' : 'text-success'}>
                    {stockRemaining} / {totalSlots} DOSES REMAINING
                  </span>
                </div>
                <div className="stock-track">
                  <div 
                    className="stock-fill" 
                    style={{ 
                      width: `${(stockRemaining / totalSlots) * 100}%`,
                      background: stockRemaining < 8 ? 'var(--status-warning)' : 'var(--reactor-cyan)'
                    }} 
                  />
                </div>
                <div className="stock-footer mono">
                  <span>THRESHOLD: 7 UNITS</span>
                  {stockRemaining < 8 && (
                    <button type="button" className="btn-restock" onClick={handleRestock}>
                      <RefreshCcw size={12} /> RESTOCK CARTRIDGE
                    </button>
                  )}
                </div>
              </div>

              <div className="telemetry-card tactical-panel">
                <span className="telemetry-label mono">IOT CONNECTIVITY & HEALTH</span>
                <div className="iot-stats-list mono">
                  <div className="iot-stat-line">
                    <Wifi size={13} className="text-cyan" />
                    <span>Wi-Fi MQTT Broker: CONNECTED</span>
                  </div>
                  <div className="iot-stat-line">
                    <Battery size={13} className="text-success" />
                    <span>Power: 12V Mains (Li-Ion Backup 94%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Telemetry Log Box */}
            <div className="telemetry-log-box mono">
              <span className="log-title">EVENT TELEMETRY FEED (REAL-TIME BUFFER):</span>
              <div className="logs-list">
                {simulationLogs.map((log, idx) => (
                  <div key={idx} className="log-row">
                    <span className="log-time">[{log.time}]</span>
                    <span className="log-msg">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className="medinv-arch-section tactical-panel tactical-panel-corner">
        <div className="section-title-wrap mono">
          <Layers size={18} className="text-cyan" />
          <h3>SYSTEM ARCHITECTURE & CLOSED-LOOP WORKFLOW</h3>
        </div>

        <div className="arch-workflow-grid">
          {project.flowSteps.map((s) => (
            <div key={s.step} className="flow-card tactical-panel">
              <div className="flow-step-tag mono">STAGE {s.step}</div>
              <h4 className="flow-step-title">{s.title}</h4>
              <p className="flow-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Modules & Future Improvements */}
      <div className="medinv-bottom-grid">
        <div className="hardware-specs-card tactical-panel">
          <div className="card-top-tag mono">
            <span>ELECTROMECHANICAL SPECIFICATIONS</span>
            <span className="telemetry-tag">HARDWARE CORE</span>
          </div>
          <div className="specs-table mono">
            {Object.entries(project.architecture).map(([k, v]) => (
              <div key={k} className="spec-table-row">
                <span className="spec-k">{k.toUpperCase()}:</span>
                <span className="spec-v">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="future-roadmap-card tactical-panel">
          <div className="card-top-tag mono">
            <span>ENGINEERING ROADMAP & FUTURE IMPROVEMENTS</span>
            <span className="telemetry-tag">IN DEVELOPMENT</span>
          </div>
          <div className="future-bullets mono">
            {project.futureImprovements.map((imp, idx) => (
              <div key={idx} className="future-bullet-row">
                <CheckCircle2 size={14} className="text-cyan" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
