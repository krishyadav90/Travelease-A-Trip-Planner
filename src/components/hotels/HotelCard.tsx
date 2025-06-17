
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmenityIcon } from "./AmenityIcon";
import HotelDetails from "./HotelDetails";
import HotelPhotoGallery from "./HotelPhotoGallery";
import React from "react";

interface Props {
  hotel: any;
  expandedHotel: number | null;
  setExpandedHotel: (id: number | null) => void;
  searchData?: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    travelers?: string;
  }
}

// Helper function to generate Booking.com URL for the hotel
function getBookingComUrl(hotel: any, searchData?: Props['searchData']) {
  // Prefer searchData's destination if available, else hotel.location or hotel.name
  const dest = (searchData?.destination && searchData.destination.trim())
    ? searchData.destination
    : (hotel.location ? hotel.location : hotel.name);

  // Fallback: Try to make query specific by adding hotel name too
  const query = encodeURIComponent(`${hotel.name}, ${dest}`);

  // Booking.com params
  const params: Record<string, string> = {
    ss: `${hotel.name}, ${dest}`,
    dest_type: "city",
    group_adults: searchData?.travelers || "2",
    // The checkin/checkout fields must be yyyy-mm-dd (already in that format in the hotel search bar)
  };
  if (searchData?.checkIn) {
    params['checkin'] = searchData.checkIn; // format: yyyy-mm-dd
  }
  if (searchData?.checkOut) {
    params['checkout'] = searchData.checkOut;
  }

  // Compose url
  const searchParams = new URLSearchParams(params).toString();
  const url = `https://www.booking.com/searchresults.html?${searchParams}`;
  return url;
}

export default function HotelCard({ hotel, expandedHotel, setExpandedHotel, searchData }: Props) {
  return (
    <Card className="glassmorphism-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="relative h-64 md:h-auto">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="glassmorphism-badge border-0 text-white font-semibold">
              {hotel.discount ? `${hotel.discount}% OFF` : null}
            </Badge>
          </div>
        </div>

        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{hotel.name}</h3>
              <div className="flex items-center text-gray-300 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{hotel.location}</span>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-300">({hotel.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</div>
              <div className="text-sm text-gray-300">per night</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.slice(0, 6).map((amenity: string) => (
              <div key={amenity} className="flex items-center gap-1 glassmorphism-badge px-3 py-1 rounded-full border-0">
                <AmenityIcon amenity={amenity} />
                <span className="text-xs text-white capitalize">{amenity}</span>
              </div>
            ))}
            {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.length > 6 && (
              <div className="glassmorphism-badge px-3 py-1 rounded-full border-0">
                <span className="text-xs text-white">+{hotel.amenities.length - 6} more</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <a
              href={getBookingComUrl(hotel, searchData)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 font-semibold">
                Book Now
              </Button>
            </a>
            <Button
              variant="outline"
              className="glassmorphism-button border-white/20 text-white hover:bg-white/10"
              onClick={() => setExpandedHotel(expandedHotel === hotel.id ? null : hotel.id)}
            >
              View Details {expandedHotel === hotel.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </Button>
          </div>
          {/* Detailed Hotel Information */}
          {expandedHotel === hotel.id && (
            <>
              <HotelDetails hotel={hotel} />
              <HotelPhotoGallery gallery={hotel.gallery} hotelName={hotel.name} />
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
