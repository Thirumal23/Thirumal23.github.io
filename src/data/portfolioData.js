/**
 * AURELION — Verified Engineering & Portfolio Data for Thirumal N
 * All details strictly reflect verified resume data, academic records, and projects.
 */

export const PROFILE_DATA = {
  name: "Thirumal N",
  callsign: "THIRUMAL-01",
  title: "Electronics & Communication Engineer",
  specialization: "Data Science & Embedded IoT Systems",
  institution: "SRM Institute of Science and Technology, Ramapuram, Chennai",
  degree: "B.Tech in Electronics and Communication Engineering with Data Science Specialization",
  academics: {
    status: "Completed First Year | Entering Second Year",
    overallCGPA: "9.54",
    semesters: [
      { sem: "1st Semester GPA", gpa: "9.833" },
      { sem: "2nd Semester GPA", gpa: "9.760" },
      { sem: "3rd Semester GPA", gpa: "9.500" },
      { sem: "4th Semester GPA", gpa: "9.090" },
    ],
    schooling: [
      { standard: "12th Grade (CBSE)", score: "77.4%", stream: "Computer Science Stream" },
      { standard: "10th Grade (CBSE)", score: "85.4%" }
    ]
  },
  contact: {
    email: "tn8122@srmist.edu.in",
    altEmail: "thirumalnandakumar@gmail.com",
    phone: "+91 7397436787",
    location: "Chennai, Tamil Nadu, India",
    github: "https://github.com/Thirumal23",
    linkedin: "https://www.linkedin.com/in/thirumal-nandakumar-68269b213",
    portfolioUrl: "https://Thirumal23.github.io/"
  },
  summary: "Dedicated and detail-oriented B.Tech Electronics and Communication Engineering student with specialization in Data Science. Enthusiastic Data Analytics practitioner with hands-on experience in IoT systems, PCB design in KiCad, and software development. Project Head at DCDC.",
  interests: [
    "Embedded systems and electronics",
    "VLSI and digital design",
    "IoT and microcontrollers",
    "Artificial intelligence and machine learning",
    "Computer vision",
    "Data analytics",
    "PCB design",
    "Interactive software and web development"
  ],
  languages: [
    { lang: "English", level: "Proficient (Speaking & Writing)" },
    { lang: "Tamil", level: "Proficient (Speaking & Writing)" },
    { lang: "German", level: "Elementary Proficiency" }
  ],
  strengths: [
    "Curious by nature",
    "Adaptable engineering mindset",
    "Structured problem-solving skills",
    "Cross-functional team collaboration"
  ]
};

export const DCDC_DATA = {
  role: "Project Head",
  organization: "DCDC — Digital Communication and Design Club",
  nature: "Leadership, Engineering Coordination & Technical Design",
  overview: "Leading technical project conceptualization, cross-disciplinary collaboration, and design initiatives within the Digital Communication and Design Club.",
  responsibilities: [
    {
      title: "Project Planning & Coordination",
      desc: "Architecting project milestones, defining system specifications, and managing execution timelines for technical prototypes and club initiatives."
    },
    {
      title: "Technical Team Collaboration",
      desc: "Fostering synergy between hardware developers, software programmers, and design teams to ensure cohesive prototype realization."
    },
    {
      title: "Technical Project Development",
      desc: "Guiding embedded electronics, IoT integrations, and computational modules across hands-on member build sprints."
    },
    {
      title: "Design & Communication Activities",
      desc: "Aligning technical system documentation, interface aesthetics, and visual communication materials for external showcases."
    }
  ],
  focusAreas: [
    "Embedded Hardware Prototyping",
    "IoT Communication Protocols",
    "Interactive Interface Design",
    "Collaborative Engineering Sprints"
  ]
};

