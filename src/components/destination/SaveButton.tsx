
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SaveButtonProps {
  destinationId: string;
}

const SaveButton = ({ destinationId }: SaveButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_destinations' as any)
          .select('id')
          .eq('user_id', user.id)
          .eq('destination_id', destinationId)
          .maybeSingle();
        
        if (error) throw error;

        setIsSaved(!!data);
      } catch (error: any) {
        console.error("Error checking saved status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if(destinationId) {
        checkSavedStatus();
    } else {
        setIsLoading(false);
    }
  }, [user, destinationId]);

  const toggleSave = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save destinations.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_destinations' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('destination_id', destinationId);
        
        if (error) throw error;
        
        setIsSaved(false);
        toast({ title: "Removed from saved" });
      } else {
        const { error } = await supabase
          .from('saved_destinations' as any)
          .insert({ user_id: user.id, destination_id: destinationId });

        if (error) throw error;
        
        setIsSaved(true);
        toast({ title: "Saved to your profile!" });
      }
    } catch (error: any) {
      console.error("Error toggling save:", error);
      toast({
        title: "Something went wrong",
        description: "Could not update your saved destinations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={toggleSave}
      disabled={isLoading || isSubmitting}
      className="flex items-center gap-2"
    >
      <Heart className={cn("h-4 w-4 transition-colors", isSaved && "fill-red-500 text-red-500")} />
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </Button>
  );
};

export default SaveButton;
