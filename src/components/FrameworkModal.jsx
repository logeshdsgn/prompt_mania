import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, Grid, PlusCircle } from 'lucide-react';
import IconPicker from './IconPicker';

const DEFAULT_CARDS = [
  { title: 'ROLE', icon: 'UserCog', description: 'Define persona and domain expertise.', detail: 'e.g. "Act as a Lead Software Architect."' },
  { title: 'ACTION', icon: 'Crosshair', description: 'Specify directive instructions and execution steps.', detail: 'e.g. "Review system architecture for scaling bottlenecks."' },
  { title: 'CONTEXT', icon: 'Network', description: 'Provide background situation and environment.', detail: 'e.g. "System serves 5M daily active users."' },
  { title: 'EXPLANATION', icon: 'ClipboardCheck', description: 'Define output format and constraints.', detail: 'e.g. "Deliver a markdown table with risk metrics."' },
];

/**
 * Modal to Create or Edit a custom Prompt Framework.
 * Supports visual icon picking and optional Recommended Additions.
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
  const [additions, setAdditions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (initialFramework) {
      setName(initialFramework.name || '');
      setSubtitle(initialFramework.subtitle || '');
      setCollection(initialFramework.collection || 'Custom');
      setMaterial(initialFramework.material || 'quilted-green');
      setCards(
        initialFramework.cards && initialFramework.cards.length > 0 
          ? initialFramework.cards 
          : DEFAULT_CARDS
      );
      setAdditions(
        initialFramework.recommendedAdditions && initialFramework.recommendedAdditions.length > 0
          ? initialFramework.recommendedAdditions
          : []
      );
    } else {
      setName('');
      setSubtitle('');
      setCollection('Custom');
      setMaterial('quilted-green');
      setCards(DEFAULT_CARDS);
      setAdditions([]);
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

  // Core Cards Handlers
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
        icon: 'Layers',
        description: '',
        detail: '',
        isCore: true
      }
    ]);
  };

  const handleRemoveCard = (idx) => {
    if (cards.length <= 1) return;
    setCards(prev => prev.filter((_, i) => i !== idx));
  };

  // Recommended Additions Handlers
  const handleAddAddition = () => {
    setAdditions(prev => [
      ...prev,
      {
        title: `ADDITION 0${prev.length + 1}`,
        icon: 'Plus',
        description: '',
        detail: '',
        isCore: false
      }
    ]);
  };

  const handleRemoveAddition = (idx) => {
    setAdditions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAdditionChange = (idx, field, val) => {
    const next = [...additions];
    next[idx] = { ...next[idx], [field]: val };
    setAdditions(next);
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
        icon: c.icon || 'Layers',
        description: c.description.trim() || 'Custom prompt module description.',
        detail: c.detail.trim() || 'e.g. "Define specific requirements here."',
        isCore: true,
      })),
      recommendedAdditions: additions.map((a, i) => ({
        title: a.title.trim() || `ADDITION 0${i + 1}`,
        icon: a.icon || 'Plus',
        description: a.description.trim() || 'Supplementary directive.',
        detail: a.detail.trim() || 'e.g. "Specify supplementary requirements or exclusions."',
        isCore: false,
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
          <h2 id="framework-modal-title">{isEditing ? `Edit Framework: ${initialFramework.name}` : 'Create Custom Framework'}</h2>
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

          {/* Core Modules Configuration */}
          <div className="cards-section-header">
            <div className="cards-section-header-left">
              <Grid size={16} />
              <h3>Core Modules Configuration</h3>
            </div>
            <button
              type="button"
              className="btn-add-module"
              onClick={handleAddCard}
              title="Add extra core module"
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
                    <IconPicker
                      value={c.icon}
                      onChange={(val) => handleCardChange(idx, 'icon', val)}
                    />
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

          {/* Recommended Additions Configuration */}
          <div className="cards-section-header additions-header">
            <div className="cards-section-header-left">
              <PlusCircle size={16} className="section-icon-brass" />
              <h3>Recommended Additions (Optional)</h3>
              {additions.length > 0 && (
                <span className="section-badge-hint">{additions.length}</span>
              )}
            </div>
            <button
              type="button"
              className="btn-add-addition"
              onClick={handleAddAddition}
              title="Add supplementary addition module"
            >
              <Plus size={14} />
              <span>Add Addition</span>
            </button>
          </div>

          {additions.length === 0 ? (
            <div className="empty-additions-prompt">
              <p>
                No recommended additions configured. Add optional supplementary modules 
                (such as Exclusions, Guardrails, Formatting, or Edge-case rules) that complement this framework.
              </p>
              <button 
                type="button" 
                className="btn-add-addition-outline" 
                onClick={handleAddAddition}
              >
                <Plus size={13} />
                <span>+ Add First Recommended Addition</span>
              </button>
            </div>
          ) : (
            <div className="modal-cards-list additions-list">
              {additions.map((a, idx) => (
                <div key={idx} className="modal-card-item addition-item">
                  <div className="card-item-top-row">
                    <span className="card-item-number addition-number">
                      ADDITION 0{idx + 1}
                    </span>
                    <button
                      type="button"
                      className="btn-remove-card"
                      onClick={() => handleRemoveAddition(idx)}
                      title="Remove addition"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Addition Title</label>
                      <input
                        type="text"
                        placeholder="e.g. EXCLUSIONS & BOUNDARIES"
                        value={a.title}
                        onChange={(e) => handleAdditionChange(idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Icon</label>
                      <IconPicker
                        value={a.icon}
                        onChange={(val) => handleAdditionChange(idx, 'icon', val)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Instruction / Description</label>
                    <textarea
                      rows={2}
                      placeholder="Specify optional supplementary rule or constraint..."
                      value={a.description}
                      onChange={(e) => handleAdditionChange(idx, 'description', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Example Pattern</label>
                    <input
                      type="text"
                      placeholder='e.g. "Exclude unverified claims or marketing buzzwords."'
                      value={a.detail}
                      onChange={(e) => handleAdditionChange(idx, 'detail', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

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
