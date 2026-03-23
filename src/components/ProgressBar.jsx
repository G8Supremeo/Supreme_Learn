import React from 'react';

export function ProgressBar({ percentage, label = 'Progress' }) {
  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{percentage}%</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <style>{`
        .progress-container {
          width: 100%;
          margin: 1rem 0;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .progress-label {
          color: var(--text-secondary);
        }
        .progress-value {
          color: var(--accent-primary);
        }
        .progress-track {
          width: 100%;
          height: 8px;
          background-color: var(--glass-border);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
