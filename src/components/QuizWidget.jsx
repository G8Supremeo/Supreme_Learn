import React, { useState } from 'react';

export function QuizWidget({ quiz, onPass }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  if (!quiz) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIdx === null) return;
    
    setIsSubmitted(true);
    if (selectedIdx === quiz.correctAnswerIndex) {
      setPassed(true);
      onPass();
    } else {
      setPassed(false);
    }
  };

  const handleRetry = () => {
    setSelectedIdx(null);
    setIsSubmitted(false);
    setPassed(false);
  };

  return (
    <div className="quiz-widget glass-panel">
      <div className="quiz-header">
        <h3>Knowledge Check 🧠</h3>
        <p>Pass this quick quiz to unlock completion for this lesson.</p>
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        <p className="quiz-question">{quiz.question}</p>
        
        <div className="quiz-options">
          {quiz.options.map((option, idx) => {
            const isCorrect = idx === quiz.correctAnswerIndex;
            const isSelected = selectedIdx === idx;
            
            let statusClass = '';
            if (isSubmitted) {
              if (isSelected && isCorrect) statusClass = 'correct';
              else if (isSelected && !isCorrect) statusClass = 'incorrect';
              else if (isCorrect) statusClass = 'correct-unselected'; // highlight correct answer if they missed it
            }

            return (
              <label 
                key={idx} 
                className={`quiz-option ${isSelected ? 'selected' : ''} ${statusClass}`}
              >
                <input 
                  type="radio" 
                  name="quiz-answer" 
                  value={idx}
                  checked={isSelected}
                  onChange={() => !isSubmitted && setSelectedIdx(idx)}
                  disabled={isSubmitted}
                />
                <span className="option-text">{option}</span>
              </label>
            );
          })}
        </div>

        {!isSubmitted ? (
          <button type="submit" className="btn btn-primary" disabled={selectedIdx === null}>
            Submit Answer
          </button>
        ) : passed ? (
          <div className="quiz-feedback success">
            <p>🎉 Correct! You may now mark this lesson as complete.</p>
          </div>
        ) : (
          <div className="quiz-feedback error">
            <p>❌ Incorrect. Review the material and try again.</p>
            <button type="button" onClick={handleRetry} className="btn btn-secondary">
              Retry Quiz
            </button>
          </div>
        )}
      </form>

      <style>{`
        .quiz-widget {
          margin-top: 2rem;
          padding: 2rem;
          border: 2px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.05);
        }
        .quiz-header h3 {
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
        }
        .quiz-header p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .quiz-question {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .quiz-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: var(--card-bg);
          cursor: pointer;
          transition: all 0.2s;
        }
        .quiz-option:hover:not(.correct):not(.incorrect) {
          border-color: var(--accent-primary);
        }
        .quiz-option.selected {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 1px var(--accent-primary);
        }
        /* Feedback states */
        .quiz-option.correct {
          background: rgba(45, 106, 79, 0.1);
          border-color: var(--success);
          color: var(--success);
        }
        .quiz-option.incorrect {
          background: rgba(155, 34, 38, 0.1);
          border-color: var(--error);
          color: var(--error);
        }
        .quiz-option.correct-unselected {
          border-color: var(--success);
          border-style: dashed;
        }
        .quiz-option input[type="radio"] {
          accent-color: var(--accent-primary);
          width: 18px;
          height: 18px;
        }
        .option-text {
          font-size: 0.95rem;
        }
        .quiz-feedback {
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .quiz-feedback.success {
          background: rgba(45, 106, 79, 0.1);
          color: var(--success);
          font-weight: 600;
        }
        .quiz-feedback.error {
          background: rgba(155, 34, 38, 0.1);
          color: var(--error);
        }
      `}</style>
    </div>
  );
}
