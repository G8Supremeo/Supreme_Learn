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

### Why Agents Matter
Traditional chatbots are stateless and passive. AI Agents are proactive, goal-directed systems that can:
- Break down a user's complex request into actionable sub-goals
- Persist information across conversation turns using vector databases
- Autonomously call APIs, run code, and synthesize results
- Self-correct by reviewing their own outputs before returning to the user

### Key Architectures
The most popular agentic architectures today include:
1. **Single-Agent Loop (ReAct):** One LLM handles all reasoning and tool calling.
2. **Multi-Agent Orchestration:** Multiple specialized agents coordinate via a manager.
3. **Plan-and-Execute:** A planner agent creates a step-by-step plan, then an executor agent carries it out.
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

### The RAG Pipeline in Detail
A complete production RAG pipeline involves:
- **Document Ingestion:** Loading PDFs, web pages, or databases into a processing pipeline
- **Chunking Strategy:** Splitting content into semantically meaningful segments (typically 256-1024 tokens)
- **Embedding Generation:** Converting chunks into high-dimensional vectors using models like OpenAI's text-embedding-3-large or Cohere Embed v3
- **Vector Storage:** Persisting embeddings in databases like Pinecone, Weaviate, or Chroma
- **Retrieval & Re-ranking:** Fetching top-K candidates and applying cross-encoder re-ranking
- **Generation:** Passing retrieved context with the user query to an LLM for grounded response generation

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
        title: 'Multi-Agent Orchestration Architectures', 
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

