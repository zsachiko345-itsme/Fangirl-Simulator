import React from 'react';
import { GameState } from '../types';
import { AchievementBadges } from './AchievementDisplay';

interface Props {
  state: GameState;
  showAchievements: () => void;
  onReset: () => void;
}

const StatusHeader: React.FC<Props> = ({ state, showAchievements, onReset }) => {
  const handleResetClick = () => {
    if (window.confirm('确定要重置游戏回到主菜单吗？\nAre you sure you want to reset the game?')) {
      onReset();
    }
  };

  return (
    <div className="bg-[#F0F0F0] p-3 border-b border-gray-300 shadow-sm sticky top-0 z-10">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="bg-[#990000] text-white text-xs px-2 py-0.5 font-black uppercase tracking-wider rounded-sm">
              {state.jobTitle}
            </span>
            <span className="font-black text-gray-800 text-sm truncate max-w-[100px]">
              {state.playerName}
            </span>
            {/* Achievement Badges */}
            <div className="flex gap-1 ml-1" onClick={showAchievements}>
              {(['A', 'B', 'C', 'D'] as const).map(cat => (
                <AchievementBadges key={cat} category={cat} unlockedIds={state.unlockedAchievements} />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-gray-500 mt-1 truncate font-serif">
            {state.fandom} • {state.trope}
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={handleResetClick} className="text-lg p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-[#990000]" title="Reset Game">
            ↺
          </button>
          <button onClick={showAchievements} className="text-xl p-1 hover:bg-gray-200 rounded" title="Achievements">
            🏆
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1 select-none">
        {[
          { l: 'WEEK', v: state.weeks },
          { l: 'SAN', v: `${state.san}/${state.maxSan}` },
          { l: 'MONEY', v: state.money },
          { l: 'AP', v: `${state.ap}/${state.maxAp}` },
          { l: 'FANS', v: state.fans }
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-300 p-1 flex flex-col items-center justify-center h-10 shadow-sm">
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wide">{s.l}</span>
            <span className="text-xs font-black text-[#990000]">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHeader;