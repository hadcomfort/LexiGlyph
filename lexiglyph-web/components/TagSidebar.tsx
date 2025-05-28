
import React from 'react';
import { TagWithCount } from '../types';

interface TagSidebarProps {
  tags: TagWithCount[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export const TagSidebar: React.FC<TagSidebarProps> = ({ tags, activeTags, onTagToggle, onClearFilters }) => {
  return (
    <aside className="w-64 bg-slate-200 p-4 border-r border-slate-300 overflow-y-auto shrink-0">
      <h2 className="text-lg font-semibold mb-3 text-slate-700">Tags</h2>
      {tags.length === 0 ? (
         <p className="text-sm text-slate-500">No tags yet. Add tags to your incantations to see them here.</p>
      ) : (
        <>
        {activeTags.length > 0 && (
            <button
            onClick={onClearFilters}
            className="w-full text-sm text-sky-600 hover:text-sky-800 mb-3 text-left"
            >
            Clear all filters
            </button>
        )}
        <ul className="space-y-1">
            {tags.map(tag => (
            <li key={tag.name}>
                <button
                onClick={() => onTagToggle(tag.name)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150
                            ${activeTags.includes(tag.name)
                                ? 'bg-sky-600 text-white font-medium shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-300 text-slate-700 hover:text-slate-900'
                            }`}
                >
                <span className="truncate">{tag.name}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-mono ${activeTags.includes(tag.name) ? 'bg-sky-700 text-sky-100' : 'bg-slate-300 text-slate-600'}`}>{tag.count}</span>
                </button>
            </li>
            ))}
        </ul>
        </>
      )}
    </aside>
  );
};