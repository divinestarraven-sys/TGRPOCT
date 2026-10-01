/*
  # Remove the column-unrestricted entitlement update and delete surface

  1. Changes
    - Drop update_own_entitlement, whose USING and WITH CHECK both tested only
      row ownership and therefore permitted a user to rewrite every column of
      their own row, including tier, status, stripe_customer_id and
      stripe_subscription_id
    - Drop delete_own_entitlement, which was already USING (false)
    - Explicitly revoke UPDATE and DELETE from authenticated so that no future
      grant silently re-enables self-promotion

  2. Security
    - SELECT and select_own_entitlement are deliberately left untouched: the
      dashboard reads the caller's own entitlement through them.
    - All entitlement mutations continue to happen in the Stripe webhook edge
      function under the service role, which is unaffected by these rules.
*/

DROP POLICY IF EXISTS "update_own_entitlement" ON public.members_entitlements;
DROP POLICY IF EXISTS "delete_own_entitlement" ON public.members_entitlements;

REVOKE UPDATE, DELETE ON public.members_entitlements FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.members_entitlements FROM anon;
