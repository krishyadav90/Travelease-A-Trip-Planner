
CREATE TABLE public.saved_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_destination
        FOREIGN KEY(destination_id) 
        REFERENCES public.destinations(id)
        ON DELETE CASCADE,
    UNIQUE(user_id, destination_id)
);

ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved destinations."
ON public.saved_destinations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved destinations."
ON public.saved_destinations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved destinations."
ON public.saved_destinations FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
