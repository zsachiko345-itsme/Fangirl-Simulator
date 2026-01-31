import React from 'react';
import { GameState } from '../types';
import { ACHIEVEMENTS } from '../data';

interface Props {
  state: GameState;
  onRestart: () => void;
}

const SettlementScreen: React.FC<Props> = ({ state, onRestart }) => {
  const endingTitle = state.san <= 0 ? "BE: 赛博疯子" : "BE: 进厂打工";
  const endingDesc = state.san <= 0 
      ? "你San值归零，发疯退网了。从此江湖上只留下了你的传说（和一堆坑）。" 
      : "你破产了，被迫回归三次元打工。同人梦碎，现实真苦。";

  return (
      <div className="fixed inset-0 bg-[#333] z-50 flex flex-col items-center justify-center p-6 text-white text-center animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-md">
              <h2 className="text-5xl font-black text-[#990000] mb-2 italic tracking-tighter">{endingTitle}</h2>
              <p className="text-sm text-gray-300 mb-8 font-serif leading-relaxed px-4 border-b border-gray-600 pb-4">
                  {endingDesc}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-white/5 p-3 border border-white/10 rounded">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Total Fans</div>
                      <div className="text-xl font-bold font-serif">{state.fans.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 p-3 border border-white/10 rounded">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Weeks</div>
                      <div className="text-xl font-bold font-serif">{state.weeks}</div>
                  </div>
                  <div className="bg-white/5 p-3 border border-white/10 rounded">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Highest Heat</div>
                      <div className="text-xl font-bold font-serif">{state.maxSingleHeat.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 p-3 border border-white/10 rounded">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest">Works</div>
                      <div className="text-xl font-bold font-serif">{state.worksCount}</div>
                  </div>
              </div>

              <div className="mb-8 text-left">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">Unlocked Achievements</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                      {ACHIEVEMENTS.map(ach => {
                          const isUnlocked = state.unlockedAchievements.includes(ach.id);
                          return (
                              <div 
                                  key={ach.id}
                                  className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-bold
                                      ${isUnlocked 
                                          ? 'bg-[#990000] border-[#990000] text-white shadow-[0_0_10px_rgba(153,0,0,0.5)]' 
                                          : 'bg-transparent border-gray-700 text-gray-700'}`}
                                  title={ach.name}
                              >
                                  {isUnlocked ? ach.category : '?'}
                              </div>
                          );
                      })}
                  </div>
              </div>

              <button 
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-xl"
                  onClick={onRestart}
              >
                  RESTART GAME
              </button>
          </div>
      </div>
  );
};

export default SettlementScreen;