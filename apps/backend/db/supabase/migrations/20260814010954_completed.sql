CREATE OR REPLACE FUNCTION public.completed(prescript integer)
 RETURNS TABLE(streak bigint, claimed boolean, seconds_until_next_claim bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  uid uuid := auth.uid();
  profile_row public.profiles%rowtype;
  seconds_since_claim numeric;
  new_streak bigint;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  select *
  into profile_row
  from public.profiles
  where user_id = uid
  for update;

  if profile_row.user_id is null then
    raise exception 'profile not found';
  end if;

  profile_row.prescripts_completed :=
    profile_row.prescripts_completed + 1;

  if not (
    prescript::bigint = any(
      coalesce(profile_row.paper_slips, '{}'::bigint[])
    )
  ) then
    profile_row.paper_slips :=
      array_append(
        coalesce(profile_row.paper_slips, '{}'::bigint[]),
        prescript::bigint
      );
  end if;

  profile_row.rank :=
    case
      when profile_row.rank = 'Proselyte' and profile_row.prescripts_completed >= 25 then 'Proxy'::"Rank"
      when profile_row.rank = 'Proxy' and profile_row.prescripts_completed >= 65 then 'Messenger'::"Rank"
      when profile_row.rank = 'Messenger' and profile_row.prescripts_completed >= 115 then 'Weaver'::"Rank"
      else profile_row.rank
    end;

  if profile_row.last_claim_at is null then
    new_streak := 1;

    update public.profiles
    set
      prescripts_completed = profile_row.prescripts_completed,
      paper_slips = profile_row.paper_slips,
      streak = new_streak,
      last_claim_at = now(),
      rank = profile_row.rank
    where user_id = uid;

    return query
    select new_streak, true, 0::bigint;

    return;
  end if;

  seconds_since_claim :=
    extract(epoch from (now() - profile_row.last_claim_at));

  if seconds_since_claim < 24 * 60 * 60 then

    update public.profiles
    set
      prescripts_completed = profile_row.prescripts_completed,
      paper_slips = profile_row.paper_slips,
      rank = profile_row.rank
    where user_id = uid;

    return query
    select
      profile_row.streak,
      false,
      ceil((24 * 60 * 60) - seconds_since_claim)::bigint;

    return;
  end if;

  if seconds_since_claim <= 48 * 60 * 60 then
    new_streak := profile_row.streak + 1;
  else
    new_streak := 1;
  end if;

  update public.profiles
  set
    prescripts_completed = profile_row.prescripts_completed,
    paper_slips = profile_row.paper_slips,
    streak = new_streak,
    last_claim_at = now(),
    rank = profile_row.rank
  where user_id = uid;

  return query
  select new_streak, true, 0::bigint;
end;
$function$

