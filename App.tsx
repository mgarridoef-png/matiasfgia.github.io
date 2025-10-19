
import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { generateImageFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUsedPrompt, setLastUsedPrompt] = useState<string>('');

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setLastUsedPrompt(prompt);

    try {
      const generatedImageUrl = await generateImageFromPrompt(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Generador de Imágenes con IA
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Convierte tus ideas en imágenes. Describe lo que quieres ver.
          </p>
        </header>
        
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
          <PromptForm 
            prompt={prompt} 
            setPrompt={setPrompt} 
            handleSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>

        <div className="w-full max-w-2xl mt-8">
          {error && <ErrorMessage message={error} />}
          <ImageDisplay 
            imageUrl={imageUrl} 
            isLoading={isLoading} 
            prompt={lastUsedPrompt} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
