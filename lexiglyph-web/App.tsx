
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Incantation, TagWithCount, SortOrder, SortableField } from './types';
import { Header } from './components/Header';
import { TagSidebar } from './components/TagSidebar';
import { IncantationList } from './components/IncantationList';
import { IncantationDetailView } from './components/IncantationDetailView';
import { loadIncantationsFromStorage, saveIncantationsToStorage, generateId } from './services/incantationService';
import { WelcomePlaceholder } from './components/WelcomePlaceholder';

const App: React.FC = () => {
  const [incantations, setIncantations] = useState<Incantation[]>([]);
  const [selectedIncantationId, setSelectedIncantationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  const [sortField, setSortField] = useState<SortableField>(SortableField.DATE_MODIFIED);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);


  useEffect(() => {
    setIncantations(loadIncantationsFromStorage());
  }, []);

  useEffect(() => {
    saveIncantationsToStorage(incantations);
  }, [incantations]);

  const handleAddIncantation = useCallback(() => {
    const newIncantation: Incantation = {
      id: generateId(),
      title: 'Untitled Incantation',
      content: '',
      tags: [],
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };
    setIncantations(prev => [newIncantation, ...prev]);
    setSelectedIncantationId(newIncantation.id);
  }, []);

  const handleUpdateIncantation = useCallback((updatedIncantation: Incantation) => {
    setIncantations(prev =>
      prev.map(inc => (inc.id === updatedIncantation.id ? { ...updatedIncantation, dateModified: new Date().toISOString() } : inc))
    );
  }, []);

  const handleDeleteIncantation = useCallback((id: string) => {
    setIncantations(prev => prev.filter(inc => inc.id !== id));
    if (selectedIncantationId === id) {
      setSelectedIncantationId(null);
    }
  }, [selectedIncantationId]);

  const handleDuplicateIncantation = useCallback((id: string) => {
    const original = incantations.find(inc => inc.id === id);
    if (original) {
      const newIncantation: Incantation = {
        ...original,
        id: generateId(),
        title: `${original.title} (Copy)`,
        dateAdded: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };
      setIncantations(prev => [newIncantation, ...prev]);
      setSelectedIncantationId(newIncantation.id);
    }
  }, [incantations]);

  const allTags = useMemo<TagWithCount[]>(() => {
    const tagMap = new Map<string, number>();
    incantations.forEach(inc => {
      inc.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [incantations]);

  const filteredIncantations = useMemo(() => {
    return incantations
      .filter(inc => {
        const searchTermLower = searchTerm.toLowerCase();
        const titleMatch = inc.title.toLowerCase().includes(searchTermLower);
        const contentMatch = inc.content.toLowerCase().includes(searchTermLower);
        const tagMatch = activeTags.length === 0 || activeTags.every(at => inc.tags.includes(at));
        return (titleMatch || contentMatch) && tagMatch;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === SortableField.TITLE) {
          comparison = a.title.localeCompare(b.title);
        } else { // DATE_MODIFIED
          comparison = new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime(); // Default desc for date
        }
        return sortOrder === SortOrder.ASC ? comparison : -comparison;
      });
  }, [incantations, searchTerm, activeTags, sortField, sortOrder]);

  const selectedIncantation = useMemo(() => {
    return incantations.find(inc => inc.id === selectedIncantationId) || null;
  }, [incantations, selectedIncantationId]);

  const handleExport = useCallback(() => {
    const jsonString = JSON.stringify(incantations, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lexiglyph_incantations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [incantations]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          
          if (
            Array.isArray(importedData) &&
            importedData.every(
              (inc: any): inc is Incantation => // Type predicate for better type checking
                typeof inc.id === 'string' &&
                typeof inc.title === 'string' &&
                typeof inc.content === 'string' &&
                Array.isArray(inc.tags) &&
                inc.tags.every((tag: any) => typeof tag === 'string') &&
                typeof inc.dateAdded === 'string' && // Should ideally be validated as ISO string
                typeof inc.dateModified === 'string' // Should ideally be validated as ISO string
            )
          ) {
            const typedImportedIncantations = importedData as Incantation[];
            
            const currentIncantationIds = new Set(incantations.map(i => i.id));
            const newUniqueIncantationsToAdd = typedImportedIncantations.filter(
              i => !currentIncantationIds.has(i.id)
            );
            
            if (newUniqueIncantationsToAdd.length > 0) {
                setIncantations(prev => [...prev, ...newUniqueIncantationsToAdd]);
            }
            
            alert(`${newUniqueIncantationsToAdd.length} new incantation(s) imported successfully! ${typedImportedIncantations.length - newUniqueIncantationsToAdd.length} duplicate(s) (by ID) were skipped.`);

          } else {
            alert("Invalid file format or missing/incorrectly typed fields in incantations. Please ensure each incantation has id, title, content, tags (array of strings), dateAdded, and dateModified.");
          }
        } catch (error) {
          alert("Error parsing file. Please ensure it's a valid JSON file.");
          console.error("Import error:", error);
        }
      };
      reader.readAsText(file);
      if (event.target) { // Ensure event.target is not null
        event.target.value = ''; // Reset file input
      }
    }
  }, [incantations]); // Added incantations as a dependency
  
  const toggleSort = (field: SortableField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortField(field);
      // Default to DESC for dateModified, ASC for title, or stick to one for simplicity:
      setSortOrder(field === SortableField.TITLE ? SortOrder.ASC : SortOrder.DESC); 
    }
  };


  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800">
      <Header
        onAddIncantation={handleAddIncantation}
        onExport={handleExport}
        onImport={handleImport}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-grow overflow-hidden">
        {sidebarOpen && (
          <TagSidebar
            tags={allTags}
            activeTags={activeTags}
            onTagToggle={(tag) =>
              setActiveTags(prev =>
                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
              )
            }
            onClearFilters={() => setActiveTags([])}
          />
        )}
        <main className="flex flex-col flex-grow overflow-hidden">
           <IncantationList
            incantations={filteredIncantations}
            selectedIncantationId={selectedIncantationId}
            onSelectIncantation={setSelectedIncantationId}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={toggleSort}
          />
        </main>
        <aside className="w-1/2 xl:w-2/5 border-l border-slate-300 flex flex-col overflow-hidden bg-white shadow-lg">
          {selectedIncantation ? (
            <IncantationDetailView
              key={selectedIncantation.id} // Ensures re-mount on selection change for fresh state
              incantation={selectedIncantation}
              onSave={handleUpdateIncantation}
              onDelete={handleDeleteIncantation}
              onDuplicate={handleDuplicateIncantation}
            />
          ) : (
            <WelcomePlaceholder onAddIncantation={handleAddIncantation} />
          )}
        </aside>
      </div>
    </div>
  );
};

export default App;