export const SKILLS_DATA = {
  embedded: {
    category: "Embedded & Electronics",
    icon: "Cpu",
    items: [
      { name: "KiCad", level: "Proficient", highlight: "Full workflow: schematic, footprints, PCB layout, DRC & Gerber export" },
      { name: "Arduino IDE", level: "Hands-on", highlight: "Sensor integration, actuation, and rapid prototyping" },
      { name: "ESP32", level: "Hands-on", highlight: "Wi-Fi / Bluetooth IoT nodes, dual-core firmware" },
      { name: "PCB Design", level: "Proficient", highlight: "Multi-layer layout, trace routing, power planes & design rules" },
      { name: "Digital Electronics", level: "Foundational", highlight: "Logic gates, flip-flops, multiplexers, and state machines" },
      { name: "AutoCAD", level: "Working knowledge", highlight: "2D drafting, dimensional schematics, mechanical enclosures" },
      { name: "STM32 Workshop", level: "Trained", highlight: "ARM Cortex-M architecture and peripheral interfacing" },
      { name: "SCADA & Industrial Automation", level: "Workshop Certified", highlight: "Real-time monitoring, telemetry, and control systems" }
    ]
  },
  programming: {
    category: "Programming & Web",
    icon: "Code2",
    items: [
      { name: "Python", level: "Proficient", highlight: "Automation, data analytics, scientific computation, scripting" },
      { name: "C", level: "Basic", highlight: "Low-level microcontrollers, memory pointers, logic algorithms" },
      { name: "SQL & DBMS", level: "Basic", highlight: "Relational queries, aggregations, schema joins, workforce data" },
      { name: "JavaScript", level: "Basic", highlight: "DOM manipulation, Web APIs, asynchronous event handling" },
      { name: "HTML & CSS", level: "Proficient", highlight: "Semantic structure, responsive layouts, engineering dashboards" }
    ]
  },
  dataAi: {
    category: "Data Science & AI",
    icon: "BarChart3",
    items: [
      { name: "Pandas", level: "Proficient", highlight: "Dataset wrangling, data cleaning, aggregation and reshaping" },
      { name: "NumPy", level: "Proficient", highlight: "Matrix operations, numerical linear algebra, vectorization" },
      { name: "Matplotlib & Seaborn", level: "Proficient", highlight: "Statistical distribution graphs, correlation heatmaps" },
      { name: "Power BI", level: "Applied", highlight: "Interactive business analytics dashboards and KPI monitors" },
      { name: "Data Analytics", level: "Applied", highlight: "Exploratory data analysis, hypothesis testing, workforce insights" },
      { name: "Machine Learning Concepts", level: "Foundational", highlight: "Supervised regression, classification, feature evaluation" },
      { name: "Computer Vision Concepts", level: "Applied Concept", highlight: "Camera sensor feeds, image recognition, tracking logic" }
    ]
  },
  engineeringInterests: {
    category: "Engineering Disciplines",
    icon: "Layers",
    items: [
      { name: "VLSI & Digital Design", level: "Academic Focus", highlight: "CMOS logic, timing diagrams, digital circuit verification" },
      { name: "IoT & Microcontrollers", level: "Core Specialty", highlight: "Edge sensor networks, MQTT/HTTP telemetry, remote actuation" },
      { name: "Cybersecurity Basics", level: "Interest Area", highlight: "Secure device communication and access control principles" },
      { name: "Game Development", level: "Certified", highlight: "Logic loops, 2D mechanics, event state machines (WhiteHat Jr)" }
    ]
  }
};

