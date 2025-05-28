
import React, { useState, useCallback } from 'react';
import { callOpenRouterAPI } from '../services/openRouterService';
import { DEFAULT_OPENROUTER_MODELS } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';

interface OpenRouterInteractionProps {
  currentPromptText: string;
}

const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
  <path d="M3.105 3.105a.75.75 0 0 1 .815-.398L18.895 9.3a.75.75 0 0 1 0 1.4l-14.975 6.593a.75.75 0 0 1-1.213-.727l1.033-5.165A.75.75 0 0 1 3.75 10.55L10.995 11a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 1-.662-.45l-1.033-5.165a.75.75 0 0 1 .05-.815Z" />
</svg>
);


export const OpenRouterInteraction: React.FC<OpenRouterInteractionProps> = ({ currentPromptText }) => {
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_OPENROUTER_MODELS[0]);
  const [maxTokens, setMaxTokens] = useState<number | undefined>(1024);
  const [temperature, setTemperature] = useState<number | undefined>(0.7);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitToOpenRouter = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResponse('');
    try {
      const result = await callOpenRouterAPI(currentPromptText, selectedModel, maxTokens, temperature);
      setResponse(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPromptText, selectedModel, maxTokens, temperature]);

  return (
    <div className="p-4 bg-slate-50">
      <h3 className="text-md font-semibold text-slate-700 mb-3">Orchestrate with AI (OpenRouter)</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="or-model" className="block text-xs font-medium text-slate-600 mb-0.5">Model</label>
          <select
            id="or-model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 text-sm border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white"
          >
            {DEFAULT_OPENROUTER_MODELS.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
            <label htmlFor="or-max-tokens" className="block text-xs font-medium text-slate-600 mb-0.5">Max Tokens</label>
            <input
                type="number"
                id="or-max-tokens"
                value={maxTokens === undefined ? '' : maxTokens}
                onChange={(e) => setMaxTokens(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="e.g. 1024"
                className="w-full p-2 text-sm border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            />
            </div>
            <div>
            <label htmlFor="or-temperature" className="block text-xs font-medium text-slate-600 mb-0.5">Temperature</label>
            <input
                type="number"
                id="or-temperature"
                step="0.1"
                value={temperature === undefined ? '' : temperature}
                onChange={(e) => setTemperature(e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="e.g. 0.7"
                className="w-full p-2 text-sm border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            />
            </div>
        </div>
        <button
          onClick={handleSubmitToOpenRouter}
          disabled={isLoading || !currentPromptText}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <LoadingSpinner /> : <PaperAirplaneIcon className="mr-2"/>}
          Send to OpenRouter
        </button>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          {error.includes("API_KEY environment variable") && 
            <p className="mt-1 text-xs">Please ensure the <code>API_KEY</code> environment variable is correctly set with your OpenRouter API key when running/building this application.</p>
          }
        </div>
      )}
      {response && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-slate-700 mb-1">AI Response:</h4>
          <div className="p-3 bg-white border border-slate-300 rounded-md max-h-60 overflow-y-auto text-sm whitespace-pre-wrap font-mono shadow-sm">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};