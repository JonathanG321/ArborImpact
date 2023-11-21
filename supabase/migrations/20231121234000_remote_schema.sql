alter table "public"."profiles" add column "requesting_funds" boolean not null default false;

alter table "public"."profiles" add column "seen_marketplace" boolean not null default false;

set check_function_bodies = off;