export const PROJECTS_DATA = [
  {
    id: "medinv",
    code: "PRJ-01",
    name: "MEDINV",
    subtitle: "Smart Medicine Dispensing System",
    category: "IoT / Embedded Healthcare",
    statusBadge: "Project Concept & Prototype Design",
    featured: true,
    summary: "An IoT-enabled scheduled medication dispenser engineered to assist elderly patients with reliable dosage timing, stock tracking, and caregiver alerts.",
    problem: "Elderly patients and individuals on multi-prescription regimens frequently face missed doses, double-dosing hazards, and untimely prescription stockouts.",
    solution: "A closed-loop electromechanical dispenser combining precision timed stepper/servo rotation, localized auditory/visual reminders, compartment indexing, and caregiver IoT notifications.",
    architecture: {
      controller: "ESP32 / Microcontroller core",
      actuation: "Rotary stepper motor with compartment encoder",
      timekeeping: "Precision RTC (Real-Time Clock) module with battery backup",
      telemetry: "Wi-Fi connectivity to caregiver dashboard",
      interface: "OLED status screen + capacitive manual override button"
    },
    flowSteps: [
      { step: "01", title: "Schedule Configuration", desc: "Patient or authorized caregiver programs dosage times via dashboard." },
      { step: "02", title: "Time Synchronized Trigger", desc: "Local RTC matches schedule, initiating audio-visual alert sequence." },
      { step: "03", title: "Motor Indexing", desc: "Rotary motor advances the indexed medicine cartridge to the dispensing aperture." },
      { step: "04", title: "Verification & Telemetry", desc: "Access door opened, dose logged; caregiver dashboard updated with stock status." },
      { step: "05", title: "Refill & Alert Pipeline", desc: "When stock drops below threshold, early refill reminders are triggered." }
    ],
    mockMetrics: {
      dispenserStatus: "STANDBY // READY",
      nextDosage: "08:00 AM (Compartment #3)",
      stockUnitsRemaining: 18,
      stockCapacity: 28,
      batteryLevel: "94% (Mains Online)",
      lastSync: "0.4s ago"
    },
    safetyDisclaimers: [
      "Not a medically validated clinical device: This system represents an engineering prototype concept for scheduled dispensing demonstration.",
      "No medical prescription modification: The system strictly dispenses pre-loaded physical slots according to user/caregiver input and never alters medication regimens.",
      "Manual override guarantee: Physical override controls are mandatory to guarantee immediate access in emergency scenarios.",
      "Power failure protection: Non-volatile EEPROM/Flash storage prevents duplicate dispensing or missed indices after power interruptions."
    ],
    futureImprovements: [
      "Optical beam-break verification sensor inside the chute to confirm pill drop",
      "Biometric fingerprint or RFID authentication for high-risk medication",
      "Tamper-evident sensor enclosures and cellular fallback connectivity"
    ],
    tags: ["IoT", "ESP32", "Rotary Actuation", "RTC Logic", "Caregiver Dashboard", "Fail-Safe Design"]
  },
  {
    id: "kinex",
    code: "PRJ-02",
    name: "KINEX",
    subtitle: "Sign-Language Assistive System",
    category: "AI / Assistive Embedded",
    statusBadge: "Concept Architecture & Pipeline",
    featured: true,
    summary: "An assistive communication architecture combining wearable flex/inertial sensors with computer vision to interpret Indian Sign Language (ISL) gestures into real-time speech and text.",
    problem: "Communication barriers faced by deaf and speech-impaired individuals when interacting with non-signers in everyday educational and commercial settings.",
    solution: "A dual-modality sensing pipeline utilizing hand kinematics from wearable sensor arrays correlated with vision-based feature extraction for robust gesture recognition.",
    architecture: {
      wearableLayer: "Glove sensor array: 5x flex bend sensors + 6-axis IMU (MPU6050)",
      visionLayer: "Camera stream tracking hand landmarks and spatial trajectory",
      fusionEngine: "Feature vector concatenator correlating finger curvature with landmark coordinates",
      outputUnit: "Synthesized text captioning and audio phoneme playback"
    },
    statusNote: "Gesture classification model and fusion layer are in active architecture research; prototype glove hardware schematic mapped.",
    tags: ["Indian Sign Language", "IMU", "Flex Sensors", "Computer Vision", "Assistive Tech"]
  },
  {
    id: "cmrl-tvs",
    code: "PRJ-03",
    name: "CMRL TVS Control Panel",
    subtitle: "Miniature Tunnel Ventilation System",
    category: "Embedded & Control Systems",
    statusBadge: "Verified Working Prototype",
    featured: true,
    summary: "Miniature working model of the Chennai Metro Rail Tunnel Ventilation System (TVS) control panel developed during internship at CMRL.",
    problem: "Real-time ventilation control in underground metro tunnels is mission-critical for passenger air quality, normal heat extraction, and emergency smoke extraction.",
    solution: "Engineered a scaled physical control panel integrating push buttons, LED status indicators, and embedded relay logic mirroring real-world TVS, SLI, IBP, and SCR modes.",
    highlights: [
      "Studied SLI (Station Level Interface), TVS, IBP (Integrated Backup Panel), and SCR (Station Control Room)",
      "Implemented hardware control circuitry replicating station operational modes (Normal, Congestion, Emergency Smoke Purge)",
      "Designed responsive push-button debouncing and LED matrix indicators for fan speed and damper state confirmation"
    ],
    tags: ["CMRL", "TVS", "Industrial Logic", "SCR", "Embedded Controls", "Hardware Prototype"]
  },
  {
    id: "hr-analytics",
    code: "PRJ-04",
    name: "HR Analytics Study",
    subtitle: "Strategic Workforce Insights & Dashboard",
    category: "Data Analytics & Research",
    statusBadge: "Conference Presented Research (ITDECC 2025)",
    featured: true,
    summary: "A comprehensive data-driven study analyzing a 500-employee workforce dataset using SQL, correlation analytics, and interactive Power BI dashboards.",
    problem: "Organizations struggle to identify root causes behind employee attrition, performance drops, and departmental turnover in time to make proactive retention decisions.",
    solution: "Engineered an end-to-end data pipeline from SQL extraction to multivariate correlation matrices in Python and interactive visual dashboards in Power BI.",
    conference: {
      name: "ITDECC 2025 (SRM IST, Ramapuram)",
      title: "HR Analytics for Strategic Decision-Making: A Comprehensive Data-Driven Study",
      mentorship: "Guided by Dr. Sree Rathna Lakshmi N V S (HOD of ECE)",
      team: "Collaborative research with a 3-member student team"
    },
    tags: ["Power BI", "SQL", "Python", "Data Analytics", "ITDECC 2025", "Correlation Analysis"]
  },
  {
    id: "smart-parking",
    code: "PRJ-05",
    name: "Smart Parking System",
    subtitle: "IoT-Based Slot Detection & Access",
    category: "IoT & Microcontrollers",
    statusBadge: "Verified Working Solution",
    featured: false,
    summary: "An automated parking infrastructure combining ESP32, RFID vehicle authentication, and ultrasonic/IR slot occupancy sensors with Wi-Fi telemetry.",
    details: "Automated gate barrier actuates upon valid RFID tag presentation. Overhead ultrasonic/IR nodes continuously transmit slot availability to a live web monitor, drastically reducing parking search latency.",
    tags: ["ESP32", "RFID", "Ultrasonic", "Wi-Fi Telemetry", "IoT"]
  },
  {
    id: "aquadot",
    code: "PRJ-06",
    name: "AquaDot",
    subtitle: "Aquaculture Water Quality Monitoring",
    category: "IoT & Environmental Sensing",
    statusBadge: "Verified IoT Solution",
    featured: false,
    summary: "An IoT monitoring system engineered to assess water quality and pond conditions using real-time parameter sensing for aquaculture farmers.",
    details: "Monitors pH, temperature, and toxicity indicators to compute an integrated Water Quality Index score, enabling farmers to safeguard fish yields and support data-driven loan/scheme applications.",
    tags: ["IoT", "Water Quality Index", "pH Sensing", "Aquaculture", "Microcontrollers"]
  },
  {
    id: "ai-intruder",
    code: "PRJ-07",
    name: "AI Intruder Alert System",
    subtitle: "Real-Time Multi-Sensor Surveillance",
    category: "AI & Embedded Security",
    statusBadge: "Verified Hardware Solution",
    featured: false,
    summary: "Real-time perimeter security integrating multi-modal Arduino sensor nodes (ultrasonic, passive infrared, temperature) with camera-based computer vision detection.",
    details: "Physical proximity sensors wake the low-power imaging module upon boundary breach, triggering AI classification and real-time alert dispatch.",
    tags: ["Arduino", "PIR Sensor", "Computer Vision", "Ultrasonic", "Surveillance"]
  },
  {
    id: "solar-tracker",
    code: "PRJ-08",
    name: "Solar Panel Efficiency Enhancer",
    subtitle: "Mechanical Sun-Tracking Apparatus",
    category: "Renewable Energy & Embedded",
    statusBadge: "Verified Working Prototype",
    featured: false,
    summary: "An active dual-axis solar tracking system utilizing mechanical rotation principles to align photovoltaic panels directly orthogonal to incident sunlight.",
    details: "Differential light sensor inputs feed a closed-loop servo controller that continuously adjusts azimuthal and elevation angles, significantly improving cumulative daily energy capture.",
    tags: ["Solar Tracking", "LDR Sensors", "Servo Actuation", "Renewable Energy"]
  }
];

