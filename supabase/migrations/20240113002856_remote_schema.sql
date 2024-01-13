drop policy "Anyone can add an sdg to a profile" on "public"."profile_sdgs";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.give_sign_up_gift()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO recharges(profile_id, amount) VALUES (NEW.id, 10);
    RETURN NEW;
END;
$function$
;

create policy "Enable insert for users based on user_id"
on "public"."profile_sdgs"
as permissive
for insert
to public
with check (true);


CREATE TRIGGER give_sign_up_gift_trigger AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION give_sign_up_gift();


