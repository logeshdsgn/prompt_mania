import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import RobotAvatar from './RobotAvatar';

/**
 * Modern luxury header with custom Prompt Mania logo, developer profile badge,
 * functional search query input, and AI architect creation trigger.
 */
export default function Header({
  searchQuery,
  onSearchChange,
  userProfile,
  onOpenProfile,
  onCreateClick
}) {
  const profileName = userProfile?.name || 'Prompt Architect';
  const profileTitle = userProfile?.title || 'AI Prompt Engineer';

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          {/* Custom Relevant Website Logo Mark */}
          <div className="header-logo-icon" title="PROMPT MANIA — Framework Engineering Library">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logoGlow)" stroke="var(--green-primary)" strokeWidth="1.5"/>
              <path d="M9 11L14 16L9 21" stroke="#00E887" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 21H23" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 9L24 11L22 13" stroke="#00E887" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logoGlow" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00E887" stopOpacity="0.25"/>
                  <stop offset="0.5" stopColor="#0E1015" stopOpacity="0.9"/>
                  <stop offset="1" stopColor="#D4AF37" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <span className="header-title">PROMPT MANIA</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search className="search-icon" size={15} strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search frameworks"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => onSearchChange('')}>
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Quick Create / AI Framework Architect */}
        <button 
          className="btn-header-quick-add" 
          onClick={onCreateClick}
          title="Create custom framework with AI Architect"
          aria-label="Create framework with AI Architect"
        >
          <Sparkles size={13} />
          <span>AI Architect</span>
        </button>

        {/* Profile Section */}
        <div 
          className="profile-area" 
          onClick={onOpenProfile} 
          role="button" 
          tabIndex={0} 
          title="Customize Profile & Settings"
          aria-label="User Profile"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenProfile();
            }
          }}
        >
          <div className="profile-avatar">
            <RobotAvatar seed={userProfile?.avatarSeed || userProfile?.name || 'User'} size={26} />
            <span className="online-indicator"></span>
          </div>
          <div className="profile-info">
            <span className="profile-name">{profileName}</span>
            <span className="profile-role">{profileTitle}</span>
          </div>
        </div>
      </div>
    </header>
  );
}




