import { createBrowserClient } from '@/lib/supabase';
import Scramble from '@/lib/scrambler';
import { audio } from '@/lib/audio';

const PrescriptContainer: HTMLElement | null = document.querySelector('.Prescript');

async function Fail() {
  const supabase = createBrowserClient();

  await supabase.rpc('failed');
  if (PrescriptContainer) {
    Scramble(
      PrescriptContainer,
      '',
      'A failure, indeed',
      {},
      {
        audioUnlocked: true,
        Beep: audio.beep,
      },
    );
    delete PrescriptContainer.dataset.id;
  }
}

export default function FailButton() {
  return (
    <div
      className="FailButton"
      onClick={async () => {
        const prescript = Number(document.querySelector('.Prescript')?.getAttribute('data-id'));

        if (!prescript) {
          if (PrescriptContainer) {
            await Scramble(
              PrescriptContainer,
              '',
              'No Prescript, look up',
              {},
              {
                audioUnlocked: true,
                Beep: audio.beep,
              },
            );
          }
          return;
        }

        Fail();
      }}
    >
      <span>Fail</span>
    </div>
  );
}
