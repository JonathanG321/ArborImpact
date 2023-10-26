drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."users_pkey";

drop table "public"."users";

alter table "public"."profiles" drop column "email";

alter table "public"."profiles" drop column "updated_at";

alter table "public"."profiles" add column "birth_date" date;

alter table "public"."profiles" add column "created_at" timestamp with time zone not null default now();

alter table "public"."profiles" add column "first_name" text default ''::text;

alter table "public"."profiles" add column "last_name" text default ''::text;

alter table "public"."profiles" add column "location" text default ''::text;

alter table "public"."profiles" add column "sdg" text[] default '{}'::text[];

alter table "public"."profiles" add column "want_difference_world" boolean default false;

alter table "public"."profiles" add column "want_diversify_portfolio" boolean default false;

alter table "public"."profiles" add column "want_specific_cause" boolean default false;

alter table "public"."profiles" add column "want_tax_incentives" boolean default false;

alter table "public"."profiles" alter column "id" set default auth.uid();

CREATE UNIQUE INDEX users_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
end;
$function$
;


