
-- Add time_spent_seconds column to page_views
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS time_spent_seconds integer DEFAULT 0;

-- Create service_usage table for tracking services used
CREATE TABLE public.service_usage (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    service_name text NOT NULL,
    service_category text NOT NULL,
    session_id text,
    user_agent text,
    metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.service_usage ENABLE ROW LEVEL SECURITY;

-- Anyone can insert service usage
CREATE POLICY "Anyone can insert service usage"
ON public.service_usage
FOR INSERT
WITH CHECK (true);

-- Only admins can view service usage
CREATE POLICY "Admins can view service usage"
ON public.service_usage
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete service usage
CREATE POLICY "Admins can delete service usage"
ON public.service_usage
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
