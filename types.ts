export type JobType = 'writer' | 'artist' | 'editor' | 'passerby';
export type LuckLevel = 'high' | 'normal' | 'low';
export type ActionCategory = 'PRODUCE' | 'SOCIAL' | 'LIFE';

export interface Achievement {
  id: string;
  name: string;
  conditionDesc: string;
  description: string;
  rewardDesc: string;
  category: 'A' | 'B' | 'C' | 'D';
  tier: number; // 1, 2, 3, 4 for sorting/replacing
}

export interface RandomEvent {
  id: string;
  name: string;
  description: string;
  effectDesc: string;
  logic: {
    san?: number;
    money?: number;
    heat?: number;
    toxic?: number;
    apZero?: boolean;
    buff?: string;
    buffDuration?: number;
    triggerFlag?: string;
    skipTurn?: boolean;
  }
}

export interface GameState {
  playerName: string;
  job: JobType;
  jobTitle: string;
  fandom: string;
  trope: string;
  
  // Resources
  weeks: number;
  san: number;
  maxSan: number;
  money: number;
  heat: number;
  fans: number;
  ap: number;
  maxAp: number;
  
  // Stats
  moe: number; // 萌
  toxic: number; // 毒
  worksCount: number;
  
  // Achievement Tracking
  maxSingleHeat: number;
  consecutiveNoProduce: number;
  consecutiveLow: number;
  hasRevived: boolean;
  
  // State flags
  isGameOver: boolean;
  unlockedAchievements: string[]; // List of Achievement IDs
  forceHighNext: boolean; // For ACH_13
  
  // Event Flags
  shadowBanWeeks: number;
  scandalActive: boolean;
}

export interface LogEntry {
  id: number;
  text: string;
  type: 'system' | 'action' | 'event' | 'danger' | 'success';
  time: string;
}

export interface ActionDefinition {
  id: string; // lv1, lv2, lv3
  label: string;
  apCost: number;
  baseSanChange: number;
  baseMoneyChange: number;
  baseHeat?: number; // Legacy base heat, will be overridden by new formula for Produce
  intent: string;
}

export interface FlavorTextData {
  high: string[];
  normal: string[];
  low: string[];
}