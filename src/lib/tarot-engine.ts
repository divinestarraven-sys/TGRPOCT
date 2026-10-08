import type { TarotCard } from '../data/tarot-deck';

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  position: number;
  positionName: string;
}

export interface CelticCrossSpread {
  id: string;
  question: string;
  cards: DrawnCard[];
  timestamp: number;
  reversalsEnabled: boolean;
}

export const CELTIC_CROSS_POSITIONS = [
  { position: 1, name: 'The Present', description: 'Your current situation and primary energy.' },
  { position: 2, name: 'The Challenge', description: 'The immediate challenge crossing the Present.' },
  { position: 3, name: 'The Aim', description: 'The conscious goal or what you are trying to reach.' },
  { position: 4, name: 'The Foundation', description: 'The root cause or basis beneath the situation.' },
  { position: 5, name: 'The Past', description: 'What is passing away or recently influential.' },
  { position: 6, name: 'Emerging Possibility', description: 'What is coming into being in the near term.' },
  { position: 7, name: 'Your Approach', description: 'How you see yourself and how you plan to act.' },
  { position: 8, name: 'Environment & Support', description: 'Your surroundings, other people, and what supports you.' },
  { position: 9, name: 'Hopes and Fears', description: 'Your inner hopes and anxieties about the outcome.' },
  { position: 10, name: 'Possible Direction', description: 'The likely direction given the current trajectory.' },
] as const;

function cryptoShuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  const randomValues = new Uint32Array(shuffled.length);
  crypto.getRandomValues(randomValues);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCelticCross(
  deck: TarotCard[],
  question: string,
  reversalsEnabled = false,
): CelticCrossSpread {
  const shuffled = cryptoShuffle(deck);
  const drawn = shuffled.slice(0, 10);

  let reversalBits: boolean[] = new Array(10).fill(false);
  if (reversalsEnabled) {
    const bits = new Uint8Array(10);
    crypto.getRandomValues(bits);
    reversalBits = Array.from(bits).map((b) => b > 127);
  }

  const cards: DrawnCard[] = drawn.map((card, i) => ({
    card,
    reversed: reversalBits[i],
    position: CELTIC_CROSS_POSITIONS[i].position,
    positionName: CELTIC_CROSS_POSITIONS[i].name,
  }));

  return {
    id: crypto.randomUUID(),
    question,
    cards,
    timestamp: Date.now(),
    reversalsEnabled,
  };
}

const SPREAD_STORAGE_KEY = 'greenResonance.tarotSpreads';
const MAX_SAVED_SPREADS = 20;

export function saveCelticCross(spread: CelticCrossSpread): void {
  try {
    const existing = loadSavedSpreads();
    const updated = [spread, ...existing].slice(0, MAX_SAVED_SPREADS);
    localStorage.setItem(SPREAD_STORAGE_KEY, JSON.stringify(updated));
  } catch { /* localStorage unavailable */ }
}

export function loadSavedSpreads(): CelticCrossSpread[] {
  try {
    const raw = localStorage.getItem(SPREAD_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CelticCrossSpread[];
  } catch {
    return [];
  }
}
