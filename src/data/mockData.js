export const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Mastering Agentic AI & RAG Ecosystems',
    description: 'Learn how to construct autonomous AI agents using ReAct frameworks, LangChain, and advanced Retrieval-Augmented Generation pipelines. You will build a multi-agent orchestrated system capable of reasoning and web-based tool calling.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
    instructor: 'Dr. Andrew Ng & Lex Fridman',
    duration: '14h 30m',
    level: 'Advanced',
    lessons: [
      { 
        id: 'l1.1', 
        title: 'Introduction to Autonomous AI Agents', 
        duration: '42m', 
        videoId: 'zjkBMFhNj_g', 
        readingMaterial: `
### What defines an Agent?
An LLM alone acts as a passive completion engine—it receives a prompt and returns an answer. An **AI Agent** is an LLM instantiated with three critical capabilities:
1. **Planning:** The ability to decompose complex goals into manageable subsets.
2. **Memory:** Retaining conversational history and long-term insights (via vector databases).
3. **Tool Use:** Executing Python scripts, searching the web, or querying SQL databases autonomously.

### The ReAct Framework (Reasoning + Acting)
ReAct is a prompting paradigm where the agent is instructed to format its output as:
- **Thought:** Analyze the current state.
- **Action:** Select a tool to use.
- **Observation:** Review the tool's output.
        `,
        quiz: {
          question: "Under the ReAct framework, which step directly dictates calling an external API or searching the web?",
          options: ["Thought", "Action", "Observation"],
          correctAnswerIndex: 1
        }
      },
      { 
        id: 'l1.2', 
        title: 'State of the Art Retrieval-Augmented Generation (RAG)', 
        duration: '55m', 
        videoId: 'bZQun8Y4L2A', 
        readingMaterial: `
### Core Components of Advanced RAG
Standard RAG pipelines can be brittle. Advanced RAG introduces:

1. **Semantic Chunking:** Avoiding mid-sentence splits by chunking based on semantic layout rather than arbitrary token lengths.
2. **Query Expansion:** Using a smaller, faster LLM to rewrite user queries into multiple variations to maximize vector overlap in the database.
3. **Re-ranking:** Fetching 20 documents using standard Cosine Similarity (bi-encoders), and then re-ranking the top 5 using a Cross-Encoder (like Cohere) for supreme accuracy.

Implementing these steps prevents generative hallucinations and guarantees your agents have grounded, factual data.
        `,
        quiz: {
          question: "Which technique is used to re-evaluate and sort the initial top-K documents retrieved by a vector database?",
          options: ["Zero-shot Prompting", "Cosine Similarity Splitting", "Cross-Encoder Re-ranking"],
          correctAnswerIndex: 2
        }
      },
      { 
        id: 'l1.3', 
        title: 'Multi-Agent Orchestration architectures', 
        duration: '48m', 
        videoId: 'eMlx5fFNoYc',
        readingMaterial: `
### Why Multi-Agent?
Single monolithic agents try to do everything and often get confused. The solution is **Multi-Agent Systems** (e.g., AutoGen, CrewAI).

**Framework Architecture:**
- **Manager Agent:** Analyzes the prompt and delegates sub-tasks.
- **Research Agent:** Has access purely to web scraping and vector database tools.
- **Coding Agent:** Has access to a sandbox Python REPL.
- **QA Agent:** Reviews the output of the Coding agent before returning it to the Manager.

By giving specific personas to specific agents, we can dramatically reduce error rates in complex workflows.
        `,
        quiz: {
          question: "What is the primary benefit of a Multi-Agent system over a single Monolithic Agent?",
          options: [
            "It trains the neural network faster on GPUs.",
            "It reduces hallucinations and logical errors by dividing tasks into specialized personas.",
            "It consumes less API tokens per interaction."
          ],
          correctAnswerIndex: 1
        }
      }
    ]
  },
  {
    id: 'c2',
    title: 'MLOps, Big Data Architecture & Programming',
    description: 'Bridge the gap between experimental Jupyter Notebooks and robust, scalable production operations. Master Databricks, MLFlow, Kubernetes deployment, and scalable cloud architectures.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    instructor: 'Chip Huyen',
    duration: '11h 15m',
    level: 'Advanced',
    lessons: [
      { 
        id: 'l2.1', 
        title: 'Building CI/CD Pipelines for ML', 
        duration: '38m', 
        videoId: 'aircAruvnKk', 
        readingMaterial: `
### CI/CD in Machine Learning
Unlike standard software engineering where code is the only variable, ML has three moving axes:
1. **Code:** Training scripts and infrastructure logic.
2. **Data:** The underlying dataset distributions.
3. **Model:** The resulting serialized architecture (e.g., ONNX, PyTorch pt).

**Continuous Integration (CI):** Automating testing for data schemas and unit testing data splits.
**Continuous Deployment (CD):** Automatically serving models when metrics pass benchmark thresholds against a shadow champion model.
        `,
        quiz: {
          question: "Unlike traditional software engineering, MLOps requires managing which three changing axes?",
          options: ["Frontend, Backend, Database", "Code, Data, Model", "Latency, Throughput, Bandwidth"],
          correctAnswerIndex: 1
        }
      },
      { 
        id: 'l2.2', 
        title: 'Experiment Tracking with MLFlow', 
        duration: '40m', 
        videoId: 'IHZwWFHWa-w', 
        readingMaterial: `
### Mastering the MLFlow Lifecycle
MLFlow provides a central dashboard for tracking hyperparameter tuning.

### Core Modules:
- **MLFlow Tracking:** Record and query experiments (learning rates, loss curves).
- **MLFlow Projects:** Package data science code in a reproducible format.
- **MLFlow Models:** Format models so they can be seamlessly deployed across Google Cloud Vertex AI, AWS SageMaker, or Azure ML.
- **Model Registry:** A centralized model store to smoothly transition versions from 'Staging' to 'Production'.
        `,
        quiz: {
          question: "Which component acts as a central repository for approving model transitions from 'Staging' to 'Production'?",
          options: ["MLFlow Tracking", "REST API", "Model Registry"],
          correctAnswerIndex: 2
        }
      },
      { 
        id: 'l2.3', 
        title: 'Data Drift and Monitoring', 
        duration: '32m', 
        videoId: 'Ilg3gGewQ5U', 
        readingMaterial: `
### Concept Drift vs Data Drift
- **Data Drift:** The statistical properties of the input features (X) change over time (e.g., users get younger).
- **Concept Drift:** The relationship between input (X) and target (y) changes (e.g., the definition of a fraudulent transaction shifts due to new hacker tactics).

Monitoring distributions using distances like the Kolmogorov-Smirnov test ensures models don't silently fail in production.
        `,
        quiz: {
          question: "When the statistical properties of the independent input features shift, it is known as:",
          options: ["Concept Drift", "Memory Leak", "Data Drift"],
          correctAnswerIndex: 2
        }
      }
    ]
  },
  {
    id: 'c3',
    title: 'LLM Fine-Tuning & Alignment',
    description: 'Transform foundational models into domain-specific experts. Learn how to perform Parameter-Efficient Fine-Tuning (PEFT) using LoRA, QLoRA, and RLHF alignment.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    instructor: 'Yann LeCun',
    duration: '8h 00m',
    level: 'Expert',
    lessons: [
      { 
        id: 'l3.1', 
        title: 'Parameter-Efficient Fine-Tuning (PEFT)', 
        duration: '50m', 
        videoId: 'kCc8FmEb1nY', 
        readingMaterial: `
### The Cost of Full Finetuning
Fine-tuning a 70B parameter model identically updates all 70 billion weights, which requires massive clusters of A100 GPUs. 

### LoRA (Low-Rank Adaptation)
LoRA solves this by freezing the original weights and injecting trainable rank-decomposition matrices into the Transformer architecture. This reduces the number of trainable parameters by 10,000x, allowing you to fine-tune Llama 3 on a single consumer GPU!
        `,
        quiz: {
          question: "How does LoRA drastically reduce the computational hardware required for fine-tuning?",
          options: [
            "By completely discarding 90% of the transformer layers.",
            "By freezing the base model and only training small injected low-rank matrices.",
            "By using a smaller dataset."
          ],
          correctAnswerIndex: 1
        }
      },
      { 
        id: 'l3.2', 
        title: 'RLHF vs DPO Alignment', 
        duration: '45m', 
        videoId: '9-Jl0dxWQs8', 
        readingMaterial: `
### Direct Preference Optimization (DPO)
Reinforcement Learning from Human Feedback (RLHF) requires training a separate Reward Model, making it incredibly complex and brittle.
DPO bypasses the reward model entirely. It treats the language model itself as the reward model, optimizing directly over human preference pairs (Chosen vs Rejected).

This makes aligning instruction-following models exponentially faster and mathematically stable.
        `,
        quiz: {
          question: "Why is Direct Preference Optimization (DPO) preferred over traditional RLHF?",
          options: [
            "It requires multiple separate reward models which increases safety.",
            "It doesn't require humans to write prompts.",
            "It bypasses training a separate reward model, increasing stability and lowering computational overhead."
          ],
          correctAnswerIndex: 2
        }
      }
    ]
  },
  {
    id: 'c4',
    title: 'Generative AI & GANs for Video Architecture',
    description: 'Deep dive into Generative Adversarial Networks and Diffusion architectures. Learn how to generate look-alike pictures, stylized videos, and master deep latent spaces.',
    thumbnail: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600',
    instructor: 'Ian Goodfellow',
    duration: '9h 45m',
    level: 'Intermediate',
    lessons: [
      { 
        id: 'l4.1', 
        title: 'Generative Adversarial Setup', 
        duration: '28m', 
        videoId: '5t1vTLU7s40', 
        readingMaterial: `
### The Adversarial Game
GANs consist of two conflicting networks learning simultaneously:
1. **The Generator:** Creates fake images from multidimensional random noise.
2. **The Discriminator:** Analyzes input images and attempts to assign a probability classifying them as "Real Data" or "Generated Fake".

As the Generator gradients update to trick the Discriminator, the output becomes indistinguishable from reality.
        `,
        quiz: {
          question: "In a GAN, what is the specific role of the Discriminator network?",
          options: [
            "To generate images from text prompts.",
            "To calculate the total parameters of the generator.",
            "To determine whether an image is drawn from the real dataset or was artificially generated."
          ],
          correctAnswerIndex: 2
        }
      },
      { 
        id: 'l4.2', 
        title: 'Diffusion Models vs GANs', 
        duration: '52m', 
        videoId: '0jspaMLxBig', 
        readingMaterial: `
### Why Diffusion replaced GANs
While GANs generate incredibly sharp images, they suffer from **Mode Collapse**—where the Generator learns one specific trick to fool the discriminator and endlessly produces the exact same image.

**Diffusion Models** (Stable Diffusion, Sora) solve this via a thermodynamic approach:
1. Progressively destroy an image by adding pure Gaussian noise (Forward Process).
2. Train a U-Net to predict and subtract the noise step-by-step (Reverse Process).

Diffusion guarantees high diversity across the output latent space.
        `,
        quiz: {
          question: "Which of the following is a critical flaw commonly associated with GAN training that Diffusion models help solve?",
          options: [
            "Overfitting",
            "Mode Collapse",
            "Gradient Boosting"
          ],
          correctAnswerIndex: 1
        }
      }
    ]
  }
];
