drop policy "Admins table full access" on "public"."admins";

alter table "public"."admins" drop constraint "admins_name_key";

drop index if exists "public"."admins_name_key";

alter table "public"."admins" drop column "name";

alter table "public"."admins" add column "first_name" text default ''::text;

alter table "public"."admins" add column "last_name" text default ''::text;

alter table "public"."admins" add column "status" text default 'active'::text;

alter table "public"."products" add column "status" text not null default 'published'::text;

alter table "public"."products" add column "unlock_shares" numeric not null default '0'::numeric;

alter table "public"."projects" add column "brief" text not null default ''::text;

alter table "public"."projects" add column "description" text not null default ''::text;

alter table "public"."projects" add column "unique_impact_metric_unit" text not null default 'Percentage of Total'::text;

alter table "public"."projects" add column "universal_impact_metric_unit" text not null default 'Dollar/Percentage'::text;

set check_function_bodies = off;

create policy "Enable read access for all users"
on "public"."admins"
as permissive
for select
to public
using (true);


create policy "Users don't have access to admins"
on "public"."admins"
as permissive
for all
to authenticated
using ((NOT (EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid())))));


create policy "Admins have full access to donations"
on "public"."donations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to products"
on "public"."products"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to profile_sdgs"
on "public"."profile_sdgs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins can delete"
on "public"."profiles"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins can insert"
on "public"."profiles"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins can update"
on "public"."profiles"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to projects"
on "public"."projects"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to recharges"
on "public"."recharges"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to sdgs"
on "public"."sdgs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));


create policy "Admins have full access to spending_reports"
on "public"."spending_reports"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM admins
  WHERE (admins.id = auth.uid()))));