export const EXPERIENCE_DATA = [
  {
    role: "Data Analytics Intern",
    organization: "Beau Roi Technologies Private Limited",
    period: "Internship",
    location: "Chennai, India",
    type: "Industry Internship",
    contributions: [
      "Worked on real-world datasets involving rigorous cleaning, missing value imputation, preprocessing, and exploratory data analysis (EDA).",
      "Designed and deployed interactive business intelligence dashboards and KPI reports in Power BI to present business insights clearly to stakeholders.",
      "Constructed automated analytics pipelines utilizing Python libraries: Pandas for transformations, NumPy for vector math, and Matplotlib/Seaborn for visual distribution insights.",
      "Collaborated closely with cross-functional teams to translate unstructured operational data into actionable decision-making metrics.",
      "Maintained structured repository documentation, analysis scripts, and visualization notebooks on GitHub."
    ],
    skillsApplied: ["Python", "Pandas", "Power BI", "Data Cleaning", "Matplotlib", "Seaborn"]
  },
  {
    role: "Engineering Intern — Tunnel Ventilation System (TVS)",
    organization: "Chennai Metro Rail Limited (CMRL)",
    period: "Internship",
    location: "Chennai, India",
    type: "Industrial / PSU Internship",
    contributions: [
      "Deeply analyzed the Tunnel Ventilation System (TVS) architecture, examining normal, congestion, and emergency smoke extraction protocols.",
      "Gained direct practical exposure to SLI (Station Level Interface), TVS, IBP (Integrated Backup Panel), and SCR (Station Control Room) subsystems.",
      "Studied field fan equipment, motorized tunnel dampers, air flow velocity sensors, and their integration with supervisory control rooms.",
      "Designed and assembled a fully operational miniature working model of the TVS control panel, incorporating physical push buttons, indicator LEDs, control circuitry, and interlocking logic.",
      "Bridged embedded system principles and industrial safety logic to replicate authentic metro tunnel ventilation control behaviors."
    ],
    skillsApplied: ["Embedded Systems", "Control Logic", "Circuit Design", "SLI/TVS/IBP/SCR", "Hardware Prototyping"]
  }
];

