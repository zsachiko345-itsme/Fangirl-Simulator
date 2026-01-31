import React from 'react';
import { Achievement } from '../types';
import { ACHIEVEMENTS } from '../data';

interface BadgeProps {
  category: 'A' | 'B' | 'C' | 'D';
  unlockedIds: string[];
}

export const AchievementBadges: React.FC<BadgeProps> = ({ category, unlockedIds }) => {
  // Find highest tier unlocked for this category
  const unlocked = ACHIEVEMENTS
    .filter(a => a.category === category && unlockedIds.includes(a.id))
    .sort((a, b) => b.tier - a.tier);

  const highest = unlocked[0];

  if (!highest) {
    return (
      <div className="w-5 h-5 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-bold select-none" title="Locked">
        {category}
      </div>
    );
  }

  // Visuals based on tier
  const tierColors = [
    'bg-gray-400 text-white', // Tier 1
    'bg-blue-500 text-white', // Tier 2
    'bg-purple-600 text-white', // Tier 3
    'bg-yellow-500 text-white border-yellow-200 shadow-sm' // Tier 4 (Gold)
  ];

  return (
    <div 
      className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold cursor-help transition-transform hover:scale-110 ${tierColors[highest.tier - 1]}`}
      title={`${highest.name}: ${highest.description}`}
    >
      {category}
    </div>
  );
};

interface ModalProps {
  unlockedIds: string[];
  onClose: () => void;
}

export const AchievementModal: React.FC<ModalProps> = ({ unlockedIds, onClose }) => {
  const categories = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-[#F0F0F0] w-full max-w-lg max-h-[80vh] overflow-y-auto rounded shadow-2xl p-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-300">
          <h2 className="text-xl font-black text-[#990000] italic">ACHIEVEMENTS</h2>
          <button onClick={onClose} className="text-2xl hover:text-[#990000]">&times;</button>
        </div>

        <div className="space-y-6">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest border-b border-gray-200">
                Category {cat}
              </h3>
              <div className="space-y-2">
                {ACHIEVEMENTS.filter(a => a.category === cat).map(ach => {
                  const isUnlocked = unlockedIds.includes(ach.id);
                  return (
                    <div 
                      key={ach.id} 
                      className={`p-2 border rounded flex gap-3 ${isUnlocked ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 opacity-60'}`}
                    >
                      <div className={`
                        w-10 h-10 flex-shrink-0 flex items-center justify-center font-black text-lg rounded
                        ${isUnlocked 
                          ? ach.tier === 4 ? 'bg-yellow-100 text-yellow-600' : ach.tier === 3 ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'
                          : 'bg-gray-200 text-gray-300'}
                      `}>
                        {isUnlocked ? ach.tier : '?'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className={`font-bold text-sm ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                            {isUnlocked ? ach.name : '???'}
                          </h4>
                          <span className="text-[10px] font-mono text-gray-400">{ach.id}</span>
                        </div>
                        <p className="text-xs text-gray-600 italic mb-1">
                          {isUnlocked ? ach.description : ach.conditionDesc}
                        </p>
                        {isUnlocked && (
                          <div className="text-[10px] bg-[#990000]/10 text-[#990000] px-1 py-0.5 rounded inline-block font-bold">
                            BUFF: {ach.rewardDesc}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
