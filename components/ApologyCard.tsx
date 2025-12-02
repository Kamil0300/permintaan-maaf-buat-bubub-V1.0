import React from 'react';
import { RefreshCcw, Heart, Copy, Share2 } from 'lucide-react';

interface ApologyCardProps {
  recipientName: string;
  apologyText: string;
  imageUrl: string | null;
  onReset: () => void;
}

export const ApologyCard: React.FC<ApologyCardProps> = ({ recipientName, apologyText, imageUrl, onReset }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(apologyText);
    alert('Kata-kata permintaan maaf berhasil disalin! ❤️');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto transform transition-all animate-fade-in-up border border-emerald-100">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
        <img 
          src={imageUrl || "https://picsum.photos/800/600?grayscale"} 
          alt="Apology Header" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-6 z-20 text-white">
          <p className="text-emerald-300 font-bold uppercase tracking-wider text-xs mb-1">Untuk tersayang</p>
          <h2 className="text-3xl font-bold">{recipientName}</h2>
        </div>
      </div>
      
      <div className="p-8 bg-gradient-to-b from-white to-green-50">
        <div className="mb-6 relative">
          <div className="absolute -top-4 -left-2 text-6xl text-emerald-100 font-serif opacity-50">"</div>
          <p className="text-gray-700 italic leading-relaxed text-lg font-medium relative z-10 font-serif">
            {apologyText}
          </p>
          <div className="absolute -bottom-8 -right-2 text-6xl text-emerald-100 font-serif opacity-50 transform rotate-180">"</div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-emerald-100 mt-8">
          <div className="flex space-x-2">
            <button 
              onClick={handleCopy}
              className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
              title="Salin Teks"
            >
              <Copy size={20} />
            </button>
            <button 
              onClick={() => alert("Fitur bagikan akan segera hadir!")}
              className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
              title="Bagikan"
            >
              <Share2 size={20} />
            </button>
          </div>
          
          <button 
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors font-semibold text-sm"
          >
            <RefreshCcw size={16} />
            <span>Coba Lagi</span>
          </button>
        </div>
      </div>
      
      <div className="bg-emerald-600 p-3 text-center text-white text-xs font-semibold tracking-widest flex items-center justify-center gap-2">
        DIBUAT DENGAN <Heart size={12} fill="white" /> UNTUKMU
      </div>
    </div>
  );
};