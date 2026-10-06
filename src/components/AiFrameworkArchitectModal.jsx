import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Wand2, ArrowRight, Check, RefreshCw, Cpu, GitBranch, 
  BookOpen, Edit3, Download, Layers, Plus
} from 'lucide-react';
import { generateFrameworkForDomain } from '../utils/aiFrameworkGenerator';

const QUICK_SUGGESTIONS = [
  'Medical Diagnosis',
  'AI Coding',
  'UX Research',
  'Logo Design',
  'Resume Review',
  'YouTube Script',
  'Marketing Campaign',
  'Product Management',
];

/**
 * AI Framework Architect Generator Modal.
 * Transforms framework creation from manual form entry into an AI-guided educational experience.
 */
export default function AiFrameworkArchitectModal({
  isOpen,
  onClose,
  onSaveFramework
}) {
  // Multi-step state: 1 = Input, 2 = Generating, 3 = Selection & Inspection
  const [step, setStep] = useState(1);
  const [promptInput, setPromptInput] = useState('');
  const [generatedOptions, setGeneratedOptions] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [activeFramework, setActiveFramework] = useState(null);

  // Loading animation state
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setPromptInput('');
      setGeneratedOptions([]);
      setSelectedOptionIndex(0);
      setIsEditing(false);
      setActiveFramework(null);
      setLoadingTextIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const loadingMessages = [
    'Analyzing domain semantics & cognitive workflows...',
    'Synthesizing logical acronym candidates...',
    'Constructing module contracts...',
    'Validating educational reasoning flow...',
  ];

  const handleGenerate = (queryText) => {
    const text = queryText || promptInput;
    if (!text.trim()) return;

    setPromptInput(text);
    setStep(2);

    // Simulate AI generation process with progress steps
    let textStep = 0;
    const interval = setInterval(() => {
      textStep++;
      if (textStep < loadingMessages.length) {
        setLoadingTextIndex(textStep);
      } else {
        clearInterval(interval);
        const options = generateFrameworkForDomain(text);
        setGeneratedOptions(options);
        setSelectedOptionIndex(0);
        setActiveFramework(JSON.parse(JSON.stringify(options[0])));
        setStep(3);
      }
    }, 450);
  };

  const handleSelectOption = (idx) => {
    setSelectedOptionIndex(idx);
    setActiveFramework(JSON.parse(JSON.stringify(generatedOptions[idx])));
    setIsEditing(false);
  };

  const handleSaveToLibrary = () => {
    if (!activeFramework) return;
    const finalFramework = {
      ...activeFramework,
      id: activeFramework.id || `custom-${Date.now()}`,
      isCustom: true,
    };
    onSaveFramework(finalFramework);
    onClose();
  };

  const handleExportJson = () => {
    if (!activeFramework) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeFramework, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeFramework.name.toLowerCase()}_framework.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content architect-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="architect-modal-title"
      >
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group architect-title-group">
            <div className="architect-badge">
              <Sparkles size={13} className="glow-icon" />
              <span>AI ARCHITECT</span>
            </div>
            <h2 id="architect-modal-title">{step === 1 ? 'What do you want to architect?' : activeFramework?.name ? `${activeFramework.name} Spec` : 'Architect Generator'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close architect modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body architect-body">
          
          {/* STEP 1: Single Question Prompt Input + Quick Suggestion Pills */}
          {step === 1 && (
            <div className="architect-step-1">
              <div className="architect-hero-box">
                <p className="architect-tagline">
                  Describe any task or domain. The AI Architect will synthesize an acronym framework.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="architect-input-form">
                  <div className="architect-input-wrapper">
                    <Wand2 size={18} className="input-icon" />
                    <input
                      type="text"
                      className="architect-main-input"
                      placeholder="e.g., Medical Diagnosis, AI Coding, UX Research, Logo Design..."
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="btn-architect-generate" disabled={!promptInput.trim()}>
                      <Sparkles size={15} />
                      <span>Generate Architecture</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>

                {/* Quick Suggestion Chips */}
                <div className="suggestion-chips-section">
                  <span className="chips-label">PROMPT IDEAS:</span>
                  <div className="chips-container">
                    {QUICK_SUGGESTIONS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="suggestion-chip"
                        onClick={() => handleGenerate(chip)}
                      >
                        <Plus size={11} />
                        <span>{chip}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI Loading Animation State */}
          {step === 2 && (
            <div className="architect-step-loading">
              <div className="ai-loader-container">
                <div className="ai-loader-ring">
                  <Cpu size={32} className="ai-loader-cpu glow" />
                </div>
                <div className="loading-status-box">
                  <span className="loading-step-badge">AI REASONING ENGINES ACTIVE</span>
                  <h3 className="loading-status-text">{loadingMessages[loadingTextIndex]}</h3>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Multi-Option Selection, Workflow Flow & Reasoning Inspection */}
          {step === 3 && activeFramework && (
            <div className="architect-step-3">
              
              {/* Option Selector Cards (Step 7: Multiple Alternatives) */}
              <div className="architect-options-bar">
                <span className="options-label">GENERATED ALTERNATIVES:</span>
                <div className="options-cards-row">
                  {generatedOptions.map((opt, idx) => (
                    <div
                      key={opt.id}
                      className={`architect-option-card ${selectedOptionIndex === idx ? 'active' : ''}`}
                      onClick={() => handleSelectOption(idx)}
                    >
                      <div className="opt-card-header">
                        <span className="opt-acronym">{opt.name}</span>
                        {selectedOptionIndex === idx && <Check size={14} className="opt-check" />}
                      </div>
                      <span className="opt-subtitle">{opt.cards.length} Modules · {opt.collection}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educational Reasoning Box (Step 6: Explain Why Order Selected) */}
              {activeFramework.reasoning && (
                <div className="architect-reasoning-card">
                  <div className="reasoning-header">
                    <BookOpen size={15} />
                    <h4>WHY THIS ARCHITECTURE?</h4>
                  </div>
                  <p className="reasoning-text">{activeFramework.reasoning}</p>
                </div>
              )}

              {/* Visual Execution Workflow Diagram (Step 5) */}
              {activeFramework.flow && activeFramework.flow.length > 0 && (
                <div className="architect-flow-diagram">
                  <span className="flow-title"><GitBranch size={13} /> VISUAL WORKFLOW PIPELINE</span>
                  <div className="flow-nodes-row">
                    {activeFramework.flow.map((node, i) => (
                      <React.Fragment key={i}>
                        <div className="flow-node">
                          <span className="node-num">0{i + 1}</span>
                          <span className="node-text">{node}</span>
                        </div>
                        {i < activeFramework.flow.length - 1 && (
                          <div className="flow-arrow">→</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Framework Modules Preview & Editor (Step 3 & 4) */}
              <div className="architect-modules-section">
                <div className="section-header-row">
                  <h3 className="section-title"><Layers size={16} /> MODULE CONTRACTS</h3>
                  <button 
                    type="button" 
                    className="btn-text-action"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 size={14} />
                    <span>{isEditing ? 'Done Customizing' : 'Customize Modules'}</span>
                  </button>
                </div>

                {/* Editor or Preview Cards */}
                {isEditing ? (
                  <div className="architect-edit-form">
                    <div className="form-group">
                      <label>Framework Name / Acronym</label>
                      <input
                        type="text"
                        className="form-input"
                        value={activeFramework.name}
                        onChange={(e) => setActiveFramework({ ...activeFramework, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subtitle Breakdown</label>
                      <input
                        type="text"
                        className="form-input"
                        value={activeFramework.subtitle}
                        onChange={(e) => setActiveFramework({ ...activeFramework, subtitle: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="architect-bento-preview-grid">
                    {activeFramework.cards.map((c, idx) => (
                      <div key={idx} className="preview-bento-card">
                        <div className="preview-card-header">
                          <span className="preview-card-title">{c.title}</span>
                          <span className="preview-badge">CORE</span>
                        </div>
                        <p className="preview-card-desc">{c.description}</p>
                        <code className="preview-card-code">{c.detail}</code>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions (Step 8: One-Click Actions) */}
        <div className="modal-actions architect-footer">
          {step > 1 && (
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              <RefreshCw size={14} />
              <span>Start Over</span>
            </button>
          )}

          <div style={{ flex: 1 }} />

          {step === 3 && (
            <>
              <button type="button" className="btn-secondary" onClick={handleExportJson}>
                <Download size={14} />
                <span>Export JSON</span>
              </button>

              <button type="button" className="btn-primary glow-btn" onClick={handleSaveToLibrary}>
                <Check size={16} />
                <span>Save to Library</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
