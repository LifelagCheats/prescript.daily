import { useEffect, useState } from 'react';
import { createBrowserClient } from '@lib/supabase';
import { nextRole, getRole } from '@lib/roles';
import '@styles/sass/progressbar.scss';

type Props = {
  floor: number;
  progress: number;
  ceiling: number;
  header: string;
  extra: number;
};

const supabase = createBrowserClient();
const {
  data: { user },
} = await supabase.auth.getUser();
const session = user?.id;

export default function ProgressBar({ floor, progress, ceiling, header, extra }: Props) {
  const [currentFloor, setFloor] = useState(floor);
  const [currentProgress, setProgress] = useState(progress);
  const [currentCeiling, setCeiling] = useState(ceiling);
  const [currentHeader, setHeader] = useState(header);
  const [currentExtra, setExtra] = useState(extra);

  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`progress:${session}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${session}`,
        },
        (payload) => {
          const newProgress = payload.new.prescripts_completed;
          const role = getRole(newProgress);
          if (!role) return;

          const objective = nextRole(role?.name);

          setProgress(newProgress);
          setExtra(newProgress);
          setFloor(role?.Pcompleted);
          setHeader(role?.name);
          setCeiling(objective.Pcompleted);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const clamped = Math.min(currentCeiling, Math.max(currentFloor, currentProgress));
  const range = currentCeiling - currentFloor;
  const percentage = ((clamped - currentFloor) / range) * 100;

  return (
    <div className="RankBox">
      <div className="subtitles">
        <div className="header">{currentHeader}</div>
        <div className="extra">{currentExtra}</div>
      </div>
      <div className="progressBar" id="progressBar">
        <div className="progressBar__fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
