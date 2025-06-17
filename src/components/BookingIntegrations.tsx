
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Train, Bus, Hotel, ExternalLink } from "lucide-react";

interface BookingIntegrationsProps {
  destination: string;
  coordinates?: { lat: number; lng: number };
}

const BookingIntegrations = ({ destination, coordinates }: BookingIntegrationsProps) => {
  const handleFlightBooking = () => {
    const url = `https://www.skyscanner.co.in/flights-to/${destination.toLowerCase().replace(/\s+/g, '-')}`;
    window.open(url, '_blank');
  };

  const handleTrainBooking = () => {
    window.open('https://www.irctc.co.in/', '_blank');
  };

  const handleBusBooking = () => {
    const url = `https://www.redbus.in/bus-tickets/${destination.toLowerCase().replace(/\s+/g, '-')}`;
    window.open(url, '_blank');
  };

  const handleHotelBooking = () => {
    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-gray-900">Book Your Trip</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleFlightBooking} className="w-full justify-between bg-gray-900 text-white hover:bg-gray-700">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            <span>Book Flights</span>
          </div>
          <ExternalLink className="h-4 w-4" />
        </Button>

        <Button onClick={handleTrainBooking} variant="outline" className="w-full justify-between border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900">
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4" />
            <span>Book Trains</span>
          </div>
          <ExternalLink className="h-4 w-4" />
        </Button>

        <Button onClick={handleBusBooking} variant="outline" className="w-full justify-between border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900">
          <div className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            <span>Book Bus</span>
          </div>
          <ExternalLink className="h-4 w-4" />
        </Button>

        <Button onClick={handleHotelBooking} variant="outline" className="w-full justify-between border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900">
          <div className="flex items-center gap-2">
            <Hotel className="h-4 w-4" />
            <span>Book Hotels</span>
          </div>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingIntegrations;
