/**
 * An async function responsible for sending errors to a discord webhook through an API endpoint.
 *
 * @remarks
 * Sends the Error message itself, along with the stack trace (if it carries one)
 * and the browser and platform the user is using at the moment of the error. All of this
 * is sent through a POST request to an API endpoint.
 *
 * @param error - the Error itself, if it's not a proper Error object, it'll be sent as a string.
 *
 * @example
 * ```ts
 * handleError("ERROR!!!") \\ will send a discord embed with 'ERROR!!!' as its message body through the webhook
 * ```
 *
 * @public
 */
export default async function handleError(error: unknown) {
  await fetch('/api/error', {
    method: 'POST',
    body: JSON.stringify({
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : '',
      browser: navigator.userAgent,
      platform: navigator.platform,
    }),
  });
}
