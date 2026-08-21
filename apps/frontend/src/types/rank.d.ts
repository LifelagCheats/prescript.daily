/**
 * Represents the user's rank in the system.
 *
 * @property name - the name of the rank.
 * @property Pcompleted - the minimum amount of completed prescripts needed to be in this rank, its 'floor'.
 */
export interface Rank {
  name: string;
  Pcompleted: number;
}
