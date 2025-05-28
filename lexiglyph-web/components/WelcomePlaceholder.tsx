
import React from 'react';

interface WelcomePlaceholderProps {
  onAddIncantation: () => void;
}

const SparklesIcon : React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12" {...props}>
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .897 1.203 5.243 5.243 0 0 0 2.05-5.022Z" />
  </svg>
);


export const WelcomePlaceholder: React.FC<WelcomePlaceholderProps> = ({ onAddIncantation }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50">
      <SparklesIcon className="text-sky-500 mb-4" />
      <h2 className="text-2xl font-semibold text-slate-700 mb-2">Welcome to LexiGlyph Web</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        Select an incantation from the list to view or edit it, or create a new one to get started.
        Use this space to craft, refine, and orchestrate your prompts for generative AI.
      </p>
      <button
        onClick={onAddIncantation}
        className="px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors shadow-md"
      >
        Create New Incantation
      </button>
      <div className="mt-8 text-xs text-slate-400">
        <p>Remember to set your <code>API_KEY</code> environment variable with your OpenRouter API key for AI interactions.</p>
      </div>
    </div>
  );
};