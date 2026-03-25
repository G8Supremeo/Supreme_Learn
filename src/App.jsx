import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { PrivateRoute } from './components/PrivateRoute';
import { Navbar } from './components/Navbar';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Catalog } from './pages/Catalog';
import { CourseDetail } from './pages/CourseDetail';
import { Profile } from './pages/Profile';
import { LessonPlayer } from './pages/LessonPlayer';

// Layout wrapper for authenticated routes to ensure Navbar and Chatbot widget are displayed
function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content fade-in">
        {children}
      </main>
      <ChatbotWidget />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes inside AppLayout */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/catalog"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Catalog />
                  </AppLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/course/:courseId"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <CourseDetail />
                  </AppLayout>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/course/:courseId/lesson/:lessonId"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <LessonPlayer />
                  </AppLayout>
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/catalog" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
