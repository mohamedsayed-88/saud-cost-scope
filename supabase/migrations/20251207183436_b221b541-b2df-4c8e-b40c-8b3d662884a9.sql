-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create questions_log table to store visitor questions
CREATE TABLE public.questions_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'smart_assistant',
    user_agent TEXT,
    ip_address TEXT,
    language TEXT DEFAULT 'ar',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on questions_log
ALTER TABLE public.questions_log ENABLE ROW LEVEL SECURITY;

-- Anyone can insert questions (public access)
CREATE POLICY "Anyone can insert questions"
ON public.questions_log
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view questions
CREATE POLICY "Admins can view all questions"
ON public.questions_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete questions
CREATE POLICY "Admins can delete questions"
ON public.questions_log
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));