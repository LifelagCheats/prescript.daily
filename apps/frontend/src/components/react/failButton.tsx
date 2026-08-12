import { createServerClient } from '@/lib/supabase';

async function Fail() {
  const supabase = createServerClient();

  const { data, error } = await supabase.rpc('failed');

  console.log(data);
  console.log(error);
}

export default function FailButton() {
  return (
    <div className="FailButton" onClick={() => Fail()}>
      <span></span>
    </div>
  );
}
