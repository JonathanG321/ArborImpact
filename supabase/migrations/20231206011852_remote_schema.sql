create table "public"."admins" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text default ''::text
);


alter table "public"."admins" enable row level security;

alter table "public"."products" add column "sdg" text not null default 'SDG01'::text;

CREATE UNIQUE INDEX admins_name_key ON public.admins USING btree (name);

CREATE UNIQUE INDEX admins_pkey ON public.admins USING btree (id);

alter table "public"."admins" add constraint "admins_pkey" PRIMARY KEY using index "admins_pkey";

alter table "public"."admins" add constraint "admins_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."admins" validate constraint "admins_id_fkey";

alter table "public"."admins" add constraint "admins_name_key" UNIQUE using index "admins_name_key";

alter table "public"."products" add constraint "products_sdg_fkey" FOREIGN KEY (sdg) REFERENCES sdgs(id) not valid;

alter table "public"."products" validate constraint "products_sdg_fkey";

set check_function_bodies = off;

create policy "Admins table full access"
on "public"."admins"
as permissive
for all
to authenticated
using ((auth.uid() = id));


create policy "Enable read access for all users"
on "public"."profile_sdgs"
as permissive
for select
to public
using (true);



