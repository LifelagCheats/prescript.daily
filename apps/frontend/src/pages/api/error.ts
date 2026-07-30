import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { message, stack, browser, platform } = await request.json();

  const webhook = import.meta.env.DISCORD_WEBHOOK_URL;

  if (!webhook) {
    return new Response('Missing webhook', { status: 500 });
  }

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [
        {
          title: 'Error in App',
          description: message,
          fields: [
            {
              name: 'Stack',
              value: stack ?? 'No stack',
            },
            {
              name: 'Browser',
              value: browser ?? 'Unknown browser',
            },
            {
              name: 'Platform',
              value: platform ?? 'Unknown Platform',
            },
          ],
          color: 13383736,
        },
      ],
    }),
  });

  return new Response(null, { status: 204 });
};
