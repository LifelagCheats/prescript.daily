/**
 * A simple function that return a random number between the given floor and ceiling
 *
 * @param min - the minimum
 * @param max - the maximum
 *
 * @returns a number between the given minimum and maximum (inclusive meaning it can be the minimum/maximum itself)
 *
 * @example
 * ```ts
 * let num: number = randomInt(1, 1) // num = 1
 * num = randomInt(99, 9123919312) // a number between those two
 * num = randomInt(2, 1) // will error if maximum is lower than minimum
 * ```
 */
export default function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
