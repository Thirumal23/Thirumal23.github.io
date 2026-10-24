import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Animated Metallic Rings & Core
function ReactorScene({ pulseIntensity = 1, activePanelIndex = null }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const ring4Ref = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.7;
      coreRef.current.rotation.z += delta * 0.3;
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05 * pulseIntensity;
      coreRef.current.scale.set(s, s, s);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.6;
      ring2Ref.current.rotation.z += delta * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.4;
      ring3Ref.current.rotation.z -= delta * 0.7;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y += delta * 0.3;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Dynamic Reactor Lights */}
      <pointLight color="#56E7FF" intensity={4 * pulseIntensity} distance={15} decay={2} />
      <pointLight color="#4C8DFF" intensity={2.5} distance={10} decay={2} />
      <pointLight color="#FFB45C" intensity={1.8} distance={8} decay={2} />

      {/* Central Glowing Reactor Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial
          color="#56E7FF"
          emissive="#56E7FF"
          emissiveIntensity={2.5 * pulseIntensity}
          wireframe={true}
        />
      </mesh>

      {/* Solid Inner Core Sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#070A10"
          emissive="#4C8DFF"
          emissiveIntensity={1.2 * pulseIntensity}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Rotating Metallic Holographic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#FFB45C"
          emissive="#FFB45C"
          emissiveIntensity={1.0 * pulseIntensity}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#4C8DFF"
          emissive="#4C8DFF"
          emissiveIntensity={0.8 * pulseIntensity}
          metalness={0.85}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.2, 0.04, 16, 96]} />
        <meshStandardMaterial
          color="#56E7FF"
          emissive="#56E7FF"
          emissiveIntensity={0.7 * pulseIntensity}
          metalness={0.95}
        />
      </mesh>

      <mesh ref={ring4Ref}>
        <torusGeometry args={[2.8, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#63F2B2"
          emissive="#63F2B2"
          emissiveIntensity={0.5 * pulseIntensity}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

// 2D Tactical Vector Fallback Reactor
function VectorFallbackReactor({ pulseIntensity = 1, activePanelIndex }) {
  return (
    <div className="suit-reactor-vector-wrap">
      <svg viewBox="0 0 400 400" className="suit-vector-reactor-svg">
        <defs>
          <radialGradient id="reactorCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#56E7FF" stopOpacity="1" />
            <stop offset="45%" stopColor="#4C8DFF" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#111823" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#070A10" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="reactorGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#56E7FF" />
            <stop offset="50%" stopColor="#FFB45C" />
            <stop offset="100%" stopColor="#4C8DFF" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Traces */}
        <circle cx="200" cy="200" r="185" stroke="rgba(86, 231, 255, 0.12)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
        <circle cx="200" cy="200" r="150" stroke="rgba(86, 231, 255, 0.2)" strokeWidth="1.5" strokeDasharray="8 8" fill="none" className="spin-slow" />
        <circle cx="200" cy="200" r="110" stroke="url(#reactorGoldGrad)" strokeWidth="2" strokeDasharray="16 8 4 8" fill="none" className="spin-clockwise" />
        <circle cx="200" cy="200" r="80" stroke="rgba(76, 141, 255, 0.6)" strokeWidth="2" strokeDasharray="12 12" fill="none" className="spin-counter" />
        <circle cx="200" cy="200" r="55" stroke="var(--reactor-cyan)" strokeWidth="2" fill="none" />

        {/* Core Glow */}
        <circle cx="200" cy="200" r="48" fill="url(#reactorCoreGrad)" className="pulse-core" />
        <polygon 
          points="200,176 208,192 226,200 208,208 200,224 192,208 174,200 192,192" 
          fill="none" 
          stroke="#EAF4FF" 
          strokeWidth="1.5"
        />
        <circle cx="200" cy="200" r="6" fill="#56E7FF" />
      </svg>
    </div>
  );
}

export default function SuitReactorCore({ 
  use3D = true, 
  pulseIntensity = 1, 
  activePanelIndex = null,
  phase = 'navigationReady' 
}) {
  return (
    <div className={`suit-reactor-container ${phase}`}>
      {use3D ? (
        <Canvas camera={{ position: [0, 0, 5.8], fov: 46 }}>
          <ambientLight intensity={0.4} />
          <Float speed={2} rotationIntensity={0.25} floatIntensity={0.3}>
            <ReactorScene pulseIntensity={pulseIntensity} activePanelIndex={activePanelIndex} />
          </Float>
        </Canvas>
      ) : (
        <VectorFallbackReactor pulseIntensity={pulseIntensity} activePanelIndex={activePanelIndex} />
      )}
    </div>
  );
}
