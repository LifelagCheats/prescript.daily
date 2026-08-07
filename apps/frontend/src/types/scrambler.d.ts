export interface ScramblerOptions {
  fps?: number;
  scrambleChars?: string;
  blockChar?: string;
  revealSpeed?: number;
  blockChance?: number;
  beepChancePerFrame?: number;
  minBeepGapMs?: number;
}

export interface ScramblerGlobals {
  audioUnlocked: boolean;
  playBeep: () => void;
}

export interface RevealElement extends HTMLElement {
  __revealTimer?: ReturnType<typeof setInterval> | null;
}

export interface Prescript {
  id: number;
  instruction: string;
}
