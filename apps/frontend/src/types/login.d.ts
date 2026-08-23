/**
 * Represents a valid email address
 *
 * @remarks
 * Uses typescript's template literals to simulate a real email
 * IS NOT A REAL EMAIL VALIDATION SOURCE, do not use to validate actual emails,
 * only to represent them
 *
 * @example
 * ```ts
 * const email_1: Email = '6767' // invalid
 * const email_2: Email = 'lebron@gmail.com' // valid
 * const email_3: Email = '@s.com' // also valid, hence don't use as verification
 * ```
 */
export type Email = `${string}@${string}.${string}`;
