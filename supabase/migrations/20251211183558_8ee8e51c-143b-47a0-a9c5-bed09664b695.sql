-- Add country column to page_views table for visitor country tracking
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS country TEXT;

-- Create index for country queries
CREATE INDEX IF NOT EXISTS idx_page_views_country ON public.page_views(country);