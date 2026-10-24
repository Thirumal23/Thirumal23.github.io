import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

export default function HolographicNavigationPanel({
  destination,
  index,
  isHovered,
  isSelected,
  isAnySelected,
  onHover,
  onLeave,
  onSelect
}) {
  const Icon = destination.icon;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(destination);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(destination);
    }
  };

  return (
    <div
      className={`holo-nav-panel tactical-panel-corner ${destination.positionClass} ${
        isHovered ? 'hovered' : ''
      } ${isSelected ? 'selected-activating' : ''} ${
        isAnySelected && !isSelected ? 'fading-out' : ''
      }`}
      onMouseEnter={() => onHover(destination, index)}
      onMouseLeave={onLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Navigate to ${destination.title}: ${destination.description}`}
      style={{
        '--accent-color': destination.accentColor || 'var(--reactor-cyan)'
      }}
    >
      {/* Holographic Scanning Line Sweep */}
      <div className="holo-scan-sweep" />

      {/* Top Header Tag */}
      <div className="holo-panel-top mono">
        <span className="holo-nav-code">{destination.code}</span>
        <div className="holo-indicator-wrap">
          <span className="holo-sys-label">{destination.systemTag}</span>
          <span className={`status-dot ${isHovered || isSelected ? 'online' : 'online'}`} />
        </div>
      </div>

      {/* Main Body */}
      <div className="holo-panel-body">
        <div className="holo-icon-box">
          <Icon size={20} className="holo-icon" />
        </div>
        <div className="holo-content">
          <h3 className="holo-title">{destination.title}</h3>
          <p className="holo-desc">{destination.description}</p>
        </div>
      </div>

      {/* Footer Status & Prompt */}
      <div className="holo-panel-footer mono">
        <span className="holo-footer-action">
          {isSelected ? 'ENGAGING SYSTEM...' : 'CLICK OR PRESS ENTER'}
        </span>
        <ChevronRight size={14} className="holo-arrow" />
      </div>
    </div>
  );
}
