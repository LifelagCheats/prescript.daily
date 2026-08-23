import CountUp from '@components/react/counter';
import Skeleton from '@components/react/skeleton';
import '@styles/sass/counter.scss';
import { createBrowserClient } from '@lib/supabase';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  streak: number;
};

const supabase = createBrowserClient();

export default function StreakCounter({ streak }: Props) {
  const [currentStreak, setStreak] = useState(streak);
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdate] = useState(false);

  const handleStart = useCallback(() => {
    setLoading(false);
    setUpdate(true);
  }, []);

  const handleEnd = useCallback(() => {
    setUpdate(false);
  }, []);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setSession(user?.id ?? null);
    }

    getUser();
  }, []);

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
          select: ['id', 'streak'],
        },
        (payload) => {
          if (payload.old.streak !== payload.new.streak) {
            setLoading(true);
            setStreak(payload.new.streak);
          }
        },
      )
      .subscribe((status) => {
        console.log('Channel status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return (
    <span className="Streak" id="Streak">
      Streak{' '}
      <span className="Counter">
        <Skeleton loading={loading}>
          <CountUp
            from={0}
            to={currentStreak}
            duration={0.95}
            separator=","
            direction="up"
            onStart={handleStart}
            onEnd={handleEnd}
            className={`Counter ${updating ? 'updating' : ''}`}
          />
        </Skeleton>
      </span>
    </span>
  );
}
