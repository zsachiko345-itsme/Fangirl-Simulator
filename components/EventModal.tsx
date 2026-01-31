import React from 'react';
import { RandomEvent } from '../types';

interface Props {
  event: RandomEvent | null;
  onConfirm: () => void;
}

const EventModal: React.FC<Props> = ({ event, onConfirm }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-sm border-4 border-[#990000] shadow-[10px_10px_0px_rgba(255,0,0,0.2)] animate-shake relative overflow-hidden">
         {/* Warning Stripe */}
         <div className="bg-[repeating-linear-gradient(45deg,#FFEB3B,#FFEB3B_10px,#000_10px,#000_20px)] h-4 w-full border-b border-black"></div>
         
         <div className="p-6 text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-2xl font-black text-[#990000] mb-4 italic tracking-tighter">
                {event.name}
            </h3>
            <p className="text-sm font-serif text-gray-700 mb-6 leading-relaxed">
                {event.description}
            </p>
            <div className="bg-gray-100 p-3 rounded border border-gray-300 mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Effect</span>
                <span className="text-sm font-bold text-[#990000]">{event.effectDesc}</span>
            </div>
            
            <button 
                onClick={onConfirm}
                className="w-full py-3 bg-[#990000] text-white font-black uppercase tracking-widest hover:bg-red-800 transition-colors shadow-lg"
            >
                接受命运 (ACCEPT)
            </button>
         </div>
      </div>
    </div>
  );
};

export default EventModal;