import CountUp from '@components/react/counter';

type Props = {
  streak: number;
};

export default function StreakCounter({ streak }: Props) {
  return (
    <span className="Streak" id="Streak">
      Streak{' '}
      <span className="Counter">
        <CountUp from={0} to={streak} separator="," direction="up" />
      </span>
    </span>
  );
}
