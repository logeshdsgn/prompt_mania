import React from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PROMPT MANIA ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetData = () => {
    try {
      localStorage.removeItem('prompt_mania_pinned');
      localStorage.removeItem('prompt_mania_custom');
      localStorage.removeItem('prompt_mania_profile');
      localStorage.removeItem('prompt_mania_theme');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#07080A',
          color: '#E6EDF3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: 'linear-gradient(145deg, rgba(20, 24, 33, 0.95), rgba(11, 14, 20, 0.98))',
            border: '1px solid rgba(255, 75, 75, 0.3)',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 75, 75, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 75, 75, 0.12)',
              border: '1px solid rgba(255, 75, 75, 0.3)',
              color: '#FF4B4B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#FFFFFF'
            }}>
              Application Encountered an Exception
            </h2>

            <p style={{
              margin: '0 0 24px 0',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.5
            }}>
              An unexpected runtime error occurred while rendering the prompt framework engine. You can reload the workspace or reset cached configurations.
            </p>

            {this.state.error && (
              <pre style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.75rem',
                color: '#FF7B72',
                fontFamily: "'JetBrains Mono', monospace",
                textAlign: 'left',
                overflowX: 'auto',
                maxHeight: '120px',
                marginBottom: '24px'
              }}>
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #00E887, #00B368)',
                  color: '#07080A',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '10px 22px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(0, 232, 135, 0.3)'
                }}
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetData}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={15} />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
