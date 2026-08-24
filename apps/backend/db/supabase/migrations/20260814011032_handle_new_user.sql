CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    username
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username'
  );

  RETURN NEW;
END;
$function$;
