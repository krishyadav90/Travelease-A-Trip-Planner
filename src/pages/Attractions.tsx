
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, DollarSign, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Attractions = () => {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Sample attractions data
  const sampleAttractions = [
    {
      id: "1",
      name: "Taj Mahal",
      description: "Iconic white marble mausoleum and UNESCO World Heritage Site",
      category: "historical",
      rating: 4.8,
      entry_fee: "₹750 for foreigners",
      latitude: 27.1751,
      longitude: 78.0421,
      image_url: "/placeholder.svg",
      destination: "Agra, India",
      opening_hours: "6:00 AM - 6:30 PM",
      best_time: "October to March"
    },
    {
      id: "2",
      name: "Red Fort",
      description: "Historic fortified palace and former imperial residence",
      category: "historical",
      rating: 4.5,
      entry_fee: "₹35 for Indians",
      latitude: 28.6562,
      longitude: 77.2410,
      image_url: "/placeholder.svg",
      destination: "Delhi, India",
      opening_hours: "9:30 AM - 4:30 PM",
      best_time: "October to March"
    },
    {
      id: "3",
      name: "Gateway of India",
      description: "Iconic arch monument overlooking the Arabian Sea",
      category: "historical",
      rating: 4.3,
      entry_fee: "Free",
      latitude: 18.9220,
      longitude: 72.8347,
      image_url: "/placeholder.svg",
      destination: "Mumbai, India",
      opening_hours: "24 hours",
      best_time: "November to February"
    },
    {
      id: "4",
      name: "Goa Beaches",
      description: "Beautiful tropical beaches with vibrant nightlife",
      category: "nature",
      rating: 4.6,
      entry_fee: "Free",
      latitude: 15.2993,
      longitude: 74.1240,
      image_url: "/placeholder.svg",
      destination: "Goa, India",
      opening_hours: "24 hours",
      best_time: "November to February"
    },
    {
      id: "5",
      name: "Mysore Palace",
      description: "Magnificent royal palace with stunning architecture",
      category: "historical",
      rating: 4.7,
      entry_fee: "₹70 for Indians",
      latitude: 12.3051,
      longitude: 76.6551,
      image_url: "/placeholder.svg",
      destination: "Mysore, India",
      opening_hours: "10:00 AM - 5:30 PM",
      best_time: "October to March"
    },
    {
      id: "6",
      name: "Valley of Flowers",
      description: "UNESCO World Heritage Site with endemic alpine flowers",
      category: "nature",
      rating: 4.8,
      entry_fee: "₹150 for Indians",
      latitude: 30.7268,
      longitude: 79.6006,
      image_url: "/placeholder.svg",
      destination: "Uttarakhand, India",
      opening_hours: "June to September",
      best_time: "July to August"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAttractions(sampleAttractions);
      setFilteredAttractions(sampleAttractions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = attractions;

    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(attraction => attraction.category === categoryFilter);
    }

    setFilteredAttractions(filtered);
  }, [searchTerm, categoryFilter, attractions]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "historical": return "bg-amber-100 text-amber-800";
      case "nature": return "bg-green-100 text-green-800";
      case "adventure": return "bg-red-100 text-red-800";
      case "cultural": return "bg-purple-100 text-purple-800";
      case "religious": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Top Attractions</h1>
        <p className="text-muted-foreground">Discover amazing places and experiences across India</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search attractions or destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="historical">Historical</SelectItem>
            <SelectItem value="nature">Nature</SelectItem>
            <SelectItem value="adventure">Adventure</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="religious">Religious</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Attractions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attraction) => (
            <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={attraction.image_url}
                  alt={attraction.name}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${getCategoryColor(attraction.category)}`}
                >
                  {attraction.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {attraction.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{attraction.destination}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{attraction.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{attraction.entry_fee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{attraction.opening_hours}</span>
                </div>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to={`/destination/${attraction.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`, '_blank')}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredAttractions.length === 0 && !loading && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No attractions found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Attractions;
