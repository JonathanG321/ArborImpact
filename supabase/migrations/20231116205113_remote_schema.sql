alter table "public"."donations" alter column "updated_at" set default now();

alter table "public"."donations" alter column "updated_at" set not null;

alter table "public"."profiles" add column "balance" numeric not null default '0'::numeric;

alter table "public"."profiles" alter column "avatar_url" set not null;

alter table "public"."profiles" alter column "birth_date" set default now();

alter table "public"."profiles" alter column "birth_date" set not null;

alter table "public"."profiles" alter column "first_name" set not null;

alter table "public"."profiles" alter column "last_name" set not null;

alter table "public"."profiles" alter column "location" set not null;

alter table "public"."profiles" alter column "sdg" set not null;

alter table "public"."profiles" alter column "want_difference_world" set not null;

alter table "public"."profiles" alter column "want_diversify_portfolio" set not null;

alter table "public"."profiles" alter column "want_specific_cause" set not null;

alter table "public"."profiles" alter column "want_tax_incentives" set not null;

alter table "public"."projects" alter column "activity" set not null;

alter table "public"."projects" alter column "extra_images" set not null;

alter table "public"."projects" alter column "funding_goal" set default '0'::numeric;

alter table "public"."projects" alter column "funding_goal" set not null;

alter table "public"."projects" alter column "goal_date" set default now();

alter table "public"."projects" alter column "goal_date" set not null;

alter table "public"."projects" alter column "impact_goal" set default '0'::numeric;

alter table "public"."projects" alter column "impact_goal" set not null;

alter table "public"."projects" alter column "impact_goal_unit" set not null;

alter table "public"."projects" alter column "impact_type" set not null;

alter table "public"."projects" alter column "name" set not null;

alter table "public"."projects" alter column "project_image_url" set not null;

alter table "public"."projects" alter column "region" set not null;

alter table "public"."projects" alter column "sdg" set default '''SDG1''::text'::text;

alter table "public"."projects" alter column "sdg" set not null;

alter table "public"."profiles" add constraint "profiles_balance_check" CHECK ((balance >= (0)::numeric)) not valid;

alter table "public"."profiles" validate constraint "profiles_balance_check";

set check_function_bodies = off;


