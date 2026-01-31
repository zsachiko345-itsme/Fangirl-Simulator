import React from 'react';
import { ActionDefinition, ActionCategory } from '../types';

interface Props {
  activeCategory: ActionCategory | null;
  actions: ActionDefinition[];
  onCategorySelect: (cat: ActionCategory | null) => void;
  onActionSelect: (act: ActionDefinition) => void;
  onNextWeek: () => void;
  ap: number;
}

const ActionMenu: React.FC<Props> = ({ 
  activeCategory, 
  actions, 
  onCategorySelect, 
  onActionSelect, 
  onNextWeek,
  ap
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40">
      {/* Submenu Overlay */}
      {activeCategory && (
        <div 
          className="bg-white border-t-4 border-[#990000] shadow-[0_-5px_20px_rgba(0,0,0,0.15)] animate-slideUp max-h-[60vh] overflow-y-auto"
        >
          <div className="p-2 bg-[#990000] text-white flex justify-between items-center px-4">
            <span className="font-bold tracking-widest">{activeCategory} ACTIONS</span>
            <button onClick={() => onCategorySelect(null)} className="text-white text-sm opacity-80 hover:opacity-100">
              CLOSE ▼
            </button>
          </div>
          <div className="p-4 space-y-3 pb-24">
            {actions.map((act) => {
              const canAfford = ap >= act.apCost;
              return (
                <button
                  key={act.id}
                  disabled={!canAfford}
                  onClick={() => onActionSelect(act)}
                  className={`
                    w-full text-left p-3 border rounded-md transition-all group relative overflow-hidden
                    ${canAfford 
                      ? 'bg-white border-gray-300 hover:border-[#990000] hover:shadow-md active:bg-gray-50' 
                      : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'}
                  `}
                >
                  <div className="flex justify-between items-center mb-1 relative z-10">
                    <span className={`font-black font-serif text-lg ${canAfford ? 'text-gray-800 group-hover:text-[#990000]' : 'text-gray-400'}`}>
                      {act.label}
                    </span>
                    <span className="text-xs bg-black text-white px-1.5 py-0.5 font-bold">
                      AP -{act.apCost}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 italic relative z-10 pr-8">
                    {act.intent}
                  </p>
                  {act.baseHeat && act.baseHeat > 0 && (
                     <span className="absolute bottom-2 right-2 text-[10px] font-bold text-[#990000] opacity-50">
                       🔥 HOT
                     </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="bg-[#F0F0F0] border-t border-gray-300 p-2 safe-area-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex gap-2 h-16 items-stretch relative z-50">
        {(['PRODUCE', 'SOCIAL', 'LIFE'] as ActionCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(activeCategory === cat ? null : cat)}
            className={`
              flex-1 border-b-4 font-bold text-sm tracking-wider transition-all
              ${activeCategory === cat 
                ? 'bg-[#990000] text-white border-black transform -translate-y-1 shadow-lg' 
                : 'bg-white text-gray-600 border-gray-400 hover:bg-gray-50 hover:border-[#990000] hover:text-[#990000]'}
            `}
          >
            {cat === 'PRODUCE' ? '产出' : cat === 'SOCIAL' ? '互动' : '现充'}
          </button>
        ))}
        <button
          onClick={onNextWeek}
          className="flex-none w-16 bg-gray-800 text-white font-black text-xs border-b-4 border-black hover:bg-black active:translate-y-0.5 active:border-b-0 transition-all rounded-sm flex items-center justify-center leading-tight"
        >
          NEXT<br/>WEEK
        </button>
      </div>
    </div>
  );
};

export default ActionMenu;