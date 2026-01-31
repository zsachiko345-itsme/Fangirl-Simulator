import React, { useState, useCallback, useEffect } from 'react';
import { GameState, LogEntry, ActionCategory, ActionDefinition, LuckLevel, JobType } from './types';
import { JOB_MAP, ACTIONS, FLAVOR_TEXT, ACHIEVEMENTS } from './data';
import StatusHeader from './components/StatusHeader';
import GameLog from './components/GameLog';
import ActionMenu from './components/ActionMenu';
import { AchievementModal } from './components/AchievementDisplay';

const FANDOMS = [
  { name: '欧美冷门剧', mode: 'General' }, 
  { name: '内娱选秀', mode: 'RPS' }, 
  { name: '二次元手游', mode: 'ACG' }
];
const TROPES = ['烂人真心', '破镜重圆', '青梅竹马', '相爱相杀', '水仙', '拉郎配'];
const TALENTS: Record<string, string[]> = { 
  '文手': ['坑品极差的', '文笔惊艳的'], 
  '画手': ['人体描边大师', '神仙光影的'], 
  '剪辑': ['特效大神的', '卡点狂魔'], 
  '路人': ['很有钱的', '看文必评论的'] 
};

interface CharacterProfile {
  name: string;
  job: JobType;
  jobTitle: string;
  fandom: string;
  trope: string;
  mode: string;
}

// Start Screen Component with Profile Card
const StartScreen: React.FC<{ onStart: (profile: CharacterProfile) => void }> = ({ onStart }) => {
  const [step, setStep] = useState<'input' | 'card'>('input');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState<CharacterProfile | null>(null);

  const handleDraw = (jobTitle: string) => {
    if (!name.trim()) {
      alert("请输入你的圈名 ID / Please enter your ID");
      return;
    }

    const jobKey = JOB_MAP[jobTitle];
    const fandomInfo = FANDOMS[Math.floor(Math.random() * FANDOMS.length)];
    const randomTrope = TROPES[Math.floor(Math.random() * TROPES.length)];
    const prefix = TALENTS[jobTitle][Math.floor(Math.random() * TALENTS[jobTitle].length)];
    
    setProfile({
      name: prefix + name,
      job: jobKey,
      jobTitle: jobTitle,
      fandom: fandomInfo.name,
      mode: fandomInfo.mode,
      trope: randomTrope
    });
    setStep('card');
  };

  const getJobEmoji = (job: string) => {
    switch(job) {
      case '文手': return '✒️';
      case '画手': return '🎨';
      case '剪辑': return '✂️';
      default: return '🕶️';
    }
  };

  if (step === 'card' && profile) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#F0F0F0] p-6 animate-fadeIn">
        <div className="bg-white border-4 border-[#990000] p-6 shadow-[10px_10px_0px_rgba(0,0,0,0.1)] w-full max-w-sm relative">
           {/* Decorative corner */}
           <div className="absolute top-2 right-2 text-[#990000] font-black text-xs border border-[#990000] px-1">ID CARD</div>
           
           <div className="flex flex-col items-center mb-6">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl border-2 border-gray-300 mb-3 shadow-inner">
               {getJobEmoji(profile.jobTitle)}
             </div>
             <h2 className="text-xl font-black text-gray-800 text-center">{profile.name}</h2>
             <span className="text-xs bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest mt-1">
               {profile.jobTitle}
             </span>
           </div>

           <div className="space-y-3 mb-8 border-t border-b border-gray-200 py-4">
             <div className="flex justify-between items-center">
               <span className="text-gray-400 text-xs font-bold uppercase">Fandom</span>
               <span className="text-gray-800 font-serif font-bold">{profile.fandom}</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-gray-400 text-xs font-bold uppercase">Type</span>
               <span className="text-gray-800 font-serif font-bold">{profile.mode}</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-gray-400 text-xs font-bold uppercase">Trope</span>
               <span className="text-[#990000] font-serif font-bold italic">{profile.trope}</span>
             </div>
           </div>

           <div className="flex gap-2">
             <button 
               onClick={() => setStep('input')}
               className="flex-1 py-3 bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300 transition-colors"
             >
               重来 (RE-ROLL)
             </button>
             <button 
               onClick={() => onStart(profile)}
               className="flex-[2] py-3 bg-[#990000] text-white font-black text-sm tracking-widest hover:bg-red-800 transition-colors shadow-lg"
             >
               确认入坑 (START)
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-[#F0F0F0] p-6 space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-5xl font-black italic text-[#990000] mb-2 tracking-tighter">同人女<br/>模拟器</h1>
        <p className="text-gray-400 text-xs italic border-t border-gray-300 pt-2 tracking-widest">FANGIRL SIMULATOR REFACTORED</p>
      </div>
      
      <input 
        type="text" 
        placeholder="输入你的圈名 ID..." 
        className="w-full max-w-xs p-4 border-b-2 border-gray-300 bg-transparent text-center outline-none focus:border-[#990000] text-xl font-serif placeholder-gray-400 transition-colors"
        value={name} 
        onChange={e => setName(e.target.value)} 
      />

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {Object.keys(JOB_MAP).map(jobTitle => (
          <button 
            key={jobTitle}
            onClick={() => name && handleDraw(jobTitle)}
            className="bg-white border border-gray-300 border-b-4 border-b-gray-400 py-3 font-bold text-gray-700 hover:text-[#990000] hover:border-[#990000] active:border-b active:translate-y-0.5 transition-all"
          >
            {jobTitle}
          </button>
        ))}
      </div>
      
      {!name && <div className="text-gray-400 text-xs italic">Please enter name to select job</div>}
    </div>
  );
};

