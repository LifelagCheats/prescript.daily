import { Howl } from 'howler';
import handleError from '@lib/errorHandler';

/**
 * AudioManager is a singleton class responsible for managing shared audio instances across the application.
 *
 * @remarks
 * This class is implemented as a singleton to ensure that all audio instances (beep, start, completed)
 * are shared and reused throughout the app. Each audio instance is lazy-loaded on first access to
 * improve performance and reduce initial load time.
 *
 * @example
 * ```ts
 * import { audio } from '@lib/audio';
 *
 * // Play the beep sound
 * audio.beep.play();
 *
 * // Play the start sound
 * audio.start.play();
 *
 * // Play the completed sound
 * audio.completed.play();
 * ```
 *
 * @public
 */

export class AudioManager {
  private static instance: AudioManager;
  private _beep: Howl | null = null;
  private _start: Howl | null = null;
  private _completed: Howl | null = null;

  private constructor() {}

  /**
   * Returns the singleton instance of AudioManager.
   *
   * @returns The shared AudioManager instance.
   *
   * @example
   * ```ts
   * const audioManager = AudioManager.getInstance();
   * ```
   */
  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Gets the `beep` audio instance (Howl) — lazy-loaded on first access.
   *
   * @remarks
   * not looped and is preloaded but not autoplayed.
   * Error handling is delegated to the `handleError` function.
   *
   * @returns The Howl instance for the beep sound.
   *
   * @example
   * ```ts
   * audio.beep.play();
   * ```
   */
  get beep(): Howl {
    if (!this._beep) {
      this._beep = new Howl({
        src: ['/sounds/beep.mp3'],
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        onloaderror: handleError,
        onplayerror: handleError,
      });
    }
    return this._beep;
  }

  /**
   * Gets the `start` audio instance (Howl) — lazy-loaded on first access.
   *
   * @remarks
   * not looped and is preloaded but not autoplayed.
   * Error handling is delegated to the `handleError` function.
   *
   * @returns The Howl instance for the start sound.
   *
   * @example
   * ```ts
   * audio.start.play();
   * ```
   */
  get start(): Howl {
    if (!this._start) {
      this._start = new Howl({
        src: ['/sounds/beepstart.mp3'],
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        onloaderror: handleError,
        onplayerror: handleError,
      });
    }
    return this._start;
  }

  /**
   * Gets the `completed` audio instance (Howl) — lazy-loaded on first access.
   *
   * @remarks
   * not looped and is preloaded but not autoplayed.
   * Error handling is delegated to the `handleError` function.
   *
   * @returns The Howl instance for the completed sound.
   *
   * @example
   * ```ts
   * audio.completed.play();
   * ```
   */
  get completed(): Howl {
    if (!this._completed) {
      this._completed = new Howl({
        src: ['/sounds/indexfaust_ad3.wav'],
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        onloaderror: handleError,
        onplayerror: handleError,
      });
    }
    return this._completed;
  }
}

/**
 * The shared audio instance that can be used anywhere in the application.
 *
 * @public
 * @see {@link AudioManager} for the class definition.
 *
 * @example
 * ```ts
 * import { audio } from '@lib/audio';
 * audio.beep.play();
 * ```
 */
export const audio = AudioManager.getInstance();
