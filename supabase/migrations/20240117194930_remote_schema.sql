drop policy "Enable insert for users based on user_id" on "public"."profile_sdgs";

set check_function_bodies = off;

create policy "Enable insert for authenticated users only"
on "public"."profile_sdgs"
as permissive
for insert
to authenticated
with check (true);