// Result Screen
const GameOverScreen: React.FC<{ state: GameState, onRestart: () => void }> = ({ state, onRestart }) => (
  <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 text-white text-center animate-fadeIn">
    <h2 className="text-6xl font-black text-[#990000] mb-2 italic">END</h2>
    <p className="text-xl mb-12 font-serif text-gray-300 italic">
      {state.san <= 0 ? "你发疯退网了 (SAN归零)" : "你破产回归三次元了 (存款透支)"}
    </p>
    <div className="grid grid-cols-2 gap-4 w-full mb-12 max-w-sm">
      <div className="bg-white/10 p-4 border border-white/20">
        <div className="text-xs text-gray-400 uppercase">Total Fans</div>
        <div className="text-2xl font-bold">{state.fans.toLocaleString()}</div>
      </div>
      <div className="bg-white/10 p-4 border border-white/20">
        <div className="text-xs text-gray-400 uppercase">Weeks Survived</div>
        <div className="text-2xl font-bold">{state.weeks}</div>
      </div>
    </div>
    <button 
      className="w-full max-w-xs py-4 bg-[#990000] text-white font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
      onClick={onRestart}
    >
      Restart Game
    </button>
  </div>
);

export default function App() {
  const [view, setView] = useState<'start' | 'game'>('start');
  const [activeMenu, setActiveMenu] = useState<ActionCategory | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  const [state, setState] = useState<GameState>({
    playerName: '', job: 'writer', jobTitle: '文手', fandom: '', trope: '',
    weeks: 1, san: 100, maxSan: 100, money: 5000, heat: 0, fans: 0, 
    ap: 5, maxAp: 5, moe: 0, toxic: 0, worksCount: 0,
    maxSingleHeat: 0, consecutiveNoProduce: 0, consecutiveLow: 0, hasRevived: false,
    isGameOver: false, unlockedAchievements: [], forceHighNext: false
  });

  // Helper to unlock achievements
  const checkAchievements = useCallback((currentState: GameState, lastActionInfo?: { type: string, heat: number, luck: LuckLevel }) => {
    const newUnlocked: string[] = [];
    const { unlockedAchievements } = currentState;

    const unlock = (id: string) => {
      if (!unlockedAchievements.includes(id)) {
        newUnlocked.push(id);
      }
    };

    // A: 晋升
    if (currentState.worksCount === 1 && currentState.heat < 1000) unlock('ACH_01');
    if (currentState.maxSingleHeat > 5000) unlock('ACH_02');
    if (currentState.heat > 20000) unlock('ACH_03');
    if (currentState.heat > 100000) unlock('ACH_04');

    // B: 财富
    if (currentState.money < 500) unlock('ACH_05');
    if (currentState.money > 50000) unlock('ACH_06');
    if (currentState.worksCount > 50) unlock('ACH_07');
    if (currentState.consecutiveNoProduce >= 4) unlock('ACH_08');

    // C: 性格
    if (currentState.moe > 80) unlock('ACH_09');
    if (currentState.toxic > 80) unlock('ACH_10');
    if (currentState.weeks >= 96 && currentState.moe < 20 && currentState.toxic < 20) unlock('ACH_11');

    // D: 彩蛋
    if (currentState.san === 1 && !currentState.isGameOver) unlock('ACH_12');
    if (currentState.consecutiveLow >= 3) unlock('ACH_13');
    // ACH_14 checked at game over event manually if needed, or if fandom change implemented

    if (newUnlocked.length > 0) {
      newUnlocked.forEach(id => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        addLog(`🏆 <b>解锁成就: ${ach?.name}</b> - ${ach?.rewardDesc}`, 'success');
      });
      return { ...currentState, unlockedAchievements: [...currentState.unlockedAchievements, ...newUnlocked] };
    }
    return currentState;
  }, []);

  const addLog = useCallback((text: string, type: LogEntry['type'] = 'action') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [...prev, { id: Math.random(), text, type, time }]);
  }, []);

  const startGame = (profile: CharacterProfile) => {
    setState({
      ...state,
      playerName: profile.name,
      job: profile.job,
      jobTitle: profile.jobTitle,
      fandom: profile.fandom,
      trope: profile.trope,
      
      weeks: 1, san: 100, maxSan: 100, money: 5000, heat: 0, fans: 0, 
      ap: 5, maxAp: 5,
      moe: 0, toxic: 0, worksCount: 0,
      maxSingleHeat: 0, consecutiveNoProduce: 0, consecutiveLow: 0, hasRevived: false,
      isGameOver: false, unlockedAchievements: [], forceHighNext: false
    });
    setLogs([]);
    addLog(`欢迎来到同人圈。你的身份是 <b>${profile.job.toUpperCase()}</b>.`, 'system');
    addLog(`入坑了 <b>${profile.fandom}</b> (${profile.mode})。`, 'system');
    addLog(`你的属性是：<b>${profile.trope}</b>`, 'system');
    setView('game');
  };

  const handleNextWeek = () => {
    setState(prev => {
      let nextState = { ...prev };
      
      // Salary System
      const isPayday = nextState.weeks % 4 === 0;
      const salary = 5000;
      const livingCost = 400;
      
      let income = isPayday ? salary : 0;
      let expenses = livingCost;
      
      nextState.money = nextState.money + income - expenses;
      nextState.weeks += 1;
      
      // ACH_07: Max AP +1
      const maxApBuff = prev.unlockedAchievements.includes('ACH_07') ? 1 : 0;
      nextState.ap = prev.maxAp + maxApBuff;
      
      // Track no produce
      // We rely on consecutiveNoProduce being incremented here, 
      // and reset in handleAction if Produce.
      nextState.consecutiveNoProduce += 1;

      // Check Game Over
      if (nextState.money < -1000) {
        nextState.isGameOver = true;
      }

      // Process logs
      addLog(`--- 第 ${nextState.weeks} 周 ---`, 'system');
      if (isPayday) addLog(`💸 发工资了！+${salary}`, 'success');
      addLog(`支付生活费 ${livingCost}。`, 'system');

      // Check achievements after weekly update
      nextState = checkAchievements(nextState);

      return nextState;
    });
    setActiveMenu(null);
  };

  const handleAction = (act: ActionDefinition) => {
    let cost = act.apCost;
    
    // ACH_06: Rich - Cost reduction for high tier
    const isHighTier = act.id === 'lv2' || act.id === 'lv3';
    let moneyCost = 0;
    if (act.baseMoneyChange < 0) {
       moneyCost = Math.abs(act.baseMoneyChange);
       if (state.unlockedAchievements.includes('ACH_06') && isHighTier) {
         moneyCost = Math.floor(moneyCost * 0.8);
       }
    }

    if (state.ap < cost) return;

    // 1. Roll Luck
    const roll = Math.random();
    let luck: LuckLevel = 'normal';
    
    // ACH_02: Purple Star -> High rate 40%
    const highThreshold = state.unlockedAchievements.includes('ACH_02') ? 0.6 : 0.8;
    // ACH_13: Force High
    if (state.forceHighNext) {
      luck = 'high';
    } else {
      if (roll > highThreshold) luck = 'high';
      else if (roll < 0.2) luck = 'low';
    }

    // 2. Flavor Text
    let flavorCategory = 'writer';
    if (activeMenu === 'PRODUCE') flavorCategory = state.job;
    else if (activeMenu === 'SOCIAL') flavorCategory = 'SOCIAL';
    else if (activeMenu === 'LIFE') flavorCategory = 'LIFE';

    const flavorData = FLAVOR_TEXT[flavorCategory]?.[act.id];
    let logText = act.intent;
    if (flavorData) {
      const texts = flavorData[luck];
      logText = texts[Math.floor(Math.random() * texts.length)];
    }

    // 3. Calculate Base Stats
    let sanDelta = act.baseSanChange;
    let moneyDelta = act.baseMoneyChange;
    if (moneyDelta < 0) moneyDelta = -moneyCost; // Apply reduced cost
    
    // HEAT CALCULATION (New Formula)
    let heatGain = 0;
    if (activeMenu === 'PRODUCE') {
      // Base: Lv1=50, Lv2=200, Lv3=800
      let base = 50;
      if (act.id === 'lv2') base = 200;
      if (act.id === 'lv3') base = 800;

      // Random (0.8 - 1.2 variance)
      const variance = 0.8 + Math.random() * 0.4;
      
      // Fan Multiplier (Snowball)
      const fanMult = 1 + (state.heat / 5000);
      
      // Crit
      let crit = 1.0;
      if (luck === 'high') crit = 1.5;
      if (luck === 'low') crit = 0.5;
      
      heatGain = Math.floor((base * variance) * fanMult * crit);

      // ACH_01: Newbie protection
      if (state.unlockedAchievements.includes('ACH_01') && state.heat < 1000) {
        heatGain = Math.floor(heatGain * 1.1);
      }
      // ACH_03: Goddess Base +50% (Applied to final for simplicity)
      if (state.unlockedAchievements.includes('ACH_03')) {
        heatGain = Math.floor(heatGain * 1.5);
      }
      // ACH_04: God x2
      if (state.unlockedAchievements.includes('ACH_04')) {
        heatGain = heatGain * 2;
      }
    } else {
      // Social/Life heat (legacy small amounts)
      heatGain = act.baseHeat || 0;
      // ACH_10: Toxic Star social heat +50%
      if (activeMenu === 'SOCIAL' && act.id === 'lv3' && state.unlockedAchievements.includes('ACH_10')) {
        heatGain = Math.floor(heatGain * 1.5);
      }
    }

    // Buffs for other stats
    // ACH_05: Poor work harder (Life Lv2 is '搬砖')
    if (state.unlockedAchievements.includes('ACH_05') && activeMenu === 'LIFE' && act.id === 'lv2') {
       moneyDelta = Math.floor(moneyDelta * 1.2);
    }
    // ACH_08: Pigeon (San cost reduced) - Apply to all negative San
    if (state.unlockedAchievements.includes('ACH_08') && sanDelta < 0) {
      sanDelta = Math.min(0, sanDelta + 5); // Reduce penalty
    }
    // ACH_09: Bodhisattva (Interact heal +50%) - Social Lv1 is positive? 
    // Actually Social Lv1 is +5.
    if (state.unlockedAchievements.includes('ACH_09') && sanDelta > 0 && activeMenu === 'SOCIAL') {
      sanDelta = Math.floor(sanDelta * 1.5);
    }

    // ACH_11: Max San +20
    const currentMaxSan = state.unlockedAchievements.includes('ACH_11') ? state.maxSan + 20 : state.maxSan;

    // 4. Update State
    setState(prev => {
      let newState = { ...prev };
      
      // Consume AP
      newState.ap -= cost;

      // Update basic stats
      newState.san = Math.min(currentMaxSan, Math.max(0, prev.san + sanDelta));
      newState.money += moneyDelta;
      newState.heat += heatGain;
      newState.fans += Math.floor(heatGain / 10);
      
      // Update counters
      if (activeMenu === 'PRODUCE') {
        newState.worksCount += 1;
        newState.consecutiveNoProduce = 0; // Reset pigeon counter
        newState.maxSingleHeat = Math.max(newState.maxSingleHeat, heatGain);
        
        if (luck === 'low') newState.consecutiveLow += 1;
        else newState.consecutiveLow = 0;
      }

      // Personality
      if (activeMenu === 'SOCIAL') {
         if (act.id === 'lv1') newState.moe += 2;
         if (act.id === 'lv3') newState.toxic += 2;
      }

      // ACH_13: Reset force high
      newState.forceHighNext = false; 

      // Check Death / ACH_12 Revive
      if (newState.san <= 0) {
        if (!newState.hasRevived && newState.unlockedAchievements.includes('ACH_12')) {
          newState.san = 20; // Revive amount
          newState.hasRevived = true;
          addLog('💔 SAN值归零... 但是！【强心脏】发动！垂死病中惊坐起！', 'success');
        } else {
          newState.isGameOver = true;
        }
      }
      if (newState.money < -2000) {
        newState.isGameOver = true;
      }

      // Check achievements immediately
      newState = checkAchievements(newState);
      
      // ACH_13 Reward Check logic (if just unlocked or previously unlocked and triggered)
      if (newState.consecutiveLow >= 3 && newState.unlockedAchievements.includes('ACH_13')) {
         newState.forceHighNext = true;
         // Reset low counter to prevent infinite High loop? 
         // Prompt says "Next time guaranteed High". 
         newState.consecutiveLow = 0; 
         addLog('✨ 【非酋之王】触发：厄运到了极致就是幸运。下一次产出必定 High！', 'success');
      }

      return newState;
    });

    // 5. Log
    const type = luck === 'high' ? 'success' : luck === 'low' ? 'danger' : 'action';
    addLog(logText, type);
    
    // Visual Feedback for Heat
    if (heatGain > 0) {
      let icon = '';
      if (heatGain > 10000) icon = '👑 ';
      else if (heatGain > 2000) icon = '🔥 ';
      
      addLog(`${icon}热度 +${heatGain.toLocaleString()} | 粉丝 +${Math.floor(heatGain/10)}`, heatGain > 2000 ? 'success' : 'event');
    }
    
    if (moneyDelta !== 0) addLog(`💰 金钱 ${moneyDelta > 0 ? '+' : ''}${moneyDelta}`, 'event');
    if (sanDelta !== 0) addLog(`❤️ SAN ${sanDelta > 0 ? '+' : ''}${sanDelta}`, sanDelta < 0 ? 'danger' : 'event');
    
    setActiveMenu(null);
  };

  const getActiveActions = () => {
    if (!activeMenu) return [];
    if (activeMenu === 'PRODUCE') return ACTIONS[state.job];
    return ACTIONS[activeMenu];
  };

  if (view === 'start') return <StartScreen onStart={startGame} />;

  return (
    <div className="flex justify-center bg-[#333] min-h-screen">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        <StatusHeader 
          state={state} 
          showAchievements={() => setShowAchievements(true)}
          onReset={() => setView('start')}
        />

        <GameLog logs={logs} />

        <ActionMenu 
          activeCategory={activeMenu}
          actions={getActiveActions()}
          onCategorySelect={setActiveMenu}
          onActionSelect={handleAction}
          onNextWeek={handleNextWeek}
          ap={state.ap}
        />

        {showAchievements && (
          <AchievementModal 
            unlockedIds={state.unlockedAchievements} 
            onClose={() => setShowAchievements(false)} 
          />
        )}

        {state.isGameOver && (
          <GameOverScreen state={state} onRestart={() => setView('start')} />
        )}
      </div>
    </div>
  );
}