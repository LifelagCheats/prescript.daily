import { audio } from '@/lib/audio';
import Scramble from '@lib/scrambler';
import { createServerClient } from '@lib/supabase';

type Props = {
  user_id: string;
};

const PrescriptContainer: HTMLElement | null = document.querySelector('.Prescript');

async function Complete(prescript: number, user_id: string) {
  const supabase = createServerClient();

  const { data: confirmation } = await supabase
    .from('profiles')
    .select('user_id, paper_slips')
    .eq('user_id', user_id);

  if (!confirmation) return;

  if (confirmation[0].paper_slips.includes(prescript)) {
    if (PrescriptContainer) {
      Scramble(
        PrescriptContainer,
        '',
        'Prescript already completed',
        {},
        {
          audioUnlocked: true,
          Beep: audio.beep,
        },
      );
    }
    return;
  }

  await supabase.rpc('completed', {
    prescript: prescript,
  });
  if (PrescriptContainer) {
    Scramble(
      PrescriptContainer,
      '',
      'Well Done',
      {},
      {
        audioUnlocked: true,
        Beep: audio.beep,
        startBeep: audio.completed,
      },
    );
    delete PrescriptContainer.dataset.id;
  }
}

export default function CompleteButton({ user_id }: Props) {
  return (
    <div
      className="CompleteButton"
      onClick={() => {
        const prescript = Number(document.querySelector('.Prescript')?.getAttribute('data-id'));

        if (!prescript) {
          if (PrescriptContainer) {
            Scramble(
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

        Complete(prescript, user_id);
      }}
    >
      <span>Complete</span>
    </div>
  );
}
