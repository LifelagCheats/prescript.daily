import type { Email } from '@/types/login';
import { createBrowserClient } from '@lib/supabase';

/**
 * Authenticate is an async function responsible for sending requests to Supabase Auth to log in or sign up the user depending on the mode selected.
 *
 * @remarks
 * This async function takes an email parameter of type Email, see {@link Email}
 * and uses the type parameter to differentiate between which Supabase function is needed
 * to use, it uses the functions .signInWithPassword() and .signUp() depending on the type specified.
 *
 * @param type - specifies the type of authentication operation that's going to be used.
 * @param email - the user's email, used on both operations.
 * @param password - the user's passsword, used on both operations.
 * @param username - the user's username, used only on sign up operations, if not provided, will be null (Optional).
 *
 * @returns a Supabase request Response
 *
 * @throws {Error} if Supabase returns an Error object
 *
 * @see {@link Email}
 * @private
 */
async function authenticate(
  type: 'login' | 'signup',
  email: Email,
  password: string,
  username?: string,
) {
  const supabase = createBrowserClient();

  const { data, error } =
    type === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username ?? null,
            },
          },
        });

  if (error) {
    throw new Error(error?.message ?? 'An unknown error occurred');
  }

  return data;
}

/**
 * Authenticator is the API with which one interacts to authenticate the user.
 *
 * @remarks
 * Each method passes its respective type as the first argument.
 * This API was designed for aesthetic and ergonomic reasons.
 *
 * @example
 * ```ts
 * import Authenticator from '@lib/auth'
 *
 * const user = await Authenticator.login('email@example.com', 'passsword');
 * const new = await Authenticator.signUp('username', 'email@example.com', 'password');
 * ```
 */
const Authenticator = {
  /**
   * Logs into an existing user's account
   *
   * @param email - the user's email address
   * @param password - the user's password
   * @returns the authenticated user's session data, if successful
   *
   * @example
   * ```ts
   * const session = Authenticator.login('email@example.com', 'password')
   * ```
   */
  login(email: Email, password: string) {
    return authenticate('login', email, password);
  },

  /**
   * Registers a new user.
   *
   * @param username - The user's chosen username.
   * @param email - The user's email address.
   * @param password - The user's chosen password.
   * @returns The newly created user session data.
   *
   * @example
   * ```ts
   * const newUser = await Authenticator.signUp('67onamerrychristmas', 'johnkaisen@email.com', 'password');
   * ```
   */
  signUp(username: string, email: Email, password: string) {
    return authenticate('signup', email, password, username);
  },
};

export default Authenticator;
