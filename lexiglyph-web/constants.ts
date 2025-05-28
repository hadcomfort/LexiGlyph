
export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
export const HTTP_REFERER = "LexiGlyph WebApp"; // Helps with OpenRouter ranking
export const X_TITLE = "LexiGlyph"; // Helps with OpenRouter ranking

export const DEFAULT_OPENROUTER_MODELS: string[] = [
  "openai/gpt-4o",
  "openai/gpt-4-turbo",
  "anthropic/claude-3-opus",
  "anthropic/claude-3-sonnet",
  "anthropic/claude-3-haiku",
  "google/gemini-pro",
  "google/gemini-flash",
  "mistralai/mistral-large",
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3-70b-instruct",
  "meta-llama/llama-3-8b-instruct",
];

export const LOCAL_STORAGE_KEY = 'lexiglyph_incantations';