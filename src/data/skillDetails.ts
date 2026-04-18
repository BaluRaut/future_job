import type { Skill } from './skills';

export interface VerifyCheck {
  /** A concrete, testable outcome you can demo */
  text: string;
}

export interface SkillResource {
  /** Sentence-wise learning steps — read top-to-bottom */
  whatToLearn: string[];
  /** Common tools / libraries practitioners use */
  tools: string[];
  /** Core concepts to internalize */
  concepts: string[];
  /** Curated free / well-known learning links */
  resources: { title: string; url: string }[];
  /** Concrete checks that prove you've learned it */
  verify: VerifyCheck[];
  /** Approximate effort to reach working competence */
  timeEstimate: string;
  /** A small portfolio project you can build to anchor the skill */
  miniProject?: string;
}

/** Map by skill id → details */
export const SKILL_DETAILS: Record<number, SkillResource> = {
  1: {
    timeEstimate: '~2 weeks (10–15 hrs)',
    whatToLearn: [
      'Start by understanding what an LLM actually is — a next-token predictor trained on internet-scale text.',
      'Learn how prompts get tokenized and why the context window limits what the model can "see".',
      'Practice calling a hosted model (GPT-4o or Claude) using the official SDK from Python.',
      'Compare temperature, top-p, max-tokens, and stop sequences by running the same prompt with different values.',
      'Move on to function/tool calling so the model can return structured JSON your code can consume.',
      'Finish with multimodal inputs (image + text) and streaming responses to feel the full surface area.',
    ],
    tools: ['GPT-4o / o1', 'Claude 3.5 Sonnet', 'Llama 3', 'Gemini 1.5', 'Mistral'],
    concepts: ['Tokens & context windows', 'Temperature / top-p', 'Function/tool calling', 'JSON mode', 'Multimodality'],
    resources: [
      { title: 'Andrej Karpathy — Intro to LLMs', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
      { title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/' },
      { title: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library/library' },
    ],
    verify: [
      { text: 'Explain in 60 seconds why "garbage in, garbage out" applies more to LLMs than classical ML.' },
      { text: 'Build a CLI that takes a question, calls an LLM with streaming, and prints tokens live.' },
      { text: 'Use function calling to make the model return a typed JSON object that your script then validates.' },
    ],
    miniProject: 'Build a "Ask my PDF" CLI that streams answers and cites the page number.',
  },
  2: {
    timeEstimate: '~3 weeks (20+ hrs) if new; refresh in days',
    whatToLearn: [
      'Install Python 3.12 and learn to manage isolated environments with `uv` or `poetry`.',
      'Master types, dataclasses, and pydantic models — they are the contract layer of modern Python.',
      'Get fluent with async/await, since most AI APIs and web servers are async.',
      'Write small FastAPI services and test them with pytest to lock in good engineering habits.',
      'Learn `ruff` and `mypy` so your code stays formatted, linted, and type-safe by default.',
    ],
    tools: ['Python 3.12', 'uv / poetry', 'pydantic', 'FastAPI', 'pytest', 'ruff'],
    concepts: ['Type hints', 'Async/await', 'Decorators', 'Context managers', 'Virtual environments'],
    resources: [
      { title: 'Real Python — Tutorials', url: 'https://realpython.com/' },
      { title: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com/' },
      { title: 'Pydantic v2 Docs', url: 'https://docs.pydantic.dev/' },
    ],
    verify: [
      { text: 'Spin up a FastAPI server in under 5 minutes with a typed request/response model.' },
      { text: 'Write an async function that calls 3 APIs in parallel using `asyncio.gather`.' },
      { text: 'Run `ruff` + `mypy` on your repo with zero errors.' },
    ],
    miniProject: 'A typed REST wrapper around the OpenAI API with retries, timeouts, and tests.',
  },
  3: {
    timeEstimate: '~1 week (8 hrs)',
    whatToLearn: [
      'Internalize the anatomy of a good prompt: system role, task, constraints, examples, and output format.',
      'Practice zero-shot, few-shot, and chain-of-thought prompting on real tasks like classification and extraction.',
      'Learn to force structured outputs using JSON mode or response_format with a schema.',
      'Adopt prompt versioning early — track diffs the same way you track code.',
      'Run side-by-side comparisons with Promptfoo so you can prove one prompt is better than another.',
    ],
    tools: ['LangChain Hub', 'PromptLayer', 'Promptfoo', 'OpenAI Playground'],
    concepts: ['Zero/few-shot', 'Chain-of-thought', 'ReAct pattern', 'Structured output', 'Self-consistency'],
    resources: [
      { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/' },
      { title: 'OpenAI Prompt Engineering', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
      { title: 'DeepLearning.AI — ChatGPT Prompt Eng.', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    ],
    verify: [
      { text: 'Take a vague prompt and rewrite it to score >90% on a 50-row evaluation set.' },
      { text: 'Force the model to output a strict JSON schema and have your code reject malformed responses.' },
      { text: 'Show two prompts compared in Promptfoo with cost, latency, and quality numbers.' },
    ],
    miniProject: 'A resume → JSON parser that nails 9/10 fields across 20 sample resumes.',
  },
  4: {
    timeEstimate: '~1 week (6 hrs)',
    whatToLearn: [
      'Read the OpenAI and Anthropic API references end-to-end — they are short and powerful.',
      'Wrap the official SDK with retries, exponential backoff, and timeouts.',
      'Implement streaming so users see tokens as they arrive, not after.',
      'Learn token counting with `tiktoken` to stay inside context limits and budget cost.',
      'Use `instructor` or `outlines` to coerce responses into validated Pydantic models.',
    ],
    tools: ['openai SDK', 'anthropic SDK', 'litellm', 'Instructor', 'tiktoken'],
    concepts: ['Streaming', 'Tool/function calling', 'Rate limits & retries', 'Cost tracking', 'Structured outputs (JSON schema)'],
    resources: [
      { title: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' },
      { title: 'Anthropic API Docs', url: 'https://docs.anthropic.com/' },
      { title: 'Instructor Library', url: 'https://python.useinstructor.com/' },
    ],
    verify: [
      { text: 'Build a chat endpoint that streams SSE tokens to a browser.' },
      { text: 'Log per-call cost and token counts to a CSV after a 100-call test.' },
      { text: 'Switch providers (OpenAI ↔ Anthropic) by changing one config line via LiteLLM.' },
    ],
    miniProject: 'A streaming, cost-aware chatbot backend with provider fail-over.',
  },
  5: {
    timeEstimate: '~4 weeks of reading + practice',
    whatToLearn: [
      'Study the classic building blocks: load balancers, caches, queues, databases, CDNs.',
      'Learn how to estimate QPS, storage, and latency budgets on the back of a napkin.',
      'Walk through 10 real-world designs (Twitter feed, URL shortener, chat, RAG service) on paper or Excalidraw.',
      'Understand failure modes: hot partitions, thundering herd, retry storms, cache stampedes.',
      'Practice trade-off thinking — there is no "right" design, only ones tuned to constraints.',
    ],
    tools: ['Excalidraw', 'Mermaid', 'Postman', 'k6 / locust'],
    concepts: ['Load balancing', 'Caching layers', 'Queues & workers', 'Sharding', 'Rate limiting', 'CAP theorem'],
    resources: [
      { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'ByteByteGo — System Design 101', url: 'https://github.com/ByteByteGoHq/system-design-101' },
      { title: 'High Scalability Blog', url: 'http://highscalability.com/' },
    ],
    verify: [
      { text: 'Whiteboard a chat product for 10M users in 45 minutes including DB, cache, and queue choices.' },
      { text: 'Explain why a system needs a queue between two specific services in your design.' },
      { text: 'Run a `k6` load test that proves your service holds 200 RPS with p95 < 300 ms.' },
    ],
    miniProject: 'Design + load-test a URL shortener: nginx → app → Redis → Postgres.',
  },
  6: {
    timeEstimate: '~3 weeks (15–20 hrs)',
    whatToLearn: [
      'Begin with the simplest agent possible: an LLM in a loop that picks one of N tools.',
      'Move to multi-step planning where the model decomposes a goal into sub-tasks.',
      'Add memory — short-term (scratchpad) and long-term (vector store) — and observe behavior changes.',
      'Build a multi-agent system (e.g. researcher + writer + critic) using LangGraph or CrewAI.',
      'Always pair agents with evals; without them you will not know if changes help or hurt.',
    ],
    tools: ['LangGraph', 'CrewAI', 'AutoGen', 'OpenAI Agents SDK', 'Pydantic AI'],
    concepts: ['Tool use', 'Planning loops', 'Multi-agent orchestration', 'Memory', 'Reflection / critique loops'],
    resources: [
      { title: 'LangGraph Docs', url: 'https://langchain-ai.github.io/langgraph/' },
      { title: 'OpenAI Agents SDK', url: 'https://openai.github.io/openai-agents-python/' },
      { title: 'Anthropic — Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
    ],
    verify: [
      { text: 'Ship an agent that browses the web, scrapes 3 pages, and produces a cited summary.' },
      { text: 'Demonstrate a critic agent that improves a writer agent\'s output by ≥20% on your eval set.' },
      { text: 'Show traces in LangSmith / Langfuse explaining why the agent picked each tool.' },
    ],
    miniProject: 'A "weekly digest" agent that monitors sources, dedupes, and emails a summary.',
  },
  7: {
    timeEstimate: '~2 weeks (15 hrs)',
    whatToLearn: [
      'Build a naive RAG pipeline first: load → chunk → embed → store → retrieve → generate.',
      'Compare chunking strategies (fixed-size vs semantic) and measure retrieval recall.',
      'Add hybrid search by combining BM25 with vector similarity — almost always wins.',
      'Insert a reranker (Cohere or bge-reranker) on top-50 candidates to get top-5.',
      'Evaluate everything with RAGAS so you can prove faithfulness and context precision.',
    ],
    tools: ['LlamaIndex', 'LangChain', 'Haystack', 'Unstructured.io', 'Cohere Rerank'],
    concepts: ['Embeddings', 'Chunking strategies', 'Hybrid search (BM25 + vector)', 'Reranking', 'Evaluation (RAGAS)'],
    resources: [
      { title: 'LlamaIndex Learn', url: 'https://docs.llamaindex.ai/en/stable/' },
      { title: 'Pinecone — RAG Handbook', url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/' },
      { title: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
    ],
    verify: [
      { text: 'Index 1,000 PDFs and answer 50 ground-truth questions with ≥0.8 RAGAS faithfulness.' },
      { text: 'Show citations in the UI that link back to the exact chunk and source.' },
      { text: 'Demonstrate hybrid search beating pure-vector on your eval set with numbers.' },
    ],
    miniProject: 'Internal docs Q&A bot with citations, hybrid search, and a reranker.',
  },
  8: {
    timeEstimate: '~1 week (8 hrs)',
    whatToLearn: [
      'Understand why orchestration exists: state, retries, branching, and observability across many LLM calls.',
      'Build the same pipeline twice — once in raw Python, once in LangGraph — to feel the trade-offs.',
      'Learn LangGraph state machines and conditional edges; this is where orchestration earns its keep.',
      'Wire up tracing (LangSmith / Langfuse) from day one so you can see every node\'s input/output.',
      'Resist the urge to abstract too early — frameworks shine on graphs of 5+ nodes, not on single calls.',
    ],
    tools: ['LangChain', 'LangGraph', 'LlamaIndex', 'Haystack', 'Semantic Kernel'],
    concepts: ['Chains vs graphs', 'Memory modules', 'Callbacks', 'Tool registries', 'Streaming pipelines'],
    resources: [
      { title: 'LangChain Docs', url: 'https://python.langchain.com/' },
      { title: 'LangChain Academy (free)', url: 'https://academy.langchain.com/' },
    ],
    verify: [
      { text: 'Build a LangGraph workflow with at least one conditional branch and one retry loop.' },
      { text: 'Show end-to-end traces in LangSmith for every run.' },
      { text: 'Refactor a 200-line orchestrator into a clean LangGraph and explain the trade-offs.' },
    ],
    miniProject: 'A LangGraph "support triage" workflow: classify → enrich → respond → escalate.',
  },
  9: {
    timeEstimate: '~3 weeks for working AWS literacy',
    whatToLearn: [
      'Learn the IAM model first — almost every AWS bug eventually traces back to a permission.',
      'Get comfortable with S3, Lambda, CloudWatch, and one compute option (ECS Fargate or EKS).',
      'Use AWS Bedrock to call hosted Claude / Llama and compare to OpenAI for cost and latency.',
      'Practice deploying a FastAPI app behind API Gateway → Lambda or ALB → ECS.',
      'Set budgets and CloudWatch alarms early; AWS punishes the unaware quickly.',
    ],
    tools: ['Bedrock', 'SageMaker', 'Lambda', 'S3', 'ECS/EKS', 'CloudWatch'],
    concepts: ['IAM & roles', 'VPC basics', 'Serverless compute', 'Managed inference', 'Cost optimization'],
    resources: [
      { title: 'AWS Skill Builder (free tier)', url: 'https://skillbuilder.aws/' },
      { title: 'Bedrock User Guide', url: 'https://docs.aws.amazon.com/bedrock/' },
      { title: 'Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/' },
    ],
    verify: [
      { text: 'Deploy a FastAPI service to ECS Fargate behind an ALB with HTTPS, end-to-end.' },
      { text: 'Call Bedrock from your service with a least-privilege IAM role.' },
      { text: 'Pass the AWS Cloud Practitioner sample exam (>=80%).' },
    ],
    miniProject: 'A serverless RAG API on AWS: S3 (docs) → Lambda (ingest) → OpenSearch → Bedrock.',
  },
  10: {
    timeEstimate: '~4 weeks (20+ hrs)',
    whatToLearn: [
      'Understand the ML lifecycle: data → train → register → deploy → monitor → retrain.',
      'Use MLflow or W&B to track experiments — never train without a tracker again.',
      'Learn one model serving framework (BentoML, KServe, or FastAPI + Docker) deeply.',
      'Add monitoring: latency, throughput, drift detection, and prediction quality.',
      'Automate retraining with simple CI/CD (GitHub Actions) before reaching for Kubeflow.',
    ],
    tools: ['MLflow', 'DVC', 'BentoML', 'KServe', 'Weights & Biases', 'Kubeflow'],
    concepts: ['Experiment tracking', 'Model registry', 'CI/CD for ML', 'Drift detection', 'Shadow deploys'],
    resources: [
      { title: 'Made With ML — MLOps Course', url: 'https://madewithml.com/' },
      { title: 'Google MLOps Whitepaper', url: 'https://cloud.google.com/resources/mlops-whitepaper' },
      { title: 'MLOps Community', url: 'https://mlops.community/' },
    ],
    verify: [
      { text: 'Push a model to MLflow registry and serve it from BentoML or FastAPI.' },
      { text: 'Demonstrate a CI pipeline that retrains and redeploys on data drift.' },
      { text: 'Run a shadow deploy that compares old vs new model on live traffic.' },
    ],
    miniProject: 'End-to-end "house price" model: train → register → deploy → monitor → retrain.',
  },
  11: {
    timeEstimate: '~1 week (8 hrs)',
    whatToLearn: [
      'Accept the rule: if you cannot measure it, you cannot improve it. Build a golden dataset first.',
      'Pick metrics that match your task (faithfulness for RAG, exact-match for extraction, BLEU/ROUGE for summarization).',
      'Use LLM-as-judge carefully — it is fast but biased; cross-check with humans on samples.',
      'Wire evals into CI so a prompt or model change cannot regress without a red light.',
      'Track results over time so you can show "we went from 72% → 89% in 6 weeks".',
    ],
    tools: ['RAGAS', 'DeepEval', 'Promptfoo', 'TruLens', 'OpenAI Evals'],
    concepts: ['Golden datasets', 'LLM-as-judge', 'Faithfulness / groundedness', 'Regression testing', 'A/B evaluation'],
    resources: [
      { title: 'RAGAS Docs', url: 'https://docs.ragas.io/' },
      { title: 'OpenAI Evals (GitHub)', url: 'https://github.com/openai/evals' },
      { title: 'Hamel Husain — Eval Guide', url: 'https://hamel.dev/blog/posts/evals/' },
    ],
    verify: [
      { text: 'Create a 100-row golden dataset and run it nightly via GitHub Actions.' },
      { text: 'Show a dashboard that tracks ≥3 metrics per LLM feature over time.' },
      { text: 'Catch a regression in CI before it hits production.' },
    ],
    miniProject: 'A "prompt CI" repo where every PR runs Promptfoo and posts a diff comment.',
  },
  12: {
    timeEstimate: '~1 week (6 hrs)',
    whatToLearn: [
      'Instrument every LLM call with a trace ID, model name, prompt, response, tokens, and latency.',
      'Pick one tool (Langfuse is open-source and easy) and wire it into all calls within a day.',
      'Add cost dashboards so you can answer "how much did feature X cost yesterday?" in 10 seconds.',
      'Set alerts on latency p95 and error rate — silent failures are common with LLMs.',
      'Use traces to debug agent behavior; this is the single biggest productivity unlock.',
    ],
    tools: ['LangSmith', 'Langfuse', 'Arize Phoenix', 'Helicone', 'OpenTelemetry'],
    concepts: ['Trace spans', 'Token-level cost tracking', 'Prompt versioning', 'Latency budgets', 'Error replay'],
    resources: [
      { title: 'Langfuse Docs', url: 'https://langfuse.com/docs' },
      { title: 'Arize Phoenix (open-source)', url: 'https://docs.arize.com/phoenix' },
    ],
    verify: [
      { text: 'View a full trace tree for any production request within 30 seconds.' },
      { text: 'Show a cost-per-feature graph for the last 30 days.' },
      { text: 'Reproduce a bad output by replaying a trace locally.' },
    ],
    miniProject: 'Add Langfuse to your existing chatbot and ship dashboards for cost + latency.',
  },
  13: {
    timeEstimate: '~1 week (6 hrs)',
    whatToLearn: [
      'Understand embeddings as points in high-dimensional space and similarity as distance.',
      'Start with `pgvector` if you already use Postgres; reach for Pinecone/Qdrant only at scale.',
      'Learn the difference between HNSW and IVF indexes and when each one wins.',
      'Always combine vector search with metadata filtering (tenant, date, type).',
      'Benchmark recall and latency before picking a DB — defaults are rarely optimal.',
    ],
    tools: ['pgvector', 'Pinecone', 'Weaviate', 'Qdrant', 'Chroma', 'Milvus'],
    concepts: ['HNSW / IVF indexes', 'Cosine vs dot-product', 'Hybrid search', 'Metadata filtering', 'Sharding'],
    resources: [
      { title: 'pgvector (GitHub)', url: 'https://github.com/pgvector/pgvector' },
      { title: 'Pinecone Learn', url: 'https://www.pinecone.io/learn/' },
      { title: 'Qdrant Tutorials', url: 'https://qdrant.tech/documentation/tutorials/' },
    ],
    verify: [
      { text: 'Index 100k vectors with HNSW and query at p95 < 50 ms.' },
      { text: 'Filter results by metadata (e.g. user_id) and prove no cross-tenant leakage.' },
      { text: 'Show recall@10 numbers comparing flat vs HNSW vs IVF on your dataset.' },
    ],
    miniProject: 'Migrate a JSON-file "search" feature to pgvector and measure speed-up.',
  },
  14: {
    timeEstimate: '~1 week (6 hrs)',
    whatToLearn: [
      'Treat the LLM as untrusted — assume it can leak PII, hallucinate, or be jailbroken.',
      'Add input filters (PII, prompt injection) and output validators (schema, banned topics).',
      'Use Llama Guard or Lakera Guard for content moderation before display.',
      'Design human-in-the-loop fallbacks for low-confidence decisions instead of guessing.',
      'Read OWASP Top 10 for LLMs and audit your app against each item.',
    ],
    tools: ['Guardrails AI', 'NeMo Guardrails', 'Llama Guard', 'Lakera Guard'],
    concepts: ['PII redaction', 'Jailbreak detection', 'Output validation', 'HITL escalation', 'Refusal handling'],
    resources: [
      { title: 'Guardrails AI Docs', url: 'https://www.guardrailsai.com/docs' },
      { title: 'NeMo Guardrails', url: 'https://docs.nvidia.com/nemo/guardrails/' },
      { title: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
    ],
    verify: [
      { text: 'Block a prompt-injection attack in your demo and show the audit log.' },
      { text: 'Redact PII from a sample document before sending it to the LLM.' },
      { text: 'Route a low-confidence answer to a human reviewer queue.' },
    ],
    miniProject: 'A safe chat wrapper: PII redactor + injection detector + content filter.',
  },
  15: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Get comfortable with tokenization, stemming, and lemmatization using spaCy.',
      'Learn classical tasks: NER, classification, sentiment — they still ship in production.',
      'Understand embeddings (sentence-transformers) and cosine similarity intuitively.',
      'Compare classical models (logistic regression on TF-IDF) to LLM zero-shot — speed/cost matters.',
      'Use HuggingFace Transformers to fine-tune a small encoder model for a real task.',
    ],
    tools: ['spaCy', 'NLTK', 'HuggingFace Transformers', 'sentence-transformers'],
    concepts: ['Tokenization', 'Embeddings', 'NER', 'Sentiment', 'Classical vs neural NLP'],
    resources: [
      { title: 'HuggingFace NLP Course (free)', url: 'https://huggingface.co/learn/nlp-course' },
      { title: 'spaCy 101', url: 'https://spacy.io/usage/spacy-101' },
    ],
    verify: [
      { text: 'Train a sentiment classifier with ≥85% accuracy on a real review dataset.' },
      { text: 'Build a NER pipeline that extracts companies and dates from news articles.' },
      { text: 'Explain when a small classifier beats an LLM in cost and latency.' },
    ],
    miniProject: 'A support-ticket router: classify → route → suggest reply.',
  },
  16: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Pick GCP if your stack uses BigQuery, Gemini, or Vertex AI heavily.',
      'Learn IAM, service accounts, and projects — same mental model as AWS but different names.',
      'Use Cloud Run for stateless containers — it is the friendliest GCP service to start with.',
      'Try Vertex AI Pipelines for ML workflows; they shine for batch and training jobs.',
      'Set budget alerts in the billing console before you do anything else.',
    ],
    tools: ['Vertex AI', 'Cloud Run', 'BigQuery', 'GKE', 'Cloud Functions'],
    concepts: ['IAM', 'Service accounts', 'Vertex pipelines', 'Gemini API', 'Cost controls'],
    resources: [
      { title: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/' },
      { title: 'Vertex AI Docs', url: 'https://cloud.google.com/vertex-ai/docs' },
    ],
    verify: [
      { text: 'Deploy a container to Cloud Run with HTTPS and a custom domain.' },
      { text: 'Query BigQuery with parameterized SQL from a Python notebook.' },
      { text: 'Run a Gemini API call from Cloud Run with workload identity.' },
    ],
    miniProject: 'Cloud Run service that summarizes BigQuery query results with Gemini.',
  },
  17: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Learn Resource Groups and RBAC — Azure organization is opinionated and worth respecting.',
      'Use Azure OpenAI through a Private Endpoint for any enterprise workload.',
      'Get fluent with Azure Functions or AKS depending on whether you prefer serverless or containers.',
      'Cosmos DB has multiple APIs (Mongo, SQL, Gremlin) — pick one and stick to it.',
      'Microsoft Learn paths are excellent and free; finish the AI Engineer path.',
    ],
    tools: ['Azure OpenAI', 'AI Foundry', 'Azure Functions', 'AKS', 'Cosmos DB'],
    concepts: ['Resource groups', 'RBAC', 'Managed identities', 'Private endpoints'],
    resources: [
      { title: 'Microsoft Learn — AI Engineer', url: 'https://learn.microsoft.com/en-us/training/career-paths/ai-engineer' },
      { title: 'Azure OpenAI Docs', url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/' },
    ],
    verify: [
      { text: 'Deploy an Azure Function that calls Azure OpenAI via Managed Identity.' },
      { text: 'Configure a Private Endpoint so traffic never leaves your VNet.' },
      { text: 'Complete the AI-102 sample questions with ≥75%.' },
    ],
    miniProject: 'A document Q&A app on Azure using OpenAI + Cognitive Search.',
  },
  18: {
    timeEstimate: '~2 weeks for working depth',
    whatToLearn: [
      'Master indexing in Postgres — most "slow query" problems are missing or wrong indexes.',
      'Understand transactions, isolation levels, and what happens during deadlocks.',
      'Use Redis for three things: cache, rate-limiter, and lightweight queue.',
      'Learn EXPLAIN ANALYZE and read query plans on real production-like data.',
      'Connection pooling matters; use PgBouncer or your driver\'s pool from day one.',
    ],
    tools: ['PostgreSQL 16', 'Redis 7', 'pgAdmin', 'TimescaleDB', 'BullMQ'],
    concepts: ['Indexes (B-tree, GIN, HNSW)', 'Transactions', 'Pub/sub', 'Caching strategies', 'Connection pooling'],
    resources: [
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' },
      { title: 'Redis University (free)', url: 'https://university.redis.com/' },
      { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/' },
    ],
    verify: [
      { text: 'Take a 10s query down to <100 ms by adding the right index and prove it with EXPLAIN.' },
      { text: 'Build a cache-aside pattern with Redis and measure cache-hit rate.' },
      { text: 'Implement a token-bucket rate limiter in Redis Lua.' },
    ],
    miniProject: 'A leaderboard service: Postgres for source of truth + Redis sorted-set for reads.',
  },
  19: {
    timeEstimate: '~1 week (5 hrs)',
    whatToLearn: [
      'Read the GDPR principles — lawful basis, minimization, purpose limitation, and rights.',
      'Map every place user data is stored, processed, or sent to a third party (LLM providers count!).',
      'Know how to handle data deletion requests across vector DBs and prompt logs.',
      'Understand the EU AI Act risk tiers and what they require for high-risk systems.',
      'Talk to legal early; AI compliance is a moving target and answers change quarterly.',
    ],
    tools: ['OneTrust', 'Microsoft Purview', 'Privado.ai'],
    concepts: ['GDPR principles', 'CCPA', 'Data residency', 'PII classification', 'AI Act (EU)'],
    resources: [
      { title: 'GDPR Official Text', url: 'https://gdpr-info.eu/' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
    verify: [
      { text: 'Produce a one-page data-flow diagram for an LLM feature, marking PII at every step.' },
      { text: 'Implement a "delete my data" endpoint that purges DB, vectors, and prompt logs.' },
      { text: 'Classify a sample feature against the EU AI Act risk tiers and justify it.' },
    ],
    miniProject: 'A privacy review checklist + automated PII scan for any new LLM feature.',
  },
  20: {
    timeEstimate: '~2 weeks if you know JS; ~4 weeks otherwise',
    whatToLearn: [
      'Get comfortable with strict mode and the difference between `unknown`, `any`, and `never`.',
      'Master generics by writing your own utility types (`Pick`, `Omit` clones).',
      'Learn discriminated unions — the killer pattern for safe state and message handling.',
      'Use Zod for runtime validation that mirrors your TS types exactly.',
      'Read other people\'s `tsconfig.json` files; the right options matter as much as the code.',
    ],
    tools: ['TypeScript 5', 'Node 22', 'Vite', 'tsx', 'Zod'],
    concepts: ['Generics', 'Discriminated unions', 'Utility types', 'Module resolution', 'Strict mode'],
    resources: [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { title: 'Total TypeScript (free tier)', url: 'https://www.totaltypescript.com/' },
    ],
    verify: [
      { text: 'Convert a JS project to strict TS with zero `any` and zero ts-ignore.' },
      { text: 'Write a generic `Result<T, E>` type and refactor 3 functions to use it.' },
      { text: 'Validate an external API response with Zod and infer the type automatically.' },
    ],
    miniProject: 'Re-implement the Skills app data layer with Zod-validated JSON loading.',
  },
  21: {
    timeEstimate: '~3 weeks (15+ hrs)',
    whatToLearn: [
      'Start with PySpark on a local notebook before touching any cluster.',
      'Understand DAGs, lazy evaluation, and the difference between transformations and actions.',
      'Learn partitioning and shuffles — they explain almost every Spark performance problem.',
      'Move to streaming with Spark Structured Streaming or Apache Beam for windowed jobs.',
      'For local-scale work, learn `polars` — it is faster than pandas and teaches similar concepts.',
    ],
    tools: ['Apache Spark', 'Apache Beam', 'Dataflow', 'Databricks', 'Polars'],
    concepts: ['DAGs', 'Windowing', 'Shuffles', 'Partitioning', 'Stream vs batch'],
    resources: [
      { title: 'Spark — The Definitive Guide (Databricks)', url: 'https://www.databricks.com/resources/ebook/learning-spark-2nd-edition' },
      { title: 'Apache Beam Programming Guide', url: 'https://beam.apache.org/documentation/programming-guide/' },
    ],
    verify: [
      { text: 'Process a 10 GB CSV in PySpark and explain the resulting query plan.' },
      { text: 'Optimize a Spark job by changing partitioning and prove the speed-up.' },
      { text: 'Build a streaming word-count using a 10-second tumbling window.' },
    ],
    miniProject: 'Daily batch + hourly streaming pipeline that computes top-K trending items.',
  },
  22: {
    timeEstimate: '~4 weeks (20+ hrs)',
    whatToLearn: [
      'Understand why fine-tuning is a last resort — try prompt engineering and RAG first.',
      'Learn LoRA / QLoRA so you can adapt large models on a single GPU.',
      'Walk through the SFT → DPO progression on an open-source model end-to-end.',
      'Build an evaluation harness that compares your fine-tune against the base model.',
      'Track every experiment with W&B; you will run dozens before getting one right.',
    ],
    tools: ['Hugging Face TRL', 'Axolotl', 'Unsloth', 'PEFT', 'DeepSpeed'],
    concepts: ['LoRA / QLoRA', 'SFT vs DPO vs RLHF', 'Reward models', 'Evaluation harnesses'],
    resources: [
      { title: 'HuggingFace TRL Docs', url: 'https://huggingface.co/docs/trl' },
      { title: 'Sebastian Raschka — LLM Fine-tuning', url: 'https://magazine.sebastianraschka.com/p/finetuning-llms-with-adapters' },
    ],
    verify: [
      { text: 'Fine-tune Llama-3-8B with LoRA on a domain dataset and beat the base model on evals.' },
      { text: 'Apply DPO with preference pairs and show a measurable quality lift.' },
      { text: 'Publish the adapter to Hugging Face with a model card.' },
    ],
    miniProject: 'A LoRA fine-tune of a small Llama model on customer-support transcripts.',
  },
  23: {
    timeEstimate: '~3 weeks for working competence',
    whatToLearn: [
      'Learn React Hooks (useState, useEffect, useMemo, useCallback) deeply, not just by example.',
      'Understand reconciliation and why keys matter in lists.',
      'Pick TanStack Query for server state and Zustand or Redux Toolkit for client state.',
      'Use shadcn/ui or MUI to ship faster instead of hand-rolling components.',
      'Care about accessibility (semantic HTML, aria labels, keyboard nav) from day one.',
    ],
    tools: ['React 19', 'Vite', 'TanStack Query', 'Zustand', 'shadcn/ui'],
    concepts: ['Hooks', 'Suspense', 'Server components', 'State management', 'Accessibility'],
    resources: [
      { title: 'React Docs (new)', url: 'https://react.dev/' },
      { title: 'Patterns.dev', url: 'https://www.patterns.dev/' },
    ],
    verify: [
      { text: 'Build a CRUD app with TanStack Query that handles loading, error, and optimistic updates.' },
      { text: 'Pass a Lighthouse accessibility score of ≥95 on your app.' },
      { text: 'Explain why a re-render happened using React DevTools Profiler.' },
    ],
    miniProject: 'A small dashboard that consumes your own FastAPI backend.',
  },
  24: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Internalize the event loop — it explains every weird Node behavior.',
      'Pick one framework (Fastify is fast and modern) and learn its middleware model.',
      'Use streams for large payloads and worker threads for CPU-bound work.',
      'Add Zod for input validation and Pino for structured logging.',
      'Write integration tests with Vitest or Jest from the start.',
    ],
    tools: ['Node 22', 'Express', 'Fastify', 'NestJS', 'Hono'],
    concepts: ['Event loop', 'Streams', 'Worker threads', 'Middleware', 'JWT/auth'],
    resources: [
      { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs' },
      { title: 'Node.js Best Practices (GitHub)', url: 'https://github.com/goldbergyoni/nodebestpractices' },
    ],
    verify: [
      { text: 'Build a Fastify API with JWT auth and Zod-validated routes.' },
      { text: 'Stream a 1 GB file upload to S3 without loading it into memory.' },
      { text: 'Profile and fix a CPU-bound endpoint using a worker thread.' },
    ],
    miniProject: 'An auth-gated REST API that wraps an LLM call with rate limiting.',
  },
  25: {
    timeEstimate: '~1 week (6 hrs)',
    whatToLearn: [
      'Learn document modeling — denormalize for read patterns, embed when accessed together.',
      'Use the aggregation pipeline; it is Mongo\'s most powerful and least-used feature.',
      'Always design your indexes around your queries, not the other way around.',
      'Understand replica sets and the write concern trade-offs.',
      'Use Atlas for hosted clusters; running Mongo yourself is rarely worth it now.',
    ],
    tools: ['MongoDB Atlas', 'Mongoose', 'mongosh', 'Compass'],
    concepts: ['Schema design', 'Aggregation pipelines', 'Indexes', 'Replica sets'],
    resources: [
      { title: 'MongoDB University (free)', url: 'https://learn.mongodb.com/' },
    ],
    verify: [
      { text: 'Design a schema for a feature and justify embed vs reference for each field.' },
      { text: 'Write an aggregation pipeline with $lookup, $group, and $project that beats SQL.' },
      { text: 'Add a compound index that takes a query from collection-scan to index-scan.' },
    ],
    miniProject: 'A CRUD blog API on Atlas using Mongoose with aggregations for stats.',
  },
  26: {
    timeEstimate: '~2 weeks (10 hrs)',
    whatToLearn: [
      'Understand the inverted index — once it clicks, Elasticsearch makes sense.',
      'Learn analyzers (tokenizer + filters) and why they shape every search result.',
      'Tune mappings explicitly; the dynamic defaults are rarely production-grade.',
      'Use aggregations for analytics and faceted search side-by-side with hits.',
      'Combine BM25 with vector search (kNN) for hybrid retrieval — the new standard.',
    ],
    tools: ['Elasticsearch 8', 'OpenSearch', 'Kibana', 'Logstash'],
    concepts: ['Inverted index', 'Analyzers', 'Mappings', 'Aggregations', 'Hybrid (vector + BM25)'],
    resources: [
      { title: 'Elasticsearch Docs', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html' },
      { title: 'Relevant Search (book)', url: 'https://www.manning.com/books/relevant-search' },
    ],
    verify: [
      { text: 'Index 100k docs with a custom analyzer and search in <30 ms p95.' },
      { text: 'Build a faceted search page with aggregations driving the filters.' },
      { text: 'Show hybrid search results blending BM25 and dense vectors with RRF.' },
    ],
    miniProject: 'Search-as-you-type for a small e-commerce catalog with facets.',
  },

  // ─── Phase 5 — Future-Ready (2026+) ──────────────────────────────────────
  27: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Read the Anthropic MCP spec — understand servers, clients, tools, resources, and prompts as primitives.',
      'Spin up an MCP server in Python or TypeScript that exposes 2–3 tools to Claude Desktop.',
      'Skim Google’s A2A (Agent-to-Agent) protocol and compare its task/artifact model to MCP.',
      'Build a small multi-agent flow where one agent delegates to another over A2A or via MCP tool calls.',
      'Learn auth, capability negotiation, and streaming responses — these are where production breaks.',
      'Study how IDEs (Cursor, Zed) and chat clients consume MCP so you can ship reusable servers.',
    ],
    tools: ['Anthropic MCP SDK', 'A2A SDK', 'Claude Desktop', 'Cursor', 'mcp-inspector'],
    concepts: ['Tool/resource primitives', 'Capability negotiation', 'Streaming I/O', 'Auth & sandboxing', 'Agent delegation'],
    resources: [
      { title: 'Model Context Protocol (Anthropic)', url: 'https://modelcontextprotocol.io/' },
      { title: 'Google A2A Protocol', url: 'https://google.github.io/A2A/' },
      { title: 'MCP Servers gallery', url: 'https://github.com/modelcontextprotocol/servers' },
    ],
    verify: [
      { text: 'Publish an MCP server (e.g. for your notes/Notion/Postgres) and use it from Claude Desktop.' },
      { text: 'Demo two agents handing off a task with intermediate artifacts via A2A.' },
      { text: 'Explain the trade-offs between MCP and OpenAI’s function-calling tools convincingly.' },
    ],
    miniProject: 'MCP server that lets Claude query and summarize your local Postgres DB.',
  },
  28: {
    timeEstimate: '~1 week (6–8 hrs)',
    whatToLearn: [
      'Understand the difference between fast models and reasoning models — they spend tokens to “think”.',
      'Run the same hard problem on GPT-4o vs o3 vs Claude Thinking vs DeepSeek-R1 and compare outputs/cost.',
      'Learn when reasoning helps (math, code, planning) and when it’s wasteful (chat, simple extraction).',
      'Practice prompting patterns specific to reasoning models — less few-shot, more “think step by step privately”.',
      'Measure latency and cost-per-task; design routing so easy queries hit cheap models.',
      'Read papers/blogs on test-time compute scaling so you can predict where this is heading.',
    ],
    tools: ['OpenAI o3 / o4', 'Claude 3.7 Sonnet (Thinking)', 'DeepSeek-R1', 'Gemini 2.5 Thinking'],
    concepts: ['Test-time compute', 'Chain-of-thought (private)', 'Reasoning effort tiers', 'Model routing', 'Cost/latency trade-offs'],
    resources: [
      { title: 'OpenAI Reasoning Guide', url: 'https://platform.openai.com/docs/guides/reasoning' },
      { title: 'Anthropic Extended Thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' },
      { title: 'DeepSeek-R1 paper', url: 'https://arxiv.org/abs/2501.12948' },
    ],
    verify: [
      { text: 'Build a router that sends 80% of queries to a cheap model and 20% to a reasoning model based on intent.' },
      { text: 'Show a benchmark on a real task: accuracy vs $ vs latency across 3 reasoning models.' },
      { text: 'Articulate when chain-of-thought prompting helps vs hurts a non-reasoning model.' },
    ],
    miniProject: 'A “hard math/code helper” that escalates to o3 only when needed.',
  },
  29: {
    timeEstimate: '~2 weeks (10–14 hrs)',
    whatToLearn: [
      'Learn what defines a Small Language Model (1B–8B params) and where it beats hosted APIs.',
      'Run Phi-4, Gemma 3, and Qwen 2.5 locally with Ollama or LM Studio and compare quality.',
      'Quantize a model with llama.cpp (Q4_K_M) and measure tokens/sec on your laptop.',
      'Fine-tune an SLM with LoRA on a small task-specific dataset using Unsloth or Axolotl.',
      'Deploy to a phone (Apple Intelligence, MLC) or a browser (WebLLM) to feel real on-device constraints.',
      'Understand when to choose SLM (privacy, cost, latency) vs hosted (quality, breadth).',
    ],
    tools: ['Ollama', 'LM Studio', 'llama.cpp', 'Unsloth', 'MLC LLM', 'WebLLM', 'Apple Foundation Models'],
    concepts: ['Quantization (Q4/Q8/AWQ)', 'LoRA fine-tuning', 'Distillation', 'On-device inference', 'Privacy by design'],
    resources: [
      { title: 'Ollama', url: 'https://ollama.com/' },
      { title: 'Unsloth fine-tuning notebooks', url: 'https://github.com/unslothai/unsloth' },
      { title: 'MLC LLM (browser/mobile)', url: 'https://llm.mlc.ai/' },
    ],
    verify: [
      { text: 'Run Phi-4 quantized on your laptop and answer 20 prompts faster than a cloud API.' },
      { text: 'Fine-tune an SLM on a custom dataset and beat the base model on your eval.' },
      { text: 'Ship a tiny browser-only AI feature with WebLLM (no backend).' },
    ],
    miniProject: 'On-device meeting summarizer that never sends audio off the laptop.',
  },
  30: {
    timeEstimate: '~1.5 weeks (10 hrs)',
    whatToLearn: [
      'Internalize that prompts are code — they need version control, tests, and CI like any other artifact.',
      'Pick one framework (Braintrust, OpenAI Evals, Promptfoo, Inspect AI) and build your first eval suite.',
      'Define golden datasets, model-graded scorers, and deterministic asserts (regex, JSON schema).',
      'Wire evals into GitHub Actions so every PR runs them and blocks regressions.',
      'Add cost & latency budgets to each eval so you catch perf regressions, not just quality.',
      'Learn LLM-as-judge pitfalls (bias, position effects) and how to mitigate with rubrics.',
    ],
    tools: ['Braintrust', 'Promptfoo', 'Inspect AI', 'OpenAI Evals', 'Ragas', 'DeepEval'],
    concepts: ['Golden datasets', 'Model-graded scorers', 'Pairwise / Elo evals', 'CI for prompts', 'Eval-driven development'],
    resources: [
      { title: 'Braintrust docs', url: 'https://www.braintrust.dev/docs' },
      { title: 'Promptfoo guide', url: 'https://www.promptfoo.dev/docs/intro/' },
      { title: 'Inspect AI (UK AISI)', url: 'https://inspect.ai-safety-institute.org.uk/' },
    ],
    verify: [
      { text: 'Run an eval suite in CI that fails the build when accuracy drops >2% or cost rises >20%.' },
      { text: 'Show a side-by-side report comparing two prompt versions on 100 cases.' },
      { text: 'Catch a regression on a real PR using your eval pipeline.' },
    ],
    miniProject: 'CI-gated prompt repo for a customer-support bot with 200 graded test cases.',
  },
  31: {
    timeEstimate: '~1.5 weeks (10 hrs)',
    whatToLearn: [
      'Read the OWASP LLM Top 10 cover-to-cover — these are the attacks you’ll be expected to defend.',
      'Practice prompt injection on your own apps using indirect injection via documents/URLs.',
      'Learn jailbreak families (DAN, Crescendo, many-shot) and why generic system prompts fail.',
      'Build a defensive layer: input sanitization, output filtering, allow-lists, and isolated tool calls.',
      'Run red-team exercises with tools like garak or PyRIT and triage the findings.',
      'Understand data exfiltration via tool calls and how to scope agent permissions tightly.',
    ],
    tools: ['garak', 'PyRIT', 'NVIDIA NeMo Guardrails', 'Lakera Guard', 'OpenAI Moderation'],
    concepts: ['Direct vs indirect injection', 'Jailbreak families', 'Tool sandboxing', 'Output filtering', 'Least-privilege agents'],
    resources: [
      { title: 'OWASP Top 10 for LLM', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
      { title: 'NVIDIA garak (red-team)', url: 'https://github.com/NVIDIA/garak' },
      { title: 'Microsoft PyRIT', url: 'https://github.com/Azure/PyRIT' },
    ],
    verify: [
      { text: 'Successfully prompt-inject a friend’s LLM app via a malicious document.' },
      { text: 'Harden one of your own apps so a public red-team can’t exfiltrate a secret string.' },
      { text: 'Produce a 1-page threat model for an LLM feature you ship.' },
    ],
    miniProject: 'Red-team report for a public RAG demo with mitigations.',
  },
  32: {
    timeEstimate: '~2 weeks (12–16 hrs)',
    whatToLearn: [
      'Understand what GPU memory looks like during inference: weights, KV-cache, activations.',
      'Learn batching strategies (static, continuous/in-flight) and why throughput ≠ latency.',
      'Quantize a model (AWQ, GPTQ, FP8) and measure quality vs speed trade-offs.',
      'Serve a model with vLLM or SGLang and benchmark tokens/sec at different batch sizes.',
      'Explore speculative decoding and prefix caching — they’re free wins for many workloads.',
      'Tune for a real SLA: p95 latency, $/1M tokens, and concurrency targets.',
    ],
    tools: ['vLLM', 'SGLang', 'TensorRT-LLM', 'NVIDIA Triton', 'TGI', 'CUDA basics'],
    concepts: ['KV-cache', 'Continuous batching', 'Quantization (AWQ/GPTQ/FP8)', 'Speculative decoding', 'PagedAttention'],
    resources: [
      { title: 'vLLM docs', url: 'https://docs.vllm.ai/' },
      { title: 'NVIDIA Inference Optimization', url: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/' },
      { title: 'SGLang', url: 'https://github.com/sgl-project/sglang' },
    ],
    verify: [
      { text: 'Serve Llama-3-8B with vLLM and hit >2000 tokens/sec on a single A100/H100.' },
      { text: 'Cut $/request by 50% via quantization + batching with <2% quality loss on your eval.' },
      { text: 'Explain why your p95 latency drops with continuous batching.' },
    ],
    miniProject: 'Self-hosted Llama endpoint that beats GPT-4o-mini on $/token for your use case.',
  },
  33: {
    timeEstimate: '~1 week (6–8 hrs)',
    whatToLearn: [
      'Understand why “please return JSON” is unreliable and what constrained decoding actually does.',
      'Learn JSON Schema (or Pydantic) deeply — it’s the contract between LLMs and your code.',
      'Use Instructor (Python) or the OpenAI structured outputs API to force schema-valid responses.',
      'Try Outlines for grammar-constrained generation against open-source models.',
      'Handle validation failures gracefully: retries, repair prompts, partial parsing.',
      'Compose structured outputs with tool calling for production agent workflows.',
    ],
    tools: ['Instructor', 'Outlines', 'Pydantic', 'OpenAI Structured Outputs', 'JSON Schema', 'Zod (TS)'],
    concepts: ['Constrained decoding', 'JSON Schema / Pydantic', 'Tool calling', 'Retry & repair', 'Streaming structured output'],
    resources: [
      { title: 'OpenAI Structured Outputs', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
      { title: 'Instructor (jxnl)', url: 'https://python.useinstructor.com/' },
      { title: 'Outlines', url: 'https://dottxt-ai.github.io/outlines/' },
    ],
    verify: [
      { text: 'Extract structured invoice data from 100 PDFs with 0 schema-violation errors.' },
      { text: 'Stream a typed object to a UI as it’s being generated.' },
      { text: 'Compare quality + reliability of constrained decoding vs prompt-only JSON.' },
    ],
    miniProject: 'PDF → typed JSON pipeline with schema validation and auto-repair.',
  },
  34: {
    timeEstimate: '~2 weeks (12 hrs)',
    whatToLearn: [
      'Recognize that naïve top-k vector search is a baseline, not a solution — production RAG layers more.',
      'Implement hybrid retrieval: BM25 + dense vectors fused with Reciprocal Rank Fusion (RRF).',
      'Add a reranker (Cohere Rerank, BGE-reranker, ColBERT) and measure recall@k improvements.',
      'Learn GraphRAG: extract entities/relations into a graph and query with Cypher or LLM-over-graph.',
      'Tune chunking strategies (semantic, hierarchical, late-chunking) for your data shape.',
      'Build evals that measure retrieval-only quality (recall, MRR) separate from end-to-end answer quality.',
    ],
    tools: ['Cohere Rerank', 'BGE-reranker', 'ColBERT', 'Microsoft GraphRAG', 'Neo4j', 'LlamaIndex', 'Weaviate hybrid'],
    concepts: ['Hybrid search (BM25+vector)', 'RRF fusion', 'Rerankers', 'GraphRAG', 'Late-chunking', 'Retrieval evals (recall/MRR)'],
    resources: [
      { title: 'Microsoft GraphRAG', url: 'https://microsoft.github.io/graphrag/' },
      { title: 'Cohere Rerank', url: 'https://docs.cohere.com/docs/rerank' },
      { title: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
    ],
    verify: [
      { text: 'Beat your baseline RAG on recall@10 by ≥15% with hybrid + reranker.' },
      { text: 'Answer multi-hop questions correctly using a GraphRAG pipeline where flat RAG fails.' },
      { text: 'Show separate retrieval and generation evals on a dashboard.' },
    ],
    miniProject: 'Hybrid + reranker RAG over your company docs with a measurable 20% quality lift.',
  },
};

/** Helper to fetch details, returning a safe default if missing */
export function getSkillDetails(skill: Skill): SkillResource {
  return (
    SKILL_DETAILS[skill.id] ?? {
      whatToLearn: [],
      tools: [],
      concepts: [],
      resources: [],
      verify: [],
      timeEstimate: 'TBD',
    }
  );
}
