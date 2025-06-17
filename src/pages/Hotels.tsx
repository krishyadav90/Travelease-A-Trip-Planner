import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell, Users, Calendar, Search, ChevronDown, ChevronUp, Clock, Phone, Mail, Globe } from "lucide-react";
import hotelResults from "@/components/hotels/HotelData";
import HotelFilters from "@/components/hotels/HotelFilters";
import HotelCard from "@/components/hotels/HotelCard";
import HotelSearchBar from "@/components/hotels/HotelSearchBar";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotelResults);
  const [expandedHotel, setExpandedHotel] = useState<number | null>(null);
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    travelers: "2"
  });

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedPriceRange, selectedRating]);

  const handleSearch = () => {
    applyFilters();
    // Scroll to results section
    const resultsSection = document.getElementById('hotel-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const applyFilters = () => {
    let filtered = hotelResults;
    // Search filter
    if (searchTerm || searchData.destination) {
      const query = searchTerm || searchData.destination;
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter((hotel) => {
        if (selectedPriceRange === "budget") return hotel.price < 10000;
        if (selectedPriceRange === "mid") return hotel.price >= 10000 && hotel.price <= 20000;
        if (selectedPriceRange === "luxury") return hotel.price > 20000;
        return true;
      });
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter((hotel) => hotel.rating >= parseInt(selectedRating));
    }

    setFilteredHotels(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPriceRange("");
    setSelectedRating("");
    setSearchData({
      destination: "",
      checkIn: "",
      checkOut: "",
      travelers: "2"
    });
    setFilteredHotels(hotelResults);
  };

  const getAmenityIcon = (amenity: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Luxury Hotels & Resorts
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover premium accommodations and create unforgettable stays
            </p>
          </div>

          <HotelSearchBar searchData={searchData} setSearchData={setSearchData} handleSearch={handleSearch} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <HotelFilters
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              clearFilters={clearFilters}
            />
          </div>
          {/* Hotel Results */}
          <div id="hotel-results" className="lg:col-span-3 space-y-6">
            {filteredHotels.length === 0 ? (
              <div className="glassmorphism-card rounded-2xl p-12 text-center">
                <p className="text-gray-300 text-lg">No hotels match your current filters.</p>
                <Button 
                  className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  expandedHotel={expandedHotel}
                  setExpandedHotel={setExpandedHotel}
                  searchData={searchData}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
