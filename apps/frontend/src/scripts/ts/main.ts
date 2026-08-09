// NOTE: if you have any suggestions, please leave an issue on github!
/* NOTE: the prescripts were made by AI. yes, i know, but i won't do such a repetitive task myself! 
    
    in fact, NONE of the code is AI made!
    i say that AI is good in some areas and bad in others, code is one of them.

  NOTE: might just move this when it gets big but for now it stays this way
*/
import { Howl } from 'howler';
import { createServerClient } from '@lib/supabase';

import handleError from '@lib/errorHandler';
import type {
  ScramblerGlobals,
  ScramblerOptions,
  RevealElement,
  Prescript,
} from '@/types/scrambler';
import randomInt from '@lib/general';

const supabase = createServerClient();

const button: HTMLElement | null = document.querySelector('.PrescriptButton');
const prescript: HTMLElement | null = document.querySelector('.Prescript');

const { count } = await supabase.from('Prescripts').select('*', { count: 'exact', head: true });

let cachedIds: number[] = JSON.parse(localStorage.getItem('cachedIds') ?? '[]') as number[];

if (cachedIds.length === count) {
  cachedIds = [];
  localStorage.setItem('cachedIds', JSON.stringify(cachedIds));
}

const beep = new Howl({
  src: ['/sounds/beep.mp3'],
  loop: false,
  autoplay: false,
  preload: true,
  html5: false,
  onloaderror: function (id, err) {
    handleError(err);
  },
  onplayerror: function (id, err) {
    handleError(err);
  },
});

const start = new Howl({
  src: ['/sounds/beepstart.mp3'],
  loop: false,
  autoplay: false,
  preload: true,
  html5: false,
  onloaderror: function (id, err) {
    handleError(err);
  },
  onplayerror: function (id, err) {
    handleError(err);
  },
});

function revealTextScramble(
  el: RevealElement,
  fromText: string,
  finalText: string,
  options: ScramblerOptions = {},
  globals: ScramblerGlobals = {
    audioUnlocked: false,
  },
): Promise<void> {
  return new Promise((resolve) => {
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

    const { audioUnlocked, startBeep, Beep, endBeep } = globals;

    if (startBeep) {
      if (!startBeep.playing()) {
        startBeep.play();
      }
    }

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

      if (audioUnlocked && Beep && progress < len) {
        const now: number = performance.now();
        if (Math.random() < beepChancePerFrame && now - lastBeepTime > minBeepGapMs) {
          Beep.play();
          lastBeepTime = now;
        }
      }

      if (progress >= len) {
        el.textContent = finalText;
        if (el.__revealTimer) {
          clearInterval(el.__revealTimer);
          el.__revealTimer = null;
        }
        el.classList.remove('busy');
        resolve();
        if (endBeep) {
          endBeep.play();
        }
      }
    }, 1000 / fps);
  });
}

if (prescript) {
  button?.addEventListener('click', async () => {
    try {
      if (!prescript.classList.contains('busy')) {
        const query = supabase
          .from('Prescripts')
          .select('id, instruction')
          .order('id', { ascending: false });

        if (cachedIds.length > 0) {
          query.not('id', 'in', `(${cachedIds.join(',')})`);
        }

        const { data: slips } = await query;

        if (!slips || slips.length === 0 || !prescript) return;

        const slip: Prescript = slips[randomInt(0, slips.length - 1)];

        await revealTextScramble(
          prescript,
          '',
          slip.instruction,
          {},
          {
            audioUnlocked: true,
            startBeep: start,
            Beep: beep,
          },
        );

        cachedIds.push(slip.id);
        localStorage.setItem('cachedIds', JSON.stringify(cachedIds));
      }
    } catch (error) {
      await handleError(error);
    }
  });
}
