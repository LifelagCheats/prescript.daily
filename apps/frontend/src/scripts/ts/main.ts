import { Howl } from 'howler';
import { createServerClient } from '@lib/supabase';

// NOTE: if you have any suggestions, please leave an issue on github!
/* NOTE: the prescripts were made by AI. yes, i know, but i won't do such a repetitive task myself! 
    in fact, NONE of the code is AI made!
    i say that AI is good in some areas and bad in others, code is one of them.
*/

const button: HTMLElement | null = document.querySelector('.PrescriptButton');
const prescript: HTMLElement | null = document.querySelector('.Prescript');

const supabase = createServerClient();

const { count } = await supabase.from('Prescripts').select('*', { count: 'exact', head: true });

const beep = new Howl({
  src: ['/sounds/beep.mp3'],
});

const start = new Howl({
  src: ['/sounds/beepstart.mp3'],
});

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface ScrambleOptions {
  fps?: number;
  scrambleChars?: string;
  blockChar?: string;
  revealSpeed?: number;
  blockChance?: number;
  beepChancePerFrame?: number;
  minBeepGapMs?: number;
}

interface ScrambleGlobals {
  audioUnlocked: boolean;
  playBeep: () => void;
}

interface RevealElement extends HTMLElement {
  __revealTimer?: ReturnType<typeof setInterval> | null;
}

function revealTextScramble(
  el: RevealElement,
  fromText: string,
  finalText: string,
  options: ScrambleOptions = {},
  globals: ScrambleGlobals = { audioUnlocked: false, playBeep: () => {} },
): void {
  start.play();
  // Stop any previous scramble
  if (el.__revealTimer) {
    clearInterval(el.__revealTimer);
    el.__revealTimer = null;
  }

  const {
    fps = 16,
    scrambleChars = '0123456789!█▒░ABCDEF?#@.$&',
    blockChar = '█',
    revealSpeed = 0.045,
    blockChance = 0.35,
    beepChancePerFrame = 0.35,
    minBeepGapMs = 70,
  } = options;

  const { audioUnlocked } = globals;

  const len: number = Math.max(fromText.length, finalText.length);
  let progress: number = 0;
  let lastBeepTime: number = 0;

  const randomChar = (): string => {
    return Math.random() < blockChance
      ? blockChar
      : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  el.__revealTimer = setInterval((): void => {
    progress += revealSpeed * len;
    let out: string = '';

    for (let i = 0; i < len; i++) {
      const targetChar: string = finalText[i] ?? '';
      if (i < progress) {
        out += targetChar;
      } else {
        if (targetChar === ' ' || (fromText[i] ?? '') === ' ') {
          out += ' ';
        } else {
          out += randomChar();
        }
      }
    }

    el.textContent = out;

    if (audioUnlocked && progress < len) {
      const now: number = performance.now();
      if (Math.random() < beepChancePerFrame && now - lastBeepTime > minBeepGapMs) {
        beep.play();
        lastBeepTime = now;
      }
    }

    if (progress >= len) {
      el.textContent = finalText;
      if (el.__revealTimer) {
        clearInterval(el.__revealTimer);
        el.__revealTimer = null;
      }
      el.classList.remove('idle');
    }
  }, 1000 / fps);
}

if (prescript) {
  button?.addEventListener('click', async () => {
    const { data: slip } = await supabase
      .from('Prescripts')
      .select('id, instruction')
      .order('id', { ascending: false })
      .eq('id', randomInt(1, count ?? 0));

    if (!slip || !prescript) return;

    revealTextScramble(
      prescript,
      '',
      slip[0].instruction,
      {},
      {
        audioUnlocked: true,
        playBeep: () => beep.play(),
      },
    );
  });
}
