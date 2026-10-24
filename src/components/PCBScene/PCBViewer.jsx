import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Cpu, 
  Layers, 
  Eye, 
  Info, 
  CheckCircle2, 
  Shield, 
  ChevronRight, 
  CircuitBoard,
  Sparkles,
  Sliders,
  Volume2
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';
import VoiceSectionBriefing from '../Common/VoiceSectionBriefing';
import './PCBViewer.css';

// Universal Multi-Project PCB Database
const UNIVERSAL_PCB_DATA = {
  medinv: {
    projectId: 'medinv',
    boardCode: 'PCB-MED-REV2',
    boardName: 'MEDINV Smart Dispenser Controller',
    colorMask: '#0d2b1d', // Dark green solder mask
    boardSize: [5.6, 0.1, 4.4],
    copperTraces: [
      { start: [-1.8, 0, 1.2], end: [0, 0, 0] },
      { start: [0, 0, 0], end: [1.8, 0, -1.2] },
      { start: [-1.8, 0, -1.5], end: [0, 0, 0] },
      { start: [0, 0, 0], end: [1.8, 0, 1.4] }
    ],
    components: [
      {
        id: 'u1',
        ref: 'U1',
        name: 'ESP32-WROOM-32D',
        type: 'Microcontroller Core',
        package: 'Module 38-Pin SMD',
        position: [0, 0.12, 0],
        size: [1.8, 0.15, 2.4],
        color: '#34495e',
        details: 'Dual-core Xtensa 32-bit LX6 @ 240MHz. Handles scheduled dispensing state machine and caregiver telemetry via Wi-Fi/BLE.',
        specs: ['Clock: 240 MHz', 'Flash: 4 MB SPI', 'SRAM: 520 KB', 'Operating Voltage: 3.3V']
      },
      {
        id: 'u2',
        ref: 'U2',
        name: 'DS3231 Precision RTC',
        type: 'Real-Time Clock & TCXO',
        package: 'SOIC-16',
        position: [-1.8, 0.08, 1.2],
        size: [0.9, 0.1, 0.7],
        color: '#1a1f2c',
        details: 'Temperature-compensated crystal oscillator ensuring precision scheduled dispensing without internet time drift.',
        specs: ['Accuracy: ±2ppm', 'Backup: CR2032 Battery', 'Interface: I2C Fast Mode']
      },
      {
        id: 'u3',
        ref: 'U3',
        name: 'A4988 Stepper Driver',
        type: 'Rotary Motor Controller',
        package: 'QFN-28 Carrier',
        position: [1.8, 0.08, -1.2],
        size: [1.1, 0.1, 1.1],
        color: '#8b0000',
        details: 'DMOS microstepping driver indexing the mechanical medicine carousel to exact compartment apertures.',
        specs: ['Max Current: 2A peak', 'Microstepping: Up to 1/16', 'Thermal Shutdown: Integrated']
      },
      {
        id: 'conn1',
        ref: 'J1',
        name: 'OLED / Sensor I2C Bus',
        type: 'Pin Header 4P',
        package: '2.54mm Pitch Through-Hole',
        position: [-1.8, 0.15, -1.5],
        size: [0.5, 0.25, 1.2],
        color: '#222222',
        details: '4-pin bus providing 3.3V, GND, SDA, and SCL lines for external OLED telemetry and optical drop sensors.',
        specs: ['Rating: 3A', 'Insulation: 1000MΩ', 'Interface: I2C']
      },
      {
        id: 'sw1',
        ref: 'SW1',
        name: 'Manual Emergency Override',
        type: 'Tactile Switch',
        package: '6x6mm SMD',
        position: [1.8, 0.1, 1.4],
        size: [0.6, 0.18, 0.6],
        color: '#e74c3c',
        details: 'Hardware-interrupt enabled tactile switch releasing medication compartments during network or power failure.',
        specs: ['Debounce: 10ms RC Filtered', 'Interrupt: GPIO 4', 'Life: 100k Cycles']
      }
    ]
  },
  kinex: {
    projectId: 'kinex',
    boardCode: 'PCB-KNX-REV1',
    boardName: 'KINEX Sign Language Assistive Hub',
    colorMask: '#07162c', // Deep Navy
    boardSize: [5.2, 0.1, 4.0],
    copperTraces: [
      { start: [-1.6, 0, 0.9], end: [0, 0, 0] },
      { start: [1.6, 0, -0.9], end: [0, 0, 0] },
      { start: [0, 0, 1.4], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'knx_u1',
        ref: 'U1',
        name: 'ESP32 Low-Power Core',
        type: 'Telemetry MCU',
        package: 'QFN-48',
        position: [0, 0.12, 0],
        size: [1.5, 0.14, 1.5],
        color: '#1e293b',
        details: 'Processes real-time wearable glove kinematics and communicates with the computer vision fusion pipeline.',
        specs: ['Core: Dual-Core 240MHz', 'Wireless: BLE 4.2 / Wi-Fi', 'ADC: 12-bit SAR']
      },
      {
        id: 'knx_u2',
        ref: 'U2',
        name: 'MPU-6050 6-Axis IMU',
        type: 'Inertial Motion Sensor',
        package: 'QFN-24',
        position: [-1.6, 0.08, 0.9],
        size: [0.8, 0.09, 0.8],
        color: '#0f172a',
        details: '3-axis gyroscope and 3-axis accelerometer capturing wrist orientation and dynamic gesture trajectory.',
        specs: ['Gyro Range: ±2000°/s', 'Accel: ±16g', 'Interface: I2C 400kHz']
      },
      {
        id: 'knx_u3',
        ref: 'U3',
        name: 'ADS1115 16-Bit ADC',
        type: 'Analog Conditioning',
        package: 'MSOP-10',
        position: [1.6, 0.08, -0.9],
        size: [0.7, 0.08, 0.6],
        color: '#334155',
        details: 'High-resolution ADC capturing continuous voltage dividers across 5 finger flex bend sensors.',
        specs: ['Resolution: 16-Bit', 'Channels: 4 Differential', 'Rate: 860 SPS']
      },
      {
        id: 'knx_j1',
        ref: 'J1',
        name: 'Flex Sensor Glove Bus',
        type: 'FPC Connector 6P',
        package: '0.5mm Pitch SMD',
        position: [0, 0.1, 1.4],
        size: [1.2, 0.12, 0.4],
        color: '#d97706',
        details: 'Flexible printed circuit connector linking wearable conductive textile sensor lines.',
        specs: ['Pitch: 0.5mm', 'Contact: Gold-Plated', 'Current: 0.5A']
      }
    ]
  },
  'cmrl-tvs': {
    projectId: 'cmrl-tvs',
    boardCode: 'PCB-TVS-SCR-M1',
    boardName: 'CMRL Tunnel Ventilation Control Interface',
    colorMask: '#1a1a24', // Industrial Titanium
    boardSize: [5.8, 0.1, 4.6],
    copperTraces: [
      { start: [-1.8, 0, 0], end: [0, 0, 0] },
      { start: [1.8, 0, 0], end: [0, 0, 0] },
      { start: [0, 0, 1.6], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'tvs_u1',
        ref: 'U1',
        name: 'Industrial Relay Logic Controller',
        type: 'Supervisory MCU',
        package: 'LQFP-64',
        position: [0, 0.12, 0],
        size: [1.6, 0.15, 1.6],
        color: '#1e293b',
        details: 'Miniature control unit replicating SLI, TVS, IBP, and SCR station operational ventilation modes.',
        specs: ['Logic: 24V Opto-Isolated', 'Interlocking: Fail-Safe Purge', 'Bus: RS-485 / CAN']
      },
      {
        id: 'tvs_k1',
        ref: 'K1-K4',
        name: 'Damper / Fan Relay Quad',
        type: 'Electromechanical Relays',
        package: 'Through-Hole SPDT',
        position: [1.8, 0.2, 0],
        size: [1.4, 0.35, 2.2],
        color: '#1e40af',
        details: 'Switching matrix activating high-velocity tunnel extraction fans and motorized smoke dampers.',
        specs: ['Contact: 10A @ 250VAC', 'Coil: 12VDC', 'Isolation: 4kV Dielectric']
      },
      {
        id: 'tvs_u2',
        ref: 'U2',
        name: 'Optocoupler Array (TLP281-4)',
        type: 'Signal Isolation',
        package: 'SOP-16',
        position: [-1.8, 0.08, 0],
        size: [0.9, 0.08, 0.7],
        color: '#0f172a',
        details: 'Galvanic isolation protecting logic circuitry from industrial high-voltage surges and EMI noise.',
        specs: ['Isolation: 2500 Vrms', 'Channels: 4 Independent', 'Response: 3µs']
      }
    ]
  },
  'smart-parking': {
    projectId: 'smart-parking',
    boardCode: 'PCB-PRK-ESP32',
    boardName: 'Smart Parking IoT Sensor Node',
    colorMask: '#0f291e', // Forest Green
    boardSize: [5.0, 0.1, 4.0],
    copperTraces: [
      { start: [-1.5, 0, 0], end: [0, 0, 0] },
      { start: [1.5, 0, 0], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'prk_u1',
        ref: 'U1',
        name: 'ESP32 Wi-Fi Node',
        type: 'IoT Controller',
        package: 'SMD-38',
        position: [0, 0.12, 0],
        size: [1.6, 0.15, 2.2],
        color: '#334155',
        details: 'Broadcasts slot vacancy to MQTT cloud broker and manages automated gate barrier actuation.',
        specs: ['Connectivity: 802.11 b/g/n', 'Operating: 3.3V', 'Sleep Current: 5µA']
      },
      {
        id: 'prk_u2',
        ref: 'U2',
        name: 'RC522 RFID Receiver',
        type: '13.56MHz Contactless Reader',
        package: 'Module Carrier',
        position: [-1.6, 0.1, 0],
        size: [1.2, 0.15, 1.4],
        color: '#1e3a8a',
        details: 'Authenticates registered vehicle tags with encrypted UID verification.',
        specs: ['Frequency: 13.56 MHz', 'Range: 50mm', 'Protocol: SPI']
      },
      {
        id: 'prk_j1',
        ref: 'J1',
        name: 'Ultrasonic Transducer Port',
        type: '4-Pin Sensor Header',
        package: '2.54mm Pitch',
        position: [1.6, 0.12, 0],
        size: [0.6, 0.22, 1.0],
        color: '#475569',
        details: 'Interface for HC-SR04 ultrasonic echo timing measuring bay occupancy status.',
        specs: ['Range: 2cm - 400cm', 'Accuracy: 3mm', 'Trigger: 10µs TTL']
      }
    ]
  },
  aquadot: {
    projectId: 'aquadot',
    boardCode: 'PCB-AQD-WQI',
    boardName: 'AquaDot Water Quality Telemetry Board',
    colorMask: '#06202a', // Cyan Teal
    boardSize: [5.2, 0.1, 4.2],
    copperTraces: [
      { start: [-1.6, 0, 0.8], end: [0, 0, 0] },
      { start: [1.6, 0, -0.8], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'aq_u1',
        ref: 'U1',
        name: 'Microcontroller Core',
        type: 'Sensor Fusion MCU',
        package: 'QFN-32',
        position: [0, 0.12, 0],
        size: [1.4, 0.14, 1.4],
        color: '#0f172a',
        details: 'Computes real-time pond Water Quality Index (WQI) scores from multi-parameter sensor arrays.',
        specs: ['ADC: 12-Bit', 'Low Power Mode: Enabled', 'Interface: I2C/SPI']
      },
      {
        id: 'aq_u2',
        ref: 'U2',
        name: 'Precision pH Analog Front-End',
        type: 'Instrumentation Amplifier',
        package: 'SOIC-8',
        position: [-1.6, 0.08, 0.8],
        size: [0.8, 0.09, 0.6],
        color: '#164e63',
        details: 'High-impedance analog conditioning stage for glass electrode pH probe potential conversion.',
        specs: ['Input Impedance: 10^12 Ω', 'Offset: < 50µV', 'Gain: Factory Calibrated']
      },
      {
        id: 'aq_u3',
        ref: 'U3',
        name: 'DS18B20 1-Wire Interface',
        type: 'Water Temperature Interface',
        package: 'TO-92 SMD',
        position: [1.6, 0.08, -0.8],
        size: [0.6, 0.1, 0.5],
        color: '#334155',
        details: 'Digital temperature sensor providing accurate thermal compensation for pH calculations.',
        specs: ['Accuracy: ±0.5°C', 'Resolution: 9 to 12-Bit', 'Bus: 1-Wire']
      }
    ]
  },
  'ai-intruder': {
    projectId: 'ai-intruder',
    boardCode: 'PCB-SEC-AI01',
    boardName: 'AI Intruder Surveillance Node',
    colorMask: '#2d1515', // Tactical Crimson
    boardSize: [5.0, 0.1, 4.0],
    copperTraces: [
      { start: [-1.5, 0, 0.6], end: [0, 0, 0] },
      { start: [1.5, 0, -0.6], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'sec_u1',
        ref: 'U1',
        name: 'ESP32-CAM Processor',
        type: 'Vision & AI Node',
        package: 'Module Carrier',
        position: [0, 0.15, 0],
        size: [1.6, 0.18, 2.2],
        color: '#1e293b',
        details: 'Integrates OV2640 camera feed with onboard edge classification and perimeter boundary monitoring.',
        specs: ['Camera: 2MP OV2640', 'PSRAM: 4MB', 'Flash: Built-in LED']
      },
      {
        id: 'sec_u2',
        ref: 'U2',
        name: 'PIR Motion Detector Interface',
        type: 'Passive Infrared Conditioner',
        package: 'BISS0001 Controller',
        position: [-1.5, 0.08, 0.6],
        size: [0.8, 0.08, 0.6],
        color: '#450a0a',
        details: 'Low-power wake-on-motion circuit triggering camera capture upon infrared thermal boundary breach.',
        specs: ['Detection Angle: 120°', 'Range: 7m', 'Delay: Configurable']
      },
      {
        id: 'sec_bz',
        ref: 'BZ1',
        name: 'Piezo Alarm Transducer',
        type: 'Acoustic Deterrent Driver',
        package: 'Radial 12mm',
        position: [1.5, 0.15, -0.6],
        size: [0.9, 0.22, 0.9],
        color: '#7f1d1d',
        details: 'High-frequency acoustic buzzer triggered during verified intruder alert classification.',
        specs: ['Output: 85dB @ 10cm', 'Frequency: 2.7kHz', 'Drive: NPN Transistor']
      }
    ]
  },
  'solar-tracker': {
    projectId: 'solar-tracker',
    boardCode: 'PCB-SLR-DUAL',
    boardName: 'Solar Panel Dual-Axis Rotation Controller',
    colorMask: '#291e0a', // Amber Gold / Bronze
    boardSize: [5.4, 0.1, 4.2],
    copperTraces: [
      { start: [-1.6, 0, 0], end: [0, 0, 0] },
      { start: [1.6, 0, 0], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'slr_u1',
        ref: 'U1',
        name: 'Closed-Loop Servo Controller',
        type: 'Tracking MCU',
        package: 'TQFP-32',
        position: [0, 0.12, 0],
        size: [1.4, 0.14, 1.4],
        color: '#1e293b',
        details: 'Computes differential light levels from 4 quadrants to align panels orthogonal to sunlight.',
        specs: ['Resolution: 10-Bit ADC', 'PWM: Dual 16-Bit', 'Tracking: Continuous Azimuth/Elevation']
      },
      {
        id: 'slr_u2',
        ref: 'U2',
        name: 'Quad Comparator (LM339)',
        type: 'Differential Wheatstone Bridge',
        package: 'SOIC-14',
        position: [-1.6, 0.08, 0],
        size: [0.9, 0.08, 0.6],
        color: '#78350f',
        details: 'High-speed analog comparators determining differential solar azimuth angles from LDR cells.',
        specs: ['Supply: 2V to 36V', 'Channels: 4 Independent', 'Response: 1.3µs']
      },
      {
        id: 'slr_j1',
        ref: 'J1-J2',
        name: 'Dual Servo Output Rail',
        type: '3-Pin Header x2',
        package: '2.54mm Pitch',
        position: [1.6, 0.12, 0],
        size: [0.8, 0.22, 1.2],
        color: '#b45309',
        details: 'Supplies 5V high-torque PWM drive signals to mechanical azimuthal and elevation gears.',
        specs: ['Torque Drive: 2.5A peak', 'PWM Frequency: 50Hz', 'Protection: Flyback Diodes']
      }
    ]
  },
  'hr-analytics': {
    projectId: 'hr-analytics',
    boardCode: 'PCB-HRA-ITDECC',
    boardName: 'HR Analytics Compute & Storage Hub',
    colorMask: '#171a2e', // Deep Indigo
    boardSize: [5.2, 0.1, 4.2],
    copperTraces: [
      { start: [-1.6, 0, 0.6], end: [0, 0, 0] },
      { start: [1.6, 0, -0.6], end: [0, 0, 0] }
    ],
    components: [
      {
        id: 'hra_u1',
        ref: 'U1',
        name: 'Data Pipeline Edge Processor',
        type: 'Edge Compute Core',
        package: 'BGA-64',
        position: [0, 0.14, 0],
        size: [1.5, 0.16, 1.5],
        color: '#1e293b',
        details: 'Edge data aggregation node logging employee workforce metrics and SQL data ingestion for Power BI.',
        specs: ['Architecture: ARM Cortex', 'RAM: 2MB SRAM', 'Bus: High-Speed SPI/I2C']
      },
      {
        id: 'hra_u2',
        ref: 'U2',
        name: 'W25Q128 High-Speed SPI Flash',
        type: 'Non-Volatile Storage',
        package: 'SOIC-8',
        position: [-1.6, 0.08, 0.6],
        size: [0.7, 0.08, 0.6],
        color: '#312e81',
        details: '128 Megabit serial flash memory caching 500-employee workforce records and correlation tables.',
        specs: ['Capacity: 16 MB', 'Speed: 104 MHz SPI', 'Endurance: 100k Cycles']
      },
      {
        id: 'hra_u3',
        ref: 'U3',
        name: 'CP2102 USB-to-UART Bridge',
        type: 'Diagnostic Serial Port',
        package: 'QFN-28',
        position: [1.6, 0.08, -0.6],
        size: [0.8, 0.08, 0.8],
        color: '#4338ca',
        details: 'Direct telemetry link feeding live workforce metrics and debug streams to analytical workstations.',
        specs: ['Baud Rate: Up to 1 Mbps', 'Buffer: 576 Byte FIFO', 'USB: 2.0 Full-Speed']
      }
    ]
  }
};

