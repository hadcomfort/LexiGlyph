
export interface Incantation {
  id: string;
  title: string;
  content: string;
  tags: string[];
  dateAdded: string;
  dateModified: string;
}

export interface TagWithCount {
  name: string;
  count: number;
}

export interface OpenRouterRequestPayload {
  model: string;
  messages: { role: "user"; content: string }[];
  max_tokens?: number;
  temperature?: number;
  // Future: Add other OpenRouter params like stream, transforms if needed
}

// Simplified - actual OpenRouter response is more complex
export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  // Add other fields as needed, e.g., usage, model
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortableField {
  TITLE = 'title',
  DATE_MODIFIED = 'dateModified',
}