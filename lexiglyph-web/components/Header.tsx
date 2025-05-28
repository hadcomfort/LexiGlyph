
import React, { useRef } from 'react';

interface HeaderProps {
  onAddIncantation: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
);

const Bars3Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
  </svg>
);

const ArrowDownTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
  </svg>
);

const ArrowUpTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M9.25 3.75a.75.75 0 0 1 1.5 0v8.614l2.955-3.129a.75.75 0 0 1 1.09 1.03l-4.25 4.5a.75.75 0 0 1-1.09 0l-4.25-4.5a.75.75 0 1 1 1.09-1.03l2.955 3.129V3.75Z" />
    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
  </svg>
);


export const Header: React.FC<HeaderProps> = ({ onAddIncantation, onExport, onImport, onToggleSidebar, sidebarOpen }) => {
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    importFileRef.current?.click();
  };

  return (
    <header className="bg-slate-800 text-white p-3 shadow-md flex items-center justify-between shrink-0">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 mr-2"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Bars3Icon />
        </button>
        <h1 className="text-xl font-semibold tracking-tight">LexiGlyph Web</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onAddIncantation}
          className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-150"
          title="Add New Incantation"
        >
          <PlusIcon className="mr-1.5" />
          New
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-150"
          title="Import Incantations"
        >
          <ArrowUpTrayIcon className="mr-1.5" />
          Import
        </button>
        <input type="file" ref={importFileRef} onChange={onImport} accept=".json" className="hidden" />
        <button
          onClick={onExport}
          className="flex items-center bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-150"
          title="Export Incantations"
        >
          <ArrowDownTrayIcon className="mr-1.5" />
          Export
        </button>
      </div>
    </header>
  );
};