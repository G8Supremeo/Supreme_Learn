import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Award, RotateCcw } from 'lucide-react';

export function ExamWidget({ exam, courseTitle, onPass }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!exam || exam.length === 0) return null;

  const totalQuestions = exam.length;
  const passingScore = Math.ceil(totalQuestions * 0.7); // 70% to pass

  const handleSelect = (qIdx, optIdx) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    exam.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) correct++;
    });
    setScore(correct);
    setIsSubmitted(true);
    if (correct >= passingScore && onPass) onPass();
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const allAnswered = Object.keys(answers).length === totalQuestions;
  const passed = score >= passingScore;
  const percentage = Math.round((score / totalQuestions) * 100);
  const q = exam[currentQ];

  return (
    <div className="exam-widget glass-panel">
      {/* Header */}
      <div className="exam-header">
        <div className="exam-header-top">
          <h2><Award size={24} /> Course Exam</h2>
          {!isSubmitted && (
            <span className="exam-progress-label">
              Question {currentQ + 1} of {totalQuestions}
            </span>
          )}
        </div>
        <p className="exam-subtitle">{courseTitle}</p>

        {!isSubmitted && (
          <div className="exam-progress-bar">
            <div
              className="exam-progress-fill"
              style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Results View */}
      {isSubmitted ? (
        <div className="exam-results">
          <div className={`exam-score-card ${passed ? 'passed' : 'failed'}`}>
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <div className="score-details">
              <h3>{passed ? '🎉 Congratulations!' : '😔 Not Quite Yet'}</h3>
              <p>
                You scored <strong>{score}/{totalQuestions}</strong>.
                {passed
                  ? ' You have passed the course exam!'
                  : ` You need ${passingScore}/${totalQuestions} (70%) to pass.`}
              </p>
              {!passed && (
                <button onClick={handleRetry} className="btn btn-primary retry-btn">
                  <RotateCcw size={16} /> Retry Exam
                </button>
              )}
            </div>
          </div>

          {/* Review answers */}
          <div className="exam-review">
            <h3>Answer Review</h3>
            {exam.map((question, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === question.correctAnswerIndex;
              return (
                <div key={idx} className={`review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}`}>
                  <div className="review-header">
                    <span className="review-number">Q{idx + 1}</span>
                    {isCorrect
                      ? <CheckCircle size={18} className="review-icon correct" />
                      : <XCircle size={18} className="review-icon incorrect" />}
                  </div>
                  <p className="review-question">{question.question}</p>
                  <div className="review-options">
                    {question.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`review-option ${
                          optIdx === question.correctAnswerIndex ? 'correct-answer' : ''
                        } ${optIdx === userAnswer && !isCorrect ? 'wrong-answer' : ''}`}
                      >
                        {opt}
                        {optIdx === question.correctAnswerIndex && <CheckCircle size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Question View */
        <div className="exam-question-view">
          <p className="exam-question-text">{q.question}</p>
          <div className="exam-options">
            {q.options.map((option, optIdx) => (
              <label
                key={optIdx}
                className={`exam-option ${answers[currentQ] === optIdx ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`exam-q-${currentQ}`}
                  checked={answers[currentQ] === optIdx}
                  onChange={() => handleSelect(currentQ, optIdx)}
                />
                <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                <span className="option-label">{option}</span>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="exam-nav">
            <button
              className="btn btn-secondary exam-nav-btn"
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {/* Question dots */}
            <div className="exam-dots">
              {exam.map((_, idx) => (
                <button
                  key={idx}
                  className={`exam-dot ${idx === currentQ ? 'active' : ''} ${answers[idx] !== undefined ? 'answered' : ''}`}
                  onClick={() => setCurrentQ(idx)}
                  title={`Question ${idx + 1}`}
                />
              ))}
            </div>

            {currentQ < totalQuestions - 1 ? (
              <button
                className="btn btn-primary exam-nav-btn"
                onClick={() => setCurrentQ(prev => prev + 1)}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="btn btn-primary exam-nav-btn submit-btn"
                onClick={handleSubmit}
                disabled={!allAnswered}
                title={!allAnswered ? 'Answer all questions first' : 'Submit exam'}
              >
                Submit Exam
              </button>
            )}
          </div>

          <div className="answered-count">
            {Object.keys(answers).length}/{totalQuestions} answered
          </div>
        </div>
      )}

      <style>{`
        .exam-widget {
          padding: 2.5rem;
          border: 2px solid var(--glass-border);
          margin-top: 2rem;
        }
        .exam-header { margin-bottom: 2rem; }
        .exam-header-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.5rem;
        }
        .exam-header-top h2 {
          display: flex; align-items: center; gap: 0.5rem;
          color: var(--accent-primary); font-size: 1.5rem;
        }
        .exam-progress-label {
          font-size: 0.9rem; font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-secondary); padding: 0.3rem 0.8rem;
          border-radius: 8px;
        }
        .exam-subtitle {
          color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem;
        }
        .exam-progress-bar {
          height: 4px; background: var(--bg-secondary); border-radius: 4px;
          overflow: hidden;
        }
        .exam-progress-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transition: width 0.4s ease;
        }

        /* Question */
        .exam-question-text {
          font-size: 1.15rem; font-weight: 600;
          color: var(--text-primary); margin-bottom: 1.5rem; line-height: 1.5;
        }
        .exam-options {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .exam-option {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem; border-radius: 12px;
          border: 1.5px solid var(--glass-border);
          background: var(--card-bg); cursor: pointer;
          transition: all 0.25s;
        }
        .exam-option:hover {
          border-color: var(--accent-primary);
          background: rgba(14,165,233,0.03);
        }
        .exam-option.selected {
          border-color: var(--accent-primary);
          background: rgba(14,165,233,0.08);
          box-shadow: 0 0 0 1px var(--accent-primary);
        }
        .exam-option input[type="radio"] { display: none; }
        .option-letter {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.85rem;
          background: var(--bg-secondary); color: var(--text-secondary);
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .exam-option.selected .option-letter {
          background: var(--accent-primary); color: #fff;
        }
        .option-label { font-size: 0.95rem; color: var(--text-primary); }

        /* Navigation */
        .exam-nav {
          display: flex; justify-content: space-between; align-items: center;
          gap: 1rem;
        }
        .exam-nav-btn {
          font-size: 0.9rem; padding: 0.6rem 1.2rem;
          border-radius: 10px; min-width: 120px;
        }
        .exam-nav-btn:disabled {
          opacity: 0.4; cursor: not-allowed;
        }
        .submit-btn:disabled {
          opacity: 0.5; cursor: not-allowed;
          background: var(--bg-secondary); color: var(--text-secondary);
          box-shadow: none;
        }
        .exam-dots {
          display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;
        }
        .exam-dot {
          width: 10px; height: 10px; border-radius: 50%; border: none;
          background: var(--glass-border); cursor: pointer;
          transition: all 0.2s;
        }
        .exam-dot.active {
          background: var(--accent-primary);
          transform: scale(1.3);
        }
        .exam-dot.answered {
          background: var(--accent-secondary);
        }
        .answered-count {
          text-align: center; margin-top: 1rem;
          font-size: 0.85rem; color: var(--text-secondary);
        }

        /* Results */
        .exam-results { display: flex; flex-direction: column; gap: 2rem; }
        .exam-score-card {
          display: flex; align-items: center; gap: 2rem;
          padding: 2rem; border-radius: 16px;
        }
        .exam-score-card.passed {
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
        }
        .exam-score-card.failed {
          background: rgba(225,29,72,0.08);
          border: 1px solid rgba(225,29,72,0.2);
        }
        .score-circle {
          width: 100px; height: 100px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .passed .score-circle {
          background: linear-gradient(135deg, var(--accent-secondary), #059669);
        }
        .failed .score-circle {
          background: linear-gradient(135deg, #ef4444, #e11d48);
        }
        .score-number {
          color: #fff; font-size: 1.5rem; font-weight: 800;
        }
        .score-details h3 {
          font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.5rem;
        }
        .score-details p {
          color: var(--text-secondary); line-height: 1.5;
        }
        .retry-btn {
          margin-top: 1rem; padding: 0.6rem 1.5rem;
          font-size: 0.9rem; border-radius: 10px;
        }

        /* Review */
        .exam-review h3 {
          color: var(--text-primary); font-size: 1.2rem; margin-bottom: 1rem;
        }
        .review-item {
          padding: 1.25rem; border-radius: 12px;
          margin-bottom: 1rem; border-left: 4px solid;
        }
        .review-correct {
          background: rgba(16,185,129,0.05);
          border-left-color: var(--success);
        }
        .review-incorrect {
          background: rgba(225,29,72,0.05);
          border-left-color: var(--error);
        }
        .review-header {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .review-number {
          font-weight: 700; font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .review-icon.correct { color: var(--success); }
        .review-icon.incorrect { color: var(--error); }
        .review-question {
          font-weight: 600; color: var(--text-primary);
          margin-bottom: 0.75rem; font-size: 0.95rem;
        }
        .review-options {
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .review-option {
          padding: 0.5rem 0.75rem; border-radius: 6px;
          font-size: 0.85rem; color: var(--text-secondary);
          display: flex; align-items: center; gap: 0.5rem;
        }
        .review-option.correct-answer {
          background: rgba(16,185,129,0.1);
          color: var(--success); font-weight: 600;
        }
        .review-option.wrong-answer {
          background: rgba(225,29,72,0.1);
          color: var(--error);
          text-decoration: line-through;
        }

        @media (max-width: 768px) {
          .exam-widget { padding: 1.5rem; }
          .exam-score-card { flex-direction: column; text-align: center; }
          .exam-nav { flex-wrap: wrap; }
          .exam-dots { order: 3; width: 100%; margin-top: 0.5rem; }
        }
      `}</style>
    </div>
  );
}
