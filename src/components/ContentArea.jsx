import React, { useState } from 'react';
import { getFrameworkById } from '../data/frameworks';
import ContentCard from './ContentCard';
import AssembledPromptBox from './AssembledPromptBox';
import { Copy, Check, Code2, ShieldCheck, Zap, Star, Edit3, Trash2, ChevronRight, PlusCircle } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

/**
 * Smart dynamic Bento size mapper.
 * Creates balanced grid layouts for 3, 4, 5, or 6-card frameworks.
 */
function getBentoSize(index, totalCards) {
  if (totalCards === 3) {
    // 3 Cards: Row 1 (Card 0 = 2 cols, Card 1 = 1 col), Row 2 (Card 2 = 3 cols full wide!)
    if (index === 0) return 'featured';
    if (index === 2) return 'featured-full';
    return 'standard';
  }
  if (totalCards === 4) {
    // 4 Cards: Symmetrical 2x2 Bento (Card 0 = 2 cols, Card 1 = 1 col, Card 2 = 1 col, Card 3 = 2 cols)
    if (index === 0) return 'featured';
    if (index === 3) return 'featured-subtle';
    return 'standard';
  }
  if (totalCards === 5) {
    if (index === 0) return 'featured';
    return 'standard';
  }
  if (totalCards === 6) {
    if (index === 0) return 'featured';
    if (index === 5) return 'featured-full';
    return 'standard';
  }
  if (index === 0) return 'featured';
  return 'standard';
}

/**
 * Main content area enforcing the Framework Display Rule:
 * Distinctly separates Official Core Framework modules from Recommended Additions.
 */
export default function ContentArea({ 
  selectedId, 
  allFrameworks,
  isPinned,
  onTogglePin,
  onEditFramework,
  onDeleteFramework
}) {
  const framework = allFrameworks.find(f => f.id === selectedId) || getFrameworkById(selectedId) || allFrameworks[0];
  const [copiedFull, setCopiedFull] = useState(false);
  const [moduleFilter, setModuleFilter] = useState('all'); // 'all' | 'core' | 'additions'

  if (!framework) return null;

  const coreCards = (framework.cards || []).map(c => ({ ...c, isCore: true }));
  const additionCards = (framework.recommendedAdditions || []).map(c => ({ ...c, isCore: false }));

  const hasAdditions = additionCards.length > 0;

  const subtitleParts = framework.subtitle
    ? framework.subtitle.split(/\s*[·•-]\s*/).filter(Boolean)
    : [];
  const flowSteps = subtitleParts.length > 1
    ? subtitleParts
    : coreCards.map(c => c.title);

  const handleCopyFullFramework = async () => {
    const fullText = `=== ${framework.name} FRAMEWORK (${framework.subtitle}) ===\n\n` +
      `[CORE MODULES]\n` +
      coreCards.map((c, i) => `(${i + 1}) ${c.title}: ${c.description}\nExample: ${c.detail}`).join('\n\n') +
      (hasAdditions ? `\n\n[RECOMMENDED ADDITIONS]\n` + additionCards.map((c, i) => `(+${i + 1}) ${c.title}: ${c.description}\nExample: ${c.detail}`).join('\n\n') : '');
    
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2200);
    }
  };

  return (
    <main className="content-area">
      <div className="content-header content-transition-enter" key={`header-${framework.id}`}>
        {/* Row 1: Title + Badges on Left, Action Buttons on Right */}
        <div className="content-header-main-row">
          <div className="content-title-wrapper">
            <h1 className="content-framework-title">{framework.name}</h1>
            <div className="content-inline-badges">
              <span className="meta-badge outline-badge">
                <Zap size={11} />
                <span>{framework.collection || 'Core'}</span>
              </span>
              {framework.isCustom && (
                <span className="meta-badge glow-badge">
                  <Code2 size={11} />
                  <span>Custom</span>
                </span>
              )}
            </div>
          </div>

          <div className="content-header-right-actions">
            <button 
              className={`btn-icon-favorite ${isPinned ? 'active' : ''}`}
              onClick={() => onTogglePin(framework.id)}
              title={isPinned ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star size={14} fill={isPinned ? 'var(--brass-primary)' : 'none'} />
              <span>{isPinned ? 'Favorited' : 'Favorite'}</span>
            </button>

            {framework.isCustom && (
              <>
                <button 
                  className="btn-icon-action"
                  onClick={() => onEditFramework(framework)}
                  title="Edit custom framework"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button 
                  className="btn-icon-action danger"
                  onClick={() => onDeleteFramework(framework.id)}
                  title="Delete framework"
                >
                  <Trash2 size={13} />
                </button>
              </>
            )}

            <button 
              className={`copy-full-btn ${copiedFull ? 'copied' : ''}`}
              onClick={handleCopyFullFramework}
            >
              {copiedFull ? (
                <>
                  <Check size={14} />
                  <span>Pattern Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Full Pattern</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Acronym Flow Ribbon on Left, Module Filters on Right */}
        <div className="content-header-sub-row">
          <div className="framework-flow-ribbon">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="flow-step-item">
                  <span className="flow-step-dot">{idx + 1}</span>
                  <span className="flow-step-text">{step}</span>
                </span>
                {idx < flowSteps.length - 1 && (
                  <ChevronRight size={13} className="flow-step-arrow" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="rule-toggle-group compact">
            <button
              className={`rule-toggle-btn ${moduleFilter === 'all' ? 'active' : ''}`}
              onClick={() => setModuleFilter('all')}
              title="Show all modules"
            >
              <span>All ({coreCards.length + additionCards.length})</span>
            </button>
            <button
              className={`rule-toggle-btn ${moduleFilter === 'core' ? 'active' : ''}`}
              onClick={() => setModuleFilter('core')}
              title="Show official core modules only"
            >
              <ShieldCheck size={12} />
              <span>Core ({coreCards.length})</span>
            </button>
            {hasAdditions && (
              <button
                className={`rule-toggle-btn brass ${moduleFilter === 'additions' ? 'active' : ''}`}
                onClick={() => setModuleFilter('additions')}
                title="Show recommended additions only"
              >
                <PlusCircle size={12} />
                <span>+Add ({additionCards.length})</span>
              </button>
            )}
          </div>
        </div>

        <div className="content-framework-divider" />
      </div>

      {/* Core Framework Section */}
      {(moduleFilter === 'all' || moduleFilter === 'core') && (
        <section className="framework-section">
          <div className="content-grid content-transition-enter" key={`grid-core-${framework.id}`}>
            {coreCards.map((card, index) => (
              <ContentCard
                key={`${framework.id}-core-${index}`}
                card={card}
                index={index}
                bentoSize={getBentoSize(index, coreCards.length)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Additions Section */}
      {hasAdditions && (moduleFilter === 'all' || moduleFilter === 'additions') && (
        <section className="framework-section additions-section">
          <div className="framework-section-header brass">
            <PlusCircle size={16} className="section-icon brass" />
            <h2 className="section-title brass">Recommended Additions ({additionCards.length})</h2>
            <span className="section-subtitle">Optional Supplementary Enhancements</span>
          </div>

          <div className="content-grid content-transition-enter" key={`grid-additions-${framework.id}`}>
            {additionCards.map((card, index) => (
              <ContentCard
                key={`${framework.id}-add-${index}`}
                card={card}
                index={index}
                bentoSize={additionCards.length === 1 ? 'featured-full' : getBentoSize(index, additionCards.length)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Production Assembled Prompt Example */}
      <AssembledPromptBox framework={framework} />
    </main>
  );
}





