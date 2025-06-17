
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrainFront, Clock, Star, ChevronDown, ChevronUp, MapPin, Calendar, Search, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const trainResults = [
  { id: 1, name: "Shatabdi Express", trainNumber: "12001", departure: { time: "06:00", station: "NDLS", city: "New Delhi" }, arrival: { time: "12:00", station: "BPL", city: "Bhopal" }, duration: "6h 00m", price: 1500, stops: 3, classes: ["CC", "EC"], onTimePerformance: 95, },
  { id: 2, name: "Mumbai Rajdhani", trainNumber: "12952", departure: { time: "16:55", station: "NDLS", city: "New Delhi" }, arrival: { time: "08:15", station: "BCT", city: "Mumbai" }, duration: "15h 20m", price: 3500, stops: 5, classes: ["1A", "2A", "3A"], onTimePerformance: 92, },
  { id: 3, name: "Duronto Express", trainNumber: "12260", departure: { time: "20:40", station: "SDAH", city: "Kolkata" }, arrival: { time: "10:45", station: "NDLS", city: "New Delhi" }, duration: "14h 05m", price: 2800, stops: 0, classes: ["1A", "2A", "3A"], onTimePerformance: 90, },
  { id: 4, name: "Tejas Express", trainNumber: "82902", departure: { time: "15:35", station: "ADI", city: "Ahmedabad" }, arrival: { time: "21:55", station: "MMCT", city: "Mumbai" }, duration: "6h 20m", price: 1800, stops: 6, classes: ["CC", "EC"], onTimePerformance: 98, },
  { id: 5, name: "Gatimaan Express", trainNumber: "12050", departure: { time: "08:10", station: "NZM", city: "Delhi" }, arrival: { time: "09:50", station: "AGC", city: "Agra" }, duration: "1h 40m", price: 1100, stops: 0, classes: ["CC", "EC"], onTimePerformance: 97, },
  { id: 6, name: "Humsafar Express", trainNumber: "22867", departure: { time: "12:40", station: "DURG", city: "Durg" }, arrival: { time: "09:05", station: "NZM", city: "Delhi" }, duration: "20h 25m", price: 2100, stops: 10, classes: ["3A"], onTimePerformance: 88, },
  { id: 7, name: "Sampark Kranti", trainNumber: "12649", departure: { time: "13:15", station: "YPR", city: "Bengaluru" }, arrival: { time: "08:10", station: "NZM", city: "Delhi" }, duration: "42h 55m", price: 2500, stops: 15, classes: ["SL", "3A", "2A", "1A"], onTimePerformance: 85, },
  { id: 8, name: "Howrah Duronto", trainNumber: "12274", departure: { time: "08:35", station: "NDLS", city: "New Delhi" }, arrival: { time: "04:55", station: "HWH", city: "Kolkata" }, duration: "20h 20m", price: 3200, stops: 0, classes: ["1A", "2A", "3A"], onTimePerformance: 91, },
  { id: 9, name: "Chennai Express", trainNumber: "12621", departure: { time: "22:15", station: "MAS", city: "Chennai" }, arrival: { time: "04:30", station: "NDLS", city: "New Delhi" }, duration: "30h 15m", price: 4100, stops: 12, classes: ["1A", "2A", "3A", "SL"], onTimePerformance: 89 },
  { id: 10, name: "Bengaluru Rajdhani", trainNumber: "22691", departure: { time: "20:00", station: "SBC", city: "Bengaluru" }, arrival: { time: "05:50", station: "NZM", city: "Delhi" }, duration: "33h 50m", price: 4500, stops: 8, classes: ["1A", "2A", "3A"], onTimePerformance: 94 },
  { id: 11, name: "Garib Rath", trainNumber: "12910", departure: { time: "19:40", station: "NZM", city: "Delhi" }, arrival: { time: "11:20", station: "BDTS", city: "Mumbai" }, duration: "15h 40m", price: 1300, stops: 7, classes: ["3A"], onTimePerformance: 87 },
  { id: 12, name: "Vande Bharat", trainNumber: "22439", departure: { time: "06:00", station: "NDLS", city: "New Delhi" }, arrival: { time: "14:00", station: "SVDK", city: "Katra" }, duration: "8h 00m", price: 1700, stops: 4, classes: ["CC", "EC"], onTimePerformance: 99 },
  { id: 13, name: "Kolkata Rajdhani", trainNumber: "12302", departure: { time: "16:50", station: "NDLS", city: "New Delhi" }, arrival: { time: "09:55", station: "HWH", city: "Kolkata" }, duration: "17h 05m", price: 3800, stops: 7, classes: ["1A", "2A", "3A"], onTimePerformance: 93 },
  { id: 14, name: "Poorva Express", trainNumber: "12304", departure: { time: "16:40", station: "NDLS", city: "New Delhi" }, arrival: { time: "17:00", station: "HWH", city: "Kolkata" }, duration: "24h 20m", price: 2200, stops: 20, classes: ["1A", "2A", "3A", "SL"], onTimePerformance: 82 },
  { id: 15, name: "Goa Express", trainNumber: "12780", departure: { time: "15:00", station: "NZM", city: "Delhi" }, arrival: { time: "07:00", station: "VSG", city: "Vasco da Gama" }, duration: "40h 00m", price: 2900, stops: 25, classes: ["2A", "3A", "SL"], onTimePerformance: 80 },
  { id: 16, name: "Lucknow Shatabdi", trainNumber: "12004", departure: { time: "06:10", station: "NDLS", city: "New Delhi" }, arrival: { time: "12:30", station: "LJN", city: "Lucknow" }, duration: "6h 20m", price: 1400, stops: 4, classes: ["CC", "EC"], onTimePerformance: 96 },
  { id: 17, name: "August Kranti Rajdhani", trainNumber: "12954", departure: { time: "17:15", station: "NZM", city: "Delhi" }, arrival: { time: "09:45", station: "BCT", city: "Mumbai" }, duration: "16h 30m", price: 3400, stops: 10, classes: ["1A", "2A", "3A"], onTimePerformance: 90 },
  { id: 18, name: "Pune Duronto", trainNumber: "12263", departure: { time: "10:55", station: "NZM", city: "Delhi" }, arrival: { time: "07:10", station: "PUNE", city: "Pune" }, duration: "20h 15m", price: 3100, stops: 2, classes: ["1A", "2A", "3A"], onTimePerformance: 91 },
];

