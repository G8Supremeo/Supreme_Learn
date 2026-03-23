export const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Advanced React Patterns',
    description: 'Master React by building scalable applications with advanced hooks, Context, and performance optimization techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    instructor: 'Jane Doe',
    duration: '6h 30m',
    level: 'Advanced',
    lessons: [
      { id: 'l1.1', title: 'Introduction to Advanced Patterns', duration: '15m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l1.2', title: 'Compound Components', duration: '45m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l1.3', title: 'Custom Hooks Deep Dive', duration: '50m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c2',
    title: 'UI/UX Design for Developers',
    description: 'Learn how to create beautiful, accessible, and user-centric interfaces. A rosy-themed guide to perfect aesthetics.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400',
    instructor: 'Alex Rossi',
    duration: '4h 15m',
    level: 'Beginner',
    lessons: [
      { id: 'l2.1', title: 'Color Theory & Themes', duration: '20m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2.2', title: 'Typography Essentials', duration: '35m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2.3', title: 'Glassmorphism in CSS', duration: '40m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c3',
    title: 'Building AI Chatbots in React',
    description: 'Integrate LLMs, mock RAG pipelines, and build beautiful conversational interfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
    instructor: 'Supreme Dev',
    duration: '8h',
    level: 'Intermediate',
    lessons: [
      { id: 'l3.1', title: 'AI Chatbot Fundamentals', duration: '30m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l3.2', title: 'Mocking RAG systems', duration: '55m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l3.3', title: 'Designing the Chat UI', duration: '45m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  }
];
