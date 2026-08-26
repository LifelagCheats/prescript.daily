create or replace function public.add_encountered(
  prescript integer
)
returns void
language plpgsql
as $$
begin
  update public.profiles
  set encountered = array_append(
    coalesce(encountered, array[]::int8[]),
    prescript::bigint
  )
  where user_id = auth.uid();
  
  return 'ok';
end;
