import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

const ICON_OPTIONS = [
  'UserCog',
  'Crosshair',
  'Network',
  'ClipboardCheck',
  'Target',
  'Zap',
  'Shield',
  'BookOpen',
  'Palette',
  'Trophy',
  'Crown',
  'MessageSquare',
  'Layers',
  'Boxes',
  'Code2',
  'Cpu',
  'Database',
  'FileText',
  'FileOutput',
  'Filter',
  'Flag',
  'GitBranch',
  'ListChecks',
  'Search',
  'SlidersHorizontal',
  'Compass',
  'Activity',
  'Plus',
  'PlusCircle',
  'Ban',
];

/**
 * Visual Icon Picker component that renders real icon glyph previews
 * instead of uninformative raw text strings.
 */
export default function IconPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredIcons = ICON_OPTIONS.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase().trim())
  );

  const selectedIcon = value || 'Layers';

  return (
    <div className="icon-picker-container" ref={containerRef}>
      <button
        type="button"
        className={`icon-picker-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="icon-preview-chip">
          <DynamicIcon name={selectedIcon} size={15} />
        </span>
        <span className="icon-picker-current-name">{selectedIcon}</span>
        <ChevronDown size={14} className={`icon-picker-caret ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="icon-picker-popover" role="listbox">
          <div className="icon-picker-search-bar">
            <Search size={13} className="icon-search-icon" />
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="icon-picker-search-input"
            />
          </div>

          <div className="icon-picker-grid">
            {filteredIcons.length === 0 ? (
              <div className="icon-picker-empty">No matching icons</div>
            ) : (
              filteredIcons.map((iconName) => {
                const isSelected = iconName === selectedIcon;
                return (
                  <button
                    key={iconName}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`icon-picker-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    title={iconName}
                  >
                    <span className="icon-option-glyph">
                      <DynamicIcon name={iconName} size={16} />
                    </span>
                    <span className="icon-option-name">{iconName}</span>
                    {isSelected && <Check size={12} className="icon-selected-check" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
