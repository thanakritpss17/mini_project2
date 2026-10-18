import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="card bg-base-100 border p-4 animate-pulse space-y-3">
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};