// 3D PCB Board Mesh Component
function CircuitBoardMesh({ currentBoard, selectedComp, onSelectComp, activeLayers }) {
  const boardRef = useRef();

  return (
    <group ref={boardRef}>
      {/* Solder Mask Substrate */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={currentBoard.boardSize} />
        <meshStandardMaterial
          color={activeLayers.mask ? currentBoard.colorMask : '#111823'}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Gold Edge Plating / Ground Ring */}
      {activeLayers.copper && (
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[currentBoard.boardSize[0] + 0.05, 0.02, currentBoard.boardSize[2] + 0.05]} />
          <meshStandardMaterial color="#FFB45C" metalness={0.9} roughness={0.3} wireframe />
        </mesh>
      )}

      {/* Copper Traces Layer */}
      {activeLayers.copper && (
        <group position={[0, 0.006, 0]}>
          {currentBoard.copperTraces.map((trace, idx) => {
            const midX = (trace.start[0] + trace.end[0]) / 2;
            const midZ = (trace.start[2] + trace.end[2]) / 2;
            const len = Math.hypot(trace.end[0] - trace.start[0], trace.end[2] - trace.start[2]);
            const angle = Math.atan2(trace.end[0] - trace.start[0], trace.end[2] - trace.start[2]);
            return (
              <mesh key={idx} position={[midX, 0, midZ]} rotation={[0, angle, 0]}>
                <planeGeometry args={[0.06, len]} />
                <meshStandardMaterial color="#e67e22" metalness={0.95} roughness={0.2} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Silkscreen Markings */}
      {activeLayers.silk && (
        <group position={[0, 0.008, 0]}>
          <mesh position={[0, 0, currentBoard.boardSize[2] / 2 - 0.4]}>
            <planeGeometry args={[currentBoard.boardSize[0] - 0.8, 0.025]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0, -currentBoard.boardSize[2] / 2 + 0.4]}>
            <planeGeometry args={[currentBoard.boardSize[0] - 0.8, 0.025]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* Placed Components */}
      {currentBoard.components.map((comp) => {
        const isSelected = selectedComp?.id === comp.id;
        return (
          <group 
            key={comp.id} 
            position={comp.position}
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onSelectComp(comp);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <mesh>
              <boxGeometry args={comp.size} />
              <meshStandardMaterial
                color={isSelected ? "#56E7FF" : comp.color}
                emissive={isSelected ? "#56E7FF" : "#000000"}
                emissiveIntensity={isSelected ? 0.6 : 0}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {/* Silkscreen Component Reference Label */}
            {activeLayers.silk && (
              <Html position={[0, comp.size[1] + 0.16, 0]} center distanceFactor={7}>
                <div className={`pcb-label-chip mono ${isSelected ? 'active' : ''}`}>
                  <span>{comp.ref}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function PCBViewer({ initialProjectId = 'medinv' }) {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);
  const currentBoard = UNIVERSAL_PCB_DATA[selectedProjectId] || UNIVERSAL_PCB_DATA.medinv;
  const [selectedComp, setSelectedComp] = useState(currentBoard.components[0]);
  const [activeLayers, setActiveLayers] = useState({
    silk: true,
    copper: true,
    mask: true
  });
  const [use3D, setUse3D] = useState(true);

  // When project changes, update default selected component and vocalize
  const handleSelectProject = (pId) => {
    soundManager.playClick();
    setSelectedProjectId(pId);
    const newBoard = UNIVERSAL_PCB_DATA[pId] || UNIVERSAL_PCB_DATA.medinv;
    setSelectedComp(newBoard.components[0]);
    aurelionVoiceService.speak(`Loaded circuit board for ${newBoard.boardName}, revision ${newBoard.boardCode}.`);
  };

  const handleSelectComp = (comp) => {
    setSelectedComp(comp);
    soundManager.playClick();
    aurelionVoiceService.speak(`${comp.ref} is a ${comp.name}. ${comp.details}`);
  };

  const toggleLayer = (layerKey) => {
    soundManager.playClick();
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="pcb-lab-container">
      {/* Header telemetry */}
      <div className="pcb-header-card tactical-panel tactical-panel-corner">
        <div className="pcb-header-left">
          <div className="pcb-icon-box">
            <CircuitBoard size={26} className="text-cyan" />
          </div>
          <div>
            <div className="pcb-tag-row mono">
              <span className="telemetry-tag">KICAD EDA // UNIVERSAL 3D HARDWARE LABORATORY</span>
              <span className="status-dot online" />
            </div>
            <h2>UNIVERSAL 3D PCB ENGINEERING LABORATORY</h2>
            <p className="pcb-desc">
              Inspect multi-layer circuit boards, copper traces, and component footprints across all 8 verified engineering initiatives.
            </p>
          </div>
        </div>

        {/* View Mode Toggle & Voice Briefing */}
        <div className="pcb-header-actions">
          <VoiceSectionBriefing
            sectionKey="pcb-lab"
            customText={AURELION_DIALOGUE.detailedIntroductions['pcb-lab']}
          />

          <button
            type="button"
            className={`btn-tactical btn-compact ${use3D ? 'btn-tactical-gold' : 'btn-tactical-outline'}`}
            onClick={() => { soundManager.playClick(); setUse3D(!use3D); }}
          >
            <Eye size={14} />
            <span>{use3D ? 'MODE: 3D INSPECTOR' : 'MODE: 2D GERBER'}</span>
          </button>
        </div>
      </div>

      {/* Universal Project Selector Bar */}
      <div className="pcb-project-selector-bar tactical-panel mono">
        <span className="selector-title">
          <Cpu size={14} className="text-cyan" />
          <span>PROJECT HARDWARE SELECTOR:</span>
        </span>
        <div className="pcb-pills-row">
          {PROJECTS_DATA.map((p) => {
            const isActive = selectedProjectId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`pcb-project-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectProject(p.id)}
              >
                <span className="pill-code">{p.code}</span>
                <span className="pill-name">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="pcb-workspace-grid">
        {/* Left: 3D Canvas / 2D Canvas */}
        <div className="pcb-viewport-panel tactical-panel">
          {/* Layer Selector Bar */}
          <div className="pcb-layer-bar mono">
            <span className="layer-title"><Layers size={13} /> STACKUP LAYERS:</span>
            <button
              type="button"
              className={`layer-chip ${activeLayers.silk ? 'active' : ''}`}
              onClick={() => toggleLayer('silk')}
            >
              F.SilkS (White Silkscreen)
            </button>
            <button
              type="button"
              className={`layer-chip ${activeLayers.copper ? 'active' : ''}`}
              onClick={() => toggleLayer('copper')}
            >
              F.Cu (Top Copper Tracks)
            </button>
            <button
              type="button"
              className={`layer-chip ${activeLayers.mask ? 'active' : ''}`}
              onClick={() => toggleLayer('mask')}
            >
              F.Mask (Solder Mask Resin)
            </button>
            <div className="active-board-badge">
              <span>BOARD: {currentBoard.boardCode}</span>
            </div>
          </div>

          {/* Interactive 3D Viewer */}
          <div className="pcb-canvas-holder">
            {use3D ? (
              <Canvas camera={{ position: [0, 4.8, 4.4], fov: 45 }}>
                <ambientLight intensity={0.85} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                <pointLight position={[0, 2, 0]} color="#56E7FF" intensity={0.8} />

                <CircuitBoardMesh
                  currentBoard={currentBoard}
                  selectedComp={selectedComp}
                  onSelectComp={handleSelectComp}
                  activeLayers={activeLayers}
                />

                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  enableRotate={true}
                  maxPolarAngle={Math.PI / 2 + 0.1}
                />
              </Canvas>
            ) : (
              <div className="pcb-2d-fallback">
                <svg viewBox="0 0 500 400" className="pcb-2d-svg">
                  <rect width="480" height="360" x="10" y="20" rx="8" fill={currentBoard.colorMask} stroke="#FFB45C" strokeWidth="2" />
                  {/* Traces */}
                  <path d="M 50 100 L 250 100 L 250 200 L 400 200" stroke="#e67e22" strokeWidth="3" fill="none" />
                  <path d="M 100 300 L 250 300 L 250 220" stroke="#e67e22" strokeWidth="2.5" fill="none" />
                  {/* Components */}
                  {currentBoard.components.map((c) => (
                    <g 
                      key={c.id} 
                      onClick={() => handleSelectComp(c)}
                      cursor="pointer"
                    >
                      <rect 
                        x={250 + c.position[0] * 50 - c.size[0] * 20} 
                        y={200 + c.position[2] * 50 - c.size[2] * 20}
                        width={c.size[0] * 40}
                        height={c.size[2] * 40}
                        fill={selectedComp?.id === c.id ? "#56E7FF" : c.color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        rx="3"
                      />
                      <text 
                        x={250 + c.position[0] * 50} 
                        y={200 + c.position[2] * 50 + 4} 
                        fill="#ffffff" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {c.ref}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            )}

            <div className="pcb-hint-overlay mono">
              <span>MOUSE: LEFT-CLICK ROTATE | RIGHT-CLICK PAN | SCROLL ZOOM | CLICK COMPONENT TO INSPECT</span>
            </div>
          </div>
        </div>

        {/* Right: Component Inspector Panel */}
        <div className="pcb-inspector-panel tactical-panel tactical-panel-corner">
          <div className="inspector-header mono">
            <Info size={15} className="text-cyan" />
            <span>COMPONENT SCHEMATIC INSPECTOR</span>
          </div>

          {selectedComp ? (
            <div className="inspector-content">
              <div className="inspector-top-badge">
                <span className="ref-tag mono">{selectedComp.ref}</span>
                <span className="comp-name">{selectedComp.name}</span>
              </div>

              <div className="spec-row mono">
                <span className="spec-key">CLASSIFICATION:</span>
                <span className="spec-val text-cyan">{selectedComp.type}</span>
              </div>

              <div className="spec-row mono">
                <span className="spec-key">PACKAGE / FOOTPRINT:</span>
                <span className="spec-val">{selectedComp.package}</span>
              </div>

              <div className="comp-detail-box">
                <p className="comp-desc">{selectedComp.details}</p>
              </div>

              <button
                type="button"
                className="btn-tactical btn-tactical-cyan btn-compact"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '14px' }}
                onClick={() => handleSelectComp(selectedComp)}
              >
                <Volume2 size={14} />
                <span>VOCALIZE COMPONENT ROLE</span>
              </button>

              <div className="comp-specs-list mono">
                <span className="specs-list-title">ENGINEERING PARAMETERS:</span>
                {selectedComp.specs.map((s, idx) => (
                  <div key={idx} className="spec-bullet-row">
                    <CheckCircle2 size={13} className="text-success" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Verified KiCad Workflow Badge */}
              <div className="kicad-verified-badge mono">
                <Shield size={14} className="text-gold" />
                <span>KICAD PROFICIENT: SCHEMATIC, FOOTPRINT & DRC VERIFIED</span>
              </div>
            </div>
          ) : (
            <div className="inspector-placeholder mono">
              <span>Select any component on the board to inspect electrical parameters and footprints.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
