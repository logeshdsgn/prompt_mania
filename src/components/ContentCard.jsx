import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { copyToClipboard } from '../utils/clipboard';

/**
 * Content card with milled aluminum icon, modern typography,
 * interactive copy prompt button, tag pills, and code block formatting.
 */
export default function ContentCard({ card, index, bentoSize = 'standard' }) {
  const [copied, setCopied] = useState(false);
  const cardNumber = String(index + 1).padStart(2, '0');
  const sizeClass = bentoSize !== 'standard' ? `bento-${bentoSize}` : '';
  const isCoreModule = card.isCore !== false;

  const handleCopy = async (e) => {
    e.stopPropagation();
    const textToCopy = `${card.title}: ${card.description}\n${card.detail}`;
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`content-card ${sizeClass} ${isCoreModule ? 'core-card' : 'addition-card'}`}>
      <div className="content-card-top-bar">
        {isCoreModule ? (
          <span className="card-step-badge">STEP {cardNumber}</span>
        ) : (
          <div className="content-card-tag tag-addition">
            <Sparkles size={11} />
            <span>ADDITION</span>
          </div>
        )}
        
        <div className="content-card-actions">
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy prompt pattern"
            aria-label="Copy prompt pattern"
          >
            {copied ? (
              <>
                <Check size={13} className="copy-icon" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} className="copy-icon" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>


      <div className="content-card-main-header">
        <div className="content-card-icon">
          <DynamicIcon name={card.icon} size={22} strokeWidth={1.75} />
        </div>
        <h3 className="content-card-title">{card.title}</h3>
      </div>

      <p className="content-card-description">{card.description}</p>
      
      <div className="content-card-detail">
        <span className="detail-prefix">EXAMPLE PATTERN</span>
        <code className="detail-code">{card.detail}</code>
      </div>
    </div>
  );
}


