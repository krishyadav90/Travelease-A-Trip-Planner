
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Calendar, Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
    temperature: "24°C",
    bestTime: "Apr - Oct",
    packages: 12,
    description: "Whitewashed buildings and crystal blue waters"
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    temperature: "18°C",
    bestTime: "Mar - May",
    packages: 8,
    description: "Ancient temples and cherry blossoms"
  },
  {
    id: 3,
    name: "Banff",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    temperature: "12°C",
    bestTime: "Jun - Sep",
    packages: 6,
    description: "Majestic mountains and pristine lakes"
  },
  {
    id: 4,
    name: "Bora Bora",
    country: "French Polynesia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    temperature: "28°C",
    bestTime: "May - Oct",
    packages: 10,
    description: "Overwater bungalows and turquoise lagoons"
  }
];

const HolidayDestinations = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 bg-clip-text text-transparent mb-4">
            Trending Destinations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the world's most sought-after destinations this season
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                index === 0 ? 'md:col-span-2 md:h-96' : 'h-80'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.country}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {destination.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-lg max-w-md">
                    {destination.description}
                  </p>

                  {/* Info Row */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-cyan-300">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-sm">{destination.temperature}</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-300">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{destination.bestTime}</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                      {destination.packages} packages
                    </Badge>
                  </div>

                  {/* Explore Popover Button */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-fit bg-gradient-to-r from-purple-500 via-pink-500 to-red-600 hover:from-purple-600 hover:via-pink-600 hover:to-red-700 text-white border-0 mt-4 flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        Explore {destination.name}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="bg-slate-900 border border-purple-400/30 rounded-md shadow-xl max-w-xs">
                      <h4 className="text-lg font-semibold mb-2 text-pink-400">{destination.name}</h4>
                      <p className="text-gray-200 mb-1"><MapPin className="inline w-4 h-4 mr-1" /> {destination.country}</p>
                      <p className="text-gray-300 mb-2">{destination.temperature} • Best: {destination.bestTime}</p>
                      <div className="mb-2">
                        <span className="text-gray-400">{destination.description}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                          {destination.packages} Packages
                        </Badge>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolidayDestinations;

