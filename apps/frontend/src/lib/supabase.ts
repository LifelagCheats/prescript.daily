import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import { createServerClient as createSSRClient, parseCookieHeader } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

type SupabaseCookieContext = {
  request: Request;
  cookies: {
    set: (name: string, value: string, options?: CookieOptions) => void;
  };
};

export function createBrowserClient() {
  return createSSRBrowserClient(supabaseUrl, supabasePublishableKey);
}

export function createServerClient(context: SupabaseCookieContext) {
  return createSSRClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(context.request.headers.get('Cookie') ?? '').map(
          ({ name, value }) => ({ name, value: value ?? '' }),
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          context.cookies.set(name, value, options);
        });
      },
    },
  });
}
