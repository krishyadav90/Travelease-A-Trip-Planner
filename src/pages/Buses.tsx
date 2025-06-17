
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bus, Clock, Star, ChevronDown, ChevronUp, MapPin, Calendar, Search, ArrowRight, AirVent, Zap, BedDouble } from "lucide-react";
import { format } from "date-fns";

const busResults = [
  { id: 1, operator: "VRL Travels", busType: "AC Sleeper (2+1)", departure: { time: "20:30", city: "Bangalore" }, arrival: { time: "06:15", city: "Hyderabad" }, duration: "9h 45m", price: 1200, rating: 4.5, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 15, },
  { id: 2, operator: "KSRTC", busType: "Non-AC Seater (2+2)", departure: { time: "22:00", city: "Chennai" }, arrival: { time: "05:30", city: "Bangalore" }, duration: "7h 30m", price: 650, rating: 4.2, amenities: ["Charging Point"], seatsAvailable: 25, },
  { id: 3, operator: "Orange Tours", busType: "AC Seater (2+2)", departure: { time: "21:00", city: "Mumbai" }, arrival: { time: "07:00", city: "Pune" }, duration: "10h 00m", price: 800, rating: 4.7, amenities: ["AC", "Charging Point"], seatsAvailable: 10, },
  { id: 4, operator: "SRS Travels", busType: "Non-AC Sleeper (2+1)", departure: { time: "19:45", city: "Hyderabad" }, arrival: { time: "07:30", city: "Bangalore" }, duration: "11h 45m", price: 950, rating: 4.1, amenities: ["Blanket"], seatsAvailable: 18, },
  { id: 5, operator: "RedBus", busType: "Volvo Multi-Axle AC", departure: { time: "22:30", city: "Delhi" }, arrival: { time: "05:00", city: "Jaipur" }, duration: "6h 30m", price: 700, rating: 4.6, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 22, },
  { id: 6, operator: "Neeta Travels", busType: "Volvo AC-Sleeper (2+1)", departure: { time: "21:30", city: "Pune" }, arrival: { time: "05:45", city: "Mumbai" }, duration: "8h 15m", price: 900, rating: 4.4, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 12, },
  { id: 7, operator: "Zingbus", busType: "AC Seater (2+2)", departure: { time: "23:00", city: "Jaipur" }, arrival: { time: "04:30", city: "Delhi" }, duration: "5h 30m", price: 550, rating: 4.8, amenities: ["AC", "Charging Point"], seatsAvailable: 30, },
  { id: 8, operator: "IntrCity SmartBus", busType: "AC Sleeper (2+1)", departure: { time: "20:00", city: "Lucknow" }, arrival: { time: "06:00", city: "Delhi" }, duration: "10h 00m", price: 1300, rating: 4.6, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 9, },
  { id: 9, operator: "Parveen Travels", busType: "AC Sleeper (2+1)", departure: { time: "21:00", city: "Chennai" }, arrival: { time: "05:00", city: "Coimbatore" }, duration: "8h 00m", price: 1100, rating: 4.3, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 14 },
  { id: 10, operator: "GSRTC", busType: "Volvo AC Seater (2+2)", departure: { time: "22:30", city: "Ahmedabad" }, arrival: { time: "06:00", city: "Surat" }, duration: "7h 30m", price: 600, rating: 4.0, amenities: ["AC", "Charging Point"], seatsAvailable: 35 },
  { id: 11, operator: "Hans Travels", busType: "AC Sleeper (2+1)", departure: { time: "19:00", city: "Indore" }, arrival: { time: "07:00", city: "Pune" }, duration: "12h 00m", price: 1500, rating: 4.2, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 11 },
  { id: 12, operator: "Shrinath Travel Agency", busType: "Non-AC Sleeper (2+1)", departure: { time: "20:00", city: "Udaipur" }, arrival: { time: "06:00", city: "Jaipur" }, duration: "10h 00m", price: 750, rating: 3.9, amenities: ["Blanket"], seatsAvailable: 20 },
  { id: 13, operator: "Paulo Travels", busType: "AC Seater/Sleeper", departure: { time: "20:30", city: "Goa" }, arrival: { time: "06:30", city: "Mumbai" }, duration: "10h 00m", price: 1400, rating: 4.5, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 16 },
  { id: 14, operator: "Saini Travels", busType: "AC Seater (2+2)", departure: { time: "07:00", city: "Chandigarh" }, arrival: { time: "12:00", city: "Delhi" }, duration: "5h 00m", price: 600, rating: 4.6, amenities: ["AC", "Charging Point"], seatsAvailable: 28 },
  { id: 15, operator: "Yamani Travels", busType: "AC Sleeper (2+1)", departure: { time: "21:45", city: "Vijayawada" }, arrival: { time: "05:30", city: "Hyderabad" }, duration: "7h 45m", price: 1000, rating: 4.4, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 13 },
  { id: 16, operator: "APSRTC", busType: "Super Luxury (Non-AC)", departure: { time: "22:15", city: "Visakhapatnam" }, arrival: { time: "08:15", city: "Hyderabad" }, duration: "10h 00m", price: 850, rating: 4.1, amenities: ["Charging Point"], seatsAvailable: 24 },
  { id: 17, operator: "Kavery Travels", busType: "Volvo Multi-Axle Sleeper", departure: { time: "21:30", city: "Bangalore" }, arrival: { time: "05:30", city: "Mangalore" }, duration: "8h 00m", price: 1350, rating: 4.7, amenities: ["AC", "Charging Point", "Blanket"], seatsAvailable: 10 },
  { id: 18, operator: "Konduskar Travels", busType: "AC Seater (2+2)", departure: { time: "14:00", city: "Kolhapur" }, arrival: { time: "20:00", city: "Pune" }, duration: "6h 00m", price: 500, rating: 4.3, amenities: ["AC", "Charging Point"], seatsAvailable: 32 }
];

