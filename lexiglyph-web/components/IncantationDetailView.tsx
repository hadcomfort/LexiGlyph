
import React, { useState, useEffect } from 'react';
import { Incantation } from '../types';
import { OpenRouterInteraction } from './OpenRouterInteraction';
import { TagInput } from './TagInput';

interface IncantationDetailViewProps {
  incantation: Incantation;
  onSave: (updatedIncantation: Incantation) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.177-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193v-.443A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
  </svg>
);

const DocumentDuplicateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
  <path d="M11.5 2.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V4.668A2.733 2.733 0 0 0 8.009 2H7.75a.75.75 0 0 1 0-1.5h.259a4.233 4.233 0 0 1 3.491 2.25Z" />
  <path d="M2.75 6a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM2.75 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 2.75 8Zm0 2a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path d="M7 3.5A2.5 2.5 0 0 0 4.5 6V14a2.5 2.5 0 0 0 2.5 2.5h6A2.5 2.5 0 0 0 15.5 14V8.75a.75.75 0 0 1 1.5 0V14a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1.75a.75.75 0 0 1 0 1.5H7Z" />
</svg>
);


export const IncantationDetailView: React.FC<IncantationDetailViewProps> = ({ incantation, onSave, onDelete, onDuplicate }) => {
  const [title, setTitle] = useState(incantation.title);
  const [content, setContent] = useState(incantation.content);
  const [tags, setTags] = useState<string[]>(incantation.tags);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitle(incantation.title);
    setContent(incantation.content);
    setTags(incantation.tags);
    setIsEditing(false); // Reset editing state when incantation changes
  }, [incantation]);

  const handleSave = () => {
    onSave({ ...incantation, title, content, tags });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setTitle(incantation.title);
    setContent(incantation.content);
    setTags(incantation.tags);
    setIsEditing(false);
  }

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${incantation.title}"?`)) {
      onDelete(incantation.id);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-300 bg-slate-50 shrink-0">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
            placeholder="Incantation Title"
          />
        ) : (
          <h2 className="text-xl font-semibold text-slate-800 truncate" title={title}>{title}</h2>
        )}
        <div className="text-xs text-slate-500 mt-1">
          Added: {new Date(incantation.dateAdded).toLocaleString()} | Modified: {new Date(incantation.dateModified).toLocaleString()}
        </div>
         <div className="mt-3 flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-sm bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors shadow-sm"
            >
              Edit Incantation
            </button>
          )}
           <button
              onClick={() => onDuplicate(incantation.id)}
              title="Duplicate Incantation"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <DocumentDuplicateIcon />
            </button>
            <button
              onClick={confirmDelete}
              title="Delete Incantation"
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
            >
              <TrashIcon/>
            </button>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        <div>
          <label htmlFor="incantation-content" className="block text-sm font-medium text-slate-700 mb-1">
            Content
          </label>
          {isEditing ? (
            <textarea
              id="incantation-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm font-mono"
              placeholder="Your incantation text..."
            />
          ) : (
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 min-h-[150px] whitespace-pre-wrap text-sm font-mono">
              {content || <span className="text-slate-400">No content yet.</span>}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="incantation-tags" className="block text-sm font-medium text-slate-700 mb-1">
            Tags
          </label>
          {isEditing ? (
             <TagInput tags={tags} setTags={setTags} />
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
                  {tag}
                </span>
              )) : <span className="text-sm text-slate-400">No tags.</span>}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-slate-300 shrink-0">
        <OpenRouterInteraction currentPromptText={content} />
      </div>
    </div>
  );
};