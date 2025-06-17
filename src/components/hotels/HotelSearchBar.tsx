
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  searchData: { destination: string; checkIn: string; checkOut: string; travelers: string };
  setSearchData: (data: any) => void;
  handleSearch: () => void;
}

export default function HotelSearchBar({ searchData, setSearchData, handleSearch }: Props) {
  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="glassmorphism-card p-8 rounded-3xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="relative">
            <label className="text-sm font-medium text-cyan-300 mb-3 block">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Where to go?"
                value={searchData.destination}
                onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                className="glassmorphism-input pl-12 h-14 border-0 text-white placeholder-gray-300 rounded-xl bg-white/5 backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-cyan-300 mb-3 block">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="date"
                placeholder="dd-mm-yyyy"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-cyan-300 mb-3 block">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="date"
                placeholder="dd-mm-yyyy"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-cyan-300 mb-3 block">Travelers</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Select value={searchData.travelers} onValueChange={(value) => setSearchData({ ...searchData, travelers: value })}>
                <SelectTrigger className="glassmorphism-input pl-12 h-14 border-0 text-white rounded-xl bg-white/5 backdrop-blur-sm">
                  <SelectValue placeholder="2 Adults" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
                  <SelectItem value="family">Family (2+2)</SelectItem>
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
            Search Holiday Packages
          </Button>
        </div>
      </div>
    </div>
  );
}
