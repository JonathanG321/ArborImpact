alter table "public"."projects" add column "project_image_url" text default ''::text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_old_project_image()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  status int;
  content text;
  project_image_name text;
begin
  if coalesce(old.project_image_url, '') <> ''
      and (tg_op = 'DELETE' or (old.project_image_url <> new.project_image_url)) then
    -- extract project_image name
    project_image_name := old.project_image_url;
    select
      into status, content
      result.status, result.content
      from public.delete_project_image(project_image_name) as result;
    if status <> 200 then
      raise warning 'Could not delete project_image: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_project_image(project_image_url text, OUT status integer, OUT content text)
 RETURNS record
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('project_images', project_image_url) as result;
end;
$function$
;

CREATE TRIGGER before_project_changes BEFORE DELETE OR UPDATE OF project_image_url ON public.projects FOR EACH ROW EXECUTE FUNCTION delete_old_project_image();


