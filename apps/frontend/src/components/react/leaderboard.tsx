import type { User } from '@/types/login';
import '@styles/sass/leaderboard.scss';
import { useEffect, useRef, useCallback } from 'react';

type Props = {
  users: User[];
  statType: 'Prescripts Completed' | 'Streak';
};

export default function Leaderboard({ users, statType }: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const elements = useRef<Map<Element, true>>(new Map());

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        setTimeout(
          () => {
            console.log('showing');
            entry.target.classList.toggle('show', entry.isIntersecting);
          },
          100 + index * 50,
        );
      });
    });

    observer.current = io;

    elements.current.forEach((_, el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  const observe = useCallback((el: HTMLElement | null) => {
    if (el) {
      elements.current.set(el, true);
      observer.current?.observe(el);
    }
  }, []);

  return (
    <div className="leaderboard">
      <div className="statistics">{statType}</div>
      <div className="date">{new Date().toLocaleDateString()}</div>
      <div className="userlist">
        {users.map((user) => (
          <div key={user.id} ref={observe} className="card">
            <span className="username">{user.username}</span>
            <span className="rank">{user.rank}</span>
            <span className="stat">{user.prescripts_completed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
