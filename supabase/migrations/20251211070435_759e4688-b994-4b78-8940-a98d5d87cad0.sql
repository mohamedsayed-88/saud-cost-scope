-- Create table for prior auth search logs
CREATE TABLE public.prior_auth_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  found_results JSONB DEFAULT '[]'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  session_id TEXT,
  user_agent TEXT,
  ip_address TEXT
);

-- Enable RLS
ALTER TABLE public.prior_auth_searches ENABLE ROW LEVEL SECURITY;

-- Only admins can view searches
CREATE POLICY "Admins can view prior auth searches"
ON public.prior_auth_searches
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert searches
CREATE POLICY "Anyone can insert prior auth searches"
ON public.prior_auth_searches
FOR INSERT
WITH CHECK (true);

-- Only admins can delete
CREATE POLICY "Admins can delete prior auth searches"
ON public.prior_auth_searches
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));