
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface DestinationHeroProps {
  destination: {
    name: string;
    country: string;
    image_url: string;
    category: string;
    safety_rating: number;
  };
}

const DestinationHero = ({ destination }: DestinationHeroProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <img
        src={destination.image_url || '/placeholder.svg'}
        alt={destination.name}
        className="w-full h-80 md:h-96 object-cover"
      />
      <div className="absolute inset-0 flex items-end z-10">
        <div className="container mx-auto px-4 pb-12 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-white/20 border-0 text-white backdrop-blur-sm">{destination.category}</Badge>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{destination.safety_rating}/5</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight drop-shadow-lg">{destination.name}</h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">{destination.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;
