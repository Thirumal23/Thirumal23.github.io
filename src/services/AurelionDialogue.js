/**
 * AURELION Dialogue & Spoken Knowledge Base
 * Authentic, intelligent, polite British-English butler phrasing
 * All technical statements strictly reflect verified portfolio data.
 */

export const AURELION_DIALOGUE = {
  // Suit HUD and Startup Greetings
  startupGreetings: [
    "Good day, sir. AURELION is online, and your engineering workspace is ready. Shall we review your latest projects, examine a circuit, or proceed directly to the laboratory?",
    "AURELION online, sir. Visual interface initialized, central reactor synchronized, and engineering navigation systems standing by.",
    "Welcome, sir. All core diagnostics are nominal. Eight verified engineering initiatives are loaded and awaiting your directive."
  ],

  // Section Arrival Announcements (Concise, natural)
  arrivals: {
    'command-center': "Certainly, sir. Returning to the command core. Your primary systems and engineering overview are ready.",
    'projects': "Of course, sir. Opening the project archive. Eight engineering initiatives are available for review, including MEDINV, KINEX, and the CMRL tunnel ventilation control panel.",
    'medinv': "Certainly, sir. Opening MEDINV. This project explores scheduled medicine management, a rotary dispensing mechanism, connectivity, and stock-related alerts.",
    'kinex': "Opening KINEX, sir. This assistive system explores sign-language recognition through wearable sensing and computer vision, with the aim of translating recognized signs into accessible communication.",
    'cmrl-tvs': "Certainly, sir. Opening the tunnel ventilation control panel project. We can review the controller architecture, front-panel interface, and planned input and output connections.",
    'hr-analytics': "Opening the HR analytics dashboard, sir. We can examine the data-analysis workflow, workforce trends, and the visual reporting approach.",
    'smart-parking': "Smart Parking is ready for inspection, sir. Let us review the vehicle-detection concept, parking availability indicators, and controller architecture.",
    'aquadot': "Opening AquaDot, sir. The concept focuses on monitoring aquaculture water conditions and turning sensor measurements into useful farm-health insights.",
    'ai-intruder': "Opening the AI Intruder Alert project, sir. We can review the proposed vision pipeline, event detection, and alert workflow.",
    'solar-tracker': "Certainly, sir. Opening the solar-efficiency project. We can examine its monitoring and control concept, including the relevant sensing and controller architecture.",
    'dcdc': "Opening your leadership profile, sir. Here we can review your responsibilities as Project Head at the Digital Communication and Design Club.",
    'skills': "Your technical profile is ready, sir. Shall we begin with embedded systems, programming, data analytics, or electronic design automation?",
    'experience': "Opening your experience record, sir. Your internships, technical activities, certifications, and achievements are organized for review.",
    'pcb-lab': "Excellent, sir. The engineering laboratory is ready. Select a project, and we can inspect its three-dimensional representation, examine individual components, and explore the available connections.",
    'terminal': "Terminal access is ready, sir. You may enter a command or ask me to navigate to a supported system.",
    'contact': "Certainly, sir. Your contact section is ready, along with your available professional profile links."
  },

  // Detailed Spoken Section Introductions
  detailedIntroductions: {
    'command-center': "Welcome to the Central Command Core, sir. At the center is your three-dimensional Arc Reactor Intelligence Core, encircled by orbital telemetry nodes for your eight verified projects. You can drag to rotate the reactor, zoom in to examine the concentric rings, or select any project satellite to view its dossier. The left console displays your operator summary and academic standing, while the right console provides interactive voice directives and speech status.",
    
    'projects': "This is the Project Laboratory and Experimental Archive, containing Thirumal's eight verified engineering initiatives. The banner features MEDINV, an IoT scheduled medicine dispenser. Below, you will find assistive technology in KINEX, industrial automation from the Chennai Metro Rail internship, published HR analytics research, smart parking gateways, aquaculture monitoring, edge computer vision surveillance, and dual-axis solar optimization. You may filter by domain or search for specific microcontrollers.",
    
    'medinv': "This is the MEDINV Smart Medicine Dispensing System module. It explores automated medication timing with an ESP32 microcontroller, DS3231 high-precision real-time clock, a rotary stepper motor mechanism, and cloud caregiver telemetry. Please note, sir, MEDINV is an engineering design prototype; it does not provide medical guidance or guarantee clinical dosage safety. A manual hardware override is incorporated for safety.",
    
    'dcdc': "This console outlines Thirumal's appointment as Project Head at DCDC, the Digital Communication and Design Club. His duties involve architectural planning, hardware-software coordination, hands-on workshop instruction in embedded systems, and directing visual design initiatives for engineering showcases.",
    
    'skills': "Here is Thirumal's verified technical competencies matrix. It encompasses KiCad PCB design from schematic capture to Gerber export, embedded microcontrollers including ESP32 and Arduino, core programming in Python, C, and SQL, and data analytics tools such as Pandas, NumPy, and Power BI.",
    
    'experience': "This record documents Thirumal's industry internships and academic excellence at SRM Institute of Science and Technology. He completed a Data Analytics internship at Beau Roi Technologies and an Engineering internship at Chennai Metro Rail Limited studying Tunnel Ventilation Systems, while maintaining an overall CGPA of 9.54 out of 10.0.",
    
    'pcb-lab': "Welcome to the Universal 3D PCB Engineering Laboratory. Here you can inspect authentic multi-layer circuit board layouts across all eight projects. Use the selector bar at the top to switch between boards. You can toggle silkscreen and copper layers, and click individual components such as microcontrollers, drivers, or power regulators to examine their package footprints and engineering parameters.",
    
    'terminal': "This is the tactical engineering CLI, operating on firmware version 2.4. You may type 'help' to review the catalog of fourteen verified local commands, including 'projects', 'medinv', 'kinex', 'dcdc', 'skills', and 'status'. You may also request me to navigate or switch visual themes.",
    
    'contact': "This is your direct communications array. Visitors can dispatch a verified mailto message to your SRM academic address, inspect your GitHub repositories at Thirumal23, or connect via LinkedIn."
  },

  // Project-Specific Spoken Dossiers (Deep Dives)
  projectDossiers: {
    'medinv': "MEDINV aims to assist elderly patients with scheduled prescription adherence. The system coordinates an ESP32 microcontroller with a DS3231 real-time clock, rotating a 28-slot carousel via a stepper driver. Telemetry is transmitted to a caregiver dashboard, while local alerts issue audible reminders. In-development features include optical pill verification.",
    
    'kinex': "KINEX is an assistive dual-modality Indian Sign Language recognition architecture. It fuses kinematic bend angles from five flex sensors and hand orientation from an MPU6050 six-axis accelerometer with computer vision landmark tracking to translate sign gestures into audible speech.",
    
    'cmrl-tvs': "The CMRL Tunnel Ventilation System project stems from Thirumal's internship at Chennai Metro Rail Limited. It models emergency station smoke purging and tunnel airflow using industrial relay logic, status indication lamps, and selector switches replicating Station Line Isolation, Track Ventilation, and Scram control modes.",
    
    'hr-analytics': "This research study examines employee retention, performance metrics, and attrition factors across a five-hundred-record workforce dataset. Cleaned in Python with Pandas and NumPy, structured with SQL queries, and published at the ITDECC 2025 conference with interactive Power BI dashboards.",
    
    'smart-parking': "The Smart Parking System addresses urban congestion through ultrasonic occupancy detection at each parking bay, coordinated by an ESP8266 Wi-Fi node with RC522 RFID gated access control and real-time bay availability displays.",
    
    'aquadot': "AquaDot is an automated aquaculture monitoring buoy. It conditions high-impedance analog signals from water pH and Total Dissolved Solids probes using an ultra-low power STM32 microcontroller, generating water health indices to prevent aquatic mortality.",
    
    'ai-intruder': "The AI Intruder Alert System combines an ESP32-CAM module with PIR motion sensing. Upon detecting human presence, it captures frame sequences, performs edge-level lightweight feature classification, and dispatches encrypted alert snapshots over Wi-Fi.",
    
    'solar-tracker': "The Solar Panel Efficiency Enhancer employs dual-axis Light Dependent Resistor bridge comparators driving an H-bridge actuator. By maintaining perpendicular solar incidence throughout daylight hours, it achieves an estimated twenty-five to thirty percent energy capture enhancement over static arrays."
  },

  // Component Explanations in 3D PCB Lab
  componentExplanations: {
    'ESP32': "The ESP32 is a dual-core 240MHz microcontroller featuring integrated Wi-Fi and Bluetooth Low Energy. In this board layout, it serves as the primary system controller handling sensor acquisition and wireless telemetry.",
    'DS3231': "The DS3231 is an extremely accurate I2C real-time clock with an integrated temperature-compensated crystal oscillator and coin-cell battery backup, ensuring precise timekeeping even during complete power loss.",
    'A4988': "The A4988 is a microstepping bipolar stepper motor driver with built-in translator, enabling smooth and precise rotary indexing of the medication carousel.",
    'MPU6050': "The MPU6050 combines a 3-axis gyroscope and a 3-axis accelerometer on the same silicon die with an onboard Digital Motion Processor to calculate hand orientation angles.",
    'RELAY': "The electromechanical relay provides galvanic isolation between low-voltage digital control logic and high-power actuators or industrial ventilation fans.",
    'GENERIC': "This component represents a verified footprint in the KiCad electronic design automation library, positioned in accordance with design rule checks and power trace thermal dissipation requirements."
  }
};
