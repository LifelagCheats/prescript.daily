import { useEffect, useState } from 'react';
import '@styles/sass/fadeIn.scss';

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeIn({ children, delay = 0 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return <div className={`FadeIn ${visible ? 'show' : ''}`}>{children}</div>;
}
