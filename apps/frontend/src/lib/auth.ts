import type { Email } from '@/types/login';
import { createBrowserClient } from '@lib/supabase';

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
    return null;
  }

  return data;
}

const Authenticator = {
  login(email: Email, password: string) {
    return authenticate('login', email, password);
  },

  signUp(username: string, email: Email, password: string) {
    return authenticate('signup', email, password, username);
  },
};

export default Authenticator;
