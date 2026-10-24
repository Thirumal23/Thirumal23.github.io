import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  FolderGit2, 
  Layers, 
  Cpu, 
  Award, 
  Radio, 
  Terminal, 
  PhoneCall, 
  Sun, 
  Moon, 
  Bot, 
  X,
  CornerDownLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import { PROJECTS_DATA, PROFILE_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';
import './CommandPalette.css';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenProject, 
  onOpenHUD,
  onToggleTheme, 
  currentTheme 
}) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const baseItems = [
    // Suit HUD
    { 
      id: 'sec-hud', 
      label: 'Deploy Suit HUD // Holographic Navigation Hub & Suit Diagnostics', 
      category: 'HUD', 
      icon: Compass, 
      action: () => { 
        onClose(); 
        if (onOpenHUD) onOpenHUD(); 
      } 
    },
    // Sections
    { id: 'sec-home', label: 'Command Core // Central Reactor', category: 'Navigation', icon: Sparkles, action: () => onNavigate('command-center') },
    { id: 'sec-proj', label: 'Projects Archive (8 Projects including MEDINV)', category: 'Navigation', icon: FolderGit2, action: () => onNavigate('projects') },
    { id: 'sec-dcdc', label: 'DCDC Leadership // Project Head Console', category: 'Navigation', icon: Award, action: () => onNavigate('dcdc') },
    { id: 'sec-skills', label: 'Skills & EDA KiCad Matrix', category: 'Navigation', icon: Layers, action: () => onNavigate('skills') },
    { id: 'sec-pcb', label: '3D PCB Inspection Laboratory (Universal 8-Project)', category: 'Navigation', icon: Cpu, action: () => onNavigate('pcb-lab') },
    { id: 'sec-exp', label: 'Experience & Academic Timeline (CGPA 9.54)', category: 'Navigation', icon: Radio, action: () => onNavigate('experience') },
    { id: 'sec-term', label: 'Interactive Engineering Terminal CLI', category: 'Navigation', icon: Terminal, action: () => onNavigate('terminal') },
    { id: 'sec-contact', label: 'Contact Array & Dispatch Channels', category: 'Navigation', icon: PhoneCall, action: () => onNavigate('contact') },

    // Theme Actions
    { id: 'act-theme', label: `Switch Theme to ${currentTheme === 'dark' ? 'Light' : 'Dark'} HUD Mode`, category: 'Settings', icon: currentTheme === 'dark' ? Sun : Moon, action: () => onToggleTheme() },
    { id: 'act-github', label: 'Open GitHub Profile (Thirumal23)', category: 'External', icon: FolderGit2, action: () => window.open(PROFILE_DATA.contact.github, '_blank', 'noopener,noreferrer') },
    { id: 'act-linkedin', label: 'Open LinkedIn Profile', category: 'External', icon: PhoneCall, action: () => window.open(PROFILE_DATA.contact.linkedin, '_blank', 'noopener,noreferrer') },

    // Projects Direct
    ...PROJECTS_DATA.map(p => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.name} — ${p.subtitle}`,
      category: 'Projects',
      icon: Cpu,
      action: () => onOpenProject(p.id)
    }))
  ];

  const filteredItems = baseItems.filter(item => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Global Keydown Handler for arrows, enter, escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        soundManager.playClick();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundManager.playTerminal();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundManager.playTerminal();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          soundManager.playClick();
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="palette-container tactical-panel tactical-panel-corner" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="palette-search-bar">
          <Search size={18} className="text-cyan" />
          <input
            ref={inputRef}
            type="text"
            className="palette-input mono"
            placeholder="Type directive or jump to module (e.g. medinv, pcb, dcdc)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Command search"
          />
          <button 
            type="button" 
            className="palette-esc-badge mono" 
            onClick={onClose}
            title="Press Escape to Close"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="palette-list" ref={listRef}>
          {filteredItems.length === 0 ? (
            <div className="palette-empty mono">
              <span>No matching command or module found for "{search}".</span>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`palette-item mono ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    soundManager.playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="palette-item-left">
                    <Icon size={16} className={isSelected ? 'text-cyan' : 'text-muted'} />
                    <span className="palette-item-label">{item.label}</span>
                  </div>
                  <div className="palette-item-right">
                    <span className="palette-category-tag">{item.category}</span>
                    {isSelected && <CornerDownLeft size={13} className="text-cyan" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Palette Footer Hints */}
        <div className="palette-footer mono">
          <div className="hint-item">
            <span className="key-cap">↑</span>
            <span className="key-cap">↓</span>
            <span>Navigate</span>
          </div>
          <div className="hint-item">
            <span className="key-cap">↵</span>
            <span>Execute</span>
          </div>
          <div className="hint-item">
            <span className="key-cap">Esc</span>
            <span>Dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
}
