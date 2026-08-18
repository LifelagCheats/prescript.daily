import CountUp from '@components/react/counter';
import { createBrowserClient } from '@lib/supabase';
import { useEffect, useState } from 'react';

type Props = {
  streak: number;
};

const supabase = createBrowserClient();
const {
  data: { user },
} = await supabase.auth.getUser();
const session = user?.id;

console.log(user);
console.log(session);

export default function StreakCounter({ streak }: Props) {
  const [currentStreak, setStreak] = useState(streak);

  useEffect(() => {
    if (!session) return;

    console.log(session);

    const channel = supabase
      .channel(`streak:${session}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${session}`,
        },
        (payload) => {
          console.log('STREAK CHANGED', payload);
          console.log('STREAK: ', payload.new.streak);

          setStreak(payload.new.streak);
        },
      )
      .subscribe((status) => {
        console.log('📡 Channel status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return (
    <span className="Streak" id="Streak">
      Streak{' '}
      <span className="Counter">
        <CountUp from={0} to={currentStreak} separator="," direction="up" />
      </span>
    </span>
  );
}
