import React, { useState, useEffect } from 'react';
import { 
  X, User, Code2, Trash2, Check, Edit3, 
  Briefcase, Cpu, Layers, Star, Building2, AtSign, FileCode, Dices
} from 'lucide-react';
import RobotAvatar from './RobotAvatar';

/**
 * Clean, Logical Developer Profile Modal.
 * Focuses on genuine user identity, preferred LLM stack settings,
 * and accurate library statistics without artificial gamification or redundant badges.
 */
export default function ProfileModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  onSaveProfile,
  pinnedCount = 0,
  customCount = 0,
  totalCount = 0
}) {
  const [name, setName] = useState(userProfile?.name || 'Loki');
  const [handle, setHandle] = useState(userProfile?.handle || '@loki');
  const [title, setTitle] = useState(userProfile?.title || 'Prompt Engineer & AI Architect');
  const [organization, setOrganization] = useState(userProfile?.organization || 'AI Platform Engineering');
  const [targetModel, setTargetModel] = useState(userProfile?.targetModel || 'Claude 3.5 Sonnet');
  const [defaultFormat, setDefaultFormat] = useState(userProfile?.defaultFormat || 'Structured Markdown');
  const [bio, setBio] = useState(userProfile?.bio || 'Building modular prompt architectures and systematic LLM workflows.');
  const [avatarSeed, setAvatarSeed] = useState(userProfile?.avatarSeed || userProfile?.name || 'Loki');
  
  const [isEditing, setIsEditing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(userProfile?.name || 'Loki');
      setHandle(userProfile?.handle || '@loki');
      setTitle(userProfile?.title || 'Prompt Engineer & AI Architect');
      setOrganization(userProfile?.organization || 'AI Platform Engineering');
      setTargetModel(userProfile?.targetModel || 'Claude 3.5 Sonnet');
      setDefaultFormat(userProfile?.defaultFormat || 'Structured Markdown');
      setBio(userProfile?.bio || 'Building modular prompt architectures and systematic LLM workflows.');
      setAvatarSeed(userProfile?.avatarSeed || userProfile?.name || 'Loki');
      setIsEditing(false);
      setSavedToast(false);
    }
  }, [isOpen, userProfile]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRollAvatar = (e) => {
    if (e) e.stopPropagation();
    const newSeed = 'bot-' + Math.random().toString(36).substring(2, 9);
    setAvatarSeed(newSeed);
    // If not in editing form, immediately persist so it updates header & profile instantly
    if (!isEditing) {
      onSaveProfile({
        ...(userProfile || {}),
        name: name.trim() || 'Loki',
        avatarSeed: newSeed
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 1800);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSaveProfile({
      name: name.trim() || 'Loki',
      handle: handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim() || 'loki'}`,
      title: title.trim() || 'Prompt Engineer',
      organization: organization.trim() || 'AI Engineering',
      targetModel: targetModel || 'Claude 3.5 Sonnet',
      defaultFormat: defaultFormat || 'Structured Markdown',
      bio: bio.trim() || 'Building modular prompt architectures and systematic LLM workflows.',
      avatarSeed: avatarSeed || 'Loki'
    });
    setSavedToast(true);
    setIsEditing(false);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const handleClearProfile = () => {
    if (window.confirm('Reset profile details back to default profile?')) {
      const defaults = {
        name: 'Loki',
        handle: '@loki',
        title: 'Prompt Engineer & AI Architect',
        organization: 'AI Platform Engineering',
        targetModel: 'Claude 3.5 Sonnet',
        defaultFormat: 'Structured Markdown',
        bio: 'Building modular prompt architectures and systematic LLM workflows.',
        avatarSeed: 'Loki'
      };
      onSaveProfile(defaults);
      setName(defaults.name);
      setHandle(defaults.handle);
      setTitle(defaults.title);
      setOrganization(defaults.organization);
      setTargetModel(defaults.targetModel);
      setDefaultFormat(defaults.defaultFormat);
      setBio(defaults.bio);
      setAvatarSeed(defaults.avatarSeed);
      setIsEditing(false);
    }
  };

  const displayHandle = handle ? (handle.startsWith('@') ? handle : `@${handle}`) : '@loki';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content creator-workspace-modal real-profile-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="profile-modal-title">Developer Profile</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close profile">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body workspace-body">
          
          {/* User Hero Banner */}
          <div className="creator-banner-card real-profile-banner">
            <div className="creator-banner-left">
              <div className="creator-avatar-container">
                <RobotAvatar seed={avatarSeed || name || 'Loki'} size={46} />
                <button
                  type="button"
                  className="avatar-dice-roll-btn"
                  onClick={handleRollAvatar}
                  title="Roll new avatar design (🎲)"
                  aria-label="Roll new avatar design"
                >
                  <Dices size={11} />
                </button>
              </div>

              <div className="creator-details">
                <div className="creator-name-row">
                  <h3 className="creator-name">{name || 'Loki'}</h3>
                  <span className="creator-handle-badge">{displayHandle}</span>
                </div>
                <div className="creator-sub-row">
                  <span className="creator-title">{title || 'Prompt Engineer'}</span>
                  <span className="sub-divider">·</span>
                  <span className="creator-org">
                    <Building2 size={12} /> {organization || 'AI Engineering'}
                  </span>
                </div>
                <p className="creator-bio-snippet">{bio}</p>
              </div>
            </div>

            <div className="creator-banner-right">
              {isEditing ? (
                <div className="edit-btn-group">
                  <button 
                    type="button" 
                    className="btn-workspace-cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-workspace-save-inline"
                    onClick={handleSubmit}
                  >
                    <Check size={14} />
                    <span>Save</span>
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  className="btn-workspace-edit"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Body Content: Edit Form OR Clean Symmetrical Panels */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="form-section-title">
                <User size={14} />
                <span>Profile Details & Preferences</span>
              </div>

              <div className="profile-form-grid-2">
                <div className="compact-form-group">
                  <label><User size={12} /> Full Name</label>
                  <input
                    type="text"
                    className="compact-input"
                    placeholder="e.g. Loki"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="compact-form-group">
                  <label><AtSign size={12} /> Username / Handle</label>
                  <input
                    type="text"
                    className="compact-input"
                    placeholder="e.g. @loki"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                  />
                </div>

                <div className="compact-form-group">
                  <label><Briefcase size={12} /> Professional Title</label>
                  <input
                    type="text"
                    className="compact-input"
                    placeholder="e.g. Prompt Engineer & AI Architect"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="compact-form-group">
                  <label><Building2 size={12} /> Organization / Team</label>
                  <input
                    type="text"
                    className="compact-input"
                    placeholder="e.g. AI Systems Lab"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>

                <div className="compact-form-group">
                  <label><Cpu size={12} /> Preferred LLM Target</label>
                  <select
                    className="compact-select"
                    value={targetModel}
                    onChange={(e) => setTargetModel(e.target.value)}
                  >
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                    <option value="GPT-4o">GPT-4o</option>
                    <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    <option value="DeepSeek V3">DeepSeek V3</option>
                    <option value="Llama 3.3 70B">Llama 3.3 70B</option>
                  </select>
                </div>

                <div className="compact-form-group">
                  <label><FileCode size={12} /> Default Prompt Syntax</label>
                  <select
                    className="compact-select"
                    value={defaultFormat}
                    onChange={(e) => setDefaultFormat(e.target.value)}
                  >
                    <option value="Structured Markdown">Structured Markdown</option>
                    <option value="XML Tagged Blocks">XML Tagged Blocks</option>
                    <option value="JSON Spec Schema">JSON Spec Schema</option>
                    <option value="Direct System Prompt">Direct System Prompt</option>
                  </select>
                </div>
              </div>

              <div className="compact-form-group" style={{ marginTop: '12px' }}>
                <label><FileCode size={12} /> Bio / Focus</label>
                <textarea
                  rows={2}
                  className="compact-textarea"
                  placeholder="e.g. Building modular prompt architectures and systematic LLM workflows."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </form>
          ) : (
            <div className="workspace-cards-grid">
              
              {/* Card 1: LLM Stack & Output Defaults */}
              <div className="workspace-card stack-card">
                <div className="workspace-card-header">
                  <Cpu size={14} className="card-header-icon" />
                  <h4>LLM DEFAULTS</h4>
                </div>

                <div className="stack-details-list">
                  <div className="stack-item">
                    <span className="stack-label">Target Model</span>
                    <span className="stack-badge model-badge">
                      <Cpu size={11} /> {targetModel}
                    </span>
                  </div>

                  <div className="stack-item">
                    <span className="stack-label">Output Syntax</span>
                    <span className="stack-badge format-badge">
                      <FileCode size={11} /> {defaultFormat}
                    </span>
                  </div>

                  <div className="stack-item">
                    <span className="stack-label">Organization</span>
                    <span className="stack-val">{organization}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Accurate Framework Library Stats */}
              <div className="workspace-card stats-card">
                <div className="workspace-card-header">
                  <Layers size={14} className="card-header-icon" />
                  <h4>FRAMEWORK STATS</h4>
                </div>

                <div className="stack-details-list">
                  <div className="stack-item">
                    <span className="stack-label">Favorites Pinned</span>
                    <span className="stack-val metric-highlight green">
                      <Star size={12} fill="var(--green-primary)" /> {pinnedCount}
                    </span>
                  </div>

                  <div className="stack-item">
                    <span className="stack-label">Custom Frameworks</span>
                    <span className="stack-val metric-highlight brass">
                      <Code2 size={12} /> {customCount}
                    </span>
                  </div>

                  <div className="stack-item">
                    <span className="stack-label">Total in Library</span>
                    <span className="stack-val metric-highlight blue">
                      <Layers size={12} /> {totalCount}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="modal-actions workspace-footer">
          <button 
            type="button" 
            className="btn-workspace-reset"
            onClick={handleClearProfile}
            title="Reset profile details back to default"
          >
            <Trash2 size={13} />
            <span>Reset Defaults</span>
          </button>

          <div className="modal-actions-right">
            {savedToast && <span className="saved-indicator"><Check size={13} /> Saved</span>}
            <button type="button" className="btn-workspace-close" onClick={onClose}>
              Close
            </button>
            {isEditing && (
              <button 
                type="button" 
                className="btn-workspace-save"
                onClick={handleSubmit}
              >
                <Check size={14} />
                <span>Save Profile</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
