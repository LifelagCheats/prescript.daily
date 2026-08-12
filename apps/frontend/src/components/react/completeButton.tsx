import { createServerClient } from '@lib/supabase';

type Props = {
  user_id: string;
};

async function Complete(prescript: number, user_id: string) {
  const supabase = createServerClient();

  const { data: confirmation } = await supabase
    .from('profiles')
    .select('user_id, paper_slips')
    .eq('user_id', user_id);

  if (!confirmation) return;

  if (confirmation[0].paper_slips.includes(prescript)) {
    return;
  }

  await supabase.rpc('completed', {
    prescript: prescript,
  });
}

export default function CompleteButton({ user_id }: Props) {
  return (
    <div
      className="CompleteButton"
      onClick={() => {
        const prescript = Number(document.querySelector('.Prescript')?.getAttribute('data-id'));

        if (!prescript) return;

        Complete(prescript, user_id);
      }}
    >
      <span></span>
    </div>
  );
}
