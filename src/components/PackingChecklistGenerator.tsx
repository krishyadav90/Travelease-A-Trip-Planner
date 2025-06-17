
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Luggage, Download } from "lucide-react";

const PackingChecklistGenerator = () => {
  const [tripType, setTripType] = useState("");
  const [season, setSeason] = useState("");
  const [duration, setDuration] = useState(3);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const generateChecklist = () => {
    const essentials = [
      "Passport/ID", "Tickets", "Travel insurance", "Phone charger", "Medications",
      "Underwear", "Socks", "Toothbrush", "Toothpaste", "Deodorant"
    ];

    const seasonalItems = {
      summer: ["Sunscreen", "Sunglasses", "Light clothes", "Sandals", "Hat", "Swimwear"],
      winter: ["Warm jacket", "Gloves", "Scarf", "Thermal wear", "Warm socks", "Boots"],
      monsoon: ["Raincoat", "Umbrella", "Waterproof bag", "Quick-dry clothes", "Extra socks"],
      spring: ["Light jacket", "Comfortable shoes", "Layered clothing", "Light sweater"]
    };

    const tripTypeItems = {
      adventure: ["Hiking boots", "Backpack", "First aid kit", "Flashlight", "Multi-tool"],
      beach: ["Swimwear", "Beach towel", "Flip-flops", "Snorkel gear", "Beach bag"],
      business: ["Formal clothes", "Laptop", "Business cards", "Iron", "Dress shoes"],
      cultural: ["Modest clothing", "Camera", "Guidebook", "Comfortable walking shoes"],
      wildlife: ["Binoculars", "Camera with zoom", "Neutral colored clothes", "Insect repellent"]
    };

    let items = [...essentials];
    
    if (season && seasonalItems[season as keyof typeof seasonalItems]) {
      items = [...items, ...seasonalItems[season as keyof typeof seasonalItems]];
    }
    
    if (tripType && tripTypeItems[tripType as keyof typeof tripTypeItems]) {
      items = [...items, ...tripTypeItems[tripType as keyof typeof tripTypeItems]];
    }

    if (duration > 7) {
      items.push("Extra clothes", "Laundry bag", "Detergent packets");
    }

    return [...new Set(items)]; // Remove duplicates
  };

  const checklist = generateChecklist();

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const downloadChecklist = () => {
    const text = checklist.map(item => `☐ ${item}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packing-checklist.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Luggage className="h-5 w-5" />
          Packing Checklist Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={tripType} onValueChange={setTripType}>
            <SelectTrigger>
              <SelectValue placeholder="Trip Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="beach">Beach</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="wildlife">Wildlife</SelectItem>
            </SelectContent>
          </Select>

          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger>
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
              <SelectItem value="monsoon">Monsoon</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
            </SelectContent>
          </Select>

          <Select value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v))}>
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="7">1 week</SelectItem>
              <SelectItem value="14">2 weeks</SelectItem>
              <SelectItem value="30">1 month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {checkedItems.length}/{checklist.length} packed
            </Badge>
          </div>
          <Button onClick={downloadChecklist} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
          {checklist.map((item) => (
            <div key={item} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <Checkbox
                id={item}
                checked={checkedItems.includes(item)}
                onCheckedChange={() => toggleItem(item)}
              />
              <label
                htmlFor={item}
                className={`text-sm ${
                  checkedItems.includes(item) ? 'line-through text-gray-500' : ''
                }`}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackingChecklistGenerator;
