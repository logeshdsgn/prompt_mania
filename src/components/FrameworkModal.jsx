import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Trash2, Check, Grid } from 'lucide-react';

const ICON_OPTIONS = ['UserCog', 'Crosshair', 'Network', 'ClipboardCheck', 'Target', 'Zap', 'Shield', 'BookOpen', 'Palette', 'Trophy', 'Crown', 'MessageSquare'];

const DEFAULT_CARDS = [
  { title: 'ROLE', icon: 'UserCog', description: 'Define persona and domain expertise.', detail: 'e.g. "Act as a Lead Software Architect."' },
  { title: 'ACTION', icon: 'Crosshair', description: 'Specify directive instructions and execution steps.', detail: 'e.g. "Review system architecture for scaling bottlenecks."' },
  { title: 'CONTEXT', icon: 'Network', description: 'Provide background situation and environment.', detail: 'e.g. "System serves 5M daily active users."' },
  { title: 'EXPLANATION', icon: 'ClipboardCheck', description: 'Define output format and constraints.', detail: 'e.g. "Deliver a markdown table with risk metrics."' },
];

/**
 * Modal to Create or Edit a custom Prompt Framework.
 */
export default function FrameworkModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialFramework = null 
}) {
  const isEditing = Boolean(initialFramework);

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [collection, setCollection] = useState('Custom');
  const [material, setMaterial] = useState('quilted-green');
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (initialFramework) {
      setName(initialFramework.name || '');
      setSubtitle(initialFramework.subtitle || '');
      setCollection(initialFramework.collection || 'Custom');
      setMaterial(initialFramework.material || 'quilted-green');
      setCards(initialFramework.cards && initialFramework.cards.length > 0 ? initialFramework.cards : DEFAULT_CARDS);
    } else {
      setName('');
      setSubtitle('');
      setCollection('Custom');
      setMaterial('quilted-green');
      setCards(DEFAULT_CARDS);
    }
    setErrors({});
  }, [initialFramework, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCardChange = (idx, field, val) => {
    const next = [...cards];
    next[idx] = { ...next[idx], [field]: val };
    setCards(next);
  };

  const handleAddCard = () => {
    setCards(prev => [
      ...prev,
      {
        title: `MODULE 0${prev.length + 1}`,
        icon: 'Sparkles',
        description: '',
        detail: '',
        isCore: prev.length < 4
      }
    ]);
  };

  const handleRemoveCard = (idx) => {
    if (cards.length <= 1) return;
    setCards(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Framework name is required';
    if (!subtitle.trim()) errs.subtitle = 'Subtitle acronym definition is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newFramework = {
      id: isEditing ? initialFramework.id : `custom-${Date.now()}`,
      name: name.trim().toUpperCase(),
      subtitle: subtitle.trim(),
      collection: collection.trim() || 'Custom',
      material,
      isCustom: true,
      cards: cards.map((c, i) => ({
        title: c.title.trim() || `MODULE 0${i + 1}`,
        icon: c.icon || 'Sparkles',
        description: c.description.trim() || 'Custom prompt module description.',
        detail: c.detail.trim() || 'e.g. "Define specific requirements here."',
        isCore: c.isCore !== false,
      })),
    };

    onSave(newFramework);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content framework-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="framework-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <Sparkles className="modal-header-icon glow" size={20} />
            <h2 id="framework-modal-title">{isEditing ? `Edit Framework: ${initialFramework.name}` : 'Create Custom Framework'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="fw-name">Framework Name / Acronym *</label>
              <input
                id="fw-name"
                type="text"
                placeholder="e.g. PACTOR"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'has-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fw-collection">Collection / Category</label>
              <input
                id="fw-collection"
                type="text"
                placeholder="e.g. Custom, Engineering, Marketing"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fw-subtitle">Acronym Breakdown / Subtitle *</label>
            <input
              id="fw-subtitle"
              type="text"
              placeholder="e.g. Persona · Action · Context · Task · Output · Review"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={errors.subtitle ? 'has-error' : ''}
            />
            {errors.subtitle && <span className="error-text">{errors.subtitle}</span>}
          </div>

          <div className="cards-section-header">
            <div className="cards-section-header-left">
              <Grid size={16} />
              <h3>Modules Configuration</h3>
            </div>
            <button
              type="button"
              className="btn-add-module"
              onClick={handleAddCard}
              title="Add extra module or recommended addition"
            >
              <Plus size={14} />
              <span>Add Module</span>
            </button>
          </div>

          <div className="modal-cards-list">
            {cards.map((c, idx) => (
              <div key={idx} className="modal-card-item">
                <div className="card-item-top-row">
                  <span className="card-item-number">MODULE 0{idx + 1}</span>
                  {cards.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-card"
                      onClick={() => handleRemoveCard(idx)}
                      title="Remove module"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Module Title</label>
                    <input
                      type="text"
                      placeholder="e.g. ROLE"
                      value={c.title}
                      onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Icon</label>
                    <select
                      value={c.icon}
                      onChange={(e) => handleCardChange(idx, 'icon', e.target.value)}
                    >
                      {ICON_OPTIONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Instruction / Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe what the AI should do in this module..."
                    value={c.description}
                    onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Example Pattern</label>
                  <input
                    type="text"
                    placeholder='e.g. "Act as a Senior Architect."'
                    value={c.detail}
                    onChange={(e) => handleCardChange(idx, 'detail', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} />
              <span>{isEditing ? 'Save Framework Changes' : 'Create Framework'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
