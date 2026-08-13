import { Howl } from 'howler';
import handleError from '@lib/errorHandler';

/**
 * This is the main Audio Declaration file, i moved it to be a class (with getters) so that
 * the audios could be used globally
 */

class AudioManager {
  private static instance: AudioManager;
  private _beep: Howl | null = null;
  private _start: Howl | null = null;
  private _completed: Howl | null = null;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

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

export const audio = AudioManager.getInstance();
