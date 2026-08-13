// NOTE: if you have any suggestions, please leave an issue on github!
/* NOTE: the prescripts were made by AI. yes, i know, but i won't do such a repetitive task myself! 
    
    in fact, NONE of the code is AI made!
    i say that AI is good in some areas and bad in others, code is one of them.

  NOTE: might just move this when it gets big but for now it stays this way
*/
import { createServerClient } from '@lib/supabase';

import handleError from '@lib/errorHandler';
import type { Prescript } from '@/types/scrambler';
import randomInt from '@lib/general';
import Scramble from '@lib/scrambler';
import { audio } from '@/lib/audio';

const supabase = createServerClient();

const button: HTMLElement | null = document.querySelector('.PrescriptButton');
const prescript: HTMLElement | null = document.querySelector('.Prescript');

const { count } = await supabase.from('Prescripts').select('*', { count: 'exact', head: true });

let cachedIds: number[] = JSON.parse(localStorage.getItem('cachedIds') ?? '[]') as number[];

if (cachedIds.length === count) {
  cachedIds = [];
  localStorage.setItem('cachedIds', JSON.stringify(cachedIds));
}

if (prescript) {
  button?.addEventListener('click', async () => {
    try {
      if (!prescript.classList.contains('busy')) {
        prescript.classList.add('busy');
        const query = supabase
          .from('Prescripts')
          .select('id, instruction')
          .order('id', { ascending: false });

        if (cachedIds.length > 0) {
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

        cachedIds.push(slip.id);
        localStorage.setItem('cachedIds', JSON.stringify(cachedIds));
      }
    } catch (error) {
      await handleError(error);
    }
  });
}
