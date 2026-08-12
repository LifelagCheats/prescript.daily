import type { Email } from '@/types/login';
import { createServerClient } from '@lib/supabase';

export default async function Login(email: Email, password: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${email}`,
    password: `${password}`,
  });

  if (error) {
    return null;
  }

  return data;
}