### Communication Patterns
Multi-agent systems use several communication topologies:
1. **Hub-and-Spoke:** A central manager routes all messages between agents.
2. **Peer-to-Peer:** Agents communicate directly with each other in a mesh network.
3. **Sequential Pipeline:** Each agent's output feeds into the next agent's input.
4. **Hierarchical:** Nested managers create tree-like delegation structures.

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
      },
      {
        id: 'l1.4',
        title: 'Building Production RAG with LangChain & LlamaIndex',
        duration: '62m',
        videoId: 'TCH_1BHY58I',
        readingMaterial: `
### LangChain vs LlamaIndex
Both frameworks excel at different RAG use cases:

**LangChain** is a general-purpose orchestration framework:
- Chains: Sequential pipelines of LLM calls and tool invocations
- Agents: Dynamic reasoning loops with tool access
- Memory: Conversation buffers, summaries, and entity memory
- Callbacks: Observability hooks for logging, tracing, and monitoring

**LlamaIndex** specializes in data indexing and retrieval:
- Document Loaders: Ingest data from 160+ sources (PDFs, APIs, databases)
- Index Types: Vector, keyword, tree, and knowledge graph indices
- Query Engines: Sophisticated retrieval with sub-question decomposition
- Response Synthesizers: Compact, tree-summarize, and refine modes

### Building a Production Pipeline
A production-ready RAG system requires:
1. **Data Pipeline:** Automated ingestion with change detection and incremental updates
2. **Evaluation:** RAGAS metrics (faithfulness, answer relevancy, context precision, context recall)
3. **Guardrails:** Input/output validation, PII filtering, and toxicity detection
4. **Monitoring:** Token usage tracking, latency monitoring, and retrieval quality dashboards
5. **Caching:** Semantic caching for repeated queries to reduce cost and latency
        `,
        quiz: {
          question: "Which framework specializes in data indexing and retrieval with 160+ document loaders?",
          options: ["LangChain", "LlamaIndex", "AutoGen"],
          correctAnswerIndex: 1
        }
      },
      {
        id: 'l1.5',
        title: 'Tool Use, Function Calling & MCP',
        duration: '51m',
        videoId: 'PaCmpygFfXo',
        readingMaterial: `
### Function Calling in LLMs
Modern LLMs support structured function calling, allowing agents to:
- Receive a list of available tools with JSON Schema definitions
- Decide which tool to invoke based on the user's query
- Generate structured JSON arguments for the chosen function
- Process the function's return value and incorporate it into the response

### The Model Context Protocol (MCP)
MCP is an open standard that enables:
- **Universal Tool Integration:** Connect any API or service as an MCP server
- **Resource Discovery:** Agents can enumerate available tools at runtime
- **Structured I/O:** All tool inputs/outputs follow a standardized schema
- **Security:** Fine-grained permission controls for tool access

### Designing Effective Tools
Best practices for creating agent tools:
1. **Clear Descriptions:** Write tool descriptions as if explaining to a smart intern
2. **Atomic Operations:** Each tool should do one thing well
3. **Error Handling:** Return structured error messages, not stack traces
4. **Idempotency:** Tools should be safe to retry without side effects
5. **Rate Limiting:** Prevent agents from overwhelming external APIs
        `,
        quiz: {
          question: "What does the Model Context Protocol (MCP) primarily enable?",
          options: [
            "Training LLMs on larger datasets",
            "Universal, standardized tool integration for AI agents",
            "Reducing the number of parameters in a model"
          ],
          correctAnswerIndex: 1
        }
      },
      {
        id: 'l1.6',
        title: 'Capstone: End-to-End Agentic RAG System',
        duration: '75m',
        videoId: 'i_LwzRVP7bg',
        readingMaterial: `
### Capstone Project Overview
In this final lesson, you will build a complete agentic RAG system that:
1. Ingests a corpus of technical documentation using LlamaIndex
2. Creates a vector index with Chroma DB and OpenAI embeddings
3. Wraps the retrieval pipeline into a LangChain Tool
4. Builds a ReAct agent that can search the docs, run Python, and generate reports
5. Deploys the entire system with FastAPI and a React frontend

### Architecture Diagram
The system follows a microservices architecture:
- **Ingestion Service:** Watches a folder for new documents, chunks and embeds them
- **Retrieval Service:** Exposes a search API over the vector database
- **Agent Service:** Hosts the LLM agent with tool access
- **Frontend:** React app with streaming chat and source citation

### Evaluation & Monitoring
Your capstone will be graded on:
- Retrieval quality (precision@5 > 0.8)
- Response faithfulness (RAGAS score > 0.85)
- Agent reasoning quality (correct tool selection rate > 90%)
- System latency (P95 < 3 seconds)
- Code quality and documentation
        `,
        quiz: {
          question: "In the capstone architecture, which service is responsible for watching folders and processing new documents?",
          options: ["Retrieval Service", "Agent Service", "Ingestion Service"],
          correctAnswerIndex: 2
        }
      }
    ],
    exam: [
      { question: "What are the three critical capabilities that distinguish an AI Agent from a plain LLM?", options: ["Speed, Accuracy, Cost", "Planning, Memory, Tool Use", "Training, Inference, Deployment"], correctAnswerIndex: 1 },
      { question: "In the ReAct framework, what follows an 'Action' step?", options: ["Another Action", "Observation", "Thought"], correctAnswerIndex: 1 },
      { question: "What is 'Semantic Chunking' in RAG?", options: ["Splitting text at random positions", "Chunking based on semantic layout instead of arbitrary token lengths", "Compressing text into shorter summaries"], correctAnswerIndex: 1 },
      { question: "Which re-ranking model type provides the highest accuracy for retrieved documents?", options: ["Bi-encoder", "Cross-Encoder", "Auto-encoder"], correctAnswerIndex: 1 },
      { question: "What is Query Expansion?", options: ["Making queries longer by adding random words", "Using an LLM to rewrite queries into multiple variations for better vector overlap", "Splitting one query into character-level tokens"], correctAnswerIndex: 1 },
      { question: "In a Multi-Agent system, what is the role of the Manager Agent?", options: ["Execute Python code", "Analyze prompts and delegate sub-tasks to specialized agents", "Store conversation history"], correctAnswerIndex: 1 },
      { question: "Which communication topology has a central manager routing all messages?", options: ["Peer-to-Peer", "Sequential Pipeline", "Hub-and-Spoke"], correctAnswerIndex: 2 },
      { question: "What is the primary difference between LangChain and LlamaIndex?", options: ["LangChain indexes data, LlamaIndex orchestrates", "LangChain is for orchestration, LlamaIndex specializes in data indexing and retrieval", "They are identical frameworks"], correctAnswerIndex: 1 },
      { question: "What does RAGAS measure?", options: ["GPU utilization during inference", "RAG pipeline quality (faithfulness, relevancy, precision, recall)", "The size of the vector database"], correctAnswerIndex: 1 },
      { question: "What is semantic caching in RAG?", options: ["Caching model weights on disk", "Storing responses for semantically similar queries to reduce cost and latency", "Pre-training embeddings on cached data"], correctAnswerIndex: 1 },
      { question: "What is Function Calling in modern LLMs?", options: ["The LLM calling Python functions internally during training", "The ability for LLMs to generate structured JSON to invoke external tools", "Recursive function calls within transformer layers"], correctAnswerIndex: 1 },
      { question: "What does MCP stand for?", options: ["Model Compression Protocol", "Model Context Protocol", "Machine Code Processor"], correctAnswerIndex: 1 },
      { question: "Why should agent tools be idempotent?", options: ["To run faster", "So they are safe to retry without side effects", "To reduce memory usage"], correctAnswerIndex: 1 },
      { question: "What is the 'Observation' step in ReAct?", options: ["The agent observes the user typing", "The agent reviews the output returned by a tool it used", "The agent observes its own training loss"], correctAnswerIndex: 1 },
      { question: "Which vector database is commonly used with LlamaIndex?", options: ["MySQL", "Chroma DB", "Redis Streams"], correctAnswerIndex: 1 },
      { question: "What metric should retrieval precision@5 exceed in the capstone project?", options: ["0.5", "0.8", "0.95"], correctAnswerIndex: 1 },
      { question: "What is the Plan-and-Execute architecture?", options: ["A single agent that plans and executes simultaneously", "A planner agent creates steps, then an executor agent carries them out", "Planning is done manually by the user"], correctAnswerIndex: 1 },
      { question: "What is PII filtering in RAG guardrails?", options: ["Filtering out personally identifiable information from inputs/outputs", "Filtering images in the pipeline", "Removing stopwords from queries"], correctAnswerIndex: 0 },
      { question: "What embedding model is mentioned for production RAG?", options: ["BERT-base", "text-embedding-3-large", "word2vec"], correctAnswerIndex: 1 },
      { question: "How does a QA Agent improve multi-agent system reliability?", options: ["By generating more training data", "By reviewing the output of other agents before returning it to the manager", "By running on faster hardware"], correctAnswerIndex: 1 }
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

### Pipeline Tools
Key tools in the MLOps CI/CD ecosystem:
- **GitHub Actions / GitLab CI:** Orchestrate training and deployment workflows
- **DVC (Data Version Control):** Track datasets and model artifacts alongside code
- **CML (Continuous Machine Learning):** Auto-generate reports with metrics and plots on every PR
- **Weights & Biases:** Experiment tracking and model registry integration

### Best Practices
1. Pin all dependency versions in requirements files
2. Use containerized training environments (Docker) for reproducibility
3. Implement data validation gates (Great Expectations, Pandera)
4. Set up automated model performance reporting on every commit
5. Use feature flags for gradual model rollouts
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

### Advanced MLFlow Features
- **Autologging:** Automatically capture parameters, metrics, and artifacts for popular ML libraries
- **Model Signatures:** Define input/output schemas for deployed models
- **Custom Flavors:** Package any model format (not just sklearn/pytorch) as an MLFlow model
- **Webhooks:** Trigger downstream pipelines on model state changes

### Integration Patterns
MLFlow integrates seamlessly with:
1. **Databricks:** Native integration with managed MLFlow on Databricks
2. **Kubernetes:** Deploy MLFlow models as Kubernetes services
3. **Apache Airflow:** Trigger training runs and model promotions
4. **Feature Stores:** Connect to Feast or Tecton for feature management
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

### Detection Methods
1. **Statistical Tests:** Kolmogorov-Smirnov test, Population Stability Index (PSI), Jensen-Shannon Divergence
2. **Window-based Monitoring:** Compare sliding windows of recent predictions against a reference distribution
3. **Evidently AI:** Open-source library for generating drift reports with visualizations

### Monitoring Best Practices
- Set up automated alerts when drift metrics exceed thresholds
- Re-train models on a schedule or when drift is detected
- Maintain a holdout test set from the original distribution for comparison
- Log prediction distributions alongside ground truth for retrospective analysis

Monitoring distributions using distances like the Kolmogorov-Smirnov test ensures models don't silently fail in production.
        `,
        quiz: {
          question: "When the statistical properties of the independent input features shift, it is known as:",
          options: ["Concept Drift", "Memory Leak", "Data Drift"],
          correctAnswerIndex: 2
        }
      },
      {
        id: 'l2.4',
        title: 'Kubernetes for ML Model Serving',
        duration: '45m',
        videoId: 'VMj-3S1tku0',
        readingMaterial: `
### Why Kubernetes for ML?
Kubernetes provides the infrastructure backbone for scalable model serving:
- **Auto-scaling:** Scale inference pods based on request volume or GPU utilization
- **Rolling Updates:** Deploy new model versions without downtime
- **Resource Management:** Allocate GPUs and memory quotas per model
- **Service Mesh:** Implement A/B testing and canary deployments with Istio

### Key Components
1. **KServe (formerly KFServing):** Kubernetes-native model serving framework
2. **Triton Inference Server:** NVIDIA's high-performance serving for multiple model formats
3. **Seldon Core:** Enterprise ML deployment with advanced traffic management
4. **BentoML:** Framework-agnostic model packaging and serving

### Deployment Patterns
- **Shadow Deployment:** Route traffic to both old and new models, compare results
- **Canary Release:** Gradually shift traffic from old to new model (1% → 10% → 50% → 100%)
- **Blue-Green:** Maintain two identical environments, switch traffic instantly
- **Multi-Armed Bandit:** Dynamically allocate traffic based on real-time performance metrics

### GPU Optimization
- Use NVIDIA MPS (Multi-Process Service) for sharing GPUs across multiple model instances
- Implement model batching to maximize GPU throughput
- Consider model quantization (INT8/FP16) to reduce memory footprint by 2-4x
        `,
        quiz: {
          question: "Which deployment pattern gradually shifts traffic from an old model to a new model?",
          options: ["Shadow Deployment", "Blue-Green Deployment", "Canary Release"],
          correctAnswerIndex: 2
        }
      },
      {
        id: 'l2.5',
        title: 'Feature Engineering & Feature Stores',
        duration: '42m',
        videoId: '2IK3DFHRFfw',
        readingMaterial: `
### What is a Feature Store?
A Feature Store is a centralized repository for storing, versioning, and serving ML features. It bridges the gap between data engineering and model training.

### Key Capabilities
1. **Feature Registry:** Catalog of all available features with metadata, ownership, and lineage
2. **Offline Store:** Historical feature values for training (typically backed by data warehouses)
3. **Online Store:** Low-latency feature serving for real-time inference (Redis, DynamoDB)
4. **Point-in-time Joins:** Prevent data leakage by correctly joining features to labels based on timestamps

### Popular Feature Stores
- **Feast:** Open-source, vendor-neutral feature store
- **Tecton:** Enterprise feature platform built by Uber Michelangelo creators
- **Databricks Feature Store:** Native integration with Unity Catalog
- **Amazon SageMaker Feature Store:** AWS-managed solution

### Feature Engineering Best Practices
- **Reusability:** Define features once, use across multiple models
- **Freshness:** Monitor feature staleness and set SLAs for update frequency
- **Testing:** Unit test transformations, validate distributions, check for nulls
- **Documentation:** Every feature should have a clear description and business context
        `,
        quiz: {
          question: "What problem do point-in-time joins solve in feature stores?",
          options: [
            "They make queries faster",
            "They prevent data leakage by correctly joining features to labels based on timestamps",
            "They compress features to save storage"
          ],
          correctAnswerIndex: 1
        }
      },
      {
        id: 'l2.6',
        title: 'Capstone: Production ML Pipeline with Databricks',
        duration: '58m',
        videoId: 'lDwow4aOrtg',
        readingMaterial: `
### Capstone Project Overview
Build an end-to-end production ML pipeline on Databricks:

1. **Data Ingestion:** Read streaming data from Delta Lake tables
2. **Feature Engineering:** Create features using Spark SQL and register in Databricks Feature Store
3. **Model Training:** Train an XGBoost model with MLFlow experiment tracking
4. **Model Registry:** Register the best model and promote to Production stage
5. **Model Serving:** Deploy as a real-time REST endpoint on Databricks Model Serving
6. **Monitoring:** Set up drift detection and automated retraining triggers

### Architecture
The pipeline follows the Databricks Lakehouse architecture:
- **Bronze Layer:** Raw ingested data in Delta format
- **Silver Layer:** Cleaned, deduplicated, and validated data
- **Gold Layer:** Aggregated features ready for training and serving
- **ML Layer:** Trained models registered in MLFlow Model Registry

### Evaluation Criteria
- Pipeline automation (end-to-end without manual steps)
- Experiment tracking completeness (all params, metrics, artifacts logged)
- Model performance (AUC > 0.85 on holdout test set)
- Monitoring coverage (drift detection on all input features)
- Documentation and code quality
        `,
        quiz: {
          question: "In the Databricks Lakehouse architecture, which layer contains cleaned and validated data?",
          options: ["Bronze Layer", "Silver Layer", "Gold Layer"],
          correctAnswerIndex: 1
        }
      }
    ],
    exam: [
      { question: "What are the three changing axes in MLOps?", options: ["Frontend, Backend, Database", "Code, Data, Model", "CPU, GPU, TPU"], correctAnswerIndex: 1 },
      { question: "What does DVC stand for?", options: ["Deep Version Control", "Data Version Control", "Distributed Virtual Computing"], correctAnswerIndex: 1 },
      { question: "Which MLFlow module handles experiment logging?", options: ["MLFlow Models", "MLFlow Tracking", "MLFlow Projects"], correctAnswerIndex: 1 },
      { question: "What is the Model Registry used for?", options: ["Storing training data", "Managing model version lifecycles (Staging to Production)", "Writing documentation"], correctAnswerIndex: 1 },
      { question: "What is the Kolmogorov-Smirnov test used for in MLOps?", options: ["Hyperparameter tuning", "Detecting data drift by comparing distributions", "Training neural networks"], correctAnswerIndex: 1 },
      { question: "What is Concept Drift?", options: ["When models run out of memory", "When the relationship between inputs and targets changes over time", "When training data gets too large"], correctAnswerIndex: 1 },
      { question: "What is Population Stability Index (PSI)?", options: ["A measure of GPU performance", "A statistical metric for detecting distribution shifts between datasets", "A type of neural network layer"], correctAnswerIndex: 1 },
      { question: "What deployment pattern routes traffic to both old and new models simultaneously?", options: ["Canary Release", "Shadow Deployment", "Blue-Green"], correctAnswerIndex: 1 },
      { question: "What is KServe?", options: ["A Kubernetes-native model serving framework", "A feature store", "A data labeling tool"], correctAnswerIndex: 0 },
      { question: "What does NVIDIA MPS enable?", options: ["Training larger models", "Sharing GPUs across multiple model instances", "Faster data loading"], correctAnswerIndex: 1 },
      { question: "What is a Feature Store?", options: ["A database for storing model weights", "A centralized repository for storing, versioning, and serving ML features", "A frontend component library"], correctAnswerIndex: 1 },
      { question: "What problem does the 'Online Store' in a Feature Store solve?", options: ["Training speed", "Low-latency feature serving for real-time inference", "Data backup"], correctAnswerIndex: 1 },
      { question: "What is Feast?", options: ["A GPU cluster manager", "An open-source, vendor-neutral feature store", "A deep learning framework"], correctAnswerIndex: 1 },
      { question: "What is the Bronze Layer in Lakehouse architecture?", options: ["Aggregated features", "Raw ingested data in Delta format", "Trained models"], correctAnswerIndex: 1 },
      { question: "What is MLFlow Autologging?", options: ["Automatically writing code documentation", "Automatically capturing parameters, metrics, and artifacts for ML libraries", "Automatically scaling infrastructure"], correctAnswerIndex: 1 },
      { question: "What is a Canary Release?", options: ["Deploying to all users at once", "Gradually shifting traffic from old to new model", "Running tests before deployment"], correctAnswerIndex: 1 },
      { question: "What tool generates drift reports with visualizations?", options: ["MLFlow", "Evidently AI", "Docker"], correctAnswerIndex: 1 },
      { question: "What is the Gold Layer in Lakehouse architecture?", options: ["Raw data", "Cleaned data", "Aggregated features ready for training and serving"], correctAnswerIndex: 2 },
      { question: "Why is containerized training important?", options: ["It makes code run faster", "It ensures reproducibility across environments", "It reduces dataset size"], correctAnswerIndex: 1 },
      { question: "What metric should the capstone model's AUC exceed?", options: ["0.5", "0.75", "0.85"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 'c3',
    title: 'LLM Fine-Tuning & Alignment',
    description: 'Transform foundational models into domain-specific experts. Learn how to perform Parameter-Efficient Fine-Tuning (PEFT) using LoRA, QLoRA, and RLHF alignment.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    instructor: 'Yann LeCun',
    duration: '12h 00m',
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

### How LoRA Works Mathematically
For a weight matrix W of dimensions d × k:
- Instead of updating W directly, LoRA adds a low-rank decomposition: W' = W + BA
- Where B is d × r and A is r × k (r << min(d,k), typically r=8 or r=16)
- Only B and A are trained — dramatically reducing memory and compute requirements

### Choosing LoRA Hyperparameters
- **Rank (r):** Higher rank = more capacity but more parameters. Start with r=8
- **Alpha (α):** Scaling factor. Rule of thumb: α = 2×r
- **Target Modules:** Apply LoRA to attention projection matrices (q_proj, v_proj) for best results
- **Dropout:** Use 0.05-0.1 to prevent overfitting on small datasets
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

### The RLHF Pipeline
1. **Supervised Fine-Tuning (SFT):** Train the base model on high-quality instruction-response pairs
2. **Reward Model Training:** Train a separate model to score responses based on human preferences
3. **PPO Optimization:** Use Proximal Policy Optimization to fine-tune the SFT model against the reward model
4. **KL Divergence Penalty:** Prevent the model from diverging too far from the SFT baseline

### DPO Advantages
- No need for a separate reward model (single-stage training)
- No RL training loop (no PPO instability)
- Mathematically equivalent to RLHF under certain conditions
- Much simpler to implement and debug

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
      },
      {
        id: 'l3.3',
        title: 'QLoRA & Quantized Fine-Tuning',
        duration: '48m',
        videoId: 'HGOBQPFzWKo',
        readingMaterial: `
### What is QLoRA?
QLoRA combines quantization with LoRA to enable fine-tuning of massive models on consumer hardware:
- Load the base model in 4-bit precision (NF4 quantization)
- Add LoRA adapters in full precision (FP32/BF16)
- Only train the LoRA parameters while the base model stays quantized

### NormalFloat4 (NF4) Quantization
NF4 is an information-theoretically optimal quantization data type for normally distributed weights:
- Reduces memory by 4x compared to FP16
- Minimal quality degradation (< 0.5% on most benchmarks)
- Enables fine-tuning 65B parameter models on a single 48GB GPU

### Double Quantization
QLoRA uses double quantization to further reduce memory:
- Quantize the quantization constants themselves
- Saves an additional 0.37 bits per parameter
- Results in ~0.5GB savings for a 65B model

### Practical Setup
To fine-tune LLaMA 3 70B with QLoRA:
1. Load model with BitsAndBytes 4-bit config
2. Configure LoRA with r=16, alpha=32, target_modules=["q_proj", "v_proj", "k_proj", "o_proj"]
3. Use paged AdamW optimizer to handle memory spikes
4. Train with gradient checkpointing enabled
5. Merge LoRA weights back into base model for deployment
        `,
        quiz: {
          question: "What quantization data type does QLoRA use that is optimal for normally distributed weights?",
          options: ["INT8", "FP16", "NormalFloat4 (NF4)"],
          correctAnswerIndex: 2
        }
      },
      {
        id: 'l3.4',
        title: 'Dataset Curation & Instruction Tuning',
        duration: '40m',
        videoId: 'WUvTyaaNkzM',
        readingMaterial: `
### The Importance of Data Quality
"Garbage in, garbage out" applies even more strongly to LLM fine-tuning. Key principles:

### Instruction Dataset Formats
1. **Alpaca Format:** {"instruction": "...", "input": "...", "output": "..."}
2. **ShareGPT Format:** Multi-turn conversations with role labels
3. **OASST Format:** Tree-structured conversations with human ratings
4. **ChatML Format:** System/user/assistant message format used by OpenAI

### Data Curation Best Practices
- **Diversity:** Ensure your dataset covers all intended use cases
- **Quality over Quantity:** 5,000 high-quality examples often outperform 100,000 noisy ones
- **Decontamination:** Remove any test set samples from training data
- **Balance:** Avoid overrepresenting any single task or domain
- **Synthetic Data:** Use GPT-4 to generate initial instruction-following data, then human-edit

### Common Pitfalls
- Training on copyrighted or licensed data without permission
- Overfitting to a narrow set of prompt templates
- Catastrophic forgetting of the base model's general capabilities
- Not validating data quality before training (HTML artifacts, encoding issues)
        `,
        quiz: {
          question: "Which dataset format uses a tree-structured conversation with human ratings?",
          options: ["Alpaca Format", "OASST Format", "ChatML Format"],
          correctAnswerIndex: 1
        }
      },
      {
        id: 'l3.5',
        title: 'Evaluation & Benchmarking Fine-Tuned Models',
        duration: '38m',
        videoId: 'J8TgKxomS2g',
        readingMaterial: `
### Evaluating Fine-Tuned LLMs
Evaluation is critical but challenging for generative models.

### Automated Benchmarks
1. **MMLU (Massive Multitask Language Understanding):** 57 subjects, tests knowledge breadth
2. **HellaSwag:** Commonsense reasoning completion
3. **TruthfulQA:** Tests resistance to generating false but plausible answers
4. **HumanEval:** Code generation benchmark
5. **MT-Bench:** Multi-turn conversation quality rated by GPT-4

### LLM-as-a-Judge
Use a stronger LLM (GPT-4, Claude) to evaluate your fine-tuned model:
- Pairwise comparison against a baseline model
- Score rubrics for specific criteria (helpfulness, harmlessness, honesty)
- Multi-aspect evaluation (coherence, relevance, factuality)

### Custom Domain-Specific Evaluation
- Create a held-out test set of domain-specific questions
- Measure exact match, BLEU, ROUGE, and BertScore
- Conduct human evaluation with domain experts
- Track regression on general capabilities using a diverse evaluation suite

### Red Teaming
After fine-tuning, systematically test for:
- Jailbreak vulnerability (can the model be tricked into harmful outputs?)
- Bias amplification (did fine-tuning introduce or worsen biases?)
- Information leakage (does the model memorize training data verbatim?)
        `,
        quiz: {
          question: "Which benchmark tests an LLM's resistance to generating false but plausible answers?",
          options: ["MMLU", "TruthfulQA", "HumanEval"],
          correctAnswerIndex: 1
        }
      }
    ],
    exam: [
      { question: "What does LoRA stand for?", options: ["Large-scale Operational Retraining Architecture", "Low-Rank Adaptation", "Linear Output Regression Analysis"], correctAnswerIndex: 1 },
      { question: "In LoRA, what does the rank (r) parameter control?", options: ["The size of the vocabulary", "The capacity of the injected low-rank matrices", "The number of transformer layers"], correctAnswerIndex: 1 },
      { question: "What is the rule of thumb for setting LoRA alpha?", options: ["α = r / 2", "α = 2 × r", "α = r²"], correctAnswerIndex: 1 },
      { question: "What makes DPO simpler than RLHF?", options: ["It uses more data", "It eliminates the need for a separate reward model", "It trains faster GPUs"], correctAnswerIndex: 1 },
      { question: "What optimizer does PPO stand for?", options: ["Parallel Processing Optimization", "Proximal Policy Optimization", "Progressive Parameter Optimization"], correctAnswerIndex: 1 },
      { question: "What does QLoRA add to LoRA?", options: ["Quantum computing", "4-bit quantization of the base model", "Query optimization"], correctAnswerIndex: 1 },
      { question: "How much memory does NF4 quantization save compared to FP16?", options: ["2x", "4x", "8x"], correctAnswerIndex: 1 },
      { question: "What is Double Quantization?", options: ["Training with twice the data", "Quantizing the quantization constants themselves", "Using two different LoRA ranks"], correctAnswerIndex: 1 },
      { question: "Which instruction format uses 'system/user/assistant' role labels?", options: ["Alpaca Format", "OASST Format", "ChatML Format"], correctAnswerIndex: 2 },
      { question: "What is more effective: 5,000 high-quality or 100,000 noisy examples?", options: ["100,000 noisy examples", "5,000 high-quality examples", "They perform equally"], correctAnswerIndex: 1 },
      { question: "What is Catastrophic Forgetting?", options: ["When a model loses its general capabilities after fine-tuning on a narrow domain", "When training data gets deleted", "When GPUs overheat"], correctAnswerIndex: 0 },
      { question: "What does MMLU benchmark test?", options: ["Code generation", "Knowledge breadth across 57 subjects", "Image recognition"], correctAnswerIndex: 1 },
      { question: "What is the 'LLM-as-a-Judge' approach?", options: ["Using a human judge", "Using a stronger LLM to evaluate a fine-tuned model's outputs", "Having the model judge itself"], correctAnswerIndex: 1 },
      { question: "What does Red Teaming test for?", options: ["Model speed", "Vulnerabilities like jailbreaks, bias, and data leakage", "Database performance"], correctAnswerIndex: 1 },
      { question: "Which LoRA target modules are recommended for best results?", options: ["Embedding layers only", "Attention projection matrices (q_proj, v_proj)", "Feed-forward layers only"], correctAnswerIndex: 1 },
      { question: "What is the KL Divergence Penalty in RLHF?", options: ["A data augmentation technique", "A penalty to prevent the model from diverging too far from the SFT baseline", "A loss function for classification"], correctAnswerIndex: 1 },
      { question: "What GPU memory is needed for QLoRA on a 65B model?", options: ["8GB", "24GB", "48GB"], correctAnswerIndex: 2 },
      { question: "What is Supervised Fine-Tuning (SFT)?", options: ["Training on unlabeled data", "Training on high-quality instruction-response pairs", "Pre-training from scratch"], correctAnswerIndex: 1 },
      { question: "What is data decontamination?", options: ["Removing noise from audio", "Removing test set samples from training data", "Cleaning database tables"], correctAnswerIndex: 1 },
      { question: "What does MT-Bench evaluate?", options: ["Model training speed", "Multi-turn conversation quality", "Memory throughput"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 'c4',
    title: 'Generative AI & GANs for Video Architecture',
    description: 'Deep dive into Generative Adversarial Networks and Diffusion architectures. Learn how to generate look-alike pictures, stylized videos, and master deep latent spaces.',
    thumbnail: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600',
    instructor: 'Ian Goodfellow',
    duration: '14h 45m',
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

### Mathematical Foundation
The GAN objective is a minimax game:
- The Discriminator maximizes: E[log D(x)] + E[log(1 - D(G(z)))]
- The Generator minimizes: E[log(1 - D(G(z)))]

### Training Dynamics
- **Nash Equilibrium:** The theoretical endpoint where G produces perfect fakes and D outputs 0.5 for all inputs
- **Mode Collapse:** When G maps all noise vectors to a single output — a common failure mode
- **Training Instability:** GAN training is notoriously difficult, requiring careful hyperparameter tuning

### GAN Variants
1. **DCGAN:** Deep Convolutional GAN — first stable architecture using conv layers
2. **WGAN:** Wasserstein GAN — uses Earth Mover's distance for stable training
3. **StyleGAN:** NVIDIA's architecture for controllable, high-resolution face generation
4. **CycleGAN:** Unpaired image-to-image translation (e.g., horse → zebra)
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

### The Diffusion Process in Detail
1. **Forward Process (q):** Add noise at each timestep t according to a variance schedule β
2. **Reverse Process (p):** Learn to denoise, predicting the noise added at each step
3. **Sampling:** Start from pure noise and iteratively denoise to generate an image

### Key Innovations
- **DDPM (Denoising Diffusion Probabilistic Models):** The foundational architecture
- **DDIM:** Faster sampling with fewer denoising steps
- **Classifier-Free Guidance:** Trade diversity for quality using a guidance scale
- **Latent Diffusion (Stable Diffusion):** Run diffusion in a compressed latent space for efficiency

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
      },
      {
        id: 'l4.3',
        title: 'Stable Diffusion & Text-to-Image Architecture',
        duration: '55m',
        videoId: 'oBklltKXtDE',
        readingMaterial: `
### Stable Diffusion Architecture
Stable Diffusion consists of three main components:

1. **VAE (Variational Auto-Encoder):**
   - Encoder: Compresses a 512×512 image into a 64×64 latent representation
   - Decoder: Reconstructs the full image from the latent space
   - This 8x compression makes diffusion computationally feasible

2. **U-Net (Noise Predictor):**
   - Takes the noisy latent, timestep, and text embedding as input
   - Predicts the noise to subtract at each denoising step
   - Uses cross-attention layers to incorporate text conditioning

3. **CLIP Text Encoder:**
   - Converts text prompts into embeddings that guide the generation
   - Trained on 400M image-text pairs from the internet
   - Enables the model to understand complex descriptive prompts

### Samplers
Different sampling algorithms trade off speed vs quality:
- **Euler:** Fast, simple, good baseline
- **DPM++ 2M Karras:** High quality with fewer steps
- **UniPC:** State-of-the-art quality in 10-15 steps
- **DDIM:** Deterministic, good for reproducibility

### ControlNet
ControlNet adds spatial conditioning to Stable Diffusion:
- Depth maps, edge detection (Canny), pose estimation
- Enables precise control over composition while maintaining generation quality
- Trained as a plug-in module that doesn't modify the base model
        `,
        quiz: {
          question: "What is the role of the VAE in Stable Diffusion?",
          options: [
            "To generate text descriptions",
            "To compress images into a latent space and reconstruct them",
            "To classify images as real or fake"
          ],
          correctAnswerIndex: 1
        }
      },
      {
        id: 'l4.4',
        title: 'Video Generation: Sora & Beyond',
        duration: '48m',
        videoId: 'nkqpmkjYHRQ',
        readingMaterial: `
### Video Generation Architectures
Video generation extends image diffusion to the temporal dimension:

### OpenAI Sora Architecture
- Uses a **Diffusion Transformer (DiT)** instead of U-Net
- Operates in a spacetime latent space (spatial + temporal compression)
- Can generate up to 60 seconds of coherent, high-resolution video
- Trained on millions of hours of video data

### Key Challenges
1. **Temporal Consistency:** Objects must maintain identity across frames
2. **Physics Simulation:** Generated videos should obey physical laws
3. **Long-range Coherence:** Story and scene must remain consistent over time
4. **Computational Cost:** Video generation requires orders of magnitude more compute than images

### Alternative Approaches
- **Video LDM (Latent Diffusion Models):** Extend Stable Diffusion with temporal layers
- **Make-A-Video:** Meta's text-to-video model using image diffusion + temporal super-resolution
- **Gen-2 (Runway):** Production-ready video generation tool
- **AnimateDiff:** Open-source motion module for any Stable Diffusion model

### Evaluation Metrics
- **FVD (Fréchet Video Distance):** Video quality metric (lower is better)
- **Temporal Consistency Score:** Measures frame-to-frame smoothness
- **CLIP Score:** Measures text-video alignment
        `,
        quiz: {
          question: "What architecture does OpenAI's Sora use instead of U-Net?",
          options: [
            "Variational Auto-Encoder",
            "GAN Discriminator",
            "Diffusion Transformer (DiT)"
          ],
          correctAnswerIndex: 2
        }
      },
      {
        id: 'l4.5',
        title: 'Image Editing & Inpainting with AI',
        duration: '42m',
        videoId: '7LSMbLBwdKQ',
        readingMaterial: `
### AI-Powered Image Editing
Modern diffusion models enable powerful image manipulation:

### Inpainting
- Mask a region of an existing image
- The model generates new content for the masked area while maintaining coherence
- Applications: object removal, face restoration, background replacement

### Outpainting
- Extend an image beyond its original boundaries
- The model imagines what lies outside the frame
- Used for panorama generation and aspect ratio changes

### Image-to-Image Translation
- Provide a source image + text prompt to guide the transformation
- The denoising strength parameter controls how much the output differs from the input
- Low strength (0.2-0.4): Subtle modifications, preserving composition
- High strength (0.7-0.9): Major transformations, creative reinterpretation

### Advanced Techniques
1. **Textual Inversion:** Teach the model new concepts from 3-5 images
2. **DreamBooth:** Fine-tune the model to generate a specific subject
3. **IP-Adapter:** Condition generation on reference images instead of text
4. **InstantID:** Zero-shot identity-preserving face generation

### Ethics & Safety
- Deepfake detection and watermarking
- Content moderation and NSFW filtering
- Consent and copyright considerations
- Responsible disclosure practices
        `,
        quiz: {
          question: "What does 'inpainting' in AI image editing refer to?",
          options: [
            "Painting over an entire image with a new style",
            "Generating new content for a masked region while maintaining coherence",
            "Converting an image to grayscale"
          ],
          correctAnswerIndex: 1
        }
      }
    ],
    exam: [
      { question: "What are the two networks in a GAN?", options: ["Encoder and Decoder", "Generator and Discriminator", "Teacher and Student"], correctAnswerIndex: 1 },
      { question: "What is Mode Collapse in GANs?", options: ["When the model runs out of memory", "When the Generator produces the same output for all inputs", "When training takes too long"], correctAnswerIndex: 1 },
      { question: "What loss function does WGAN use?", options: ["Binary Cross-Entropy", "Earth Mover's (Wasserstein) Distance", "Mean Squared Error"], correctAnswerIndex: 1 },
      { question: "What is the Forward Process in Diffusion?", options: ["Generating an image from noise", "Progressively adding noise to an image", "Training the discriminator"], correctAnswerIndex: 1 },
      { question: "What network architecture predicts noise in DDPM?", options: ["ResNet", "U-Net", "VGG"], correctAnswerIndex: 1 },
      { question: "What does Classifier-Free Guidance trade?", options: ["Speed for accuracy", "Diversity for quality", "Memory for speed"], correctAnswerIndex: 1 },
      { question: "What compression ratio does Stable Diffusion's VAE achieve?", options: ["2x", "4x", "8x"], correctAnswerIndex: 2 },
      { question: "What is CLIP used for in Stable Diffusion?", options: ["Generating images", "Converting text prompts into embeddings for conditioning", "Upscaling output images"], correctAnswerIndex: 1 },
      { question: "What does ControlNet add to Stable Diffusion?", options: ["Faster training", "Spatial conditioning (depth, edges, pose)", "Text generation"], correctAnswerIndex: 1 },
      { question: "What architecture does Sora use?", options: ["U-Net", "Diffusion Transformer (DiT)", "LSTM"], correctAnswerIndex: 1 },
      { question: "What is FVD?", options: ["Fast Video Decoder", "Fréchet Video Distance (quality metric)", "Frame Validation Dataset"], correctAnswerIndex: 1 },
      { question: "What is inpainting?", options: ["Generating content for masked image regions", "Converting text to images", "Compressing video files"], correctAnswerIndex: 0 },
      { question: "What is outpainting?", options: ["Removing the background", "Extending an image beyond its original boundaries", "Detecting fake images"], correctAnswerIndex: 1 },
      { question: "What does denoising strength control in img2img?", options: ["Output resolution", "How much the output differs from the input", "The number of objects generated"], correctAnswerIndex: 1 },
      { question: "What is DreamBooth?", options: ["A VR headset", "A technique to fine-tune diffusion models on specific subjects", "A video editing tool"], correctAnswerIndex: 1 },
      { question: "What does Textual Inversion achieve?", options: ["Translating text between languages", "Teaching the model new visual concepts from few images", "Inverting the diffusion process"], correctAnswerIndex: 1 },
      { question: "What GAN variant enables unpaired image-to-image translation?", options: ["DCGAN", "StyleGAN", "CycleGAN"], correctAnswerIndex: 2 },
      { question: "What is the Nash Equilibrium in GAN training?", options: ["When loss reaches zero", "When the Generator produces perfect fakes and the Discriminator outputs 0.5", "When training stops automatically"], correctAnswerIndex: 1 },
      { question: "What is the key challenge in video generation?", options: ["File size", "Temporal consistency across frames", "Audio synchronization"], correctAnswerIndex: 1 },
      { question: "What does latent diffusion do differently?", options: ["Uses text instead of images", "Runs diffusion in a compressed latent space instead of pixel space", "Generates 3D models"], correctAnswerIndex: 1 }
    ]
  }
];
