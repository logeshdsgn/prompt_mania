import React from 'react';
import { X, Settings, Palette, RefreshCw, Check, ShieldAlert, Sparkles } from 'lucide-react';

const ACCENT_THEMES = [
  { id: 'green', name: 'British Racing Green (Default)', color: '#00E887' },
  { id: 'brass', name: 'Liquid Brass Gold', color: '#D4AF37' },
  { id: 'sapphire', name: 'Electric Sapphire', color: '#3B82F6' },
  { id: 'crimson', name: 'Obsidian Crimson', color: '#F43F5E' },
];

/**
 * Settings Modal triggered by the Rotary Control Knob ("B").
 * Allows setting accent theme, resetting storage data, and toggling workspace options.
 */
export default function SettingsModal({
  isOpen,
  onClose,
  onResetData,
  currentTheme = 'green',
  onSelectTheme
}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all custom frameworks, pinned favorites, and profile data to factory defaults?')) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content settings-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <Settings className="modal-header-icon glow" size={20} />
            <h2 id="settings-modal-title">Engineering Settings</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Accent Color Selection */}
          <div className="form-group">
            <label><Palette size={14} style={{ display: 'inline', marginRight: 6 }} /> Luxury Accent Color Theme</label>
            <div className="theme-options-grid">
              {ACCENT_THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  className={`theme-option-btn ${currentTheme === th.id ? 'active' : ''}`}
                  onClick={() => onSelectTheme(th.id)}
                >
                  <span className="theme-dot" style={{ backgroundColor: th.color, boxShadow: `0 0 10px ${th.color}` }} />
                  <span>{th.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="settings-info-card">
            <div className="info-title">
              <Sparkles size={14} />
              <span>PROMPT MANIA ENGINE v2.4</span>
            </div>
            <p>
              High-precision prompt engineering library supporting 8 core frameworks (RACE, CO-STAR, RTF, APE, TAG, RISEN, CREATE, ROLE) with dynamic layout architecture.
            </p>
          </div>

          {/* Reset / Factory Restore */}
          <div className="settings-danger-box">
            <div className="danger-text">
              <ShieldAlert size={16} />
              <div>
                <h4>Factory Data Reset</h4>
                <p>Clears custom frameworks, reset pinned favorites & restore initial defaults.</p>
              </div>
            </div>
            <button type="button" className="btn-danger-outline" onClick={handleReset}>
              <RefreshCw size={14} />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>

        <div className="modal-actions">
          <div />
          <button type="button" className="btn-primary" onClick={onClose}>
            <Check size={16} />
            <span>Apply Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
