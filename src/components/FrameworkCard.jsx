import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

const materialClassMap = {
  'quilted-green': 'material-quilted-green',
  'dark-walnut': 'material-dark-walnut',
  'brushed-chrome': 'material-brushed-chrome',
  'obsidian-stone': 'material-obsidian-stone',
  'rosewood': 'material-rosewood',
  'carbon-fiber': 'material-carbon-fiber',
  'marble': 'material-marble',
  'ivory-leather': 'material-ivory-leather',
};

/**
 * Sidebar framework card with pin/favorite toggle, edit/delete for custom frameworks,
 * and clean non-clipping text typography hierarchy.
 */
export default function FrameworkCard({ 
  framework, 
  isSelected, 
  onClick, 
  isPinned, 
  onTogglePin,
}) {
  const materialClass = materialClassMap[framework.material] || '';

  const handlePinClick = (e) => {
    e.stopPropagation();
    onTogglePin(framework.id);
  };

  return (
    <div
      className={`framework-card ${materialClass} ${isSelected ? 'selected' : ''} ${isPinned ? 'pinned' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-pressed={isSelected}
      aria-label={`Select ${framework.name} framework`}
    >
      <div className="framework-card-glow-bar" />
      
      <div className="framework-card-header">
        <div className="framework-card-title-group">
          <span className="framework-card-name">{framework.name}</span>
          {framework.isCustom && (
            <span className="custom-badge">CUSTOM</span>
          )}
        </div>

        <div className="framework-card-top-actions">
          <button 
            className={`pin-btn ${isPinned ? 'active' : ''}`} 
            onClick={handlePinClick}
            title={isPinned ? 'Unpin favorite' : 'Pin to favorites'}
            aria-label={isPinned ? 'Unpin favorite' : 'Pin to favorites'}
          >
            <Star size={14} fill={isPinned ? 'var(--brass-primary)' : 'none'} />
          </button>
        </div>
      </div>
      
      <div className="framework-card-subtitle" title={framework.subtitle}>
        {framework.subtitle}
      </div>
      
      <div className="framework-card-footer">
        <span className="card-card-count">{framework.cards?.length || 3} CORE MODULES</span>
        <div className="footer-right">
          <span className="card-collection-tag">{framework.collection || 'Core'}</span>
          <ChevronRight size={12} className="card-arrow" />
        </div>
      </div>
    </div>
  );
}