export const HACKATHONS_DATA = [
  {
    event: "THREX Hackathon",
    recognition: "Finalist — Top 5 Selection",
    level: "Competitive Hackathon",
    description: "Evaluated among top 5 teams for engineered prototype innovation and technical execution."
  },
  {
    event: "Smart India Hackathon (SIH)",
    recognition: "National-Level Participant (2x) & Institutional Selection",
    level: "National Level",
    description: "Participated twice in national-level innovation challenges; selected at the SRM institutional round for proposing a high-impact engineering solution."
  },
  {
    event: "Bharatiya Antariksh Hackathon",
    recognition: "National-Level Participant",
    level: "National Level",
    description: "Engaged in space technology problem statements and computational problem-solving."
  },
  {
    event: "IBM Datathon",
    recognition: "Participant",
    level: "Industry Datathon",
    description: "Competed in data-driven problem solving, exploratory analytics, and machine learning models."
  },
  {
    event: "SARAM — SRM Project Day",
    recognition: "Project Showcase Participant",
    level: "Institutional Showcase",
    description: "Presented physical hardware engineering solutions to faculty review panels."
  }
];

export const CERTIFICATIONS_DATA = [
  { title: "Data Analytics with Python", issuer: "NPTEL", verified: true },
  { title: "Getting Started with Artificial Intelligence", issuer: "IBM SkillsBuild", verified: true },
  { title: "Game Development", issuer: "WhiteHat Jr", verified: true },
  { title: "Job Simulations", issuer: "Forage — Accenture, Deloitte Australia, Siemens", verified: true },
  { title: "Modernizing Data Management Trends Using Open Lakehouse", issuer: "IIT PAL", verified: true },
  { title: "MongoDB — Basic for Students", issuer: "MongoDB University", verified: true },
  { title: "SCADA Systems in Industrial Automation: Real-Time Monitoring & Control", issuer: "Hands-On Workshop", verified: true },
  { title: "Hands-On Workshop on ESP-32", issuer: "Technical Workshop", verified: true },
  { title: "Hands-On Workshop on STM-32", issuer: "Technical Workshop", verified: true }
];

