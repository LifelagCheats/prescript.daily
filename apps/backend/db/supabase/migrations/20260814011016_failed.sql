CREATE OR REPLACE FUNCTION public.failed()
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  update profiles
  set prescripts_failed = prescripts_failed + 1
  where user_id = auth.uid();
end;$function$

