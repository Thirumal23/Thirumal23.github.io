import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import { Cpu, Zap, Radio, Activity } from 'lucide-react';

export default function ReactorFallback({ onSelectProject, onSelectSection }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Position 8 project nodes symmetrically along a circle
  const radius = 140;
  const centerX = 200;
  const centerY = 200;

  const handleNodeClick = (project) => {
    soundManager.playClick();
    onSelectProject(project.id);
  };

  return (
    <div className="reactor-fallback-wrap">
      <svg viewBox="0 0 400 400" className="reactor-fallback-svg">
        <defs>
          <radialGradient id="fbCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#56E7FF" stop-opacity="1" />
            <stop offset="40%" stop-color="#4C8DFF" stop-opacity="0.8" />
            <stop offset="85%" stop-color="#111823" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#070A10" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="fbRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#56E7FF" />
            <stop offset="50%" stop-color="#FFB45C" />
            <stop offset="100%" stop-color="#4C8DFF" />
          </linearGradient>
        </defs>

        {/* Outer Stator Rings */}
        <circle cx={centerX} cy={centerY} r="185" stroke="rgba(86, 231, 255, 0.1)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
        <circle cx={centerX} cy={centerY} r="165" stroke="rgba(86, 231, 255, 0.15)" strokeWidth="1.5" fill="none" />
        
        {/* Orbital Project Node Track */}
        <circle cx={centerX} cy={centerY} r={radius} stroke="rgba(86, 231, 255, 0.25)" strokeWidth="1.5" strokeDasharray="6 8" fill="none" className="spin-slow" />

        {/* Concentric Mechanical Rings */}
        <circle cx={centerX} cy={centerY} r="95" stroke="url(#fbRingGrad)" strokeWidth="2" strokeDasharray="20 10 5 10" fill="none" className="spin-clockwise" />
        <circle cx={centerX} cy={centerY} r="70" stroke="rgba(76, 141, 255, 0.5)" strokeWidth="2" strokeDasharray="14 14" fill="none" className="spin-counter" />
        <circle cx={centerX} cy={centerY} r="50" stroke="var(--reactor-cyan)" strokeWidth="1.5" fill="none" />

        {/* Core Glow & Emblem */}
        <circle cx={centerX} cy={centerY} r="45" fill="url(#fbCoreGlow)" className="pulse-core" />
        <polygon 
          points={`${centerX},${centerY - 22} ${centerX + 7},${centerY - 7} ${centerX + 22},${centerY} ${centerX + 7},${centerY + 7} ${centerX},${centerY + 22} ${centerX - 7},${centerY + 7} ${centerX - 22},${centerY} ${centerX - 7},${centerY - 7}`}
          fill="none" 
          stroke="#EAF4FF" 
          strokeWidth="1.5"
        />
        <circle cx={centerX} cy={centerY} r="5" fill="#56E7FF" />

        {/* 8 Orbital Project Nodes */}
        {PROJECTS_DATA.map((proj, idx) => {
          const angle = (idx / PROJECTS_DATA.length) * 2 * Math.PI - Math.PI / 2;
          const nx = centerX + radius * Math.cos(angle);
          const ny = centerY + radius * Math.sin(angle);
          const isHovered = hoveredNode === proj.id;

          return (
            <g 
              key={proj.id}
              className="reactor-node-group"
              onClick={() => handleNodeClick(proj)}
              onMouseEnter={() => { soundManager.playTerminal(); setHoveredNode(proj.id); }}
              onMouseLeave={() => setHoveredNode(null)}
              cursor="pointer"
              tabIndex={0}
              role="button"
              aria-label={`Open Project: ${proj.name}`}
            >
              {/* Connector line to core */}
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={nx} 
                y2={ny} 
                stroke={isHovered ? "var(--reactor-cyan)" : "rgba(86, 231, 255, 0.12)"} 
                strokeWidth={isHovered ? "1.5" : "0.75"} 
                strokeDasharray={isHovered ? "none" : "2 4"}
              />

              {/* Node Outer Ring */}
              <circle 
                cx={nx} 
                cy={ny} 
                r={isHovered ? 14 : 10} 
                fill={isHovered ? "var(--bg-titanium)" : "var(--bg-obsidian)"} 
                stroke={isHovered ? "var(--reactor-cyan)" : proj.featured ? "var(--gold-accent)" : "var(--electric-blue)"} 
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="node-circle"
              />

              {/* Inner Node Pip */}
              <circle 
                cx={nx} 
                cy={ny} 
                r={isHovered ? 5 : 3.5} 
                fill={proj.featured ? "var(--gold-accent)" : "var(--reactor-cyan)"} 
              />

              {/* Text Label */}
              <text 
                x={nx} 
                y={ny > centerY ? ny + 20 : ny - 14} 
                textAnchor="middle" 
                fill={isHovered ? "var(--reactor-cyan)" : "var(--text-muted)"}
                fontSize={isHovered ? "9" : "8"}
                fontFamily="var(--font-mono)"
                fontWeight={isHovered ? "bold" : "normal"}
              >
                {proj.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Node Telemetry Card */}
      <div className="reactor-telemetry-badge mono">
        <Activity size={14} className="text-cyan pulse-icon" />
        <span>
          {hoveredNode 
            ? `TARGET: ${PROJECTS_DATA.find(p => p.id === hoveredNode)?.name.toUpperCase()} // CLICK TO DEPLOY`
            : "REACTOR SYSTEM OPERATIONAL // INTERACTIVE NODES READY"}
        </span>
      </div>
    </div>
  );
}
