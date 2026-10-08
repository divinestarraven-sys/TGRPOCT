/*
# Shared persistent rate limiter for the Oracle chat

1. New Tables
- `oracle_rate_limits`
  - `client_key` (text, primary key): hashed client identifier
  - `window_start` (timestamptz): start of the current rate limit window
  - `count` (integer): requests made within the current window
2. Security
- RLS enabled; NO policies added, so no client role (anon or authenticated)
  can read or write the table directly. Only the service role (edge functions)
  can access it through the SECURITY DEFINER function below.
3. New Functions
- `oracle_check_rate_limit(p_key text, p_max_count int, p_window_ms bigint)`
  returns boolean (true = rate limited). SECURITY DEFINER, search_path locked.
  Atomically increments and resets windows. Callable ONLY by service_role
  (EXECUTE revoked from public, anon, authenticated) so browser callers cannot
  bypass or reset the limiter.
*/

CREATE TABLE IF NOT EXISTS oracle_rate_limits (
  client_key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0
);

ALTER TABLE oracle_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION oracle_check_rate_limit(
  p_key text,
  p_max_count integer,
  p_window_ms bigint
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_window_start timestamptz;
  v_count integer;
BEGIN
  INSERT INTO oracle_rate_limits (client_key, window_start, count)
  VALUES (p_key, v_now, 1)
  ON CONFLICT (client_key) DO UPDATE
    SET count = oracle_rate_limits.count + 1
  RETURNING window_start, count INTO v_window_start, v_count;

  -- If the stored window has expired, reset it
  IF v_window_start < v_now - make_interval(secs => (p_window_ms / 1000.0)::double precision) THEN
    UPDATE oracle_rate_limits
    SET window_start = v_now, count = 1
    WHERE client_key = p_key;
    RETURN false;
  END IF;

  RETURN v_count > p_max_count;
END;
$$;

REVOKE ALL ON FUNCTION oracle_check_rate_limit(text, integer, bigint) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION oracle_check_rate_limit(text, integer, bigint) TO service_role;

-- Cleanup job for old windows (run manually or by cron if desired)
CREATE OR REPLACE FUNCTION oracle_cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM oracle_rate_limits
  WHERE window_start < now() - interval '1 hour';
END;
$$;

REVOKE ALL ON FUNCTION oracle_cleanup_rate_limits() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION oracle_cleanup_rate_limits() TO service_role;