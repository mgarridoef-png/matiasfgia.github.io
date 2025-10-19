
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt }) => {
  return (
    <div className="aspect-square w-full bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center p-4 transition-all duration-300">
      {isLoading ? (
        <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-400">Creando magia... Por favor, espera.</p>
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-contain rounded-lg"
        />
      ) : (
        <div className="text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">La imagen generada aparecerá aquí.</p>
        </div>
      )}
    </div>
  );
};