export const VOICE_COMMANDS = [
  { phrase: "hello aurelion", response: "Good day, sir. AURELION online and at your service. All engineering command telemetry is operating nominal." },
  { phrase: "introduce thirumal", response: "Thirumal N is an Electronics and Communication Engineering scholar specializing in Data Science at SRM Institute. He is the Project Head at DCDC, with verified proficiencies in embedded IoT, KiCad PCB design, and data analytics." },
  { phrase: "show my projects", action: "NAV_PROJECTS", response: "Opening the Project Laboratory. Displaying 8 verified engineering initiatives, including MEDINV and CMRL TVS." },
  { phrase: "open kinex", action: "OPEN_PROJECT_KINEX", response: "Loading project dossier: KINEX. Dual-modality sign language assistive system combining flex-sensing arrays and computer vision." },
  { phrase: "open medinv", action: "OPEN_PROJECT_MEDINV", response: "Accessing MEDINV Smart Medicine Dispensing System module. Loading motor kinematics and IoT telemetry dashboard." },
  { phrase: "show my skills", action: "NAV_SKILLS", response: "Displaying technical competencies: Embedded systems, Python, C, SQL, KiCad PCB design, and Data Analytics." },
  { phrase: "show my experience", action: "NAV_EXPERIENCE", response: "Navigating to industry experience: Beau Roi Technologies Data Analytics internship and Chennai Metro Rail TVS internship." },
  { phrase: "open my dcdc leadership profile", action: "NAV_DCDC", response: "Opening DCDC Leadership console: Project Head responsibilities, team collaboration, and technical coordination." },
  { phrase: "tell me about my metro project", action: "OPEN_PROJECT_CMRL", response: "Displaying CMRL Tunnel Ventilation System project. Miniature working control panel replicating SLI, TVS, IBP, and SCR modes." },
  { phrase: "open the pcb laboratory", action: "NAV_PCB", response: "Initializing 3D PCB inspection laboratory. Microcontroller, copper traces, and layer stackup ready for examination." },
  { phrase: "open github", action: "OPEN_GITHUB", response: "Redirecting to Thirumal's official GitHub repository at github.com/Thirumal23." },
  { phrase: "show my education", action: "NAV_EDUCATION", response: "Displaying academic credentials: B.Tech ECE with Data Science at SRM Ramapuram, Overall CGPA 9.54." },
  { phrase: "go to contact", action: "NAV_CONTACT", response: "Transferring to communications array. Email, LinkedIn, and direct dispatch channels available." },
  { phrase: "switch to light mode", action: "SET_THEME_LIGHT", response: "Adjusting visual display: High-contrast daylight HUD enabled." },
  { phrase: "switch to dark mode", action: "SET_THEME_DARK", response: "Restoring standard obsidian command center aesthetic." },
  { phrase: "stop speaking", action: "STOP_SPEECH", response: "Silencing audio output immediately." },
  { phrase: "return to command center", action: "NAV_HOME", response: "Returning to Central Command Center. Core reactor online." },
  { phrase: "help", action: "SHOW_HELP", response: "You may ask me to introduce Thirumal, open projects such as MEDINV or KINEX, inspect skills, open the PCB lab, or change visual themes." }
];
