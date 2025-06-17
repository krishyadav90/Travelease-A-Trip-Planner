
import { Wifi, Car, Coffee, Dumbbell, Users } from "lucide-react";

export const AmenityIcon = ({ amenity }: { amenity: string }) => {
  switch (amenity) {
    case "wifi":
      return <Wifi className="h-4 w-4" />;
    case "parking":
    case "valet parking":
      return <Car className="h-4 w-4" />;
    case "pool":
    case "infinity pool":
      return <Coffee className="h-4 w-4" />;
    case "restaurant":
    case "meals":
      return <Coffee className="h-4 w-4" />;
    case "gym":
      return <Dumbbell className="h-4 w-4" />;
    case "spa":
      return <Users className="h-4 w-4" />;
    default:
      return <Coffee className="h-4 w-4" />;
  }
};
