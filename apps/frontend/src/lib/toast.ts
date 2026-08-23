/**
 * Represents a toast object inside the ToastItem list.
 *
 * @property id - the unique identifier of the toast object
 * @property message - the message it carries
 */
export type ToastItem = {
  id: string;
  message: string;
};

/**
 * Defines the type of a function that wants to listen for toast updates
 *
 * @remarks
 * Listeners will be stored in a list which will enumerate them all
 */
export type Listener = (items: ToastItem[]) => void;

/**
 * the Toast class is a singleton class made to manage through a variety of functions toast elements.
 *
 * @remarks
 * This class is implemented to make sure that all toast instances are shared throughout the app.
 *
 * @public
 * @see {@link ToastItem} {@link Listener}
 */
export class Toast {
  private items: ToastItem[] = [];
  private listeners = new Set<Listener>();

  /**
   * the function that enables for the subscription and listening of the state of all toast elements.
   *
   * @param listener - the function that's going to be stored as an active listener
   *
   * @remarks
   * Execute the given function again to unsubscribe from the listening.
   * due to listeners being a set, does not allow for duplicates.
   *
   * @returns nothing, and deletes the given function from the list of active listeners
   */
  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.items);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Updates all active listed listeners
   *
   * @remarks
   * calls all listeners listed in `listeners` with the current list of active toasts
   * as an argument
   */
  private update() {
    this.listeners.forEach((listener) => {
      listener(this.items);
    });
  }

  /**
   * Adds a new toast to the list of active toasts
   *
   * @remarks
   * Adds a new toast object to the `items` list with a cryptographically-made id
   * and the message property as the message parameter given to the function,
   * after a certain amount of time, if a timeout was given, the toast will vanish. if not, it'll persevere.
   * either way, after doing this, it'll update all listeners.
   *
   * @param message - the message to be displayed by the toast while it's alive
   * @param timeout - the amount of time (in miliseconds) until the toast is removed after its creation. Defaults to `3000`. set to `0` if you want none
   *
   * @returns the ID of the newly created toast
   */
  public add(message: string, timeout: number = 3000) {
    const toast = { id: crypto.randomUUID(), message };
    this.items = [...this.items, toast];
    this.update();

    if (timeout) {
      setTimeout(() => {
        this.close(toast.id);
      }, timeout);
    }

    return toast.id;
  }

  /**
   * Deletes a toast and then updates all listeners.
   *
   * @remarks
   * uses the given ID to delete the toast with the matching ID inside the current items list,
   * after that, updates all listeners.
   */
  public close(id: string) {
    this.items = this.items.filter((toast) => toast.id !== id);
    this.update();
  }

  /**
   * Deletes all toast elements and updates all listeners, completely clearing the list of active toasts.
   */
  public clear() {
    this.items = [];
    this.update();
  }
}

/**
 * The shared toast manager instance that can be used throughout the application
 *
 * @example
 * ```ts
 * import { toast, ToastItem } from '@lib/toast'
 *
 * toast.add('hi!') // creates the toast element and displays the given message with a lifespan of 3 seconds by default
 * toast.add('hi!', 250) // creates a toast element that will only last 250 miliseconds
 *
 * let ToastList: ToastItem[] = []
 *
 * function setToastList(items: ToastItem[]) {
 *  ToastList = items;
 * }
 *
 * const subscription = toast.subscribe(setToastList) // now we subscribe to the current global list of toasts,
 *                                                    // giving setToastList as our function to enable updates to the current list of toasts
 *                                                    // if we ever want to unsubscribe, we can use the function given to use, which is subscription
 * subscription(); // unsubscribing.
 * // of course imagine we never unsubscribed
 *
 * const toast1 = toast.add('hi', 3000);
 * console.log(ToastList); // [
 *                         //   {
 *                         //     id: 'abcdefg...'
 *                         //     message: 'hi'
 *                         //   }
 *                         // ]
 * console.log(toast1) // abcdefg...
 * toast.close('abcdefg')
 * console.log(ToastList) // [], empty.
 * toast.add('hi')
 * toast.add('hi1')
 * toast.add('hi2')
 * // to clear it all at once, use...
 * toast.clear();
 * console.log(ToastList) // [], empty.
 *
 * ```
 *
 * @see {@link Toast} {@link ToastItem} {@link Listener}
 */
export const toast = new Toast();
