
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Calendar, Users, DollarSign } from "lucide-react";

interface TravelPreferencesProps {
  profile: any;
  setProfile: (profile: any) => void;
}

const budgetRanges = [
  "Budget (₹5,000 - ₹15,000)",
  "Mid-range (₹15,000 - ₹30,000)",
  "Luxury (₹30,000 - ₹75,000)",
  "Ultra-luxury (₹75,000+)"
];

const travelStyles = [
  "Backpacker", "Luxury", "Family", "Adventure", "Cultural", 
  "Romantic", "Business", "Solo", "Group", "Photography"
];

const accommodationTypes = [
  "Hotels", "Hostels", "Resorts", "Homestays", "Airbnb", 
  "Guesthouses", "Camping", "Luxury Villas"
];

const transportModes = [
  "Flight", "Train", "Bus", "Car Rental", "Bike", 
  "Walking", "Local Transport", "Private Cab"
];

const TravelPreferences = ({ profile, setProfile }: TravelPreferencesProps) => {
  const [preferences, setPreferences] = useState(profile?.travel_preferences || {
    budget_range: "",
    travel_style: [],
    preferred_accommodation: [],
    transport_modes: [],
    dietary_restrictions: "",
    accessibility_needs: "",
    travel_pace: "moderate",
    group_size_preference: "small",
    season_preference: [],
    special_occasions: ""
  });

  const updatePreference = (key: string, value: any) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    setProfile({ ...profile, travel_preferences: newPrefs });
  };

  const toggleArrayPreference = (key: string, value: string) => {
    const current = preferences[key] || [];
    const updated = current.includes(value) 
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    updatePreference(key, updated);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/25 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget & Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="budget">Budget Range</Label>
            <Select value={preferences.budget_range} onValueChange={(value) => updatePreference("budget_range", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Travel Style</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {travelStyles.map((style) => (
                <Badge
                  key={style}
                  variant={preferences.travel_style?.includes(style) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleArrayPreference("travel_style", style)}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/25 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Accommodation & Transport
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Preferred Accommodation</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {accommodationTypes.map((type) => (
                <Badge
                  key={type}
                  variant={preferences.preferred_accommodation?.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleArrayPreference("preferred_accommodation", type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Transport Modes</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {transportModes.map((mode) => (
                <Badge
                  key={mode}
                  variant={preferences.transport_modes?.includes(mode) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleArrayPreference("transport_modes", mode)}
                >
                  {mode}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/25 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Travel Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travel_pace">Travel Pace</Label>
              <Select value={preferences.travel_pace} onValueChange={(value) => updatePreference("travel_pace", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow & Relaxed</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="fast">Fast & Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="group_size">Group Size Preference</Label>
              <Select value={preferences.group_size_preference} onValueChange={(value) => updatePreference("group_size_preference", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Travel</SelectItem>
                  <SelectItem value="small">Small Group (2-4)</SelectItem>
                  <SelectItem value="medium">Medium Group (5-10)</SelectItem>
                  <SelectItem value="large">Large Group (10+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dietary">Dietary Restrictions</Label>
            <Textarea
              id="dietary"
              value={preferences.dietary_restrictions}
              onChange={(e) => updatePreference("dietary_restrictions", e.target.value)}
              placeholder="Any dietary restrictions or food preferences..."
            />
          </div>

          <div>
            <Label htmlFor="accessibility">Accessibility Needs</Label>
            <Textarea
              id="accessibility"
              value={preferences.accessibility_needs}
              onChange={(e) => updatePreference("accessibility_needs", e.target.value)}
              placeholder="Any accessibility requirements..."
            />
          </div>

          <div>
            <Label htmlFor="special_occasions">Special Occasions</Label>
            <Input
              id="special_occasions"
              value={preferences.special_occasions}
              onChange={(e) => updatePreference("special_occasions", e.target.value)}
              placeholder="Anniversaries, birthdays, honeymoon, etc."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelPreferences;
