
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  selectedPriceRange: string;
  setSelectedPriceRange: (p: string) => void;
  selectedRating: string;
  setSelectedRating: (r: string) => void;
  clearFilters: () => void;
}

export default function HotelFilters({
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  clearFilters,
}: Props) {
  return (
    <div className="glassmorphism-card rounded-2xl p-6 sticky top-24">
      <h3 className="text-xl font-semibold text-white mb-6">Filters</h3>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">Price Range</label>
          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
            <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
              <SelectValue placeholder="Select Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="budget">Under ₹10,000</SelectItem>
              <SelectItem value="mid">₹10,000 - ₹20,000</SelectItem>
              <SelectItem value="luxury">Above ₹20,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">Star Rating</label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="glassmorphism-input border-0 text-white h-12">
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="3">3 Stars & Above</SelectItem>
              <SelectItem value="4">4 Stars & Above</SelectItem>
              <SelectItem value="5">5 Stars Only</SelectItem>
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
  );
}
