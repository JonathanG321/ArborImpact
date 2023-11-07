alter table "public"."projects" drop constraint "projects_profile_id_fkey";

create table "public"."donated_to" (
    "profile_id" uuid not null,
    "project_id" bigint not null
);


alter table "public"."donated_to" enable row level security;

alter table "public"."projects" drop column "profile_id";

alter table "public"."projects" add column "name" text default ''::text;

CREATE UNIQUE INDEX donated_to_pkey ON public.donated_to USING btree (profile_id, project_id);

alter table "public"."donated_to" add constraint "donated_to_pkey" PRIMARY KEY using index "donated_to_pkey";

alter table "public"."donated_to" add constraint "donated_to_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."donated_to" validate constraint "donated_to_profile_id_fkey";

alter table "public"."donated_to" add constraint "donated_to_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."donated_to" validate constraint "donated_to_project_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_storage_object(bucket text, object text, OUT status integer, OUT content text)
 RETURNS record
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  project_url text := 'https://zyvhfomclqlhrbkvgokr.supabase.co';
  service_role_key text := 'SERVICE_ROLE_KEY'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$function$
;

create policy "Enable insert for users based on user_id"
on "public"."donated_to"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Enable update for users based on profile_id"
on "public"."donated_to"
as permissive
for update
to public
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));


create policy "User can view relations that their profile is involved in"
on "public"."donated_to"
as permissive
for select
to public
using ((auth.uid() = profile_id));


create policy "Enable read access for all users"
on "public"."projects"
as permissive
for select
to public
using (true);



