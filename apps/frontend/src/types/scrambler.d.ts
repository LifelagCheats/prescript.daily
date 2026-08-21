/**
 * Represents the settings that can be submitted into the {@link lib/scrambler.revealTextScramble} function.
 *
 * @property fps - frames per second, remember that the equation is 1000 / fps.
 * @property scrambleChars - a string with a list of all the characters available to be chosen each time a singular scramble is made before revealing the character. no spaces between characters.
 * @property blockChar - the character that's going to be used as the block character in the sequence.
 * @property revealSpeed - time before each individual character is revealed, in the time it has not reached that time, the scrambling animation for that character will happen.
 * @property blockChance - the chance of the block character appearing that frame.
 * @property beepChancePerFrame - the chance of the respective beep sound being played that frame.
 * @property minBeepGapMs - minimum time that needs to have passed between beeps for them to be played.
 *
 * @see {@link lib/scrambler.revealTextScramble}
 */
export interface ScramblerOptions {
  fps?: number;
  scrambleChars?: string;
  blockChar?: string;
  revealSpeed?: number;
  blockChance?: number;
  beepChancePerFrame?: number;
  minBeepGapMs?: number;
}

/**
 * Represents the core settings and objects used in the {@link lib/scrambler.revealTextScramble} function.
 *
 * @property audioUnlocked - boolean property that dictates whether the next audio properties will be executed.
 * @property startBeep - Howl instance that will be played at the start of the sequence.
 * @property Beep - Howl instance that will be played as the beep sound in the sequence.
 * @property endBeep - Howl instanc that will be played once the animation ends.
 *
 * @see {@link lib/scrambler.revealTextScramble}
 */
export interface ScramblerGlobals {
  audioUnlocked: boolean;
  startBeep?: Howl;
  Beep?: Howl;
  endBeep?: Howl;
}

/**
 * An interface representing the type of element going to be revealed by the {@link lib/scrambler.revealTextScramble} function.
 *
 * @remarks
 * It is a normal HTMLElement, only differing because of its __revealTimer property.
 *
 * @property __revealTimer - time between each reveal sequence done by the function, attached directly to the element.
 *
 * @see {@link lib/scrambler.revealTextScramble}
 * @noInheritDoc
 */
export interface RevealElement extends HTMLElement {
  __revealTimer?: ReturnType<typeof setInterval> | null;
}

/**
 * Interface represeting a prescript.
 *
 * @remarks
 * The Prescript knows best.
 *
 * @property id - the prescript's ID in the Supabase database.
 * @property instruction - a string that contains the Prescript's instructions as per the database.
 *
 * @see {@link lib/scrambler.revealTextScramble}
 */
export interface Prescript {
  id: number;
  instruction: string;
}
