import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import { aurelionVoiceService } from '../../services/AurelionVoiceService';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Radio, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  Layers 
} from 'lucide-react';
import './Reactor3D.css';

// Layer 1: Faceted Central Energy Core with Internal Pulses & Energy Conduits
function CentralEnergyCore({ isPaused, wireframeOnly }) {
  const coreRef = useRef();
  const innerCrystalRef = useRef();
  const conduitsGroupRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.45;
      coreRef.current.rotation.x += delta * 0.25;
      const pulse = 1.0 + Math.sin(time * 3.5) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (innerCrystalRef.current) {
      innerCrystalRef.current.rotation.y -= delta * 0.8;
      innerCrystalRef.current.rotation.z += delta * 0.4;
      const innerPulse = 1.0 + Math.cos(time * 4.5) * 0.08;
      innerCrystalRef.current.scale.set(innerPulse, innerPulse, innerPulse);
    }

    if (conduitsGroupRef.current) {
      conduitsGroupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* High-intensity multi-spectrum point lights */}
      <pointLight color="#E0FAFF" intensity={4} distance={8} decay={2} />
      <pointLight color="#56E7FF" intensity={3} distance={14} decay={2} />
      <pointLight color="#4C8DFF" intensity={2.5} distance={18} decay={2} />
      <pointLight color="#FFB45C" intensity={1.8} distance={6} decay={2} />

      {/* Outer Faceted Energy Crystal (Dodecahedron) */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#56E7FF"
          emissive="#56E7FF"
          emissiveIntensity={wireframeOnly ? 2.5 : 1.6}
          wireframe={wireframeOnly}
          roughness={0.15}
          metalness={0.9}
          transparent={true}
          opacity={wireframeOnly ? 0.9 : 0.85}
        />
      </mesh>

      {/* Dense Internal Pulsing Crystalline Core (Icosahedron) */}
      <mesh ref={innerCrystalRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#E0FAFF"
          emissive="#56E7FF"
          emissiveIntensity={2.8}
          roughness={0.1}
          metalness={1.0}
        />
      </mesh>

      {/* Solid Obsidian Singularity Sphere */}
      <mesh>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshBasicMaterial color="#030508" />
      </mesh>

      {/* 6 Radial Energy Conduit Struts */}
      <group ref={conduitsGroupRef}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <group key={i} rotation={[0, rad, 0]}>
              <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
                <meshStandardMaterial
                  color="#56E7FF"
                  emissive="#56E7FF"
                  emissiveIntensity={2.0}
                  metalness={0.9}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

// Layer 2: Precision Mechanical Concentric Rings with Radial Marker Ticks
function MechanicalRings({ isPaused, wireframeOnly }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const statorRingRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.65;
      ring1Ref.current.rotation.y += delta * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.55;
      ring2Ref.current.rotation.z += delta * 0.45;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.4;
      ring3Ref.current.rotation.z -= delta * 0.6;
    }
    if (statorRingRef.current) {
      statorRingRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Ring 1: Inner Titanium Rotor Ring with Amber Accents */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.35, 0.045, 16, 90]} />
          <meshStandardMaterial
            color="#FFB45C"
            emissive="#FFB45C"
            emissiveIntensity={0.8}
            metalness={0.85}
            roughness={0.25}
            wireframe={wireframeOnly}
          />
        </mesh>
        {/* Radial Notches on Ring 1 */}
        {[0, 90, 180, 270].map((deg, i) => (
          <mesh key={i} position={[1.35 * Math.cos((deg * Math.PI) / 180), 1.35 * Math.sin((deg * Math.PI) / 180), 0]}>
            <boxGeometry args={[0.07, 0.07, 0.07]} />
            <meshStandardMaterial color="#E0FAFF" emissive="#56E7FF" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Mid Precision Machined Gimbal Ring (Electric Blue) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[1.85, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#4C8DFF"
            emissive="#4C8DFF"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.2}
            wireframe={wireframeOnly}
          />
        </mesh>
        {/* Articulated Notches on Ring 2 */}
        {[45, 135, 225, 315].map((deg, i) => (
          <mesh key={i} position={[1.85 * Math.cos((deg * Math.PI) / 180), 0, 1.85 * Math.sin((deg * Math.PI) / 180)]}>
            <boxGeometry args={[0.06, 0.08, 0.06]} />
            <meshStandardMaterial color="#FFB45C" emissive="#FFB45C" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>

      {/* Ring 3: Counter-rotating Yaw Ring (Cyan) */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.35, 0.045, 16, 110]} />
          <meshStandardMaterial
            color="#56E7FF"
            emissive="#56E7FF"
            emissiveIntensity={0.65}
            metalness={0.95}
            roughness={0.15}
            wireframe={wireframeOnly}
          />
        </mesh>
      </group>

      {/* Outer Stator Ring with Equator Markers */}
      <group ref={statorRingRef}>
        <mesh>
          <torusGeometry args={[2.9, 0.05, 16, 120]} />
          <meshStandardMaterial
            color="#0E1622"
            emissive="#56E7FF"
            emissiveIntensity={0.4}
            metalness={0.98}
            roughness={0.1}
            wireframe={wireframeOnly}
          />
        </mesh>
        {/* 12 Radial Stator Notches */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[2.9 * Math.cos(rad), 2.9 * Math.sin(rad), 0]}>
              <boxGeometry args={[0.05, 0.05, 0.08]} />
              <meshStandardMaterial color="#56E7FF" emissive="#56E7FF" emissiveIntensity={1.4} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Layer 3: Geodesic Holographic Containment Cage & Planar Coordinate Rings
function HolographicContainment({ isPaused }) {
  const cageRef = useRef();
  const horizRingRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;
    if (cageRef.current) {
      cageRef.current.rotation.y += delta * 0.12;
      cageRef.current.rotation.x -= delta * 0.08;
    }
    if (horizRingRef.current) {
      horizRingRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Geodesic Outer Wireframe Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial
          color="#56E7FF"
          wireframe={true}
          transparent={true}
          opacity={0.25}
        />
      </mesh>

      {/* Holographic Equatorial Coordinate Disk */}
      <group ref={horizRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.0, 2.05, 64]} />
          <meshBasicMaterial
            color="#4C8DFF"
            transparent={true}
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[2.8, 2.83, 64]} />
          <meshBasicMaterial
            color="#56E7FF"
            transparent={true}
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// Layer 4: Interactive Project Orbit Satellite Nodes
function ProjectOrbitNode({ project, index, total, isPaused, showNodes, onSelect }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const radius = 3.8;
  const elevation = (index % 2 === 0 ? 0.45 : -0.45);

  const posX = Math.cos(angle) * radius;
  const posZ = Math.sin(angle) * radius;

  useFrame((state, delta) => {
    if (meshRef.current && !isPaused) {
      meshRef.current.rotation.y += delta * 1.2;
      meshRef.current.rotation.x += delta * 0.6;
    }
  });

  if (!showNodes) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    soundManager.playClick();
    onSelect(project.id);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    soundManager.playTerminal();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={[posX, elevation, posZ]} ref={groupRef}>
      {/* Dynamic Energy Line Connecting Node to Core Center */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-posX, -elevation, -posZ, 0, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={hovered ? '#56E7FF' : project.featured ? '#FFB45C' : '#4C8DFF'}
          transparent={true}
          opacity={hovered ? 0.9 : 0.25}
          linewidth={hovered ? 2 : 1}
        />
      </line>

      {/* Interactive 3D Node Mesh */}
      <mesh
        ref={meshRef}
        scale={hovered ? 1.5 : 1.0}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color={hovered ? '#56E7FF' : project.featured ? '#FFB45C' : '#4C8DFF'}
          emissive={hovered ? '#56E7FF' : project.featured ? '#FFB45C' : '#4C8DFF'}
          emissiveIntensity={hovered ? 3.0 : 1.4}
          wireframe={!hovered}
        />
      </mesh>

      {/* Surrounding Node Reticle Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.31, 24]} />
        <meshBasicMaterial
          color={hovered ? '#56E7FF' : '#FFB45C'}
          transparent={true}
          opacity={hovered ? 0.8 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Tactical HUD Tag */}
      <Html distanceFactor={8.5} position={[0, hovered ? 0.55 : 0.42, 0]} center>
        <div 
          className={`r3d-node-label mono ${hovered ? 'hovered' : ''} ${project.featured ? 'featured' : ''}`}
          onClick={handleClick}
          title={`Open dossier for ${project.name}`}
        >
          <div className="r3d-label-header">
            <span className="r3d-code">{project.code}</span>
            <span className="r3d-status-dot" />
          </div>
          <span className="r3d-title">{project.name}</span>
          {hovered && (
            <div className="r3d-sub-hover">
              <span>{project.subtitle}</span>
              <span className="r3d-inspect-btn">INSPECT DOSSIER →</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// Layer 5 & Root Assembly
function ArcReactorScene({ 
  onSelectProject, 
  isPaused, 
  wireframeOnly, 
  showNodes 
}) {
  const rootGroupRef = useRef();

  useFrame((state, delta) => {
    if (isPaused) return;
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Layer 1: Energy Core */}
      <CentralEnergyCore isPaused={isPaused} wireframeOnly={wireframeOnly} />

      {/* Layer 2: Mechanical Machined Rings */}
      <MechanicalRings isPaused={isPaused} wireframeOnly={wireframeOnly} />

      {/* Layer 3: Holographic Geodesic Cage */}
      <HolographicContainment isPaused={isPaused} />

      {/* Layer 4: Orbital Project Nodes */}
      {PROJECTS_DATA.map((proj, idx) => (
        <ProjectOrbitNode
          key={proj.id}
          project={proj}
          index={idx}
          total={PROJECTS_DATA.length}
          isPaused={isPaused}
          showNodes={showNodes}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  );
}

// Camera Helper for Smooth Camera Reset
function CameraManager({ resetTrigger }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (resetTrigger > 0) {
      camera.position.set(0, 2.6, 6.4);
      camera.lookAt(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    }
  }, [resetTrigger, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={3.2}
      maxDistance={9.5}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
    />
  );
}

export default function Reactor3D({ onSelectProject }) {
  const [isPaused, setIsPaused] = useState(false);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [showNodes, setShowNodes] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const handleResetCamera = () => {
    soundManager.playClick();
    setResetTrigger(prev => prev + 1);
  };

  const handleTogglePause = () => {
    soundManager.playClick();
    setIsPaused(prev => !prev);
  };

  const handleToggleWireframe = () => {
    soundManager.playClick();
    setWireframeOnly(prev => !prev);
  };

  const handleToggleNodes = () => {
    soundManager.playClick();
    setShowNodes(prev => !prev);
  };

  const handleToggleFullscreen = () => {
    soundManager.playClick();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSpeakReactorBriefing = () => {
    soundManager.playPowerPulse();
    aurelionVoiceService.speak(
      "Central Arc Reactor core active, sir. Magnetic containment fields are stable at ninety-eight percent flux. Eight verified engineering orbital satellites are synchronized and ready for inspection."
    );
  };

  return (
    <div className={`reactor-3d-canvas-wrap ${isFullscreen ? 'fullscreen-active' : ''}`} ref={containerRef}>
      {/* 3D Canvas Viewport */}
      <Canvas
        camera={{ position: [0, 2.6, 6.4], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <CameraManager resetTrigger={resetTrigger} />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <ArcReactorScene
            onSelectProject={onSelectProject}
            isPaused={isPaused}
            wireframeOnly={wireframeOnly}
            showNodes={showNodes}
          />
        </Float>
      </Canvas>

      {/* Interactive Tactical HUD Controls Bar */}
      <div className="reactor-tactical-controls mono" role="toolbar" aria-label="Arc Reactor 3D Controls">
        <div className="reactor-ctrl-group">
          {/* Pause / Play */}
          <button
            type="button"
            className={`btn-reactor-ctrl ${isPaused ? 'active' : ''}`}
            onClick={handleTogglePause}
            title={isPaused ? "Resume Arc Core Rotation" : "Pause Arc Core Rotation"}
            aria-label="Pause or Resume Reactor Rotation"
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{isPaused ? "RESUME" : "PAUSE"}</span>
          </button>

          {/* Wireframe Mode */}
          <button
            type="button"
            className={`btn-reactor-ctrl ${wireframeOnly ? 'active' : ''}`}
            onClick={handleToggleWireframe}
            title="Toggle Engineering Wireframe Diagnostics"
            aria-label="Toggle Wireframe Mode"
          >
            <Layers size={13} />
            <span>{wireframeOnly ? "SOLID" : "WIREFRAME"}</span>
          </button>

          {/* Toggle Satellite Nodes */}
          <button
            type="button"
            className={`btn-reactor-ctrl ${showNodes ? 'active' : ''}`}
            onClick={handleToggleNodes}
            title="Toggle 8 Project Orbit Nodes"
            aria-label="Toggle Orbit Nodes"
          >
            <Radio size={13} />
            <span>NODES: {showNodes ? "ON" : "OFF"}</span>
          </button>
        </div>

        <div className="reactor-ctrl-group">
          {/* Voice Briefing Button */}
          <button
            type="button"
            className="btn-reactor-ctrl btn-reactor-voice"
            onClick={handleSpeakReactorBriefing}
            title="AURELION Spoken Reactor Briefing"
            aria-label="Speak Reactor Telemetry"
          >
            <Volume2 size={13} />
            <span>CORE BRIEFING</span>
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            className="btn-reactor-ctrl"
            onClick={handleResetCamera}
            title="Reset 3D Perspective and Camera View"
            aria-label="Reset Camera"
          >
            <RotateCcw size={13} />
            <span>RESET CAM</span>
          </button>

          {/* Fullscreen Expand */}
          <button
            type="button"
            className="btn-reactor-ctrl"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Expand Reactor Fullscreen"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Telemetry Corner Indicators */}
      <div className="reactor-corner-telemetry top-left mono">
        <span className="telemetry-label">ARC FLUX</span>
        <span className="telemetry-val text-cyan">98.4% NOMINAL</span>
      </div>
      <div className="reactor-corner-telemetry top-right mono">
        <span className="telemetry-label">PROJECT SATELLITES</span>
        <span className="telemetry-val text-gold">8 SYNCHRONIZED</span>
      </div>
      <div className="reactor-corner-telemetry bottom-left mono">
        <span className="telemetry-label">INTERACTION</span>
        <span className="telemetry-val">DRAG TO ROTATE // SCROLL TO ZOOM</span>
      </div>
    </div>
  );
}
