# AURELION // Thirumal N — Engineering Command Center & Portfolio

[![GitHub Pages Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-56E7FF?style=flat&logo=github)](https://Thirumal23.github.io/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-4C8DFF?style=flat&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-FFB45C?style=flat&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-63F2B2?style=flat)](LICENSE)

> **AURELION** is a personal engineering command center inspired by cinematic AI interfaces and high-precision instrumentation (paramesh.dev). Operated by an autonomous digital butler with British-English voice synthesis, interactive 3D WebGL scenes, an interactive engineering CLI terminal, and deep technical project dossiers.

---

## 🛰️ Operator Profile

- **Operator:** Thirumal N
- **Degree:** B.Tech in Electronics and Communication Engineering with Data Science Specialization
- **Institution:** SRM Institute of Science and Technology, Ramapuram, Chennai
- **Academic Standing:** Overall CGPA **9.54 / 10.0** (1st Sem: 9.833, 2nd Sem: 9.760, 3rd Sem: 9.50, 4th Sem: 9.09)
- **Leadership:** **Project Head** at DCDC (Digital Communication and Design Club)
- **Target URL:** [https://Thirumal23.github.io/](https://Thirumal23.github.io/)
- **GitHub:** [https://github.com/Thirumal23](https://github.com/Thirumal23)
- **LinkedIn:** [https://www.linkedin.com/in/thirumal-nandakumar-68269b213](https://www.linkedin.com/in/thirumal-nandakumar-68269b213)

---

## ⚡ Core Features & Engineering Modules

### 1. Central Command Center & 3D Reactor
- **3D Reactor Orbit System:** Interactive Three.js / React Three Fiber scene featuring concentric titanium and gold rings, glowing reactor core, and 8 orbital project nodes.
- **2D Tactical Vector Fallback:** High-performance procedural SVG/Canvas fallback for low-power devices, reduced-motion preferences, or non-WebGL environments.
- **Live Telemetry Feeds:** Operator identification, academic standing, verified internships, and quick project deployment triggers.

### 2. AURELION Digital Butler Assistant
- **Speech Synthesis (TTS):** Native Web Speech API with British-English voice prioritization, speech rate, pitch, and volume adjustments. Includes instant `SILENCE` control.
- **Speech Recognition (STT):** Real-time microphone capture with live transcription and permission safeguards. Activates strictly upon user request.
- **Local Protocol Command Router:** 18 verified local directives:
  - `"Hello Aurelion"`, `"Introduce Thirumal"`, `"Show my projects"`, `"Open MEDINV"`, `"Open KINEX"`, `"Show my skills"`, `"Show my experience"`, `"Open my DCDC leadership profile"`, `"Tell me about my metro project"`, `"Open the PCB laboratory"`, `"Open GitHub"`, `"Show my education"`, `"Go to contact"`, `"Switch to light mode"`, `"Switch to dark mode"`, `"Stop speaking"`, `"Return to command center"`, `"Help"`.
- **Procedural Audio Waveform:** Real-time canvas waveform visualizer reflecting speech amplitude and listening state.
- **Secure Integration Ready:** Architectural hook ready for future server-side LLM backend.

### 3. Dedicated MEDINV Special Module
- **Core Engineering:** IoT-enabled scheduled medicine dispenser for elderly care featuring precision rotary motor compartment indexing, DS3231 RTC synchronization, and caregiver telemetry.
- **Real-Time Simulation Dashboard:** Interactive rotary carousel actuation test, manual override switch, and live stock monitoring with refill thresholds.
- **Safety Transparency:** Strictly labeled as an engineering prototype concept with clear disclaimers that it is not a medically validated device and does not alter patient prescriptions.

### 4. 3D PCB Engineering Laboratory
- **KiCad EDA Workflow:** Interactive 3D visualization of the custom MEDINV circuit board.
- **Multi-Layer Stackup Controls:** Toggleable layers: `F.SilkS` (Silkscreen), `F.Cu` (Copper Traces), and `F.Mask` (Solder Mask).
- **Component Schematic Inspector:** Click to inspect pinouts and parameters of the ESP32-WROOM-32D, DS3231 Precision RTC, A4988 Stepper Driver, and emergency manual override switches.

### 5. DCDC Leadership Console
- Visually prominent command-center module detailing Thirumal's verified role as **Project Head** at **DCDC (Digital Communication and Design Club)**.
- Focuses on project planning, hardware-software team collaboration, technical prototyping sprints, and engineering communication.

### 6. Interactive Engineering Terminal CLI
- Fully functional local CLI supporting:
  `help`, `about`, `skills`, `projects`, `medinv`, `kinex`, `experience`, `dcdc`, `education`, `contact`, `github`, `status`, `theme`, `clear`.
- Up/Down arrow command history, quick macro pills, and strict execution sandboxing (zero `eval`).

### 7. Global Command Palette (`Ctrl+K` / `Cmd+K`)
- Instant fuzzy search across portfolio modules, projects, skills, themes, and external links with full keyboard arrow and enter navigation.

### 8. Settings & Persistence
- Configurable speech output, audio synthesizers (Web Audio API), Dark Obsidian vs Light Daylight HUD theme, reduced-motion mode, startup boot skip preferences, and 3D graphics mode. All preferences persist in `localStorage`.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite 8
- **3D Graphics:** Three.js + React Three Fiber + React Three Drei
- **Iconography:** Lucide React
- **Audio & Speech:** Procedural Web Audio API synthesizer + Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
- **Particle Dynamics:** Canvas Confetti
- **Styling:** Vanilla Tactical CSS Design System (Titanium & Obsidian HUD tokens, glassmorphism, responsive breakpoints)

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/Thirumal23/Thirumal23.github.io.git
cd Thirumal23.github.io

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

The application will run locally at `http://localhost:5173/`.

### Building Production Assets
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `dist/` directory.

### Previewing Production Build
```bash
npm run preview
```

---

## 🚀 GitHub Pages Deployment Instructions

This repository is pre-configured for automated continuous deployment to **GitHub Pages** via GitHub Actions.

1. **Vite Configuration:**
   In `vite.config.js`, the base path is set to `'/'` since the repository name is `Thirumal23.github.io` (user root page):
   ```javascript
   export default defineConfig({
     base: '/',
     plugins: [react()],
   })
   ```

2. **GitHub Actions Workflow:**
   The workflow at `.github/workflows/deploy.yml` triggers automatically whenever commits are pushed to the `main` branch.

3. **Repository Settings (One-Time Setup in GitHub):**
   - Navigate to your repository: `https://github.com/Thirumal23/Thirumal23.github.io/settings/pages`
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - Push your code to the `main` branch. The action will build the `dist` directory and publish the site to [https://Thirumal23.github.io/](https://Thirumal23.github.io/).

---

## 🔒 Verification & Engineering Integrity Notice

- **Verified Data Only:** All education records (9.54 CGPA, CBSE percentages), internship contributions (Beau Roi Technologies & CMRL), conference presentation (ITDECC 2025), hackathon placements (THREX Top 5, 2x SIH, Bharatiya Antariksh), and technical skills reflect authentic academic and professional experience.
- **Safety Compliance:** Health-related projects (MEDINV) are explicitly classified as concept prototypes for demonstration and not certified medical apparatuses.
- **Audio Privacy:** Microphone access is strictly initiated on demand by the user and never records continuously or automatically.

---

*Designed and engineered with precision by Thirumal N // SRM IST ECE.*
