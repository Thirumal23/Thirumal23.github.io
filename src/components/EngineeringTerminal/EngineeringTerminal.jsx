import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, CornerDownLeft, Trash2, HelpCircle, CheckCircle2 } from 'lucide-react';
import { 
  PROFILE_DATA, 
  PROJECTS_DATA, 
  SKILLS_DATA, 
  EXPERIENCE_DATA, 
  DCDC_DATA 
} from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import './EngineeringTerminal.css';

export default function EngineeringTerminal({ onNavigate, onToggleTheme, currentTheme, onOpenHUD }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: [
        'AURELION TACTICAL CLI // FIRMWARE v2.4 ONLINE',
        'Type "help" to display available engineering commands.',
        'Connected as operator: THIRUMAL-01 // SRM IST ECE'
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    soundManager.playTerminal();
    const cmd = raw.toLowerCase();

    // Append to cmd history
    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const userEntry = { type: 'user', content: [`aurelion:~$ ${raw}`] };
    let outputLines = [];

    switch (cmd) {
      case 'hud':
      case 'suit':
        outputLines = [
          'DEPLOYING AURELION FULL-SCREEN SUIT HUD & HOLOGRAPHIC NAVIGATION HUB...',
          'Synchronizing central reactor core and spatial telemetry overlays.'
        ];
        if (onOpenHUD) {
          setTimeout(() => onOpenHUD(), 300);
        }
        break;

      case 'help':
        outputLines = [
          '═══════════════════ AURELION COMMAND CATALOG ═══════════════════',
          '  help        - Display this directory of operational commands',
          '  hud         - Deploy full-screen holographic Suit HUD & activation sequence',
          '  about       - Operator dossier, education, and research background',
          '  skills      - Technical EDA, embedded, AI, and software matrix',
          '  projects    - Summary of all 8 verified engineering initiatives',
          '  medinv      - Deep dive into MEDINV Smart Medicine Dispenser',
          '  kinex       - Architecture for KINEX Sign Language Assistive System',
          '  experience  - Industry internships (Beau Roi Technologies & CMRL)',
          '  dcdc        - DCDC Project Head appointment & leadership profile',
          '  education   - SRM IST ECE academic performance and CGPA (9.54)',
          '  contact     - Direct communications array and verified links',
          '  github      - Repository address for Thirumal23',
          '  status      - Core reactor telemetry and subsystem diagnostics',
          '  theme       - Toggle visual HUD theme (dark / light)',
          '  clear       - Clear current terminal screen buffer',
          '════════════════════════════════════════════════════════════════'
        ];
        break;

      case 'about':
        outputLines = [
          `OPERATOR: ${PROFILE_DATA.name} (${PROFILE_DATA.callsign})`,
          `DEGREE:   ${PROFILE_DATA.degree}`,
          `COLLEGE:  ${PROFILE_DATA.institution}`,
          `ACADEMIC: CGPA ${PROFILE_DATA.academics.overallCGPA} / 10.0`,
          `SUMMARY:  ${PROFILE_DATA.summary}`,
          `LANGS:    ${PROFILE_DATA.languages.map(l => `${l.lang} (${l.level})`).join(', ')}`
        ];
        break;

      case 'skills':
        outputLines = [
          '--- VERIFIED ENGINEERING SKILLS MATRIX ---',
          'EMBEDDED:    KiCad (Proficient PCB workflow), Arduino, ESP32, Digital Electronics, AutoCAD',
          'PROGRAMMING: Python (Proficient), C, SQL & DBMS, JavaScript, HTML & CSS',
          'DATA & AI:   Pandas, NumPy, Matplotlib, Seaborn, Power BI, Data Analytics',
          'DOMAINS:     VLSI, IoT & Microcontrollers, Assistive Robotics, Industrial Automation'
        ];
        break;

      case 'projects':
        outputLines = [
          '--- VERIFIED ENGINEERING PROJECT ARCHIVE (8) ---',
          ...PROJECTS_DATA.map(p => `[${p.code}] ${p.name.padEnd(12)} | ${p.statusBadge.padEnd(30)} | ${p.subtitle}`)
        ];
        break;

      case 'medinv':
        outputLines = [
          'PROJECT: MEDINV — SMART MEDICINE DISPENSING SYSTEM',
          'CONCEPT: IoT scheduled medication dispenser assisting elderly patients',
          'ACTUATION: Rotary motor mechanism with compartment indexing',
          'CONTROLLER: ESP32 + DS3231 Precision RTC with battery backup',
          'TELEMETRY: Caregiver monitoring dashboard with low stock/missed dose alerts',
          'DISCLAIMER: Non-medical demonstration prototype. Hardware manual override included.'
        ];
        break;

      case 'kinex':
        outputLines = [
          'PROJECT: KINEX — SIGN-LANGUAGE ASSISTIVE SYSTEM',
          'CONCEPT: Dual-modality Indian Sign Language recognition architecture',
          'SENSORS: 5x Flex bend sensors + 6-axis MPU6050 IMU glove array',
          'SOFTWARE: Computer vision landmark tracking + sensor kinematics fusion',
          'STATUS:  Hardware schematics mapped; gesture classifier in research pipeline.'
        ];
        break;

      case 'experience':
        outputLines = [
          '--- INDUSTRY INTERNSHIPS ---',
          '1. BEAU ROI TECHNOLOGIES PRIVATE LIMITED',
          '   Role: Data Analytics Intern',
          '   Focus: Real-world dataset cleaning, Power BI dashboards, Python workflows (Pandas/NumPy)',
          '2. CHENNAI METRO RAIL LIMITED (CMRL)',
          '   Role: Engineering Intern — Tunnel Ventilation System (TVS)',
          '   Focus: SLI, TVS, IBP, SCR control modes; built miniature working control panel model'
        ];
        break;

      case 'dcdc':
        outputLines = [
          'APPOINTMENT: PROJECT HEAD — DCDC (Digital Communication and Design Club)',
          'NATURE: Leadership, cross-disciplinary collaboration & technical prototyping',
          'RESPONSIBILITIES:',
          ' - Project planning and execution timelines',
          ' - Hardware and software team collaboration',
          ' - Technical project development & workshop coordination',
          ' - Design and visual communication initiatives'
        ];
        break;

      case 'education':
        outputLines = [
          '--- ACADEMIC PERFORMANCE // SRM IST RAMAPURAM ---',
          `DEGREE:       ${PROFILE_DATA.degree}`,
          `OVERALL CGPA: ${PROFILE_DATA.academics.overallCGPA} / 10.0`,
          `1st Sem GPA:  9.833  |  2nd Sem GPA:  9.760`,
          `3rd Sem GPA:  9.500  |  4th Sem GPA:  9.090`,
          'CBSE 12th:    77.4% (Computer Science Stream)',
          'CBSE 10th:    85.4%'
        ];
        break;

      case 'contact':
        outputLines = [
          '--- OPERATIONAL COMMUNICATIONS ARRAY ---',
          `EMAIL:     ${PROFILE_DATA.contact.email} / ${PROFILE_DATA.contact.altEmail}`,
          `PHONE:     ${PROFILE_DATA.contact.phone}`,
          `LOCATION:  ${PROFILE_DATA.contact.location}`,
          `LINKEDIN:  ${PROFILE_DATA.contact.linkedin}`,
          `GITHUB:    ${PROFILE_DATA.contact.github}`,
          `PORTFOLIO: ${PROFILE_DATA.contact.portfolioUrl}`
        ];
        break;

      case 'github':
        window.open(PROFILE_DATA.contact.github, '_blank', 'noopener,noreferrer');
        outputLines = [
          `Opening GitHub repository: ${PROFILE_DATA.contact.github}`
        ];
        break;

      case 'status':
        outputLines = [
          '--- CORE SYSTEM STATUS TELEMETRY ---',
          'AURELION CORE:  ONLINE (Firmware v2.4)',
          'REACTOR STATE:  OPERATIONAL (Concentric Rings Synchronized)',
          'SPEECH ENGINE:  WebSpeech Synthesizer & Local Voice Router',
          'PROJECT ARCHIVE: 8 Verified Modules Loaded',
          'MEMORY LATENCY: < 12ms // Nominal'
        ];
        break;

      case 'theme':
        if (onToggleTheme) {
          onToggleTheme();
          outputLines = [`HUD theme switched. Current theme mode adjusted.`];
        } else {
          outputLines = ['Theme toggle initiated.'];
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputLines = [
          `aurelion: command not found: "${raw}".`,
          'Type "help" to display verified operational commands.'
        ];
        break;
    }

    setHistory(prev => [...prev, userEntry, { type: 'output', content: outputLines }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'medinv', 'dcdc', 'experience', 'status', 'clear'];

  return (
    <div className="terminal-container">
      {/* Terminal Window Frame */}
      <div className="terminal-frame tactical-panel tactical-panel-corner">
        {/* Terminal Header Bar */}
        <div className="terminal-header-bar mono">
          <div className="term-dots">
            <span className="term-dot red" />
            <span className="term-dot yellow" />
            <span className="term-dot green" />
          </div>
          <div className="term-title">
            <TermIcon size={14} className="text-cyan" />
            <span>aurelion@thirumal-os: ~ (Interactive Engineering Terminal)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <VoiceSectionBriefing 
              sectionKey="terminal"
              customText={AURELION_DIALOGUE.detailedIntroductions['terminal']}
            />
            <button 
              type="button" 
              className="btn-term-clear" 
              onClick={() => { soundManager.playClick(); setHistory([]); }}
              title="Clear Terminal Screen"
            >
              <Trash2 size={13} />
              <span>CLEAR</span>
            </button>
          </div>
        </div>

        {/* Quick Command Directives */}
        <div className="terminal-quick-pills mono">
          <span className="pills-label">FAST MACROS:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="quick-pill"
              onClick={() => executeCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Body */}
        <div 
          className="terminal-body mono"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((block, idx) => (
            <div key={idx} className={`term-line-block ${block.type}`}>
              {block.content.map((line, lIdx) => (
                <div key={lIdx} className="term-line">
                  {line}
                </div>
              ))}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Prompt Input */}
        <div className="terminal-input-row mono">
          <span className="prompt-lead">aurelion:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'medinv', 'skills'..."
            autoFocus
            aria-label="Terminal command prompt"
          />
          <button
            type="button"
            className="btn-prompt-enter"
            onClick={() => executeCommand(inputVal)}
            aria-label="Execute Command"
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
