export const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Mastering Agentic AI & RAG',
    description: 'Learn how to create sophisticated autonomous AI agents that can utilize tools, reason through steps, and fetch context via Retrieval-Augmented Generation. Culminates in a project building a multi-agent framework.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
    instructor: 'Supreme Dev',
    duration: '4h 30m',
    level: 'Advanced',
    lessons: [
      { 
        id: 'l1.1', 
        title: 'Introduction to Autonomous Agents', 
        duration: '22m', 
        videoId: 'sPBcm2zI75w', // Actual relevant YouTube video (e.g. general AI landscape) or popular tech ID
        readingMaterial: `
### What is Agentic AI?
Unlike traditional LLMs which simply generate text back-and-forth, **Agentic AI** refers to systems that can:
1. **Plan:** Reason through a complex problem by breaking it down into steps.
2. **Execute Tools:** Call external APIs, search the web, or run code directly on a terminal.
3. **Reflect:** Analyze the outcome of their tool executions and iterate.

### Real-World Narratives
By giving AI the ability to *act*, we change the narrative from "AI as an assistant" to "AI as a coworker". This course will culminated in you building frameworks that autonomously research and write code.
        `,
        quiz: {
          question: "Which capability fundamentally distinguishes Agentic AI from standard LLM chatbots?",
          options: [
            "Generating grammatically correct text",
            "The ability to autonomously plan and execute tools to affect the real world",
            "Translating between languages"
          ],
          correctAnswerIndex: 1
        }
      },
      { 
        id: 'l1.2', 
        title: 'Building a RAG Pipeline', 
        duration: '35m', 
        videoId: 'T-D1OfcDW1M', // Andrej Karpathy or similar RAG intro
        readingMaterial: `
### Retrieval-Augmented Generation (RAG)
LLMs hallucinate. RAG solves this by grounding the model in proprietary data.

**The Flow:**
- Chunk your documents.
- Embed them into high-dimensional vectors.
- Store them in a Vector Database (e.g., Pinecone, Supabase pgvector).
- During inference, fetch top-K relevant chunks and inject them into the LLM context limits.
        `,
        quiz: {
          question: "What is the primary purpose of a Vector Database in a RAG system?",
          options: [
            "To store passwords securely",
            "To render HTML elements faster",
            "To efficiently store and query high-dimensional embeddings representing document semantics"
          ],
          correctAnswerIndex: 2
        }
      }
    ]
  },
  {
    id: 'c2',
    title: 'MLOps & Big Data Architecture',
    description: 'Bridge the gap between experimental notebook models and robust, scalable production operations. Master MLFlow, data pipelines, and scalable cloud architectures.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    instructor: 'Jane Rossi',
    duration: '6h 15m',
    level: 'Advanced',
    lessons: [
      { 
        id: 'l2.1', 
        title: 'The MLOps Lifecycle', 
        duration: '18m', 
        videoId: 'nJ-a6G6oFyw', 
        readingMaterial: `
### What is MLOps?
Machine Learning Operations (MLOps) is a set of practices that aims to deploy and maintain ML models in production reliably and efficiently. 

**Key Principles:**
- CI/CD for Machine Learning (testing data and models, not just code).
- Model Serving pipelines.
- Data drift monitoring.
        `,
        quiz: {
          question: "In MLOps, what phenomenon must be monitored to ensure a deployed model remains accurate over time?",
          options: [
            "CSS Specificity",
            "Data and Concept Drift",
            "React Context rerenders"
          ],
          correctAnswerIndex: 1
        }
      },
      { 
        id: 'l2.2', 
        title: 'Experiment Tracking with MLFlow', 
        duration: '40m', 
        videoId: 'A_Kx2cRjH4Q', 
        readingMaterial: `
### MLFlow Lifecycle
MLFlow is an open-source platform to manage the ML lifecycle.
- **Tracking:** Record and query experiments (code, data, config, results).
- **Projects:** Package data science code.
- **Models:** Deploy machine learning models in diverse serving environments.
        `,
        quiz: {
          question: "Which component of MLFlow is used specifically to log hyperparameters and metrics during training?",
          options: [
            "MLFlow Tracking",
            "MLFlow Models",
            "MLFlow Registry"
          ],
          correctAnswerIndex: 0
        }
      }
    ]
  },
  {
    id: 'c3',
    title: 'Generative AI & GANs',
    description: 'Deep dive into Generative Adversarial Networks. Learn how to generate look-alike pictures, stylized videos, and master deep latent spaces.',
    thumbnail: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600',
    instructor: 'Alan Turing',
    duration: '5h 45m',
    level: 'Intermediate',
    lessons: [
      { 
        id: 'l3.1', 
        title: 'How GANs Work', 
        duration: '25m', 
        videoId: '8L11aMN5KY8', // Goodfellow GAN intro
        readingMaterial: `
### The Adversarial Setup
GANs consist of two neural networks contesting with each other in a game:
1. **The Generator:** Creates fake images from random noise, trying to trick the discriminator.
2. **The Discriminator:** Analyzes images and attempts to classify them as "Real" or "Fake".

Over time, the Generator becomes so good at creating look-alike pictures that the Discriminator is guessing at 50% accuracy.
        `,
        quiz: {
          question: "What is the primary objective of the Generator network in a GAN?",
          options: [
            "To accurately classify images into categories",
            "To generate realistic synthetic data that fools the Discriminator",
            "To reduce the dimensionality of the dataset"
          ],
          correctAnswerIndex: 1
        }
      }
    ]
  }
];
