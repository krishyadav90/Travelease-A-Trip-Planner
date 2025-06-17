import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MapPin } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react";

// Booking.com favicon for button icon
const bookingLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7e/Booking_logo_2018.svg";

const packages = [
  {
    id: 1,
    title: "Maldives Paradise",
    location: "Maldives",
    duration: "7 Days, 6 Nights",
    price: "₹1,25,000",
    originalPrice: "₹1,50,000",
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&h=300&fit=crop",
    features: ["Water Villa", "All Inclusive", "Spa", "Water Sports"],
    group: "2-4 People"
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "10 Days, 9 Nights",
    price: "₹2,15,000",
    originalPrice: "₹2,45,000",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    features: ["Mountain Resort", "Skiing", "Cable Car", "Alpine Views"],
    group: "2-6 People"
  },
  {
    id: 3,
    title: "Bali Cultural Journey",
    location: "Indonesia",
    duration: "8 Days, 7 Nights",
    price: "₹85,000",
    originalPrice: "₹1,10,000",
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop",
    features: ["Temple Tours", "Rice Terraces", "Beach Resort", "Cultural Shows"],
    group: "2-8 People"
  },
  {
    id: 4,
    title: "Rajasthan Royal Heritage",
    location: "India",
    duration: "9 Days, 8 Nights",
    price: "₹75,000",
    originalPrice: "₹95,000",
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&h=300&fit=crop",
    features: ["Palace Hotels", "Desert Safari", "Cultural Tours", "Camel Rides"],
    group: "2-6 People"
  },
  {
    id: 5,
    title: "Kerala Backwaters",
    location: "India",
    duration: "6 Days, 5 Nights",
    price: "₹45,000",
    originalPrice: "₹55,000",
    rating: 4.6,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop",
    features: ["Houseboat", "Ayurveda Spa", "Tea Gardens", "Wildlife"],
    group: "2-6 People"
  },
  {
    id: 6,
    title: "Goa Beach Paradise",
    location: "India",
    duration: "5 Days, 4 Nights",
    price: "₹35,000",
    originalPrice: "₹45,000",
    rating: 4.5,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop",
    features: ["Beach Resort", "Water Sports", "Nightlife", "Portuguese Heritage"],
    group: "2-8 People"
  },
  {
    id: 7,
    title: "Himachal Hill Stations",
    location: "India",
    duration: "7 Days, 6 Nights",
    price: "₹55,000",
    originalPrice: "₹70,000",
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    features: ["Mountain Views", "Adventure Sports", "Apple Orchards", "Colonial Architecture"],
    group: "2-6 People"
  },
  {
    id: 8,
    title: "Golden Triangle Tour",
    location: "India",
    duration: "8 Days, 7 Nights",
    price: "₹65,000",
    originalPrice: "₹85,000",
    rating: 4.8,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop",
    features: ["Taj Mahal", "Red Fort", "Amber Palace", "Cultural Heritage"],
    group: "2-8 People"
  },
  {
    id: 9,
    title: "Japan Cherry Blossom",
    location: "Japan",
    duration: "12 Days, 11 Nights",
    price: "₹2,85,000",
    originalPrice: "₹3,25,000",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop",
    features: ["Cherry Blossoms", "Traditional Ryokan", "Temple Tours", "Bullet Train"],
    group: "2-4 People"
  }
];

const getBookingComUrl = (location: string) => {
  // Booking.com search URL for given city/country
  // Example: https://www.booking.com/searchresults.html?ss=Switzerland
  // Spaces encoded as +
  const query = encodeURIComponent(location);
  return `https://www.booking.com/searchresults.html?ss=${query}`;
};

const HolidayPackages = () => {
  return (
    <div id="featured-packages" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Holiday Packages
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handpicked destinations with exclusive deals and unforgettable experiences
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="group bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                    Best Seller
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs">{pkg.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{pkg.group}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="border-cyan-400/50 text-cyan-300 text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {pkg.features.length > 3 && (
                      <Badge variant="outline" className="border-gray-500 text-gray-400 text-xs">
                        +{pkg.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{pkg.price}</span>
                        <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      {/* Explore Popover Button */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 flex items-center gap-1"
                            size="sm"
                            aria-label={`Explore ${pkg.title}`}
                          >
                            <Info className="w-4 h-4" />
                            Explore
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="bg-slate-900 border border-cyan-500/20 rounded-md shadow-xl max-w-xs">
                          <h4 className="text-lg font-semibold mb-2 text-cyan-400">{pkg.title}</h4>
                          <p className="text-gray-200 mb-1"><MapPin className="inline w-4 h-4 mr-1" /> {pkg.location}</p>
                          <p className="text-gray-300 mb-2">{pkg.duration} • {pkg.group}</p>
                          <ul className="list-disc ml-5 text-gray-400 text-sm mb-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">{pkg.price}</span>
                            <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                      {/* Book Now Button */}
                      <a
                        href={getBookingComUrl(pkg.location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={0}
                        aria-label={`Book ${pkg.title} on Booking.com`}
                        className="focus:outline-none"
                      >
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 flex items-center gap-2">
                          Book Now
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-cyan-300 hover:bg-cyan-100 hover:text-cyan-500 border-0 shadow-lg transition-all duration-300 font-semibold text-xl"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HolidayPackages;
