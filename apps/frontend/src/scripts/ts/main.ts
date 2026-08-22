// NOTE: if you have any suggestions, please leave an issue on github!
/* NOTE: the prescripts were made by AI. yes, i know, but i won't do such a repetitive task myself! 
    
    in fact, NONE of the code is AI made!
    i say that AI is good in some areas and bad in others, code is one of them.

  NOTE: might just move this when it gets big but for now it stays this way
*/
import { createBrowserClient } from '@lib/supabase';

import handleError from '@lib/errorHandler';
import type { Prescript } from '@/types/scrambler';
import randomInt from '@lib/general';
import Scramble from '@lib/scrambler';
import { audio } from '@/lib/audio';
import { waitForElement } from '@lib/dom';

document.addEventListener('DOMContentLoaded', async () => {
  const supabase = createBrowserClient();

  const [button, prescript] = await Promise.all([
    waitForElement<HTMLElement>('.PrescriptButton'),
    waitForElement<HTMLElement>('.Prescript'),
  ]);

  const { data: session } = await supabase.auth.getUser();

  if (!session) {
    throw new Error('Not signed in');
  }

  async function countPrescripts() {
    const encountered = await supabase
      .from('profiles')
      .select('user_id, encountered')
      .eq('user_id', session?.user?.id)
      .single();

    return encountered;
  }

  const cache = await countPrescripts();
  let cachedIds: number[] = cache?.data?.encountered;
  localStorage.setItem('cachedIds', JSON.stringify(cachedIds));

  if (prescript) {
    button?.addEventListener('click', async () => {
      try {
        if (!prescript.classList.contains('busy')) {
          prescript.classList.add('busy');
          const query = supabase
            .from('Prescripts')
            .select('id, instruction')
            .order('id', { ascending: false });

          if (cachedIds && cachedIds.length > 0) {
            query.not('id', 'in', `(${cachedIds.join(',')})`);
          }

          const { data: slips } = await query;

          if (!slips || slips.length === 0 || !prescript) return;

          const slip: Prescript = slips[randomInt(0, slips.length - 1)];

          prescript.dataset.id = String(slip.id);

          await Scramble(
            prescript,
            '',
            slip.instruction,
            {},
            {
              audioUnlocked: true,
              startBeep: audio.start,
              Beep: audio.beep,
            },
            false,
          );

          await supabase.rpc('add_encountered', {
            prescript: Number(slip.id),
          });

          const cache = await countPrescripts();
          cachedIds = cache?.data?.encountered;
          localStorage.setItem('cachedIds', JSON.stringify(cachedIds));
        }
      } catch (error) {
        await handleError(error);
      }
    });
  }
});
