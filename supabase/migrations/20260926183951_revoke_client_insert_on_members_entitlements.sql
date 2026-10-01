/*
  # Remove client INSERT access to members_entitlements

  1. Changes
    - Revoke INSERT on public.members_entitlements from the authenticated role
    - Drop the insert_own_entitlement policy, which only verified row ownership
      and placed no restriction on the tier / status / stripe_* columns

  2. Security
    - Entitlement rows are created exclusively by the on_auth_user_created
      SECURITY DEFINER trigger (tier 'seed', status 'free') and mutated only by
      the Stripe webhook using the service role, which bypasses RLS and grants.
    - No client code inserts into this table, so no feature depends on the grant.
*/

REVOKE INSERT ON public.members_entitlements FROM authenticated;

DROP POLICY IF EXISTS "insert_own_entitlement" ON public.members_entitlements;
