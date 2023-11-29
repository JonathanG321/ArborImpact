drop policy "Enable view for users based on profile_id" on "public"."profile_sdgs";

create table "public"."spending_reports" (
    "id" bigint generated by default as identity not null,
    "project_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "item" text not null default ''::text,
    "cost" numeric not null default '0'::numeric,
    "amount" bigint not null default '1'::bigint
);


alter table "public"."spending_reports" enable row level security;

CREATE UNIQUE INDEX spending_reports_pkey ON public.spending_reports USING btree (id);

alter table "public"."spending_reports" add constraint "spending_reports_pkey" PRIMARY KEY using index "spending_reports_pkey";

alter table "public"."spending_reports" add constraint "spending_reports_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."spending_reports" validate constraint "spending_reports_project_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_donation_balance()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.amount > (SELECT balance FROM profile_balances WHERE profile_id = NEW.profile_id) THEN
    RAISE EXCEPTION 'Donation amount cannot be higher than the balance for the profile';
  END IF;
  RETURN NEW;
END;
$function$
;

create or replace view "public"."profile_balances" as  SELECT recharge_totals.profile_id,
    (recharge_totals.recharge_total - COALESCE(sum(donations.amount), (0)::double precision)) AS balance
   FROM (( SELECT profiles.id AS profile_id,
            COALESCE(sum(recharges.amount), (0)::double precision) AS recharge_total
           FROM (profiles
             LEFT JOIN recharges ON ((recharges.profile_id = profiles.id)))
          GROUP BY profiles.id) recharge_totals
     LEFT JOIN donations ON ((recharge_totals.profile_id = donations.profile_id)))
  GROUP BY recharge_totals.profile_id, recharge_totals.recharge_total;

create policy "Anyone can add an sdg to a profile"
on "public"."profile_sdgs"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."spending_reports"
as permissive
for select
to public
using (true);


CREATE TRIGGER before_insert_donation BEFORE INSERT ON public.donations FOR EACH ROW EXECUTE FUNCTION check_donation_balance();


