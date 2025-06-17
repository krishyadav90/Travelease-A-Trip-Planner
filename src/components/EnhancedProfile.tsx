import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Mail, Phone, Globe, Heart, Users, Settings, Camera, Edit, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type InterestCategory = Database['public']['Enums']['interest_category'];

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  user_type: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  preferred_interests: InterestCategory[] | null;
  created_at: string | null;
  updated_at: string | null;
  // Additional fields for enhanced profile
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
  marital_status: string;
  anniversary: string;
  city_of_residence: string;
  state: string;
  country: string;
  phone: string;
}

interface TravelPreferences {
  preferred_budget_min: number;
  preferred_budget_max: number;
  preferred_destinations: string[];
  travel_style: string;
  accommodation_type: string;
  interests: string[];
  dietary_restrictions: string;
  accessibility_needs: string;
}

interface CoTraveler {
  id: string;
  name: string;
  relationship: string;
  age: number;
  contact_email: string;
  dietary_restrictions: string;
  accessibility_needs: string;
}

const EnhancedProfile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    email: '',
    full_name: '',
    user_type: 'student',
    avatar_url: '',
    bio: '',
    location: '',
    preferred_interests: [],
    created_at: '',
    updated_at: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    nationality: '',
    marital_status: '',
    anniversary: '',
    city_of_residence: '',
    state: '',
    country: '',
    phone: ''
  });

  const [travelPreferences, setTravelPreferences] = useState<TravelPreferences>({
    preferred_budget_min: 0,
    preferred_budget_max: 0,
    preferred_destinations: [],
    travel_style: '',
    accommodation_type: '',
    interests: [],
    dietary_restrictions: '',
    accessibility_needs: ''
  });

  const [coTravelers, setCoTravelers] = useState<CoTraveler[]>([]);
  const [newCoTraveler, setNewCoTraveler] = useState<Partial<CoTraveler>>({});

  const interestOptions: InterestCategory[] = [
    'adventure', 'wildlife', 'beaches', 'historical', 'cultural', 
    'food', 'nature', 'urban', 'spiritual', 'photography'
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to view your profile",
          variant: "destructive"
        });
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
        return;
      }

      if (profileData) {
        // Map database profile to UserProfile interface
        const mappedProfile: UserProfile = {
          id: profileData.id,
          email: profileData.email,
          full_name: profileData.full_name,
          user_type: profileData.user_type,
          avatar_url: profileData.avatar_url,
          bio: profileData.bio,
          location: profileData.location,
          preferred_interests: profileData.preferred_interests,
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
          // Set default values for additional fields
          first_name: profileData.full_name?.split(' ')[0] || '',
          middle_name: '',
          last_name: profileData.full_name?.split(' ').slice(1).join(' ') || '',
          gender: '',
          date_of_birth: '',
          nationality: '',
          marital_status: '',
          anniversary: '',
          city_of_residence: profileData.location || '',
          state: '',
          country: '',
          phone: ''
        };

        setProfile(mappedProfile);
      }

      // Initialize travel preferences and co-travelers with default values
      // Since these tables don't exist in the database, we'll manage them locally
      setTravelPreferences({
        preferred_budget_min: 1000,
        preferred_budget_max: 50000,
        preferred_destinations: [],
        travel_style: 'adventure',
        accommodation_type: 'hotel',
        interests: [],
        dietary_restrictions: '',
        accessibility_needs: ''
      });

      setCoTravelers([]);

    } catch (error) {
      console.error('Error in fetchProfile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          email: profile.email,
          full_name: profile.full_name,
          user_type: profile.user_type,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          location: profile.location,
          preferred_interests: profile.preferred_interests as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addCoTraveler = () => {
    if (newCoTraveler.name && newCoTraveler.relationship) {
      const traveler: CoTraveler = {
        id: Date.now().toString(),
        name: newCoTraveler.name,
        relationship: newCoTraveler.relationship,
        age: newCoTraveler.age || 0,
        contact_email: newCoTraveler.contact_email || '',
        dietary_restrictions: newCoTraveler.dietary_restrictions || '',
        accessibility_needs: newCoTraveler.accessibility_needs || ''
      };
      
      setCoTravelers(prev => [...prev, traveler]);
      setNewCoTraveler({});
      
      toast({
        title: "Success",
        description: "Co-traveler added successfully!"
      });
    }
  };

  const removeCoTraveler = (id: string) => {
    setCoTravelers(prev => prev.filter(traveler => traveler.id !== id));
    toast({
      title: "Success",
      description: "Co-traveler removed successfully!"
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Enhanced Profile</h1>
        <p className="text-muted-foreground text-center">Manage your comprehensive travel profile</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="travel">Travel Preferences</TabsTrigger>
          <TabsTrigger value="companions">Co-Travelers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-96 overflow-y-auto">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="text-lg">
                    {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.first_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={profile.middle_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, middle_name: e.target.value }))}
                    placeholder="Enter your middle name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.last_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Travel Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={profile.preferred_interests?.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const interests = profile.preferred_interests || [];
                        if (interests.includes(interest)) {
                          setProfile(prev => ({
                            ...prev,
                            preferred_interests: interests.filter(i => i !== interest)
                          }));
                        } else {
                          setProfile(prev => ({
                            ...prev,
                            preferred_interests: [...interests, interest]
                          }));
                        }
                      }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="travel" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-96 overflow-y-auto">
              {/* ... keep existing code (travel preferences content) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetMin">Minimum Budget (₹)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    value={travelPreferences.preferred_budget_min}
                    onChange={(e) => setTravelPreferences(prev => ({ 
                      ...prev, 
                      preferred_budget_min: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <Label htmlFor="budgetMax">Maximum Budget (₹)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    value={travelPreferences.preferred_budget_max}
                    onChange={(e) => setTravelPreferences(prev => ({ 
                      ...prev, 
                      preferred_budget_max: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="travelStyle">Travel Style</Label>
                  <Select
                    value={travelPreferences.travel_style}
                    onValueChange={(value) => setTravelPreferences(prev => ({ ...prev, travel_style: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accommodation">Accommodation Type</Label>
                  <Select
                    value={travelPreferences.accommodation_type}
                    onValueChange={(value) => setTravelPreferences(prev => ({ ...prev, accommodation_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="homestay">Homestay</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="camping">Camping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Textarea
                  id="dietary"
                  value={travelPreferences.dietary_restrictions}
                  onChange={(e) => setTravelPreferences(prev => ({ ...prev, dietary_restrictions: e.target.value }))}
                  placeholder="Any dietary restrictions or preferences..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="accessibility">Accessibility Needs</Label>
                <Textarea
                  id="accessibility"
                  value={travelPreferences.accessibility_needs}
                  onChange={(e) => setTravelPreferences(prev => ({ ...prev, accessibility_needs: e.target.value }))}
                  placeholder="Any accessibility requirements..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Co-Travelers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-96 overflow-y-auto">
              {/* Add New Co-Traveler Form */}
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold">Add New Co-Traveler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="coTravelerName">Name</Label>
                    <Input
                      id="coTravelerName"
                      value={newCoTraveler.name || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={newCoTraveler.relationship || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, relationship: e.target.value }))}
                      placeholder="e.g., Spouse, Friend, Child"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newCoTraveler.age || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="coTravelerEmail">Contact Email</Label>
                  <Input
                    id="coTravelerEmail"
                    type="email"
                    value={newCoTraveler.contact_email || ''}
                    onChange={(e) => setNewCoTraveler(prev => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="Enter email"
                  />
                </div>
                <Button onClick={addCoTraveler} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Co-Traveler
                </Button>
              </div>

              {/* Existing Co-Travelers */}
              <div className="space-y-4">
                {coTravelers.map((traveler) => (
                  <div key={traveler.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{traveler.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {traveler.relationship} • Age {traveler.age}
                        </p>
                        <p className="text-sm text-muted-foreground">{traveler.contact_email}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCoTraveler(traveler.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {coTravelers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No co-travelers added yet. Add your travel companions above.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={profile.user_type}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, user_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="traveler">Traveler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button onClick={updateProfile} disabled={saving} size="lg">
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedProfile;
