
-- Create bookings table for storing flight, hotel, and holiday bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'holiday')),
  booking_data JSONB NOT NULL,
  booking_reference TEXT NOT NULL UNIQUE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  travel_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create destinations table for popular destinations
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('beach', 'mountain', 'city', 'cultural', 'adventure')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_preferences table for storing user travel preferences
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  preferred_destinations JSONB DEFAULT '[]',
  budget_range TEXT,
  travel_style TEXT,
  preferred_airlines JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for destinations (public read access)
CREATE POLICY "Anyone can view destinations" 
  ON public.destinations 
  FOR SELECT 
  USING (true);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
  ON public.user_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own preferences" 
  ON public.user_preferences 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
  ON public.user_preferences 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert sample destinations
INSERT INTO public.destinations (name, country, description, image_url, category, is_featured) VALUES
('Goa', 'India', 'Beautiful beaches and vibrant nightlife', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3', 'beach', true),
('Kerala', 'India', 'Backwaters and spice plantations', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3', 'cultural', true),
('Rajasthan', 'India', 'Royal palaces and desert landscapes', 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3', 'cultural', true),
('Himachal Pradesh', 'India', 'Mountain adventures and scenic valleys', 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3', 'mountain', true),
('Andaman Islands', 'India', 'Crystal clear waters and coral reefs', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3', 'beach', false),
('Mumbai', 'India', 'Financial capital with rich culture', 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3', 'city', false);

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TRV' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate booking reference
CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_reference_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_reference();
