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


