import React, { useState, useEffect } from 'react';
import { ApologyData, ApologyTone } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Mic, MicOff, Upload, Sparkles, X } from 'lucide-react';

interface ApologyFormProps {
  onSubmit: (data: ApologyData) => void;
  isLoading: boolean;
}

export const ApologyForm: React.FC<ApologyFormProps> = ({ onSubmit, isLoading }) => {
  const [recipientName, setRecipientName] = useState('');
  const [reason, setReason] = useState('');
  const [tone, setTone] = useState<ApologyTone>(ApologyTone.SINCERE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    hasRecognitionSupport 
  } = useSpeechRecognition();

  // Sync transcript to reason text area
  useEffect(() => {
    if (transcript) {
      setReason(transcript);
    }
  }, [transcript]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      recipientName,
      reason,
      tone,
      imageUrl: imagePreview
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-emerald-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-300 to-green-500"></div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-emerald-900">
          Masukin Nama
        </label>
        <input
          type="text"
          required
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="sayang, bubub"
          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-emerald-50/50"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-emerald-900 flex justify-between items-center">
          <span>Kenapa kamu minta maaf?</span>
          {isListening && <span className="text-red-500 text-xs animate-pulse">Mendengarkan...</span>}
        </label>
        <div className="relative">
          <textarea
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-emerald-50/50 min-h-[120px] resize-none pr-12"
          />
          {hasRecognitionSupport && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg animate-pulse' 
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
              title="Rekam Suara"
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}
        </div>
        <p className="text-xs text-emerald-600/70">
          Tips: Kamu bisa mengetik atau menggunakan mikrofon untuk merekam alasanmu.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-emerald-900">
          Nada Permintaan Maaf
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(ApologyTone).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTone(t)}
              className={`py-2 px-3 text-xs sm:text-sm rounded-lg border transition-all ${
                tone === t
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105'
                  : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-emerald-900">
          Upload Foto
        </label>
        {!imagePreview ? (
          <div className="relative border-2 border-dashed border-emerald-300 rounded-xl p-6 text-center hover:bg-emerald-50 transition-colors cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center space-y-2 text-emerald-500 group-hover:text-emerald-600">
              <Upload size={32} />
              <span className="text-sm font-medium">Klik untuk upload foto</span>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden shadow-md border border-emerald-200">
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !recipientName || !reason}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:translate-y-[-2px] ${
          isLoading || !recipientName || !reason
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-500/30'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Merangkai Kata...
          </span>
        ) : (
          <>
            <Sparkles size={20} />
            <span>Buat Surat Maaf</span>
          </>
        )}
      </button>
    </form>
  );
};