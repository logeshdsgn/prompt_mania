import React from 'react';
import FrameworkCard from './FrameworkCard';
import { Star, Layers, Code2, Filter, ShieldCheck } from 'lucide-react';

/**
 * Sidebar with category filter tags, pinned favorites section,
 * AI Framework Architect trigger, and framework card list.
 */
export default function Sidebar({ 
  allFrameworks,
  selectedId, 
  onSelect,
  pinnedIds,
  onTogglePin,
  activeCollection,
  onSelectCollection,
  collectionsList,
  onCreateClick,
  onEditFramework,
  onDeleteFramework,
  searchQuery
}) {
  // Filter frameworks by search & active collection
  const filtered = allFrameworks.filter((fw) => {
    // Search query check
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = fw.name.toLowerCase().includes(q);
      const matchSubtitle = fw.subtitle.toLowerCase().includes(q);
      const matchCards = fw.cards?.some(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      if (!matchName && !matchSubtitle && !matchCards) return false;
    }

    // Collection filter tag check
    if (activeCollection === 'Favorites') {
      return pinnedIds.includes(fw.id);
    }
    if (activeCollection === 'Custom') {
      return fw.isCustom;
    }
    if (activeCollection === 'Core') {
      return fw.collection === 'Core' || !fw.isCustom;
    }
    if (activeCollection !== 'All') {
      return fw.collection === activeCollection;
    }

    return true;
  });

  const pinnedFrameworks = filtered.filter(fw => pinnedIds.includes(fw.id));
  const otherFrameworks = filtered.filter(fw => !pinnedIds.includes(fw.id));

  // Pinned favorites section only shown on 'All' view without active search query
  const showPinnedSection = activeCollection === 'All' && !searchQuery.trim() && pinnedFrameworks.length > 0;
  const listToRender = showPinnedSection ? otherFrameworks : filtered;

  return (
    <aside className="sidebar" role="navigation" aria-label="Framework selection">
      {/* Collection Tags Bar */}
      <div className="collections-bar">
        {collectionsList.map((col) => (
          <button
            key={col}
            className={`collection-tab ${activeCollection === col ? 'active' : ''}`}
            onClick={() => onSelectCollection(col)}
          >
            {col === 'Core' && <ShieldCheck size={11} />}
            {col === 'Favorites' && <Star size={11} fill={activeCollection === 'Favorites' ? 'var(--brass-primary)' : 'none'} />}
            {col === 'Custom' && <Code2 size={11} />}
            <span>{col}</span>
          </button>
        ))}
      </div>

      {/* Pinned Favorites Section (Only in 'All' view when pinned items exist) */}
      {showPinnedSection && (
        <div className="sidebar-section">
          <div className="sidebar-label">
            <Star size={12} fill="var(--brass-primary)" color="var(--brass-primary)" />
            <span>PINNED FAVORITES ({pinnedFrameworks.length})</span>
          </div>
          {pinnedFrameworks.map((framework) => (
            <FrameworkCard
              key={`pinned-${framework.id}`}
              framework={framework}
              isSelected={selectedId === framework.id}
              onClick={() => onSelect(framework.id)}
              isPinned={true}
              onTogglePin={onTogglePin}
              onEdit={onEditFramework}
              onDelete={onDeleteFramework}
            />
          ))}
        </div>
      )}

      {/* Main Framework Library List */}
      <div className="sidebar-section">
        <div className="sidebar-label">
          <Layers size={12} />
          <span>
            {activeCollection === 'All' ? 'ALL FRAMEWORKS' : `${activeCollection.toUpperCase()} (${filtered.length})`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-sidebar-state">
            <Filter size={24} />
            <p>No frameworks found for this filter.</p>
            {activeCollection === 'Favorites' && (
              <span>Click the star icon on any framework to add to Favorites.</span>
            )}
            {activeCollection === 'Custom' && (
              <button className="btn-inline" onClick={onCreateClick}>
                + Create First Custom Framework
              </button>
            )}
          </div>
        ) : (
          listToRender.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              isSelected={selectedId === framework.id}
              onClick={() => onSelect(framework.id)}
              isPinned={pinnedIds.includes(framework.id)}
              onTogglePin={onTogglePin}
              onEdit={onEditFramework}
              onDelete={onDeleteFramework}
            />
          ))
        )}
      </div>
    </aside>
  );
}