const Buses = () => {
  const [expandedBus, setExpandedBus] = useState<number | null>(null);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: format(new Date(), "yyyy-MM-dd"),
  });
  const [filters, setFilters] = useState({
    priceRange: "",
    busOperator: "",
    busType: "",
    departureTime: ""
  });
  const [filteredBuses, setFilteredBuses] = useState(busResults);

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const clearFilters = () => {
    const clearedFilters = { priceRange: "", busOperator: "", busType: "", departureTime: "" };
    setFilters(clearedFilters);
    setFilteredBuses(busResults);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = busResults;
    if (currentFilters.priceRange) {
      filtered = filtered.filter(bus => {
        if (currentFilters.priceRange === "500-1000") return bus.price >= 500 && bus.price <= 1000;
        if (currentFilters.priceRange === "1000-1500") return bus.price >= 1000 && bus.price <= 1500;
        if (currentFilters.priceRange === "1500+") return bus.price >= 1500;
        return true;
      });
    }
    if (currentFilters.busOperator) {
      filtered = filtered.filter(bus => bus.operator === currentFilters.busOperator);
    }
    if (currentFilters.busType) {
      filtered = filtered.filter(bus => bus.busType.toLowerCase().includes(currentFilters.busType.toLowerCase()));
    }
    if (currentFilters.departureTime) {
      if (currentFilters.departureTime === "morning") {
        filtered = filtered.filter(bus => parseInt(bus.departure.time.split(':')[0]) >= 6 && parseInt(bus.departure.time.split(':')[0]) < 12);
      } else if (currentFilters.departureTime === "afternoon") {
        filtered = filtered.filter(bus => parseInt(bus.departure.time.split(':')[0]) >= 12 && parseInt(bus.departure.time.split(':')[0]) < 18);
      } else if (currentFilters.departureTime === "evening") {
        filtered = filtered.filter(bus => parseInt(bus.departure.time.split(':')[0]) >= 18 || parseInt(bus.departure.time.split(':')[0]) < 6);
      }
    }
    setFilteredBuses(filtered);
  };

  const handleSearch = () => {
    const resultsSection = document.getElementById('bus-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "AC": return <AirVent className="h-4 w-4" />;
      case "Charging Point": return <Zap className="h-4 w-4" />;
      case "Blanket": return <BedDouble className="h-4 w-4" />;
      default: return null;
    }
  };

  const getRedbusUrl = (from: string, to: string, date: string) => {
    if (from && to && date) {
        const fromCity = from.toLowerCase().replace(/\s+/g, "-");
        const toCity = to.toLowerCase().replace(/\s+/g, "-");
        try {
            const formattedDate = format(new Date(date), "d-MMM-yyyy");
            return `https://www.redbus.in/bus-tickets/${fromCity}-to-${toCity}?doj=${formattedDate}`;
        } catch (e) {
            console.error("Invalid date for Redbus URL:", e);
            return "https://www.redbus.in/";
        }
    }
    return "https://www.redbus.in/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Book Your Bus Journey
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find the best bus deals and travel across India with ease.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="glassmorphism-card p-8 rounded-3xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="e.g. Bangalore" value={searchData.from} onChange={(e) => setSearchData({...searchData, from: e.target.value})} className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="e.g. Hyderabad" value={searchData.to} onChange={(e) => setSearchData({...searchData, to: e.target.value})} className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">Date of Journey</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input type="date" value={searchData.departure} onChange={(e) => setSearchData({...searchData, departure: e.target.value})} className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleSearch} className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 font-semibold text-lg rounded-xl">
                  <Search className="h-6 w-6 mr-3" />
                  Search Buses
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
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-300 hover:text-white hover:bg-white/10">Clear All</Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Price Range</label>
                  <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Price" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                      <SelectItem value="1000-1500">₹1,000 - ₹1,500</SelectItem>
                      <SelectItem value="1500+">₹1,500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Bus Operator</label>
                  <Select value={filters.busOperator} onValueChange={(value) => handleFilterChange('busOperator', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Operator" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="VRL Travels">VRL Travels</SelectItem>
                      <SelectItem value="KSRTC">KSRTC</SelectItem>
                      <SelectItem value="Orange Tours">Orange Tours</SelectItem>
                      <SelectItem value="SRS Travels">SRS Travels</SelectItem>
                      <SelectItem value="RedBus">RedBus</SelectItem>
                      <SelectItem value="Neeta Travels">Neeta Travels</SelectItem>
                      <SelectItem value="Zingbus">Zingbus</SelectItem>
                      <SelectItem value="IntrCity SmartBus">IntrCity SmartBus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Bus Type</label>
                  <Select value={filters.busType} onValueChange={(value) => handleFilterChange('busType', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="Non-AC">Non-AC</SelectItem>
                      <SelectItem value="Sleeper">Sleeper</SelectItem>
                      <SelectItem value="Seater">Seater</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Departure Time</label>
                  <Select value={filters.departureTime} onValueChange={(value) => handleFilterChange('departureTime', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Time" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM-6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Results */}
          <div id="bus-results" className="lg:col-span-3 space-y-6">
            {filteredBuses.length === 0 ? (
              <div className="glassmorphism-card rounded-2xl p-12 text-center">
                <p className="text-gray-300 text-lg">No buses match your current filters.</p>
                <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              filteredBuses.map((bus) => (
                <Card key={bus.id} className="glassmorphism-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{bus.operator}</h3>
                          <p className="text-sm text-gray-300">{bus.busType}</p>
                        </div>
                      </div>
                      <Badge className="glassmorphism-badge border-0 text-white font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {bus.rating}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{bus.departure.time}</div>
                        <div className="text-xs text-gray-400">{bus.departure.city}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2"><Clock className="h-4 w-4 mr-2 text-gray-400" /><span className="text-sm text-gray-300">{bus.duration}</span></div>
                        <div className="flex items-center justify-center"><div className="h-px bg-gray-600 flex-1"></div><ArrowRight className="h-4 w-4 mx-2 text-gray-400" /><div className="h-px bg-gray-600 flex-1"></div></div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{bus.arrival.time}</div>
                        <div className="text-xs text-gray-400">{bus.arrival.city}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">₹{bus.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-300">per seat</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {bus.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-1 glassmorphism-badge px-3 py-1 rounded-full border-0">
                            {getAmenityIcon(amenity)}
                            <span className="text-xs text-white capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => setExpandedBus(expandedBus === bus.id ? null : bus.id)} className="glassmorphism-button border-white/20 text-white hover:bg-white/10">
                          Details {expandedBus === bus.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                        </Button>
                        <a href={getRedbusUrl(bus.departure.city, bus.arrival.city, searchData.departure)} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 font-semibold px-4 py-2 rounded-md text-white text-sm flex items-center justify-center shadow transition-colors" style={{ minWidth: 95 }}>
                          Book Now
                        </a>
                      </div>
                    </div>

                    {expandedBus === bus.id && (
                      <div className="mt-6 pt-6 border-t border-white/10 text-sm">
                        <p className="text-gray-300">Seats Available: {bus.seatsAvailable}</p>
                        <p className="text-gray-300 mt-2">Check-in with M-Ticket</p>
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

export default Buses;
