
import { OpenRouterRequestPayload, OpenRouterResponse } from '../types';
import { OPENROUTER_API_URL, HTTP_REFERER, X_TITLE } from '../constants';

// IMPORTANT: This application expects the OpenRouter API key to be available
// as `process.env.API_KEY`. Ensure this environment variable is set
// with your OpenRouter key during build or runtime.
const API_KEY = process.env.API_KEY;

export const callOpenRouterAPI = async (
  promptContent: string,
  model: string,
  max_tokens?: number,
  temperature?: number
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("OpenRouter API key is not configured. Please set the API_KEY environment variable.");
  }

  const payload: OpenRouterRequestPayload = {
    model: model,
    messages: [{ role: "user", content: promptContent }],
  };

  if (max_tokens !== undefined) payload.max_tokens = max_tokens;
  if (temperature !== undefined) payload.temperature = temperature;

  const headers: HeadersInit = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': HTTP_REFERER,
    'X-Title': X_TITLE,
  };

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`OpenRouter API Error (${response.status}): ${errorData.error?.message || errorData.message || 'Unknown error'}`);
    }

    const data = await response.json() as OpenRouterResponse;
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Invalid response structure from OpenRouter API.");
    }
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while contacting OpenRouter API.");
  }
};