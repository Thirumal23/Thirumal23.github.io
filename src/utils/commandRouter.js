/**
 * AURELION Local Command Router
 * Matches voice and chat transcripts to verified actions and butler responses.
 * Transparent local response pipeline; ready for future secure LLM backend integration.
 */

import { VOICE_COMMANDS, PROFILE_DATA } from '../data/portfolioData';

export function parseCommand(input) {
  if (!input || typeof input !== 'string') return null;
  const raw = input.trim();
  const normalized = raw.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();

  // 1. Direct or fuzzy matches
  if (normalized.includes('hello aurelion') || normalized === 'hello' || normalized === 'hey aurelion' || normalized === 'hi aurelion') {
    return {
      action: 'GREETING',
      response: "Good day, sir. AURELION is online. Core reactor telemetry and subsystem links are operating within nominal specifications.",
      raw
    };
  }

  if (normalized.includes('introduce thirumal') || normalized.includes('who is thirumal') || normalized.includes('tell me about thirumal') || normalized.includes('about thirumal')) {
    return {
      action: 'INTRODUCE',
      response: `Thirumal N is an Electronics and Communication Engineering scholar at SRM Institute with specialization in Data Science, graduating with a 9.54 CGPA. He is Project Head at DCDC, with verified proficiencies in embedded IoT, KiCad PCB design, and data analytics.`,
      raw
    };
  }

  if (normalized.includes('open medinv') || normalized.includes('medinv') || normalized.includes('medicine dispenser')) {
    return {
      action: 'OPEN_PROJECT_MEDINV',
      target: 'medinv',
      response: "Accessing MEDINV Smart Medicine Dispensing System module. Loading motor kinematics, scheduling logic, and telemetry dashboard.",
      raw
    };
  }

  if (normalized.includes('open kinex') || normalized.includes('kinex') || normalized.includes('sign language')) {
    return {
      action: 'OPEN_PROJECT_KINEX',
      target: 'kinex',
      response: "Loading project dossier: KINEX. Dual-modality sign-language assistive system combining wearable sensor kinematics with computer vision.",
      raw
    };
  }

  if (normalized.includes('metro project') || normalized.includes('cmrl') || normalized.includes('tunnel ventilation') || normalized.includes('tvs')) {
    return {
      action: 'OPEN_PROJECT_CMRL',
      target: 'cmrl-tvs',
      response: "Loading Chennai Metro Rail Limited TVS dossier. Presenting the miniature working control panel replicating SLI, TVS, IBP, and SCR modes.",
      raw
    };
  }

  if (normalized.includes('show my projects') || normalized.includes('show projects') || normalized.includes('open projects') || normalized.includes('projects')) {
    return {
      action: 'NAV_PROJECTS',
      response: "Opening the Project Laboratory. Displaying 8 verified engineering initiatives, including MEDINV, KINEX, and CMRL TVS.",
      raw
    };
  }

  if (normalized.includes('open my dcdc') || normalized.includes('dcdc') || normalized.includes('leadership')) {
    return {
      action: 'NAV_DCDC',
      response: "Opening DCDC Leadership console: Project Head responsibilities, team collaboration, and technical coordination at Digital Communication and Design Club.",
      raw
    };
  }

  if (normalized.includes('show my skills') || normalized.includes('show skills') || normalized.includes('skills') || normalized.includes('technologies')) {
    return {
      action: 'NAV_SKILLS',
      response: "Displaying technical competencies: Embedded systems, Python, C, SQL, KiCad PCB design, and Data Analytics.",
      raw
    };
  }

  if (normalized.includes('show my experience') || normalized.includes('experience') || normalized.includes('internships') || normalized.includes('work history')) {
    return {
      action: 'NAV_EXPERIENCE',
      response: "Displaying industry internships: Beau Roi Technologies Data Analytics and Chennai Metro Rail TVS engineering.",
      raw
    };
  }

  if (normalized.includes('open the pcb') || normalized.includes('pcb lab') || normalized.includes('pcb laboratory') || normalized.includes('circuit board') || normalized.includes('pcb')) {
    return {
      action: 'NAV_PCB',
      response: "Initializing 3D PCB inspection laboratory. Microcontroller, copper traces, and layer stackup ready for examination.",
      raw
    };
  }

  if (normalized.includes('open github') || normalized.includes('github profile') || normalized.includes('view github')) {
    return {
      action: 'OPEN_GITHUB',
      response: "Opening Thirumal's official GitHub repository at github.com/Thirumal23.",
      raw
    };
  }

  if (normalized.includes('show my education') || normalized.includes('education') || normalized.includes('academics') || normalized.includes('gpa') || normalized.includes('cgpa')) {
    return {
      action: 'NAV_EDUCATION',
      response: "Displaying academic credentials: B.Tech ECE with Data Science at SRM Ramapuram, with an overall CGPA of 9.54.",
      raw
    };
  }

  if (normalized.includes('go to contact') || normalized.includes('contact') || normalized.includes('email') || normalized.includes('reach out')) {
    return {
      action: 'NAV_CONTACT',
      response: "Navigating to communications array. Direct email, LinkedIn, and dispatch channels available.",
      raw
    };
  }

  if (normalized.includes('switch to light mode') || normalized.includes('light mode') || normalized.includes('day mode')) {
    return {
      action: 'SET_THEME_LIGHT',
      response: "Adjusting visual display: High-contrast daylight HUD enabled.",
      raw
    };
  }

  if (normalized.includes('switch to dark mode') || normalized.includes('dark mode') || normalized.includes('night mode')) {
    return {
      action: 'SET_THEME_DARK',
      response: "Restoring obsidian command center aesthetic.",
      raw
    };
  }

  if (normalized.includes('stop speaking') || normalized.includes('be quiet') || normalized.includes('silence') || normalized.includes('mute')) {
    return {
      action: 'STOP_SPEECH',
      response: "Silencing audio output immediately.",
      raw
    };
  }

  if (normalized.includes('terminal') || normalized.includes('cli') || normalized.includes('shell')) {
    return {
      action: 'NAV_TERMINAL',
      response: "Accessing tactical engineering terminal CLI. 14 local commands available.",
      raw
    };
  }

  if (normalized.includes('return to command center') || normalized.includes('open the command core') || normalized.includes('command core') || normalized.includes('command center') || normalized.includes('go home') || normalized.includes('home')) {
    return {
      action: 'NAV_HOME',
      response: "Returning to Central Command Core. Central reactor telemetry active.",
      raw
    };
  }

  if (normalized.includes('open hud') || normalized.includes('suit hud') || normalized.includes('holographic navigation') || normalized.includes('activation sequence') || normalized.includes('suit activation')) {
    return {
      action: 'OPEN_HUD',
      response: "Deploying full-screen holographic navigation HUD and suit activation diagnostics.",
      raw
    };
  }

  if (normalized.includes('help') || normalized.includes('what can you do') || normalized.includes('commands')) {
    return {
      action: 'SHOW_HELP',
      response: "Available commands include: 'Introduce Thirumal', 'Open projects', 'Launch the PCB laboratory', 'Show my experience', 'Open the command core', 'Open my DCDC leadership profile', 'Show skills', 'Go to contact', or 'Switch to light mode'.",
      raw
    };
  }

  // Fallback for general unmapped query
  return {
    action: 'UNKNOWN',
    response: `Command "${raw}" acknowledged, sir. While my current local firmware router does not recognize that specific query, you may ask for "projects", "MEDINV", "skills", "experience", or type "help".`,
    raw
  };
}
