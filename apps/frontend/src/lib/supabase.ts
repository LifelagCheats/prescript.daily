import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import { createServerClient as createSSRClient, parseCookieHeader } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Context object passed to Supabase client creation functions.
 *
 * @remarks
 * This type defines the minimal request and cookie handling context needed
 * to instantiate a Supabase client in a server-side environment.
 * It ensures the client can correctly set auth cookies on the response.
 *
 * @public
 */
export type SupabaseCookieContext = {
  /**
   * Cookie manipulation interface.
   *
   * @remarks
   * This object is used to set authentication cookies on the outgoing response.
   * It mimics a subset of Astro's `cookies` API for compatibility.
   */
  request: Request;
  /**
   * Sets a cookie on the response.
   *
   * @param name - The name of the cookie to set.
   * @param value - The value to store in the cookie.
   * @param options - Optional cookie configuration (e.g., `httpOnly`, `secure`, `maxAge`).
   *
   * @example
   * ```ts
   * cookies.set('session', 'abc123', { httpOnly: true, maxAge: 3600 });
   * ```
   */
  cookies: {
    set: (name: string, value: string, options?: CookieOptions) => void;
  };
};

/**
 * Creates a Supabase client for use in the browser (client-side).
 *
 * @remarks
 * This function creates a Supabase client using the browser-safe publishable key.
 * It should only be used in client-side code (e.g., React components, Astro client scripts).
 * Do not use this in server-side contexts—use {@link createServerClient} instead.
 *
 * @returns A Supabase client instance configured for the browser.
 *
 * @example
 * ```ts
 * import { createBrowserClient } from '@lib/supabase';
 *
 * const supabase = createBrowserClient();
 * const { data } = await supabase.from('users').select('*');
 * ```
 *
 * @public
 */
export function createBrowserClient() {
  return createSSRBrowserClient(supabaseUrl, supabasePublishableKey);
}

/**
 * Creates a Supabase client for use in server-side contexts (e.g., Astro endpoints, server actions).
 *
 * @remarks
 * This function creates a Supabase client that is aware of the current request and response cookies.
 * It uses the provided context to read incoming cookies and set outgoing auth cookies.
 * This ensures that authentication state is properly persisted across requests.
 *
 * @param context - The request and cookie context from the server environment.
 * @param context.request - The incoming HTTP request object.
 * @param context.cookies - The cookie manipulation interface.
 *
 * @returns A Supabase client instance configured for server-side usage with cookie handling.
 *
 * @throws {Error} If the Supabase URL or publishable key is not set in environment variables.
 *
 * @see {@link SupabaseCookieContext} for the structure of the context object.
 *
 * @example
 * ```ts
 * // In an Astro endpoint
 * import { createServerClient } from '@lib/supabase';
 *
 * export const POST: APIRoute = async ({ request, cookies }) => {
 *   const supabase = createServerClient({ request, cookies });
 *   const { data } = await supabase.from('users').select('*');
 *   return new Response(JSON.stringify(data));
 * };
 * ```
 *
 * @public
 */
export function createServerClient(context: SupabaseCookieContext) {
  return createSSRClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      /**
       * Reads all cookies from the incoming request.
       *
       * @returns An array of cookie objects with `name` and `value` properties.
       */
      getAll() {
        return parseCookieHeader(context.request.headers.get('Cookie') ?? '').map(
          ({ name, value }) => ({ name, value: value ?? '' }),
        );
      },
      /**
       * Sets multiple cookies on the outgoing response.
       *
       * @param cookiesToSet - An array of cookies to set, each containing `name`, `value`, and optional `options`.
       */
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          context.cookies.set(name, value, options);
        });
      },
    },
  });
}
