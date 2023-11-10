alter table "public"."projects" add column "activity" text default ''::text;

alter table "public"."projects" add column "extra_images" text[] default '{}'::text[];

alter table "public"."projects" add column "funding_goal" numeric;

alter table "public"."projects" add column "goal_date" date;

alter table "public"."projects" add column "impact_goal" numeric;

alter table "public"."projects" add column "impact_goal_unit" text default ''::text;

alter table "public"."projects" add column "impact_type" text default ''::text;

alter table "public"."projects" add column "region" text default ''::text;

alter table "public"."projects" add column "sdg" text;

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


