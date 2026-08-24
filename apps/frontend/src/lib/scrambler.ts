import type { RevealElement, ScramblerGlobals, ScramblerOptions } from '@/types/scrambler';

/**
 * A function that takes in an HTML element and modifies its text in a way that makes it have a scrambling animation
 *
 * @remarks
 * decides whether it should scramble with the controlState variable and if the element given contains
 * the 'busy' class in it, this is the reason why the 'busy' class is reserved only for cases where this function
 * is going to be used. use anything else to describe a state of busyness.
 *
 * This function uses the blockChar as the 'default' until it is allowed to scramble the next letter,
 * like ($# => █# => a█ => ab), acts as a cursor of sorts.
 *
 * @param el - the Element that's going to be modified. special type with the __revealTimer property. See {@link RevealElement}.
 * @param fromText - the starting text that's going to appear as the base from which the message is going to be 'scrambled' and revealed.
 * @param finalText - the final text that's going to be worked upon to reveal.
 * @param options - Optional configuration object. See {@link ScramblerOptions} for available options.
 * @param options.fps - frames per second, how many milliseconds until the function's allowed to execute its next change. Defaults to `16`.
 * @param options.scrambleChars - a string with a list of characters that can appear in the scrambling process randomly. Defaults to `'0123456789!█▒░ABCDEF?#@.$&'`.
 * @param options.blockChar - the default blockChar that's going to be used. Defaults to `'█'`.
 * @param options.revealSpeed - the speed at which each frame a letter is revealed. Defaults to `0.045`.
 * @param options.blockChance - the chance of the set block character actually appearing, it doesn't appear by default. Defaults to `0.35`.
 * @param options.beepChancePerFrame - the chance of the provided beep sound being played each frame. Defaults to `0.35`.
 * @param options.minBeepGapMs - if by chance, there would be two beeps played in a row, if the time specified by this parameter has not passed (in miliseconds), then it will not play. Defaults to `70`.
 * @param globals - Optional configuration object, defines some additional settings. See {@link ScramblerGlobals} for available globals.
 * @param globals.audioUnlocked - boolean deciding if audio provided can actually even be played, false by default. Defaults to `false`.
 * @param globals.startBeep - the Howl instance that's going to play at the start of the scrambling sequence.
 * @param globals.Beep - Howl instance that's going to play as the specified beep sound when available.
 * @param globals.endBeep - Howl instance that's going to be played once the scrambling sequence ends.
 * @param controlState - dictates whether the function itself controls the appliance and removal of the 'busy' class in the element it's editing. true by default.
 *
 * @returns a void Promise that resolves once the animation is complete.
 *
 * @example
 * ```ts
 * const el: HTMLElement = document.querySelector('element');
 *
 * revealTextScramble(
 *  el, // the element
 *  '', // starting text, starts from nothing, expands into the final result
 *  'the prescript knows best', // final result
 *  {}, // can always leave it empty, which will use default options, which is fine
 *  {
 *    audioUnlocked: true, // Howl instances passed below will play
 *    startBeep: HowlInstance1, // remember to pass the Howl Instance itself, not a function
 *    Beep: HowlInstance2,
 *    endBeep: HowlInstance3
 *  },
 *  controlState: false // bring your own protection if you're going to do this
 * )
 * ```
 *
 * @see {@link ScramblerGlobals}, {@link ScramblerOptions}, {@link RevealElement}
 * @public
 */
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
