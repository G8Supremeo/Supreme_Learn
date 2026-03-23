import React from 'react';
import { AuthProvider } from './AuthContext';
import { CourseProvider } from './CourseContext';
import { ProgressProvider } from './ProgressContext';
import { ChatbotProvider } from './ChatbotContext';

export function AppProvider({ children }) {
  // Order matters: Auth -> Course -> Progress -> Chatbot
  return (
    <AuthProvider>
      <CourseProvider>
        <ProgressProvider>
          <ChatbotProvider>
            {children}
          </ChatbotProvider>
        </ProgressProvider>
      </CourseProvider>
    </AuthProvider>
  );
}
