import React, { useState } from 'react';
import { ApologyForm } from './components/ApologyForm';
import { ApologyCard } from './components/ApologyCard';
import { ApologyData } from './types';
import { generateApologyMessage } from './services/geminiService';
import { HeartHandshake } from 'lucide-react';

const App: React.FC = () => {
  const [apologyData, setApologyData] = useState<ApologyData | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: ApologyData) => {
    setIsLoading(true);
    setApologyData(data);
    try {
      const text = await generateApologyMessage(data.recipientName, data.reason, data.tone);
      setGeneratedText(text);
    } catch (error) {
      console.error("Failed to generate", error);
      setGeneratedText("Maaf, aku kehabisan kata-kata saat ini. Tapi percayalah aku benar-benar menyesal.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setApologyData(null);
    setGeneratedText('');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center sm:justify-between">
          <div className="flex items-center space-x-2 text-emerald-700">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <HeartHandshake size={28} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Maafin Aku</h1>
          </div>
          <p className="hidden sm:block text-sm text-emerald-600 font-medium">
            Asisten Permintaan Maaf AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          {!generatedText ? (
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 leading-tight">
                  Deklarasi Permintaan Maaf, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
                    Miwru.
                  </span>
                </h2>
              </div>
              <ApologyForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <ApologyCard 
                recipientName={apologyData?.recipientName || ''}
                apologyText={generatedText}
                imageUrl={apologyData?.imageUrl || null}
                onReset={handleReset}
              />
              <div className="mt-8 text-center">
                <p className="text-emerald-800 font-medium">Semoga dimaafin ya! 💚</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-emerald-600/60 text-sm">
        <p>&copy; {new Date().getFullYear()} Aplikasi dadakan buat minta maaf ke bubub.</p>
      </footer>
    </div>
  );
};

export default App;