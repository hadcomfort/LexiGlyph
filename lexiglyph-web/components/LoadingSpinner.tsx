
import React from 'react';

export const LoadingSpinner: React.FC<{ size?: string; color?: string }> = ({ size = 'w-5 h-5', color = 'border-white' }) => {
  return (
    <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 ${color} border-opacity-50`}></div>
  );
};