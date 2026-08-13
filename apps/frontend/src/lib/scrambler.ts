import type { RevealElement, ScramblerGlobals, ScramblerOptions } from '@/types/scrambler';

export default function revealTextScramble(
  el: RevealElement,
  fromText: string,
  finalText: string,
  options: ScramblerOptions = {},
  globals: ScramblerGlobals = {
    audioUnlocked: false,
  },
  controlState = true,
): Promise<void> {
  return new Promise((resolve) => {
    if (controlState) {
      if (el.classList.contains('busy')) {
        resolve();
        return;
      }

      el.classList.add('busy');
    }

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
