import '@styles/sass/skeleton.scss';

type Props = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string | number;
};

export default function Skeleton({
  loading = true,
  children,
  className = '',
  maxWidth = '5rem',
}: Props) {
  if (!loading) {
    return children;
  }

  return (
    <div
      className="SkeletonWrapper"
      style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
    >
      <span className={`Skeleton ${className}`} aria-hidden="true">
        <span className="Skeleton__content">{children}</span>
      </span>
    </div>
  );
}
