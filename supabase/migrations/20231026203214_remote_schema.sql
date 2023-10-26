alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."user" drop constraint "user_profile_id_fkey";

alter table "public"."user" drop constraint "user_pkey";

drop index if exists "public"."user_pkey";

drop table "public"."user";

create table "public"."users" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "first_name" text default ''::text,
    "last_name" text default ''::text,
    "birth_date" date,
    "location" text default ''::text,
    "want_difference_world" boolean default false,
    "want_diversify_portfolio" boolean default false,
    "want_tax_incentives" boolean default false,
    "want_specific_cause" boolean default false,
    "sdg" text[] default '{}'::text[]
);


alter table "public"."users" enable row level security;

alter table "public"."profiles" drop column "user_id";

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$function$
;


