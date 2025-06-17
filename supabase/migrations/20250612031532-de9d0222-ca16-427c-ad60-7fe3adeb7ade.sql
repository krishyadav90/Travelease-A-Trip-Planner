
-- Create enum types for various categorizations (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE interest_category AS ENUM ('adventure', 'wildlife', 'beaches', 'historical', 'cultural', 'food', 'nature', 'urban', 'spiritual', 'photography');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE season_type AS ENUM ('spring', 'summer', 'autumn', 'winter', 'year_round');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE trip_type AS ENUM ('solo', 'couple', 'family', 'group', 'business');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Attractions table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.attractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  category interest_category NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  entry_fee TEXT,
  opening_hours JSONB,
  best_time_to_visit TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Travel guides/blogs table
CREATE TABLE IF NOT EXISTS public.travel_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  destination_id UUID REFERENCES public.destinations(id),
  featured_image TEXT,
  tags TEXT[],
  season season_type,
  trip_type trip_type,
  read_time INTEGER, -- in minutes
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User itineraries
CREATE TABLE IF NOT EXISTS public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  total_days INTEGER,
  estimated_cost DECIMAL(10,2),
  is_public BOOLEAN DEFAULT false,
  share_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itinerary days and activities
CREATE TABLE IF NOT EXISTS public.itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date DATE,
  title TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.itinerary_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID REFERENCES public.itinerary_days(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIME,
  end_time TIME,
  estimated_cost DECIMAL(8,2),
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User reviews for attractions/destinations
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id),
  destination_id UUID REFERENCES public.destinations(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  pros TEXT[],
  cons TEXT[],
  visit_date DATE,
  is_approved BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (attraction_id IS NOT NULL OR destination_id IS NOT NULL)
);

-- User photo uploads
CREATE TABLE IF NOT EXISTS public.user_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id),
  destination_id UUID REFERENCES public.destinations(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (attraction_id IS NOT NULL OR destination_id IS NOT NULL)
);

-- User wishlist
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id),
  destination_id UUID REFERENCES public.destinations(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, attraction_id, destination_id),
  CHECK (attraction_id IS NOT NULL OR destination_id IS NOT NULL)
);

-- Add new columns to existing questions table for travel features
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS destination_id UUID REFERENCES public.destinations(id);
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS attraction_id UUID REFERENCES public.attractions(id);

-- Answers table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_helpful BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update profiles table for enhanced features
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_interests interest_category[];

-- Update destinations table for enhanced features  
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS best_seasons season_type[];
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS average_cost DECIMAL(8,2);
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS safety_rating INTEGER CHECK (safety_rating >= 1 AND safety_rating <= 5);

-- Enable RLS on all new tables
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access (with IF NOT EXISTS checks)
DO $$ BEGIN
    CREATE POLICY "Everyone can view approved attractions" ON public.attractions FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Everyone can view published guides" ON public.travel_guides FOR SELECT USING (is_published = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Everyone can view public itineraries" ON public.itineraries FOR SELECT USING (is_public = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Everyone can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Everyone can view approved photos" ON public.user_photos FOR SELECT USING (is_approved = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Everyone can view answers" ON public.answers FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create RLS policies for authenticated users
DO $$ BEGIN
    CREATE POLICY "Users can manage their own itineraries" ON public.itineraries FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their itinerary days" ON public.itinerary_days FOR ALL USING (EXISTS(SELECT 1 FROM public.itineraries WHERE id = itinerary_id AND user_id = auth.uid()));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their itinerary activities" ON public.itinerary_activities FOR ALL USING (EXISTS(SELECT 1 FROM public.itinerary_days d JOIN public.itineraries i ON d.itinerary_id = i.id WHERE d.id = day_id AND i.user_id = auth.uid()));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can upload photos" ON public.user_photos FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their own photos" ON public.user_photos FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create answers" ON public.answers FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their own answers" ON public.answers FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Functions for generating share tokens
CREATE OR REPLACE FUNCTION generate_itinerary_share_token()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'itinerary_' || substr(encode(gen_random_bytes(12), 'base64'), 1, 16);
END;
$$;

-- Trigger to auto-generate share tokens
CREATE OR REPLACE FUNCTION set_itinerary_share_token()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.share_token IS NULL AND NEW.is_public = true THEN
    NEW.share_token := generate_itinerary_share_token();
  END IF;
  RETURN NEW;
END;
$$;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS set_itinerary_share_token_trigger ON public.itineraries;
CREATE TRIGGER set_itinerary_share_token_trigger
  BEFORE INSERT OR UPDATE ON public.itineraries
  FOR EACH ROW
  EXECUTE FUNCTION set_itinerary_share_token();
