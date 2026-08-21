import type { Rank } from '@/types/rank';

/**
 * A list of Objects of type Rank enumerated in order
 *
 * @remarks
 * made to know which rank is next after the previous one and track user progress.
 *
 * @see {@link Rank}
 */
const roles: Rank[] = [
  { name: 'Proselyte', Pcompleted: 0 },
  { name: 'Proxy', Pcompleted: 25 },
  { name: 'Messenger', Pcompleted: 65 },
  { name: 'Weaver', Pcompleted: 115 },
] as const;

/**
 * Function responsible for returning the user's current rank/role (however you call it).
 *
 * @remarks
 * compares the number of given prescripts to identify the rank sitting in between the difference.
 *
 * @param Pcompleted - takes in the number of completed prescripts as a whole integer.
 *
 * @returns a Rank object containing the current rank's name and Pcompleted.
 *
 * @example
 * ```ts
 * const currentRole: Rank = getRole(13) // returns a Rank object with the name Proselyte.
 * const Role1: Rank = getRole(26) // returns 'Proxy'.
 * ```
 */
export function getRole(Pcompleted: number) {
  return roles.filter((role) => role.Pcompleted <= Pcompleted).at(-1);
}

/**
 * Function responsible for returning the rank right after the user's current.
 *
 * @remarks
 * finds the next Rank by finding the rank with the name property akin to the one given as a parameter
 * and adding 1 to its index.
 *
 * @param rank - the name property of the current rank to be used to determine the next one.
 *
 * @returns a Rank object containing the information and properties of the next Rank after the given one's.
 *
 * @example
 * ```ts
 * const nextRole: Rank = nextRole(13) // returns a Rank object with the name 'Proxy'.
 * const Role2: Rank = nextRole(26) // returns 'Messenger'.
 * ```
 */
export function nextRole(rank: string) {
  return roles[roles.findIndex((role) => role.name === rank) + 1];
}
