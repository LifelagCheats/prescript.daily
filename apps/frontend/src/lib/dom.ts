/**
 * Replacement for the standard document.querySelector, wrapping around MutationObserver to achieve asynchronous queries and promises
 *
 * @remarks
 * did this because .querySelector ran instantly and the rest of the code didn't actually wait until the element appeared, as so it
 * would be null
 *
 * @param selector - the selector tag by which the element will be queried
 * @returns an HTMLElement of the specified selector and a resolved promise
 *
 * @public
 */
export async function waitForElement<T extends HTMLElement>(selector: string): Promise<T> {
  const existing = document.querySelector<T>(selector);

  if (existing) {
    return existing;
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector<T>(selector);

      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
