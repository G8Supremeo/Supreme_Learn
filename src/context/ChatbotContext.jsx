import React, { createContext, useContext, useState } from 'react';
import { useCourses } from './CourseContext';

const ChatbotContext = createContext();

export function ChatbotProvider({ children }) {
  const { courses } = useCourses();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: "Hello! I am your AI learning tutor. I can answer questions about the courses grounded by my RAG model. What would you like to know?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  // Simulated RAG generation
  const sendMessage = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      // Mocking RAG retrieval against course catalog text
      const searchSpace = JSON.stringify(courses).toLowerCase();
      let reply = "I couldn't find specific information in our course materials about that, but I'm here to help!";
      
      if (text.toLowerCase().includes('react')) {
        reply = "Looking at the 'Advanced React Patterns' course, you can learn about advanced hooks, Context, and performance optimizations starting with 'Custom Hooks Deep Dive'.";
      } else if (text.toLowerCase().includes('design') || text.toLowerCase().includes('glassmorphism')) {
        reply = "In the 'UI/UX Design for Developers' course, there's a specific lesson (l2.3) called 'Glassmorphism in CSS' that covers exactly this theme structure!";
      } else if (text.toLowerCase().includes('chatbot') || text.toLowerCase().includes('rag')) {
        reply = "I see you're interested in chatbots! The 'Building AI Chatbots in React' course has a lesson specifically on 'Mocking RAG systems' (lesson 3.2).";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1500); // Simulate network latency and inference
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChatbot, messages, isTyping, sendMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
}

// Hook 6: useChatbot
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}
