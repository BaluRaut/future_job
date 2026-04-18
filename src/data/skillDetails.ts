import type { Skill } from './skills';

export interface SkillResource {
  /** Common tools / libraries practitioners use */
  tools: string[];
  /** Core concepts to internalize */
  concepts: string[];
  /** Curated free / well-known learning links */
  resources: { title: string; url: string }[];
}

/** Map by skill id → "common things" to learn under each skill */
export const SKILL_DETAILS: Record<number, SkillResource> = {
  1: {
    tools: ['GPT-4o / o1', 'Claude 3.5 Sonnet', 'Llama 3', 'Gemini 1.5', 'Mistral'],
    concepts: ['Tokens & context windows', 'Temperature / top-p', 'Function/tool calling', 'JSON mode', 'Multimodality'],
    resources: [
      { title: 'Andrej Karpathy — Intro to LLMs', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
      { title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/' },
      { title: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library/library' },
    ],
  },
  2: {
    tools: ['Python 3.12', 'uv / poetry', 'pydantic', 'FastAPI', 'pytest', 'ruff'],
    concepts: ['Type hints', 'Async/await', 'Decorators', 'Context managers', 'Virtual environments'],
    resources: [
      { title: 'Real Python — Tutorials', url: 'https://realpython.com/' },
      { title: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com/' },
      { title: 'Pydantic v2 Docs', url: 'https://docs.pydantic.dev/' },
    ],
  },
  3: {
    tools: ['LangChain Hub', 'PromptLayer', 'Promptfoo', 'OpenAI Playground'],
    concepts: ['Zero/few-shot', 'Chain-of-thought', 'ReAct pattern', 'Structured output', 'Self-consistency'],
    resources: [
      { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/' },
      { title: 'OpenAI Prompt Engineering', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
      { title: 'DeepLearning.AI — ChatGPT Prompt Eng.', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    ],
  },
  4: {
    tools: ['openai SDK', 'anthropic SDK', 'litellm', 'Instructor', 'tiktoken'],
    concepts: ['Streaming', 'Tool/function calling', 'Rate limits & retries', 'Cost tracking', 'Structured outputs (JSON schema)'],
    resources: [
      { title: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' },
      { title: 'Anthropic API Docs', url: 'https://docs.anthropic.com/' },
      { title: 'Instructor Library', url: 'https://python.useinstructor.com/' },
    ],
  },
  5: {
    tools: ['Excalidraw', 'Mermaid', 'Postman', 'k6 / locust'],
    concepts: ['Load balancing', 'Caching layers', 'Queues & workers', 'Sharding', 'Rate limiting', 'CAP theorem'],
    resources: [
      { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'ByteByteGo — System Design 101', url: 'https://github.com/ByteByteGoHq/system-design-101' },
      { title: 'High Scalability Blog', url: 'http://highscalability.com/' },
    ],
  },
  6: {
    tools: ['LangGraph', 'CrewAI', 'AutoGen', 'OpenAI Agents SDK', 'Pydantic AI'],
    concepts: ['Tool use', 'Planning loops', 'Multi-agent orchestration', 'Memory', 'Reflection / critique loops'],
    resources: [
      { title: 'LangGraph Docs', url: 'https://langchain-ai.github.io/langgraph/' },
      { title: 'OpenAI Agents SDK', url: 'https://openai.github.io/openai-agents-python/' },
      { title: 'Anthropic — Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
    ],
  },
  7: {
    tools: ['LlamaIndex', 'LangChain', 'Haystack', 'Unstructured.io', 'Cohere Rerank'],
    concepts: ['Embeddings', 'Chunking strategies', 'Hybrid search (BM25 + vector)', 'Reranking', 'Evaluation (RAGAS)'],
    resources: [
      { title: 'LlamaIndex Learn', url: 'https://docs.llamaindex.ai/en/stable/' },
      { title: 'Pinecone — RAG Handbook', url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/' },
      { title: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
    ],
  },
  8: {
    tools: ['LangChain', 'LangGraph', 'LlamaIndex', 'Haystack', 'Semantic Kernel'],
    concepts: ['Chains vs graphs', 'Memory modules', 'Callbacks', 'Tool registries', 'Streaming pipelines'],
    resources: [
      { title: 'LangChain Docs', url: 'https://python.langchain.com/' },
      { title: 'LangChain Academy (free)', url: 'https://academy.langchain.com/' },
    ],
  },
  9: {
    tools: ['Bedrock', 'SageMaker', 'Lambda', 'S3', 'ECS/EKS', 'CloudWatch'],
    concepts: ['IAM & roles', 'VPC basics', 'Serverless compute', 'Managed inference', 'Cost optimization'],
    resources: [
      { title: 'AWS Skill Builder (free tier)', url: 'https://skillbuilder.aws/' },
      { title: 'Bedrock User Guide', url: 'https://docs.aws.amazon.com/bedrock/' },
      { title: 'Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/' },
    ],
  },
  10: {
    tools: ['MLflow', 'DVC', 'BentoML', 'KServe', 'Weights & Biases', 'Kubeflow'],
    concepts: ['Experiment tracking', 'Model registry', 'CI/CD for ML', 'Drift detection', 'Shadow deploys'],
    resources: [
      { title: 'Made With ML — MLOps Course', url: 'https://madewithml.com/' },
      { title: 'Google MLOps Whitepaper', url: 'https://cloud.google.com/resources/mlops-whitepaper' },
      { title: 'MLOps Community', url: 'https://mlops.community/' },
    ],
  },
  11: {
    tools: ['RAGAS', 'DeepEval', 'Promptfoo', 'TruLens', 'OpenAI Evals'],
    concepts: ['Golden datasets', 'LLM-as-judge', 'Faithfulness / groundedness', 'Regression testing', 'A/B evaluation'],
    resources: [
      { title: 'RAGAS Docs', url: 'https://docs.ragas.io/' },
      { title: 'OpenAI Evals (GitHub)', url: 'https://github.com/openai/evals' },
      { title: 'Hamel Husain — Eval Guide', url: 'https://hamel.dev/blog/posts/evals/' },
    ],
  },
  12: {
    tools: ['LangSmith', 'Langfuse', 'Arize Phoenix', 'Helicone', 'OpenTelemetry'],
    concepts: ['Trace spans', 'Token-level cost tracking', 'Prompt versioning', 'Latency budgets', 'Error replay'],
    resources: [
      { title: 'Langfuse Docs', url: 'https://langfuse.com/docs' },
      { title: 'Arize Phoenix (open-source)', url: 'https://docs.arize.com/phoenix' },
    ],
  },
  13: {
    tools: ['pgvector', 'Pinecone', 'Weaviate', 'Qdrant', 'Chroma', 'Milvus'],
    concepts: ['HNSW / IVF indexes', 'Cosine vs dot-product', 'Hybrid search', 'Metadata filtering', 'Sharding'],
    resources: [
      { title: 'pgvector (GitHub)', url: 'https://github.com/pgvector/pgvector' },
      { title: 'Pinecone Learn', url: 'https://www.pinecone.io/learn/' },
      { title: 'Qdrant Tutorials', url: 'https://qdrant.tech/documentation/tutorials/' },
    ],
  },
  14: {
    tools: ['Guardrails AI', 'NeMo Guardrails', 'Llama Guard', 'Lakera Guard'],
    concepts: ['PII redaction', 'Jailbreak detection', 'Output validation', 'HITL escalation', 'Refusal handling'],
    resources: [
      { title: 'Guardrails AI Docs', url: 'https://www.guardrailsai.com/docs' },
      { title: 'NeMo Guardrails', url: 'https://docs.nvidia.com/nemo/guardrails/' },
      { title: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
    ],
  },
  15: {
    tools: ['spaCy', 'NLTK', 'HuggingFace Transformers', 'sentence-transformers'],
    concepts: ['Tokenization', 'Embeddings', 'NER', 'Sentiment', 'Classical vs neural NLP'],
    resources: [
      { title: 'HuggingFace NLP Course (free)', url: 'https://huggingface.co/learn/nlp-course' },
      { title: 'spaCy 101', url: 'https://spacy.io/usage/spacy-101' },
    ],
  },
  16: {
    tools: ['Vertex AI', 'Cloud Run', 'BigQuery', 'GKE', 'Cloud Functions'],
    concepts: ['IAM', 'Service accounts', 'Vertex pipelines', 'Gemini API', 'Cost controls'],
    resources: [
      { title: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/' },
      { title: 'Vertex AI Docs', url: 'https://cloud.google.com/vertex-ai/docs' },
    ],
  },
  17: {
    tools: ['Azure OpenAI', 'AI Foundry', 'Azure Functions', 'AKS', 'Cosmos DB'],
    concepts: ['Resource groups', 'RBAC', 'Managed identities', 'Private endpoints'],
    resources: [
      { title: 'Microsoft Learn — AI Engineer', url: 'https://learn.microsoft.com/en-us/training/career-paths/ai-engineer' },
      { title: 'Azure OpenAI Docs', url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/' },
    ],
  },
  18: {
    tools: ['PostgreSQL 16', 'Redis 7', 'pgAdmin', 'TimescaleDB', 'BullMQ'],
    concepts: ['Indexes (B-tree, GIN, HNSW)', 'Transactions', 'Pub/sub', 'Caching strategies', 'Connection pooling'],
    resources: [
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' },
      { title: 'Redis University (free)', url: 'https://university.redis.com/' },
      { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/' },
    ],
  },
  19: {
    tools: ['OneTrust', 'Microsoft Purview', 'Privado.ai'],
    concepts: ['GDPR principles', 'CCPA', 'Data residency', 'PII classification', 'AI Act (EU)'],
    resources: [
      { title: 'GDPR Official Text', url: 'https://gdpr-info.eu/' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
  },
  20: {
    tools: ['TypeScript 5', 'Node 22', 'Vite', 'tsx', 'Zod'],
    concepts: ['Generics', 'Discriminated unions', 'Utility types', 'Module resolution', 'Strict mode'],
    resources: [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { title: 'Total TypeScript (free tier)', url: 'https://www.totaltypescript.com/' },
    ],
  },
  21: {
    tools: ['Apache Spark', 'Apache Beam', 'Dataflow', 'Databricks', 'Polars'],
    concepts: ['DAGs', 'Windowing', 'Shuffles', 'Partitioning', 'Stream vs batch'],
    resources: [
      { title: 'Spark — The Definitive Guide (Databricks)', url: 'https://www.databricks.com/resources/ebook/learning-spark-2nd-edition' },
      { title: 'Apache Beam Programming Guide', url: 'https://beam.apache.org/documentation/programming-guide/' },
    ],
  },
  22: {
    tools: ['Hugging Face TRL', 'Axolotl', 'Unsloth', 'PEFT', 'DeepSpeed'],
    concepts: ['LoRA / QLoRA', 'SFT vs DPO vs RLHF', 'Reward models', 'Evaluation harnesses'],
    resources: [
      { title: 'HuggingFace TRL Docs', url: 'https://huggingface.co/docs/trl' },
      { title: 'Sebastian Raschka — LLM Fine-tuning', url: 'https://magazine.sebastianraschka.com/p/finetuning-llms-with-adapters' },
    ],
  },
  23: {
    tools: ['React 19', 'Vite', 'TanStack Query', 'Zustand', 'shadcn/ui'],
    concepts: ['Hooks', 'Suspense', 'Server components', 'State management', 'Accessibility'],
    resources: [
      { title: 'React Docs (new)', url: 'https://react.dev/' },
      { title: 'Patterns.dev', url: 'https://www.patterns.dev/' },
    ],
  },
  24: {
    tools: ['Node 22', 'Express', 'Fastify', 'NestJS', 'Hono'],
    concepts: ['Event loop', 'Streams', 'Worker threads', 'Middleware', 'JWT/auth'],
    resources: [
      { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs' },
      { title: 'Node.js Best Practices (GitHub)', url: 'https://github.com/goldbergyoni/nodebestpractices' },
    ],
  },
  25: {
    tools: ['MongoDB Atlas', 'Mongoose', 'mongosh', 'Compass'],
    concepts: ['Schema design', 'Aggregation pipelines', 'Indexes', 'Replica sets'],
    resources: [
      { title: 'MongoDB University (free)', url: 'https://learn.mongodb.com/' },
    ],
  },
  26: {
    tools: ['Elasticsearch 8', 'OpenSearch', 'Kibana', 'Logstash'],
    concepts: ['Inverted index', 'Analyzers', 'Mappings', 'Aggregations', 'Hybrid (vector + BM25)'],
    resources: [
      { title: 'Elasticsearch Docs', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html' },
      { title: 'Relevant Search (book)', url: 'https://www.manning.com/books/relevant-search' },
    ],
  },
};

/** Helper to fetch details, returning a safe default if missing */
export function getSkillDetails(skill: Skill): SkillResource {
  return (
    SKILL_DETAILS[skill.id] ?? {
      tools: [],
      concepts: [],
      resources: [],
    }
  );
}
