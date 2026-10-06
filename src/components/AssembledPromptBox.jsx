import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { getAssembledPrompt } from '../utils/assembledPrompts';
import { copyToClipboard } from '../utils/clipboard';

export default function AssembledPromptBox({ framework }) {
  const [copied, setCopied] = useState(false);
  const promptText = getAssembledPrompt(framework);

  if (!promptText) return null;

  const wordCount = promptText.trim().split(/\s+/).length;
  const charCount = promptText.length;

  const handleCopy = async () => {
    const ok = await copyToClipboard(promptText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Format text to highlight [SECTION_HEADERS]
  const renderFormattedPrompt = () => {
    const lines = promptText.split('\n');
    return lines.map((line, idx) => {
      const match = line.match(/^(\[[A-Z0-9\s&_-]+\])(.*)$/);
      if (match) {
        return (
          <div key={idx} className="prompt-line header-line">
            <span className="prompt-section-tag">{match[1]}</span>
            {match[2] && <span>{match[2]}</span>}
          </div>
        );
      }
      return (
        <div key={idx} className={`prompt-line ${line.trim() === '' ? 'empty-line' : ''}`}>
          {line || '\u00A0'}
        </div>
      );
    });
  };

  return (
    <section className="assembled-prompt-section" aria-label="Complete Prompt Example">
      <div className="assembled-prompt-header">
        <div className="assembled-prompt-title-group">
          <div className="terminal-badge">
            <Terminal size={15} />
          </div>
          <div>
            <h2 className="assembled-prompt-title">Complete Assembled Prompt</h2>
            <p className="assembled-prompt-subtitle">
              Ready-to-use production prompt combining all {framework.name} modules into one instruction
            </p>
          </div>
        </div>

        <div className="assembled-prompt-actions">
          <span className="prompt-metrics-badge">
            {wordCount} words · {charCount} chars
          </span>
          <button 
            className={`copy-prompt-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy complete assembled prompt"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="terminal-window">
        <div className="terminal-top-bar">
          <div className="terminal-dots">
            <span className="terminal-dot dot-red"></span>
            <span className="terminal-dot dot-yellow"></span>
            <span className="terminal-dot dot-green"></span>
          </div>
          <span className="terminal-file-name">{framework.id || 'prompt'}_assembled_spec.md</span>
          <span className="terminal-mode-label">MARKDOWN · READY TO RUN</span>
        </div>

        <div className="terminal-body">
          <pre className="terminal-code">{renderFormattedPrompt()}</pre>
        </div>

        <div className="terminal-footer">
          <div className="terminal-footer-hint">
            <Terminal size={12} className="terminal-hint-icon" />
            <span>Paste this prompt directly into ChatGPT, Claude, or Gemini for structured, high-precision results.</span>
          </div>
          <div className="terminal-quick-links">
            <a 
              href="https://chatgpt.com" 
              target="_blank" 
              rel="noreferrer" 
              className="terminal-link"
              title="Open ChatGPT in new tab"
            >
              ChatGPT <ExternalLink size={10} />
            </a>
            <a 
              href="https://claude.ai" 
              target="_blank" 
              rel="noreferrer" 
              className="terminal-link"
              title="Open Claude in new tab"
            >
              Claude <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