const Trains = () => {
  const [expandedTrain, setExpandedTrain] = useState<number | null>(null);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: format(new Date(), "yyyy-MM-dd"),
  });
  const [filters, setFilters] = useState({
    priceRange: "",
    trainType: "",
    trainClass: "",
    departureTime: ""
  });
  const [filteredTrains, setFilteredTrains] = useState(trainResults);

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const clearFilters = () => {
    const clearedFilters = { priceRange: "", trainType: "", trainClass: "", departureTime: "" };
    setFilters(clearedFilters);
    setFilteredTrains(trainResults);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = trainResults;
    if (currentFilters.priceRange) {
        filtered = filtered.filter(train => {
            if (currentFilters.priceRange === "1000-2000") return train.price >= 1000 && train.price <= 2000;
            if (currentFilters.priceRange === "2000-4000") return train.price >= 2000 && train.price <= 4000;
            if (currentFilters.priceRange === "4000+") return train.price >= 4000;
            return true;
        });
    }
    if (currentFilters.trainType) {
        filtered = filtered.filter(train => train.name.toLowerCase().includes(currentFilters.trainType.toLowerCase()));
    }
    if (currentFilters.trainClass) {
        filtered = filtered.filter(train => train.classes.includes(currentFilters.trainClass));
    }
    if (currentFilters.departureTime) {
      if (currentFilters.departureTime === "morning") {
        filtered = filtered.filter(train => parseInt(train.departure.time.split(':')[0]) >= 6 && parseInt(train.departure.time.split(':')[0]) < 12);
      } else if (currentFilters.departureTime === "afternoon") {
        filtered = filtered.filter(train => parseInt(train.departure.time.split(':')[0]) >= 12 && parseInt(train.departure.time.split(':')[0]) < 18);
      } else if (currentFilters.departureTime === "evening") {
        filtered = filtered.filter(train => parseInt(train.departure.time.split(':')[0]) >= 18 || parseInt(train.departure.time.split(':')[0]) < 6);
      }
    }
    setFilteredTrains(filtered);
  };

  const handleSearch = () => {
    const resultsSection = document.getElementById('train-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIrctcUrl = () => {
    return "https://www.irctc.co.in/nget/train-search";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Search for Indian Trains
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find train schedules and book tickets across the nation with IRCTC.
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
                    <Input placeholder="e.g. New Delhi (NDLS)" value={searchData.from} onChange={(e) => setSearchData({...searchData, from: e.target.value})} className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-cyan-300 mb-3 block">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="e.g. Mumbai (BCT)" value={searchData.to} onChange={(e) => setSearchData({...searchData, to: e.target.value})} className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm" />
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
                  Search Trains
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
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Price Range (Est.)</label>
                  <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Price" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                      <SelectItem value="2000-4000">₹2,000 - ₹4,000</SelectItem>
                      <SelectItem value="4000+">₹4,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Train Type</label>
                  <Select value={filters.trainType} onValueChange={(value) => handleFilterChange('trainType', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Shatabdi">Shatabdi</SelectItem>
                      <SelectItem value="Rajdhani">Rajdhani</SelectItem>
                      <SelectItem value="Duronto">Duronto</SelectItem>
                      <SelectItem value="Tejas">Tejas</SelectItem>
                      <SelectItem value="Humsafar">Humsafar</SelectItem>
                      <SelectItem value="Sampark Kranti">Sampark Kranti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Class</label>
                  <Select value={filters.trainClass} onValueChange={(value) => handleFilterChange('trainClass', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Class" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="1A">First AC (1A)</SelectItem>
                      <SelectItem value="2A">Second AC (2A)</SelectItem>
                      <SelectItem value="3A">Third AC (3A)</SelectItem>
                      <SelectItem value="CC">AC Chair Car (CC)</SelectItem>
                      <SelectItem value="SL">Sleeper (SL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Departure Time</label>
                  <Select value={filters.departureTime} onValueChange={(value) => handleFilterChange('departureTime', value)}>
                    <SelectTrigger className="glassmorphism-input border-0 text-white h-12"><SelectValue placeholder="Select Time" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM - 6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Train Results */}
          <div id="train-results" className="lg:col-span-3 space-y-6">
            {filteredTrains.length === 0 ? (
                <div className="glassmorphism-card rounded-2xl p-12 text-center">
                    <p className="text-gray-300 text-lg">No trains match your current filters.</p>
                    <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={clearFilters}>Clear All Filters</Button>
                </div>
            ) : (
              filteredTrains.map((train) => (
                <Card key={train.id} className="glassmorphism-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <TrainFront className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{train.name}</h3>
                          <p className="text-sm text-gray-300">#{train.trainNumber}</p>
                        </div>
                      </div>
                      <Badge className="glassmorphism-badge border-0 text-white font-semibold">
                        {train.onTimePerformance}% On Time
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{train.departure.time}</div>
                        <div className="text-sm text-gray-300">{train.departure.station}</div>
                        <div className="text-xs text-gray-400">{train.departure.city}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2"><Clock className="h-4 w-4 mr-2 text-gray-400" /><span className="text-sm text-gray-300">{train.duration}</span></div>
                        <div className="flex items-center justify-center"><div className="h-px bg-gray-600 flex-1"></div><ArrowRight className="h-4 w-4 mx-2 text-gray-400" /><div className="h-px bg-gray-600 flex-1"></div></div>
                        <div className="text-xs text-gray-400 mt-2">{train.stops} Stops</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{train.arrival.time}</div>
                        <div className="text-sm text-gray-300">{train.arrival.station}</div>
                        <div className="text-xs text-gray-400">{train.arrival.city}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">₹{train.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-300">in {train.classes[train.classes.length - 1]}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-300">Classes:</span>
                            {train.classes.map(c => <Badge key={c} variant="secondary" className="bg-white/10 text-white border-0">{c}</Badge>)}
                        </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => setExpandedTrain(expandedTrain === train.id ? null : train.id)} className="glassmorphism-button border-white/20 text-white hover:bg-white/10">
                          Details {expandedTrain === train.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                        </Button>
                        <a href={getIrctcUrl()} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 font-semibold px-4 py-2 rounded-md text-white text-sm flex items-center justify-center shadow transition-colors" style={{ minWidth: 95 }}>
                          Book Now
                        </a>
                      </div>
                    </div>

                    {expandedTrain === train.id && (
                      <div className="mt-6 pt-6 border-t border-white/10 text-sm">
                        <p className="text-gray-300">Runs on all days. Catering available on-board.</p>
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

export default Trains;
