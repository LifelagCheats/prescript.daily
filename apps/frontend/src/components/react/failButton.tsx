import { createBrowserClient } from '@/lib/supabase';
import Scramble from '@/lib/scrambler';
import { audio } from '@/lib/audio';
import { waitForElement } from '@lib/dom';

async function Fail(PrescriptContainer: HTMLElement | null) {
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
        const PrescriptContainer: HTMLElement | null =
          await waitForElement<HTMLElement>('.Prescript');
        const prescript = Number(PrescriptContainer?.getAttribute('data-id'));

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

        Fail(PrescriptContainer);
      }}
    >
      <span>Fail</span>
    </div>
  );
}
