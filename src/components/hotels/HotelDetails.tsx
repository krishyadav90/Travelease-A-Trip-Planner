
import { Clock, Phone, Mail, Globe, Star } from "lucide-react";

interface Props {
  hotel: any;
}

export default function HotelDetails({ hotel }: Props) {
  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-white">Hotel Information</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p className="mb-3">{hotel.description}</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-cyan-400" />
              <span><strong>Check-in:</strong> {hotel.checkIn} | <strong>Check-out:</strong> {hotel.checkOut}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-cyan-400" />
              <span><strong>Phone:</strong> {hotel.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-cyan-400" />
              <span><strong>Email:</strong> {hotel.email}</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-cyan-400" />
              <span><strong>Website:</strong> {hotel.website}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
              <span><strong>Rating:</strong> {hotel.starRating}-Star Hotel</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white">Policies & Services</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-white/5 rounded-lg p-3">
              <p><strong className="text-cyan-400">Cancellation Policy:</strong></p>
              <p>{hotel.cancellation}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p><strong className="text-cyan-400">Breakfast:</strong></p>
              <p>{hotel.breakfast}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p><strong className="text-cyan-400">All Amenities:</strong></p>
              <div className="flex flex-wrap gap-1 mt-1">
                {hotel.amenities.map((amenity: string, index: number) => (
                  <span key={index} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Photo Gallery */}
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-white">Photo Gallery</h4>
        {/* HotelPhotoGallery will be rendered at the parent */}
      </div>

      {/* Additional Hotel Features */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg">
        <h4 className="font-semibold mb-2 text-white">Why Choose This Hotel?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
            <span>Premium location in city center</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
            <span>24/7 customer service</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
            <span>Luxury amenities included</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
            <span>Highly rated by guests</span>
          </div>
        </div>
      </div>
    </div>
  );
}
