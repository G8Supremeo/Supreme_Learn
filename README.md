# SuPreMe University - Premium AI E-Learning Platform

Welcome to the official repository for **SuPreMe University**. This application replaces the generic RosyLearn application...g advanced custom hooks, React Router v6, Context API for state management, and an integrated Mock RAG AI Chatbot. Designed with a premium "Rosy" aesthetic featuring glassmorphism and modern UI/UX patterns.

## 🚀 Features

- **Authentication & Protected Routes**: Simulated login flow with persisted session state.
- **Course Catalog**: Browse courses with dynamic search filtering.
- **Enrollment System**: Enroll in courses and track them on your personalized Dashboard.
- **Enhanced Lesson Player**: Nested routing for lessons (`/course/:id/lesson/:lessonId`), video playback tracking, and "Mark as Complete" functionality.
- **Progress Tracking**: Dynamic progress bars updating percentage based on completed lessons.
- **AI Tutor Chatbot**: A mocked RAG (Retrieval-Augmented Generation) chatbot that provides context-aware answers based on the course catalog.
- **Premium Aesthetics**: Beautiful "Rosy" theme with light/dark mode toggles, micro-animations, and glassmorphism UI built entirely with vanilla CSS.

## 🧠 Engineering Highlights

The project leverages **6 Custom Hooks** for clean architecture:
1. `useAuth` - Manages authentication state and mock user generation.
2. `useCourses` - Simulates fetching course catalog data with loading states.
3. `useProgress` - Manages enrollment and lesson completion tracking logic.
4. `useLocalStorage` - A robust hook extending `useState` to seamlessly persist data in the browser.
5. `useNotification` - A utility hook for firing toast notifications.
6. `useChatbot` - Encapsulates logic for the AI chatbot, tracking messages and simulating inference delays for the mock RAG pipeline.

### State Management
State is handled gracefully using the **React Context API**, divided systematically into `AuthContext`, `CourseContext`, `ProgressContext`, and `ChatbotContext`, cleanly wrapped within an `AppProvider` to prevent prop-drilling.

## 📂 Folder Structure

```
src/
├── assets/         # Static assets like images/icons
├── components/     # Reusable UI components (Navbar, CourseCard, ChatbotWidget, PrivateRoute)
├── context/        # Context Providers 
├── data/           # Mock API data
├── hooks/          # Custom engineered hooks
├── pages/          # Full page views (Login, Catalog, CourseDetail, LessonPlayer, Dashboard)
├── App.jsx         # App routing logic wrapper
├── index.css       # Global design system with Rosy Theme variables
└── main.jsx        # App entry point
```

## ⚙️ Setup Instructions

Ensure you have Node.js installed.

1. **Clone the repository** (if hosted) or navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided `localhost` link in your browser.

## 🎥 Working Demo Flow

1. **Login**: Enter any valid email (e.g., `user@example.com`) to sign in.
2. **Browse**: Explore the available courses in the visually engaging Catalog.
3. **AI Tutor**: Open the floating chatbot on the bottom right and ask a question (e.g., "What course teaches glassmorphism?").
4. **Enroll**: Click on a course and hit "Enroll Now for Free".
5. **Watch**: In the Lesson Player, watch the mock video, navigate lessons in the sidebar, and click "Mark as Complete."
6. **Complete**: Verify your progress bar updating in real time, and check your Dashboard to resume courses at any time!
