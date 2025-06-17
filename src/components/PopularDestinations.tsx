
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { getAllFallbackDestinations } from "@/data/fallbackDestinations";

interface Destination {
  id: string;
  name: string;
  country: string;
  image_url: string;
  description: string;
  category: string;
  average_cost: number;
  safety_rating: number;
  best_seasons: string[];
  is_featured: boolean;
}

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setError(null);
      console.log("Fetching destinations from database...");
      
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('is_featured', true)
        .limit(12);

      if (error) {
        console.error('Error fetching destinations from database:', error);
      }

      // Get fallback destinations to ensure we have content
      const fallbackDestinations = getAllFallbackDestinations();
      const fallbackDestinationsList = Object.values(fallbackDestinations).slice(0, 12);
      
      // Use database data if available, otherwise use fallback
      let destinationsToShow = [];
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Using database destinations:", data.length);
        destinationsToShow = data.map(dest => ({
          ...dest,
          is_featured: true
        }));
      } else {
        console.log("Using fallback destinations:", fallbackDestinationsList.length);
        destinationsToShow = fallbackDestinationsList.map(dest => ({
          ...dest,
          is_featured: true
        }));
      }
      
      setDestinations(destinationsToShow);
    } catch (error) {
      console.error('Error in fetchDestinations:', error);
      setError('Failed to load destinations');
      
      // Use fallback destinations on error
      const fallbackDestinations = getAllFallbackDestinations();
      const fallbackDestinationsList = Object.values(fallbackDestinations).slice(0, 12);
      setDestinations(fallbackDestinationsList.map(dest => ({
        ...dest,
        is_featured: true
      })));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after travel destinations in India, handpicked for unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations && destinations.length > 0 ? (
            destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={destination.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3"}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {destination.category || "Destination"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{destination.safety_rating || 4}.0</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.description || "Discover this amazing destination"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Best: {destination.best_seasons && destination.best_seasons.length > 0 ? destination.best_seasons[0] : "Year-round"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary">
                        ₹{(destination.average_cost || 10000).toLocaleString()}
                      </span>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                  </div>

                  <Link to={`/destination/${destination.id}`}>
                    <Button className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No destinations available at the moment.</p>
              <Button className="mt-4" onClick={() => fetchDestinations()}>
                Reload Destinations
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link to="/holidays">
            <Button size="lg">
              View All Holiday Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
