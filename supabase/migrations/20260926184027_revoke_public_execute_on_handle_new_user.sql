/*
  # Revoke public execute on the SECURITY DEFINER signup trigger function

  1. Changes
    - Revoke EXECUTE on public.handle_new_user() from PUBLIC, anon and
      authenticated, leaving it only to postgres and service_role

  2. Security
    - handle_new_user runs as SECURITY DEFINER and inserts into
      members_entitlements, bypassing row level security. PUBLIC EXECUTE made it
      reachable from the internet at /rest/v1/rpc/handle_new_user with only the
      public anon key.
    - Trigger execution does not consult EXECUTE grants, so the
      on_auth_user_created trigger on auth.users continues to fire normally and
      new signups still receive their seed/free entitlement row.
*/

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;
