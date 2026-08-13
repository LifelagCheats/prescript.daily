type Props = {
  floor: number;
  progress: number;
  ceiling: number;
  header: string;
  extra: number;
};

export default function ProgressBar({ floor, progress, ceiling, header, extra }: Props) {
  const clamped = Math.min(ceiling, Math.max(floor, progress));
  const range = ceiling - floor;
  const percentage = ((clamped - floor) / range) * 100;

  return (
    <div className="RankBox">
      <div className="subtitles">
        <div className="header">{header}</div>
        <div className="extra">{extra}</div>
      </div>
      <div className="progressBar" id="progressBar">
        <div className="progressBar__fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
