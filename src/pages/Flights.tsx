import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plane, Clock, Wifi, Coffee, Users, Star, ChevronDown, ChevronUp, MapPin, Calendar, Search, ArrowRight } from "lucide-react";

const flightResults = [
  {
    id: 1,
    airline: "IndiGo",
    flightNumber: "6E 6147",
    departure: { time: "08:30", airport: "DEL", city: "Delhi" },
    arrival: { time: "11:15", airport: "BOM", city: "Mumbai" },
    duration: "2h 45m",
    price: 6500,
    stops: "Non-stop",
    amenities: ["wifi", "snacks"],
    class: "Economy",
    aircraft: "Airbus A320",
    onTimePerformance: 89,
    baggage: "15kg",
    seatPitch: "30 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 2,
    airline: "Air India",
    flightNumber: "AI 439",
    departure: { time: "14:20", airport: "BOM", city: "Mumbai" },
    arrival: { time: "17:35", airport: "BLR", city: "Bangalore" },
    duration: "1h 15m",
    price: 4800,
    stops: "Non-stop",
    amenities: ["meals", "entertainment"],
    class: "Economy",
    aircraft: "Boeing 737-800",
    onTimePerformance: 85,
    baggage: "20kg",
    seatPitch: "32 inches",
    cancellationPolicy: "Cancellation fee applies"
  },
  {
    id: 3,
    airline: "Vistara",
    flightNumber: "UK 881",
    departure: { time: "19:45", airport: "DEL", city: "Delhi" },
    arrival: { time: "22:30", airport: "MAA", city: "Chennai" },
    duration: "2h 45m",
    price: 8900,
    stops: "Non-stop",
    amenities: ["wifi", "meals", "entertainment"],
    class: "Premium Economy",
    aircraft: "Airbus A321",
    onTimePerformance: 92,
    baggage: "25kg",
    seatPitch: "34 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 4,
    airline: "SpiceJet",
    flightNumber: "SG 8194",
    departure: { time: "06:15", airport: "DEL", city: "Delhi" },
    arrival: { time: "08:30", airport: "GOI", city: "Goa" },
    duration: "2h 15m",
    price: 5200,
    stops: "Non-stop",
    amenities: ["snacks"],
    class: "Economy",
    aircraft: "Boeing 737-800",
    onTimePerformance: 84,
    baggage: "15kg",
    seatPitch: "29 inches",
    cancellationPolicy: "Cancellation fee applies"
  },
  {
    id: 5,
    airline: "IndiGo",
    flightNumber: "6E 2025",
    departure: { time: "10:30", airport: "BOM", city: "Mumbai" },
    arrival: { time: "13:15", airport: "CCU", city: "Kolkata" },
    duration: "2h 45m",
    price: 7200,
    stops: "Non-stop",
    amenities: ["wifi", "snacks"],
    class: "Economy",
    aircraft: "Airbus A320",
    onTimePerformance: 88,
    baggage: "15kg",
    seatPitch: "30 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 6,
    airline: "Jet Airways",
    flightNumber: "9W 322",
    departure: { time: "15:45", airport: "BLR", city: "Bangalore" },
    arrival: { time: "18:20", airport: "HYD", city: "Hyderabad" },
    duration: "1h 35m",
    price: 4500,
    stops: "Non-stop",
    amenities: ["meals", "entertainment"],
    class: "Economy",
    aircraft: "Boeing 737-800",
    onTimePerformance: 87,
    baggage: "20kg",
    seatPitch: "32 inches",
    cancellationPolicy: "Cancellation fee applies"
  },
  {
    id: 7,
    airline: "Vistara",
    flightNumber: "UK 995",
    departure: { time: "07:00", airport: "DEL", city: "Delhi" },
    arrival: { time: "09:45", airport: "AMD", city: "Ahmedabad" },
    duration: "1h 45m",
    price: 6800,
    stops: "Non-stop",
    amenities: ["wifi", "meals"],
    class: "Business",
    aircraft: "Airbus A320",
    onTimePerformance: 91,
    baggage: "30kg",
    seatPitch: "45 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 8,
    airline: "Air India Express",
    flightNumber: "IX 213",
    departure: { time: "12:20", airport: "COK", city: "Kochi" },
    arrival: { time: "14:35", airport: "DXB", city: "Dubai" },
    duration: "3h 15m",
    price: 12500,
    stops: "Non-stop",
    amenities: ["meals"],
    class: "Economy",
    aircraft: "Boeing 737-800",
    onTimePerformance: 83,
    baggage: "20kg",
    seatPitch: "31 inches",
    cancellationPolicy: "Cancellation fee applies"
  },
  {
    id: 9,
    airline: "IndiGo",
    flightNumber: "6E 1406",
    departure: { time: "16:30", airport: "BOM", city: "Mumbai" },
    arrival: { time: "18:15", airport: "PNQ", city: "Pune" },
    duration: "1h 45m",
    price: 3800,
    stops: "Non-stop",
    amenities: ["snacks"],
    class: "Economy",
    aircraft: "ATR 72",
    onTimePerformance: 86,
    baggage: "15kg",
    seatPitch: "29 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 10,
    airline: "GoAir",
    flightNumber: "G8 319",
    departure: { time: "09:45", airport: "DEL", city: "Delhi" },
    arrival: { time: "11:30", airport: "LKO", city: "Lucknow" },
    duration: "1h 45m",
    price: 4200,
    stops: "Non-stop",
    amenities: ["snacks"],
    class: "Economy",
    aircraft: "Airbus A320",
    onTimePerformance: 81,
    baggage: "15kg",
    seatPitch: "30 inches",
    cancellationPolicy: "Cancellation fee applies"
  },
  {
    id: 11,
    airline: "Vistara",
    flightNumber: "UK 707",
    departure: { time: "20:15", airport: "BLR", city: "Bangalore" },
    arrival: { time: "22:45", airport: "DEL", city: "Delhi" },
    duration: "2h 30m",
    price: 9200,
    stops: "Non-stop",
    amenities: ["wifi", "meals", "entertainment"],
    class: "Premium Economy",
    aircraft: "Boeing 787",
    onTimePerformance: 94,
    baggage: "25kg",
    seatPitch: "34 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 12,
    airline: "Air India",
    flightNumber: "AI 127",
    departure: { time: "11:30", airport: "BOM", city: "Mumbai" },
    arrival: { time: "16:45", airport: "LHR", city: "London" },
    duration: "9h 15m",
    price: 45000,
    stops: "Non-stop",
    amenities: ["wifi", "meals", "entertainment", "lounge"],
    class: "Business",
    aircraft: "Boeing 787-8",
    onTimePerformance: 88,
    baggage: "40kg",
    seatPitch: "78 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 13,
    airline: "Emirates",
    flightNumber: "EK 507",
    departure: { time: "02:45", airport: "DXB", city: "Dubai" },
    arrival: { time: "07:30", airport: "BOM", city: "Mumbai" },
    duration: "3h 15m",
    price: 18500,
    stops: "Non-stop",
    amenities: ["wifi", "meals", "entertainment", "lounge"],
    class: "Economy",
    aircraft: "Boeing 777",
    onTimePerformance: 93,
    baggage: "30kg",
    seatPitch: "32 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 14,
    airline: "IndiGo",
    flightNumber: "6E 5274",
    departure: { time: "18:20", airport: "MAA", city: "Chennai" },
    arrival: { time: "20:05", airport: "TRV", city: "Trivandrum" },
    duration: "1h 45m",
    price: 4800,
    stops: "Non-stop",
    amenities: ["snacks"],
    class: "Economy",
    aircraft: "Airbus A320",
    onTimePerformance: 89,
    baggage: "15kg",
    seatPitch: "30 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 15,
    airline: "Singapore Airlines",
    flightNumber: "SQ 406",
    departure: { time: "23:55", airport: "SIN", city: "Singapore" },
    arrival: { time: "01:15", airport: "BOM", city: "Mumbai" },
    duration: "4h 50m",
    price: 28500,
    stops: "Non-stop",
    amenities: ["wifi", "meals", "entertainment", "lounge"],
    class: "Business",
    aircraft: "Airbus A350",
    onTimePerformance: 96,
    baggage: "40kg",
    seatPitch: "78 inches",
    cancellationPolicy: "Free cancellation up to 24h before"
  }
];

