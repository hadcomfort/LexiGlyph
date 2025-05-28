
import React from 'react';
import { Incantation, SortableField, SortOrder } from '../types';

interface IncantationListProps {
  incantations: Incantation[];
  selectedIncantationId: string | null;
  onSelectIncantation: (id: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortField: SortableField;
  sortOrder: SortOrder;
  onSort: (field: SortableField) => void;
}

const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
  </svg>
);

const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" {...props}>
  <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.56l-2.47 2.47a.75.75 0 0 1-1.06-1.06l3.75-3.75a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L10.75 5.56V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
</svg>
);

const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" {...props}>
  <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.69l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L6.22 12.03a.75.75 0 0 1 1.06-1.06l2.47 2.47V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
</svg>
);


const SortButton: React.FC<{
  label: string;
  field: SortableField;
  currentSortField: SortableField;
  currentSortOrder: SortOrder;
  onClick: (field: SortableField) => void;
}> = ({ label, field, currentSortField, currentSortOrder, onClick }) => (
  <button
    onClick={() => onClick(field)}
    className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
  >
    {label}
    {currentSortField === field && (
      currentSortOrder === SortOrder.ASC ? <ArrowUpIcon className="ml-1" /> : <ArrowDownIcon className="ml-1" />
    )}
  </button>
);


export const IncantationList: React.FC<IncantationListProps> = ({
  incantations, selectedIncantationId, onSelectIncantation, searchTerm, onSearchTermChange, sortField, sortOrder, onSort
}) => {
  return (
    <div className="w-full md:w-96 border-r border-slate-300 flex flex-col overflow-hidden shrink-0 bg-white">
      <div className="p-3 border-b border-slate-300">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search incantations..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500 shadow-sm"
          />
        </div>
        <div className="mt-2 flex justify-end space-x-1">
            <SortButton label="Title" field={SortableField.TITLE} currentSortField={sortField} currentSortOrder={sortOrder} onClick={onSort} />
            <SortButton label="Date Modified" field={SortableField.DATE_MODIFIED} currentSortField={sortField} currentSortOrder={sortOrder} onClick={onSort} />
        </div>
      </div>
      <ul className="overflow-y-auto flex-grow divide-y divide-slate-200">
        {incantations.length === 0 ? (
          <li className="p-4 text-sm text-slate-500 text-center">No incantations found.</li>
        ) : (
          incantations.map(inc => (
            <li key={inc.id}>
              <button
                onClick={() => onSelectIncantation(inc.id)}
                className={`w-full text-left p-3 transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus:bg-sky-100
                            ${selectedIncantationId === inc.id ? 'bg-sky-100 border-r-4 border-sky-500' : ''}`}
              >
                <h3 className={`font-medium truncate ${selectedIncantationId === inc.id ? 'text-sky-700' : 'text-slate-800'}`}>{inc.title}</h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">{inc.content || "No content"}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(inc.dateModified).toLocaleDateString()}
                  {inc.tags.length > 0 && <span className="ml-2 truncate"> &middot; {inc.tags.join(', ')}</span>}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};