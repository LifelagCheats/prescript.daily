# lib/supabase

## Type Aliases

### SupabaseCookieContext

> **SupabaseCookieContext** = `object`

Defined in: [apps/frontend/src/lib/supabase.ts:18](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/supabase.ts#L18)

Context object passed to Supabase client creation functions.

#### Remarks

This type defines the minimal request and cookie handling context needed
to instantiate a Supabase client in a server-side environment.
It ensures the client can correctly set auth cookies on the response.

#### Properties

##### request

> **request**: `Request`

Defined in: [apps/frontend/src/lib/supabase.ts:26](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/supabase.ts#L26)

Cookie manipulation interface.

###### Remarks

This object is used to set authentication cookies on the outgoing response.
It mimics a subset of Astro's `cookies` API for compatibility.

##### cookies

> **cookies**: `object`

Defined in: [apps/frontend/src/lib/supabase.ts:39](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/supabase.ts#L39)

Sets a cookie on the response.

###### set

> **set**: (`name`, `value`, `options?`) => `void`

###### Parameters

###### name

`string`

###### value

`string`

###### options?

`CookieOptions`

###### Returns

`void`

###### Param

**name**

The name of the cookie to set.

###### Param

**value**

The value to store in the cookie.

###### Param

**options**

Optional cookie configuration (e.g., `httpOnly`, `secure`, `maxAge`).

###### Example

```ts
cookies.set('session', 'abc123', { httpOnly: true, maxAge: 3600 });
```

## Functions

### createBrowserClient()

> **createBrowserClient**(): `SupabaseClient`\<`any`, `"public"`, `"public"`, `any`, `any`\>

Defined in: [apps/frontend/src/lib/supabase.ts:64](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/supabase.ts#L64)

Creates a Supabase client for use in the browser (client-side).

#### Returns

`SupabaseClient`\<`any`, `"public"`, `"public"`, `any`, `any`\>

A Supabase client instance configured for the browser.

#### Remarks

This function creates a Supabase client using the browser-safe publishable key.
It should only be used in client-side code (e.g., React components, Astro client scripts).
Do not use this in server-side contexts—use [createServerClient](#createserverclient) instead.

#### Example

```ts
import { createBrowserClient } from '@lib/supabase';

const supabase = createBrowserClient();
const { data } = await supabase.from('users').select('*');
```

***

### createServerClient()

> **createServerClient**(`context`): `SupabaseClient`\<`any`, `"public"`, `"public"`, `any`, `any`\>

Defined in: [apps/frontend/src/lib/supabase.ts:100](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/supabase.ts#L100)

Creates a Supabase client for use in server-side contexts (e.g., Astro endpoints, server actions).

#### Parameters

##### context

[`SupabaseCookieContext`](#supabasecookiecontext)

The request and cookie context from the server environment.

#### Returns

`SupabaseClient`\<`any`, `"public"`, `"public"`, `any`, `any`\>

A Supabase client instance configured for server-side usage with cookie handling.

#### Remarks

This function creates a Supabase client that is aware of the current request and response cookies.
It uses the provided context to read incoming cookies and set outgoing auth cookies.
This ensures that authentication state is properly persisted across requests.

#### Throws

If the Supabase URL or publishable key is not set in environment variables.

#### See

[SupabaseCookieContext](#supabasecookiecontext) for the structure of the context object.

#### Example

```ts
// In an Astro endpoint
import { createServerClient } from '@lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createServerClient({ request, cookies });
  const { data } = await supabase.from('users').select('*');
  return new Response(JSON.stringify(data));
};
```
