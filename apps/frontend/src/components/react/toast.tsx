import { useEffect, useState } from 'react';
import { toast, type ToastItem } from '@lib/toast';
import '@styles/sass/toast.scss';

type Props = {
  messages?: string[] | null;
};

export default function ToastRoot({ messages }: Props) {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => toast.subscribe(setItems), []);

  useEffect(() => {
    if (messages) {
      console.log(messages);
      messages.forEach((message) => {
        console.log(message);
        if (message !== null) {
          toast.add(message);
        }
      });
    }
  }, [messages]);

  return (
    <div className="toast-host">
      {items.map((item) => (
        <div key={item.id} className="toast">
          {item.message}
          <button onClick={() => toast.close(item.id)}>Close</button>
        </div>
      ))}
    </div>
  );
}
