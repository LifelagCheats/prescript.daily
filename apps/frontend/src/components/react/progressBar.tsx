type Props = {
  progress: number;
  ceiling: number;
  header: string;
  extra: number;
};

export default function ProgressBar({ progress, ceiling, header, extra }: Props) {
  const clamped = Math.min(ceiling, Math.max(0, progress));
  const percentage = (clamped / ceiling) * 100;

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
