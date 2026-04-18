export type Company =
  | 'Chess.com'
  | 'Spotify'
  | 'Reveleer'
  | 'Lemon.io'
  | 'Aktor AI'
  | 'ClickUp'
  | 'Bounteous';

export const COMPANIES: Company[] = [
  'Chess.com',
  'Spotify',
  'Reveleer',
  'Lemon.io',
  'Aktor AI',
  'ClickUp',
  'Bounteous',
];

export type Phase =
  | 'Phase 1 – Foundations'
  | 'Phase 2 – Applied AI'
  | 'Phase 3 – Production & MLOps'
  | 'Phase 4 – Differentiators';

export interface Skill {
  id: number;
  name: string;
  category: string;
  appearsIn: Company[];
  /** 1 = highest learning priority, 5 = lowest */
  learnOrder: number;
  /** 1–5 stars showing market importance */
  rating: number;
  phase: Phase;
  notes?: string;
}

export const SKILLS: Skill[] = [
  {
    id: 1,
    name: 'LLMs (Foundation Models)',
    category: 'AI / GenAI',
    appearsIn: ['Chess.com', 'Spotify', 'Reveleer', 'Lemon.io', 'Aktor AI', 'ClickUp', 'Bounteous'],
    learnOrder: 1,
    rating: 5,
    phase: 'Phase 1 – Foundations',
    notes: 'Universal requirement across every job listing.',
  },
  {
    id: 2,
    name: 'Python',
    category: 'Languages',
    appearsIn: ['Chess.com', 'Spotify', 'Lemon.io', 'Aktor AI', 'ClickUp'],
    learnOrder: 1,
    rating: 5,
    phase: 'Phase 1 – Foundations',
    notes: 'De-facto language for AI/ML engineering.',
  },
  {
    id: 3,
    name: 'GenAI / Prompt Engineering',
    category: 'AI / GenAI',
    appearsIn: ['Chess.com', 'Spotify', 'Reveleer', 'Lemon.io', 'Aktor AI', 'ClickUp', 'Bounteous'],
    learnOrder: 1,
    rating: 5,
    phase: 'Phase 1 – Foundations',
    notes: 'System prompts, few-shot, structured outputs, function calling.',
  },
  {
    id: 4,
    name: 'OpenAI / Anthropic APIs',
    category: 'AI / GenAI',
    appearsIn: ['Chess.com', 'Spotify', 'Reveleer', 'Lemon.io', 'Aktor AI', 'ClickUp', 'Bounteous'],
    learnOrder: 1,
    rating: 5,
    phase: 'Phase 1 – Foundations',
  },
  {
    id: 5,
    name: 'System Design / Scalable Architecture',
    category: 'Engineering',
    appearsIn: ['Chess.com', 'Spotify', 'Reveleer', 'Lemon.io', 'Aktor AI', 'ClickUp'],
    learnOrder: 1,
    rating: 5,
    phase: 'Phase 1 – Foundations',
  },
  {
    id: 6,
    name: 'AI Agents / Agentic Systems',
    category: 'AI / GenAI',
    appearsIn: ['Chess.com', 'Reveleer', 'Lemon.io', 'Aktor AI', 'ClickUp'],
    learnOrder: 2,
    rating: 5,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 7,
    name: 'RAG (Retrieval-Augmented Generation)',
    category: 'AI / GenAI',
    appearsIn: ['Lemon.io', 'Aktor AI', 'ClickUp', 'Bounteous'],
    learnOrder: 2,
    rating: 5,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 8,
    name: 'LangChain / LangGraph / Orchestration',
    category: 'AI / GenAI',
    appearsIn: ['Lemon.io', 'Aktor AI', 'ClickUp'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 9,
    name: 'AWS',
    category: 'Cloud',
    appearsIn: ['Spotify', 'Reveleer', 'Lemon.io', 'ClickUp'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 10,
    name: 'MLOps (training, serving, monitoring)',
    category: 'MLOps',
    appearsIn: ['Chess.com', 'Spotify', 'Lemon.io', 'Aktor AI', 'ClickUp'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 11,
    name: 'Evaluation Frameworks (RAGAS, DeepEval)',
    category: 'AI / GenAI',
    appearsIn: ['Chess.com', 'Spotify', 'Aktor AI', 'ClickUp'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 12,
    name: 'Observability / Tracing (LangSmith, Langfuse)',
    category: 'MLOps',
    appearsIn: ['Chess.com', 'Reveleer', 'Aktor AI', 'ClickUp'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 13,
    name: 'Vector Databases (pgvector, Pinecone)',
    category: 'Databases',
    appearsIn: ['Aktor AI'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
    notes: 'Implied by every RAG-based role.',
  },
  {
    id: 14,
    name: 'Guardrails / Human-in-the-loop',
    category: 'AI Safety',
    appearsIn: ['Aktor AI', 'ClickUp', 'Bounteous'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 15,
    name: 'NLP Fundamentals',
    category: 'AI / GenAI',
    appearsIn: ['Spotify', 'Bounteous'],
    learnOrder: 2,
    rating: 4,
    phase: 'Phase 2 – Applied AI',
  },
  {
    id: 16,
    name: 'GCP',
    category: 'Cloud',
    appearsIn: ['Spotify', 'Reveleer', 'Lemon.io'],
    learnOrder: 3,
    rating: 3,
    phase: 'Phase 3 – Production & MLOps',
  },
  {
    id: 17,
    name: 'Azure',
    category: 'Cloud',
    appearsIn: ['Lemon.io', 'Aktor AI'],
    learnOrder: 3,
    rating: 3,
    phase: 'Phase 3 – Production & MLOps',
  },
  {
    id: 18,
    name: 'PostgreSQL / Redis',
    category: 'Databases',
    appearsIn: ['Aktor AI', 'ClickUp'],
    learnOrder: 3,
    rating: 3,
    phase: 'Phase 3 – Production & MLOps',
  },
  {
    id: 19,
    name: 'AI Ethics / GDPR / CCPA',
    category: 'AI Safety',
    appearsIn: ['ClickUp', 'Bounteous'],
    learnOrder: 3,
    rating: 3,
    phase: 'Phase 3 – Production & MLOps',
  },
  {
    id: 20,
    name: 'TypeScript / JavaScript',
    category: 'Languages',
    appearsIn: ['Reveleer', 'ClickUp'],
    learnOrder: 3,
    rating: 3,
    phase: 'Phase 3 – Production & MLOps',
  },
  {
    id: 21,
    name: 'Distributed Data (Spark / Beam)',
    category: 'Data Engineering',
    appearsIn: ['Chess.com', 'Spotify'],
    learnOrder: 4,
    rating: 3,
    phase: 'Phase 4 – Differentiators',
  },
  {
    id: 22,
    name: 'Fine-tuning / RLHF / DPO / LoRA',
    category: 'ML Theory',
    appearsIn: ['Spotify'],
    learnOrder: 4,
    rating: 3,
    phase: 'Phase 4 – Differentiators',
  },
  {
    id: 23,
    name: 'React / Frontend',
    category: 'Frontend',
    appearsIn: ['Reveleer'],
    learnOrder: 4,
    rating: 2,
    phase: 'Phase 4 – Differentiators',
  },
  {
    id: 24,
    name: 'Node.js',
    category: 'Backend',
    appearsIn: ['Reveleer'],
    learnOrder: 4,
    rating: 2,
    phase: 'Phase 4 – Differentiators',
  },
  {
    id: 25,
    name: 'MongoDB',
    category: 'Databases',
    appearsIn: ['Reveleer'],
    learnOrder: 4,
    rating: 2,
    phase: 'Phase 4 – Differentiators',
  },
  {
    id: 26,
    name: 'Elasticsearch',
    category: 'Databases',
    appearsIn: ['ClickUp'],
    learnOrder: 4,
    rating: 2,
    phase: 'Phase 4 – Differentiators',
  },
];
