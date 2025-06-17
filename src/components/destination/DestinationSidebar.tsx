
import WeatherWidget from "@/components/WeatherWidget";
import BookingIntegrations from "@/components/BookingIntegrations";

interface DestinationSidebarProps {
  destination: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
}

const DestinationSidebar = ({ destination }: DestinationSidebarProps) => {
  const coordinates = destination.latitude && destination.longitude 
    ? { lat: Number(destination.latitude), lng: Number(destination.longitude) } 
    : undefined;

  return (
    <div className="space-y-6">
      <WeatherWidget 
        destination={destination.name}
        coordinates={coordinates}
      />
      <BookingIntegrations 
        destination={destination.name}
        coordinates={coordinates}
      />
    </div>
  );
};

export default DestinationSidebar;
