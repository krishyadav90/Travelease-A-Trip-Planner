import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InteractiveMap from "@/components/InteractiveMap";
import PhotoGallery from "@/components/PhotoGallery";
import ReviewsSection from "@/components/ReviewsSection";
import TripCostEstimator from "@/components/TripCostEstimator";
import PackingChecklistGenerator from "@/components/PackingChecklistGenerator";
import { Star, DollarSign } from "lucide-react";

interface DestinationContentTabsProps {
  destination: any;
}

const DestinationContentTabs = ({ destination }: DestinationContentTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="attractions">Attractions</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="trip-tools">Trip Tools</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>About {destination.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{destination.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Best Time to Visit</h4>
                <div className="flex flex-wrap gap-2">
                  {destination.best_seasons?.map((season: string, index: number) => (
                    <Badge key={index} variant="outline">{season}</Badge>
                  )) || <p className="text-sm text-muted-foreground">N/A</p>}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Travel Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Cost:</span>
                    <span className="font-medium">₹{destination.average_cost?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety Rating:</span>
                    <span className="font-medium">{destination.safety_rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{destination.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <InteractiveMap 
            lat={destination.latitude}
            lng={destination.longitude}
          />
        </div>
      </TabsContent>

      <TabsContent value="attractions" className="mt-6">
        <div className="space-y-6">
          {destination.attractions?.length > 0 ? (
            destination.attractions.map((attraction: any) => (
              <Card key={attraction.id} className="overflow-hidden transition-all hover:shadow-lg dark:bg-card/50 flex flex-col md:flex-row">
                <div className="md:w-1/3 flex-shrink-0">
                  <img
                    src={attraction.image_url || 'https://images.unsplash.com/photo-1599557890665-950a31a99d26?w=500&q=80'}
                    alt={attraction.name}
                    className="h-48 w-full object-cover md:h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1599557890665-950a31a99d26?w=500&q=80";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-xl">{attraction.name}</h4>
                          <Badge variant="outline" className="flex-shrink-0">{attraction.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4 text-sm">{attraction.description}</p>
                        <div className="flex items-center gap-6 text-sm flex-wrap">
                          <div className="flex items-center gap-1.5 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold text-foreground">{attraction.rating || 'N/A'}</span>
                            <span className="text-muted-foreground font-normal">({attraction.review_count || 0} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-green-600">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-semibold text-foreground">{attraction.entry_fee || 'Free Entry'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-100 dark:bg-gray-800/30 rounded-lg">
              <p className="text-muted-foreground">No attractions found for this destination.</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="photos" className="mt-6">
        <PhotoGallery destinationId={destination.id} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewsSection destinationId={destination.id} />
      </TabsContent>

      <TabsContent value="trip-tools" className="mt-6">
        <div className="space-y-6">
          <TripCostEstimator />
          <PackingChecklistGenerator />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DestinationContentTabs;
