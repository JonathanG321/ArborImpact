drop policy "Enable insert for users based on user_id" on "public"."donated_to";

drop policy "Enable update for users based on profile_id" on "public"."donated_to";

drop policy "User can view relations that their profile is involved in" on "public"."donated_to";

alter table "public"."donated_to" drop constraint "donated_to_profile_id_fkey";

alter table "public"."donated_to" drop constraint "donated_to_project_id_fkey";

alter table "public"."donated_to" drop constraint "donated_to_pkey";

drop index if exists "public"."donated_to_pkey";

drop table "public"."donated_to";

create table "public"."donations" (
    "profile_id" uuid not null,
    "project_id" bigint not null,
    "donation" double precision not null default '0'::double precision,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."donations" enable row level security;

alter table "public"."projects" add column "donation_currency" text not null default 'USD'::text;

CREATE UNIQUE INDEX donations_pkey ON public.donations USING btree (profile_id, project_id);

alter table "public"."donations" add constraint "donations_pkey" PRIMARY KEY using index "donations_pkey";

alter table "public"."donations" add constraint "donations_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."donations" validate constraint "donations_profile_id_fkey";

alter table "public"."donations" add constraint "donations_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."donations" validate constraint "donations_project_id_fkey";

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

create policy "Any user can view any relation"
on "public"."donations"
as permissive
for select
to public
using (true);


create policy "Enable insert for users based on user_id"
on "public"."donations"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Enable update for users based on profile_id"
on "public"."donations"
as permissive
for update
to public
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));



