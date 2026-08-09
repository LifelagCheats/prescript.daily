import CountUp from '@components/react/counter';
import FadeIn from '@components/react/fadeIn';

type Props = {
  streak: number;
};

export default function StreakCounter({ streak }: Props) {
  return (
    <FadeIn>
      <span className="Streak" id="Streak">
        Streak{' '}
        <span className="Counter">
          <CountUp from={0} to={streak} separator="," direction="up" />
        </span>
      </span>
    </FadeIn>
  );
}
