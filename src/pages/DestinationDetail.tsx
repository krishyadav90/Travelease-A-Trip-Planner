
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DestinationHero from "@/components/destination/DestinationHero";
import DestinationInfoBar from "@/components/destination/DestinationInfoBar";
import DestinationContentTabs from "@/components/destination/DestinationContentTabs";
import DestinationSidebar from "@/components/destination/DestinationSidebar";
import { getAllFallbackDestinations } from "@/data/fallbackDestinations";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      if (!id) {
        setLoading(false);
        setError("No destination ID provided.");
        return;
      }

      setLoading(true);
      setError(null);
      setUsingFallback(false);

      try {
        console.log("Fetching destination with ID:", id);
        
        // First try to fetch from database
        const { data: destinationData, error: destinationError } = await supabase
          .from("destinations")
          .select("*, attractions(*)")
          .eq("id", id)
          .single();

        if (destinationData && !destinationError) {
          console.log("Found destination in database:", destinationData);
          setDestination(destinationData);
        } else {
          console.log("Destination not found in database, using fallback data");
          // Use fallback data if not found in database
          const fallbackDestinations = getAllFallbackDestinations();
          const fallbackDestination = fallbackDestinations[id as keyof typeof fallbackDestinations];
          
          if (fallbackDestination) {
            console.log("Using fallback destination:", fallbackDestination);
            setDestination(fallbackDestination);
            setUsingFallback(true);
          } else {
            throw new Error("Destination not found in database or fallback data.");
          }
        }

      } catch (err: any) {
        console.error("Error fetching destination details:", err);
        setError(err.message || "Failed to fetch destination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 md:h-96 bg-gray-300 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-48 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error ? "An Error Occurred" : "Destination Not Found"}</h1>
          <p className="text-muted-foreground">{error || "The destination you're looking for doesn't exist or could not be loaded."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-gray-100 dark:from-slate-900 dark:to-background pt-16">
      <DestinationHero destination={destination} />
      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        <DestinationInfoBar destination={destination} usingFallback={usingFallback} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8 xl:col-span-9">
            <DestinationContentTabs destination={destination} />
          </div>
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <DestinationSidebar destination={destination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
