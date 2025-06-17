
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Eye, Users } from "lucide-react";

const HiddenGems = () => {
  const hiddenGems = [
    {
      id: 1,
      name: "Mawlynnong Village",
      location: "Meghalaya",
      description: "Asia's cleanest village with living root bridges and pristine nature.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3",
      rating: 4.8,
      visitors: "< 1000/month",
      tips: "Best visited during October-March. Stay in local homestays."
    },
    {
      id: 2,
      name: "Ziro Valley",
      location: "Arunachal Pradesh",
      description: "UNESCO World Heritage site with unique Apatani culture and rice fields.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3",
      rating: 4.7,
      visitors: "< 500/month",
      tips: "Requires Inner Line Permit. Visit during Ziro Music Festival (September)."
    },
    {
      id: 3,
      name: "Khajjiar",
      location: "Himachal Pradesh",
      description: "Mini Switzerland of India with meadows surrounded by cedar forests.",
      image: "https://images.unsplash.com/photo-1486022993419-cead7e5bb0e6?ixlib=rb-4.0.3",
      rating: 4.6,
      visitors: "< 2000/month",
      tips: "Best for paragliding and horse riding. Avoid monsoon season."
    },
    {
      id: 4,
      name: "Chopta",
      location: "Uttarakhand",
      description: "Untouched hill station perfect for trekking and bird watching.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3",
      rating: 4.9,
      visitors: "< 800/month",
      tips: "Base camp for Tungnath trek. Carry warm clothes even in summer."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Hidden Gems</h2>
        <p className="text-muted-foreground">Discover untouched destinations away from crowds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {hiddenGems && hiddenGems.length > 0 ? (
          hiddenGems.map((gem) => (
            <Card key={gem.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="relative h-48">
                <img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3";
                  }}
                />
                <Badge className="absolute top-4 left-4 bg-green-600">
                  Hidden Gem
                </Badge>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{gem.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-bold text-lg">{gem.name}</h3>
                  <span className="text-muted-foreground">• {gem.location}</span>
                </div>
                
                <p className="text-muted-foreground mb-4">{gem.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>{gem.visitors}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Off the beaten path
                  </Badge>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Insider Tip:</h4>
                  <p className="text-xs text-muted-foreground">{gem.tips}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No hidden gems available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HiddenGems;