const Flights = () => {
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: "1"
  });
  const [filters, setFilters] = useState({
    priceRange: "",
    airline: "",
    stops: "",
    departure: ""
  });
  const [filteredFlights, setFilteredFlights] = useState(flightResults);

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: "",
      airline: "",
      stops: "",
      departure: ""
    };
    setFilters(clearedFilters);
    setFilteredFlights(flightResults);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = flightResults;

    if (currentFilters.priceRange) {
      filtered = filtered.filter(flight => {
        if (currentFilters.priceRange === "3000-6000") return flight.price >= 3000 && flight.price <= 6000;
        if (currentFilters.priceRange === "6000-10000") return flight.price >= 6000 && flight.price <= 10000;
        if (currentFilters.priceRange === "10000-20000") return flight.price >= 10000 && flight.price <= 20000;
        if (currentFilters.priceRange === "20000+") return flight.price >= 20000;
        return true;
      });
    }

    if (currentFilters.airline) {
      filtered = filtered.filter(flight => flight.airline.toLowerCase().includes(currentFilters.airline.toLowerCase()));
    }

    if (currentFilters.stops) {
      filtered = filtered.filter(flight => flight.stops.toLowerCase() === currentFilters.stops.toLowerCase());
    }

    if (currentFilters.departure) {
      if (currentFilters.departure === "morning") {
        filtered = filtered.filter(flight => {
          const flightHour = parseInt(flight.departure.time.split(':')[0]);
          return flightHour >= 6 && flightHour < 12;
        });
      } else if (currentFilters.departure === "afternoon") {
        filtered = filtered.filter(flight => {
          const flightHour = parseInt(flight.departure.time.split(':')[0]);
          return flightHour >= 12 && flightHour < 18;
        });
      } else if (currentFilters.departure === "evening") {
        filtered = filtered.filter(flight => {
          const flightHour = parseInt(flight.departure.time.split(':')[0]);
          return flightHour >= 18 && flightHour < 24;
        });
      }
    }

    setFilteredFlights(filtered);
  };

  const handleSearch = () => {
    console.log("Searching flights with:", searchData);
    // Scroll to results section
    const resultsSection = document.getElementById('flight-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "meals":
      case "snacks":
        return <Coffee className="h-4 w-4" />;
      case "entertainment":
      case "lounge":
        return <Users className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  // Add this helper at the top level inside the component (not inside return)
  const getSkyscannerUrl = (flight: typeof flightResults[number]) => {
    // Extract search data (airports)
    const origin = flight.departure.airport || "";
    const destination = flight.arrival.airport || "";
    // Format departure date if provided by the user
    let depDate = searchData.departure;
    if (!depDate || depDate.length < 8) {
      depDate = ""; // If no date selected, Skyscanner will ignore "anytime"
    } else {
      // Skyscanner expects YYYY-MM-DD, already in correct format from input[type=date]
    }
    // Example: https://www.skyscanner.co.in/transport/flights/DEL/BOM/2024-06-30/
    let url = `https://www.skyscanner.co.in/transport/flights/${origin}/${destination}/`;
    if (depDate) url += `${depDate}/`;
    return url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the best flight deals and book your journey with confidence
            </p>
          </div>

          {/* Enhanced Flight Search Form inspired by reference image */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="glassmorphism-card p-8 rounded-3xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Delhi (DEL)"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                      className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Mumbai (BOM)"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                      className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      value={searchData.departure}
                      onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                      className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Select value={searchData.passengers} onValueChange={(value) => setSearchData({...searchData, passengers: value})}>
                      <SelectTrigger className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm">
                        <SelectValue placeholder="1 Passenger" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleSearch}
                  className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 font-semibold text-lg rounded-xl"
                >
                  <Search className="h-6 w-6 mr-3" />
                  Search Flights
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="glassmorphism-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-300 hover:text-white hover:bg-white/10">
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Price Range</label>
                  <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
                      <SelectValue placeholder="Select Price Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="3000-6000">₹3,000 - ₹6,000</SelectItem>
                      <SelectItem value="6000-10000">₹6,000 - ₹10,000</SelectItem>
                      <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                      <SelectItem value="20000+">₹20,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Airline</label>
                  <Select value={filters.airline} onValueChange={(value) => handleFilterChange('airline', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
                      <SelectValue placeholder="Select Airline" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="IndiGo">IndiGo</SelectItem>
                      <SelectItem value="Air India">Air India</SelectItem>
                      <SelectItem value="Vistara">Vistara</SelectItem>
                      <SelectItem value="SpiceJet">SpiceJet</SelectItem>
                      <SelectItem value="Emirates">Emirates</SelectItem>
                      <SelectItem value="Singapore Airlines">Singapore Airlines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Stops</label>
                  <Select value={filters.stops} onValueChange={(value) => handleFilterChange('stops', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
                      <SelectValue placeholder="Select Stops" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="non-stop">Non-stop</SelectItem>
                      <SelectItem value="1 stop">1 Stop</SelectItem>
                      <SelectItem value="2+ stops">2+ Stops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Departure Time</label>
                  <Select value={filters.departure} onValueChange={(value) => handleFilterChange('departure', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full glassmorphism-button border-white/20 text-white hover:bg-white/10 h-12"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div id="flight-results" className="lg:col-span-3 space-y-6">
            {filteredFlights.length === 0 ? (
              <div className="glassmorphism-card rounded-2xl p-12 text-center">
                <p className="text-gray-300 text-lg">No flights match your current filters.</p>
                <Button 
                  className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <Card key={flight.id} className="glassmorphism-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Plane className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{flight.airline}</h3>
                          <p className="text-sm text-gray-300">{flight.flightNumber} • {flight.aircraft}</p>
                        </div>
                      </div>
                      <Badge className="glassmorphism-badge border-0 text-white font-semibold">
                        {flight.onTimePerformance}% On Time
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{flight.departure.time}</div>
                        <div className="text-sm text-gray-300">{flight.departure.airport}</div>
                        <div className="text-xs text-gray-400">{flight.departure.city}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-300">{flight.duration}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="h-px bg-gray-600 flex-1"></div>
                          <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
                          <div className="h-px bg-gray-600 flex-1"></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">{flight.stops}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{flight.arrival.time}</div>
                        <div className="text-sm text-gray-300">{flight.arrival.airport}</div>
                        <div className="text-xs text-gray-400">{flight.arrival.city}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">₹{flight.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-300">{flight.class}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {flight.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-1 glassmorphism-badge px-3 py-1 rounded-full border-0">
                            {getAmenityIcon(amenity)}
                            <span className="text-xs text-white capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                          className="glassmorphism-button border-white/20 text-white hover:bg-white/10"
                        >
                          Details {expandedFlight === flight.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                        </Button>
                        <a
                          href={getSkyscannerUrl(flight)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 font-semibold px-4 py-2 rounded-md text-white text-sm flex items-center justify-center shadow transition-colors"
                          style={{ minWidth: 95 }}
                        >
                          Book Now
                        </a>
                      </div>
                    </div>

                    {expandedFlight === flight.id && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div>
                            <h4 className="font-semibold mb-3 text-white">Flight Details</h4>
                            <p className="text-gray-300">Baggage: {flight.baggage}</p>
                            <p className="text-gray-300">Seat Pitch: {flight.seatPitch}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-white">Policies</h4>
                            <p className="text-gray-300">{flight.cancellationPolicy}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-white">Performance</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-gray-300">{flight.onTimePerformance}% On-time rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
