alter table "public"."products" drop column "image_url";

alter table "public"."products" add column "product_image_url" text;

alter table "public"."profile_sdgs" alter column "profile_id" set default auth.uid();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_old_product_image()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  status int;
  content text;
  product_image_name text;
begin
  if coalesce(old.product_image_url, '') <> ''
      and (tg_op = 'DELETE' or (old.product_image_url <> new.product_image_url)) then
    -- extract product_image name
    product_image_name := old.product_image_url;
    select
      into status, content
      result.status, result.content
      from public.delete_product_image(product_image_name) as result;
    if status <> 200 then
      raise warning 'Could not delete product_image: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_product_image(product_image_url text, OUT status integer, OUT content text)
 RETURNS record
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('product_images', product_image_url) as result;
end;
$function$
;

create policy "Enable read access for all users"
on "public"."products"
as permissive
for select
to public
using (true);


CREATE TRIGGER before_product_changes BEFORE DELETE OR UPDATE OF product_image_url ON public.products FOR EACH ROW EXECUTE FUNCTION delete_old_product_image();


