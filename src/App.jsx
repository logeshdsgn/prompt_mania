import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import FrameworkModal from './components/FrameworkModal';
import ProfileModal from './components/ProfileModal';
import AiFrameworkArchitectModal from './components/AiFrameworkArchitectModal';
import { frameworks as defaultFrameworks } from './data/frameworks';
import { DEFAULT_DEV_PROFILE } from './data/profileDefaults';

const PINNED_STORAGE_KEY = 'prompt_mania_pinned';
const CUSTOM_STORAGE_KEY = 'prompt_mania_custom';
const PROFILE_STORAGE_KEY = 'prompt_mania_profile';

export default function App() {
  // 1. Pinned / Favorite Framework IDs
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(PINNED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['race'];
    } catch {
      return ['race'];
    }
  });

  // 2. Custom User-Created Frameworks
  const [customFrameworks, setCustomFrameworks] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_DEV_PROFILE;
    } catch {
      return DEFAULT_DEV_PROFILE;
    }
  });

  // 4. Accent Theme: Locked to British Racing Green
  const currentTheme = 'green';

  // Active selections and filters
  const [selectedFrameworkId, setSelectedFrameworkId] = useState('race');
  const [activeCollection, setActiveCollection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAiArchitectOpen, setIsAiArchitectOpen] = useState(false);
  const [isFrameworkModalOpen, setIsFrameworkModalOpen] = useState(false);
  const [editingFramework, setEditingFramework] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch (e) { console.error(e); }
  }, [pinnedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customFrameworks));
    } catch (e) { console.error(e); }
  }, [customFrameworks]);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
    } catch (e) { console.error(e); }
  }, [userProfile]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'green');
  }, []);

  // Combined framework list
  const allFrameworks = [...defaultFrameworks, ...customFrameworks];

  // Collection categories list: All, Core, Favorites, Custom
  const collectionsList = ['All', 'Core', 'Favorites', 'Custom'];

  // Handlers
  const handleTogglePin = (id) => {
    setPinnedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenCreateModal = () => {
    setIsAiArchitectOpen(true);
  };

  const handleOpenEditModal = (framework) => {
    setEditingFramework(framework);
    setIsFrameworkModalOpen(true);
  };

  const handleSaveFramework = (frameworkData) => {
    if (editingFramework) {
      setCustomFrameworks(prev => prev.map(f => f.id === frameworkData.id ? frameworkData : f));
    } else {
      setCustomFrameworks(prev => [frameworkData, ...prev]);
      setSelectedFrameworkId(frameworkData.id);
    }
  };

  const handleDeleteFramework = (id) => {
    const fw = allFrameworks.find(f => f.id === id);
    if (!fw) return;
    if (window.confirm(`Are you sure you want to delete custom framework "${fw.name}"?`)) {
      setCustomFrameworks(prev => prev.filter(f => f.id !== id));
      setPinnedIds(prev => prev.filter(pId => pId !== id));
      if (selectedFrameworkId === id) {
        setSelectedFrameworkId('race');
      }
    }
  };

  return (
    <div className="app" data-theme={currentTheme}>
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onCreateClick={handleOpenCreateModal}
      />

      <div className="app-body">
        <Sidebar
          allFrameworks={allFrameworks}
          selectedId={selectedFrameworkId}
          onSelect={setSelectedFrameworkId}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          activeCollection={activeCollection}
          onSelectCollection={setActiveCollection}
          collectionsList={collectionsList}
          onCreateClick={handleOpenCreateModal}
          onEditFramework={handleOpenEditModal}
          onDeleteFramework={handleDeleteFramework}
          searchQuery={searchQuery}
        />

        <ContentArea 
          selectedId={selectedFrameworkId}
          allFrameworks={allFrameworks}
          isPinned={pinnedIds.includes(selectedFrameworkId)}
          onTogglePin={handleTogglePin}
          onEditFramework={handleOpenEditModal}
          onDeleteFramework={handleDeleteFramework}
        />
      </div>

      {/* Modals */}
      <AiFrameworkArchitectModal
        isOpen={isAiArchitectOpen}
        onClose={() => setIsAiArchitectOpen(false)}
        onSaveFramework={handleSaveFramework}
      />

      <FrameworkModal
        isOpen={isFrameworkModalOpen}
        onClose={() => setIsFrameworkModalOpen(false)}
        onSave={handleSaveFramework}
        initialFramework={editingFramework}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={setUserProfile}
        pinnedCount={pinnedIds.length}
        customCount={customFrameworks.length}
        totalCount={allFrameworks.length}
      />
    </div>
  );
}



