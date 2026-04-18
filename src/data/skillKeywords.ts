import { SKILLS } from './skills';

/**
 * Per-skill matching keywords/aliases. Lowercased, matched as whole-ish tokens
 * against the JD text. Order matters loosely — first hit wins for highlighting.
 */
export const SKILL_KEYWORDS: Record<number, string[]> = {
  1: ['llm', 'llms', 'large language model', 'foundation model', 'gpt-4', 'gpt-4o', 'gpt-5', 'claude', 'gemini', 'llama'],
  2: ['python', 'pytorch', 'numpy', 'pandas', 'fastapi'],
  3: ['prompt engineering', 'prompting', 'system prompt', 'few-shot', 'chain of thought', 'cot', 'genai', 'generative ai'],
  4: ['openai api', 'anthropic api', 'openai sdk', 'claude api', 'gpt api', 'function calling', 'tool calling'],
  5: ['system design', 'scalable architecture', 'distributed system', 'high availability', 'low latency'],
  6: ['agent', 'agents', 'agentic', 'autogen', 'crewai', 'multi-agent', 'agentic systems', 'agentic workflow'],
  7: ['rag', 'retrieval augmented', 'retrieval-augmented', 'retrieval augmented generation'],
  8: ['langchain', 'langgraph', 'llamaindex', 'orchestration framework', 'haystack'],
  9: ['aws', 'amazon web services', 'sagemaker', 'bedrock', 'lambda', 'ec2', 's3'],
  10: ['mlops', 'ml ops', 'model serving', 'model monitoring', 'kubeflow', 'mlflow', 'bentoml'],
  11: ['evals', 'evaluation framework', 'ragas', 'deepeval', 'truelens', 'eval-driven'],
  12: ['observability', 'tracing', 'langsmith', 'langfuse', 'arize', 'helicone', 'phoenix'],
  13: ['vector database', 'vector db', 'pgvector', 'pinecone', 'weaviate', 'qdrant', 'chroma', 'milvus'],
  14: ['guardrails', 'human in the loop', 'human-in-the-loop', 'hitl', 'nemo guardrails'],
  15: ['nlp', 'natural language processing', 'spacy', 'tokenization', 'embeddings', 'transformer'],
  16: ['gcp', 'google cloud', 'vertex ai', 'gke', 'bigquery'],
  17: ['azure', 'azure openai', 'azure ml', 'aks'],
  18: ['postgres', 'postgresql', 'redis', 'mysql'],
  19: ['ai ethics', 'gdpr', 'ccpa', 'eu ai act', 'data privacy', 'pii', 'compliance'],
  20: ['typescript', 'javascript', 'node.js', 'nodejs', 'react'],
  21: ['spark', 'apache spark', 'beam', 'apache beam', 'flink', 'distributed data', 'big data'],
  22: ['fine-tuning', 'fine tuning', 'rlhf', 'dpo', 'lora', 'qlora', 'peft', 'sft'],
  23: ['react', 'next.js', 'nextjs', 'frontend', 'tailwind', 'shadcn'],
  24: ['node.js', 'nodejs', 'express', 'nestjs', 'backend api'],
  25: ['mongodb', 'mongo', 'nosql'],
  26: ['elasticsearch', 'elastic', 'opensearch', 'lucene'],
  27: ['mcp', 'model context protocol', 'a2a', 'agent2agent', 'agent-to-agent'],
  28: ['reasoning model', 'o1', 'o3', 'o4', 'deepseek-r1', 'deepseek r1', 'extended thinking', 'test-time compute'],
  29: ['small language model', 'slm', 'on-device', 'on device', 'phi-3', 'phi-4', 'gemma', 'qwen', 'apple intelligence', 'edge inference', 'ollama'],
  30: ['braintrust', 'promptfoo', 'inspect ai', 'inspect-ai', 'evals as code', 'eval driven', 'eval-driven'],
  31: ['ai security', 'red team', 'red-team', 'red teaming', 'prompt injection', 'jailbreak', 'owasp llm', 'owasp top 10', 'adversarial'],
  32: ['vllm', 'tensorrt', 'triton', 'sglang', 'inference optimization', 'quantization', 'kv-cache', 'kv cache', 'speculative decoding'],
  33: ['structured output', 'structured outputs', 'json mode', 'json schema', 'instructor', 'outlines', 'pydantic', 'constrained decoding'],
  34: ['hybrid search', 'rerank', 'reranker', 'cohere rerank', 'colbert', 'graphrag', 'graph rag', 'bm25'],
  35: ['neo4j', 'cypher', 'graph database', 'graph db', 'memgraph', 'graph data science'],
  36: ['knowledge graph', 'ontology', 'entity extraction', 'triple store'],
  37: ['claude computer use', 'claude sub-agents', 'claude skills', 'anthropic sdk', 'claude code', 'artifacts'],
  38: ['mem0', 'zep', 'letta', 'memgpt', 'langmem', 'agent memory', 'long-term memory', 'persistent memory'],
  39: ['computer use', 'browser agent', 'operator', 'browser-use', 'stagehand', 'skyvern', 'playwright agent', 'rpa'],
  40: ['timescaledb', 'timescale', 'clickhouse', 'duckdb', 'influxdb', 'time-series', 'time series database', 'columnar'],
};

export interface JdMatchHit {
  skillId: number;
  matchedTerm: string;
}

export interface JdMatchResult {
  hits: JdMatchHit[];
  matchedSkillIds: Set<number>;
  /** Skills missing, sorted by learnOrder (priority) then rating desc */
  missingSkills: typeof SKILLS;
  /** 0–100 — fraction of skills (weighted by 1/learnOrder) found */
  matchScore: number;
  totalKeywords: number;
  uniqueMatches: number;
}

/** Escape regex special chars in a term so we can build a word-boundary matcher. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function matchJd(jdText: string): JdMatchResult {
  const text = jdText.toLowerCase();
  const hits: JdMatchHit[] = [];
  const matchedSkillIds = new Set<number>();

  for (const [idStr, terms] of Object.entries(SKILL_KEYWORDS)) {
    const id = Number(idStr);
    for (const term of terms) {
      // Use a relaxed boundary: term may contain spaces / dots / dashes already,
      // so just look for it as a substring with non-word boundaries on both sides.
      const re = new RegExp(`(^|[^a-z0-9])${escapeRegex(term)}([^a-z0-9]|$)`, 'i');
      if (re.test(text)) {
        hits.push({ skillId: id, matchedTerm: term });
        matchedSkillIds.add(id);
        break; // one hit per skill is enough
      }
    }
  }

  // Weight: lower learnOrder (more important) counts more.
  // weight = 6 - learnOrder so order 1 -> 5, order 5 -> 1
  let total = 0;
  let earned = 0;
  for (const s of SKILLS) {
    const w = Math.max(1, 6 - s.learnOrder);
    total += w;
    if (matchedSkillIds.has(s.id)) earned += w;
  }
  const matchScore = total === 0 ? 0 : Math.round((earned / total) * 100);

  const missingSkills = SKILLS.filter((s) => !matchedSkillIds.has(s.id)).sort(
    (a, b) => a.learnOrder - b.learnOrder || b.rating - a.rating,
  );

  return {
    hits,
    matchedSkillIds,
    missingSkills,
    matchScore,
    totalKeywords: hits.length,
    uniqueMatches: matchedSkillIds.size,
  };
}
