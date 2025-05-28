
import { Incantation } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

export const loadIncantationsFromStorage = (): Incantation[] => {
  try {
    const storedIncantations = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedIncantations) {
      const parsed = JSON.parse(storedIncantations) as Incantation[];
      // Ensure dates are properly handled if they were stored as strings
      return parsed.map(inc => ({
        ...inc,
        dateAdded: inc.dateAdded || new Date().toISOString(), // Fallback for older data
        dateModified: inc.dateModified || new Date().toISOString(), // Fallback for older data
      }));
    }
  } catch (error) {
    console.error("Failed to load incantations from local storage:", error);
  }
  return [];
};

export const saveIncantationsToStorage = (incantations: Incantation[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(incantations));
  } catch (error) {
    console.error("Failed to save incantations to local storage:", error);
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};