import React from 'react';

interface Props {
  onClose: () => void;
  onReset: () => void;
}

const SettingsModal: React.FC<Props> = ({ onClose, onReset }) => {
  const handleReset = () => {
    if (window.confirm('确定要重置游戏吗？所有进度将丢失。\nAre you sure you want to reset the game? All progress will be lost.')) {
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white w-full max-w-xs rounded-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
          <h3 className="font-bold text-gray-700">SETTINGS</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black font-bold px-2">
            &times;
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h4 className="font-bold text-[#990000] mb-1">重置游戏 / RESET</h4>
            <p className="text-xs text-gray-500 mb-3">
              返回主菜单重新开始。<br/>当前进度（包括成就）将被清除。
            </p>
            <button 
              onClick={handleReset}
              className="w-full py-2 bg-red-100 text-red-700 border border-red-200 font-bold rounded hover:bg-red-200 transition-colors"
            >
              Confirm Reset
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-4 text-center">
             <p className="text-[10px] text-gray-400">Fangirl Simulator Refactored<br/>v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;