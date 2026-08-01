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
