import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../context/ChatbotContext';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export function ChatbotWidget() {
  const { isOpen, toggleChatbot, messages, isTyping, sendMessage } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Action Button */}
      {!isOpen && (
        <button className="chatbot-fab" onClick={toggleChatbot} aria-label="Open AI Tutor">
          <MessageCircle size={24} />
          <span className="tooltip">Ask AI Tutor</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel chatbot-window animate-fade-in">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} className="primary-icon" />
              <div>
                <h3>AI Tutor</h3>
                <span className="status">● Online</span>
              </div>
            </div>
            <button className="icon-btn-close" onClick={toggleChatbot} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.role === 'assistant' ? 'assistant-msg' : 'user-msg'}`}>
                <div className="msg-avatar">
                  {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="msg-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message assistant-msg">
                <div className="msg-avatar">
                  <Bot size={16} />
                </div>
                <div className="msg-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Ask about a course..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
              disabled={isTyping}
            />
            <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          font-family: inherit;
        }

        .chatbot-fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .chatbot-fab:hover {
          transform: scale(1.1);
        }

        .tooltip {
          position: absolute;
          right: calc(100% + 15px);
          background: var(--card-bg);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        
        .chatbot-fab:hover .tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        .chatbot-window {
          width: 350px;
          height: 500px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          transform-origin: bottom right;
        }

        .chatbot-header {
          padding: 1rem 1.5rem;
          background: rgba(14, 165, 233, 0.1);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .primary-icon {
          color: var(--accent-primary);
        }

        .chatbot-title h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.2;
        }

        .status {
          font-size: 0.75rem;
          color: var(--success);
          font-weight: 500;
        }

        .icon-btn-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          display: flex;
          transition: background 0.2s;
        }

        .icon-btn-close:hover {
          background: rgba(14, 165, 233, 0.15);
          color: var(--accent-primary);
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: var(--glass-border);
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }

        .user-msg {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .user-msg .msg-avatar {
          background: var(--text-secondary);
        }

        .assistant-msg .msg-avatar {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        }

        .msg-bubble {
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .assistant-msg .msg-bubble {
          background: var(--card-bg);
          color: var(--text-primary);
          border-top-left-radius: 2px;
          border: 1px solid var(--glass-border);
        }

        .user-msg .msg-bubble {
          background: var(--accent-primary);
          color: white;
          border-top-right-radius: 2px;
        }

        /* Typing Indicator */
        .typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          margin: 0 2px;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .chatbot-input-area {
          padding: 1rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 0.75rem;
          background: var(--bg-primary);
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: var(--card-bg);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.3s;
        }

        .chat-input:focus {
          border-color: var(--accent-primary);
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .send-btn:hover:not(:disabled) {
          background: var(--accent-hover);
        }

        .send-btn:disabled {
          background: var(--glass-border);
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chatbot-window {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
