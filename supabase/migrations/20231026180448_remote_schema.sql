alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

drop index if exists "public"."profiles_username_key";

alter table "public"."profiles" drop column "avatar_url";

alter table "public"."profiles" drop column "username";

alter table "public"."profiles" drop column "website";

alter table "public"."profiles" add column "age" integer;

alter table "public"."profiles" add column "completed_questionnaire" boolean not null default false;

alter table "public"."profiles" add column "location" text not null default ''::text;

alter table "public"."profiles" add column "profile_picture" text;

alter table "public"."profiles" add column "reason" text default ''::text;

alter table "public"."profiles" add column "sdg" text[];

alter table "public"."profiles" add column "want_difference_world" boolean;

alter table "public"."profiles" add column "want_diversify_portfolio" boolean;

alter table "public"."profiles" add column "want_specific_cause" boolean;

alter table "public"."profiles" add column "want_tax_incentives" boolean;

alter table "public"."profiles" alter column "full_name" set default ''::text;

alter table "public"."profiles" alter column "updated_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."profiles" alter column "updated_at" set not null;


