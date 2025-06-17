
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Users, Heart, Globe, Settings, Plus, Trash2, Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const interestOptions = [
  'adventure', 'wildlife', 'beaches', 'historical', 'cultural',
  'food', 'nature', 'urban', 'spiritual', 'photography'
];

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [coTravelers, setCoTravelers] = useState<any[]>([]);
  const [newCoTraveler, setNewCoTraveler] = useState<any>({});
  const [travelPreferences, setTravelPreferences] = useState<any>({
    budget_min: 10000,
    budget_max: 100000,
    preferred_destinations: [],
    travel_style: 'leisure',
    accommodation_type: 'hotel'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      
      if (data) {
        setProfile(data);
        // Safely parse settings
        const settings = data.settings as any;
        if (settings) {
          if (settings.co_travelers) {
            setCoTravelers(Array.isArray(settings.co_travelers) ? settings.co_travelers : []);
          }
          if (settings.travel_preferences) {
            setTravelPreferences({ ...travelPreferences, ...settings.travel_preferences });
          }
        }
      } else if (error) {
        console.error('Error fetching profile:', error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive"
      });
      return;
    }
    
    setAvatarUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      setProfile((prev: any) => ({ ...prev, avatar_url: publicUrl }));
      
      toast({ 
        title: "Success!", 
        description: "Your profile photo has been updated successfully." 
      });
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      toast({ 
        title: "Upload Failed", 
        description: "Failed to upload photo. Please try again.", 
        variant: "destructive" 
      });
    }
    setAvatarUploading(false);
  };

  const updateProfile = async () => {
    if (!profile?.id) return;
    
    setSaving(true);
    try {
      const currentSettings = (profile.settings as any) || {};
      const updatedSettings = {
        ...currentSettings,
        co_travelers: coTravelers,
        travel_preferences: travelPreferences
      };

      const { error } = await supabase.from("profiles").update({
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        preferred_interests: profile.preferred_interests,
        settings: updatedSettings,
        updated_at: new Date().toISOString(),
      }).eq("id", profile.id);
      
      if (error) throw error;
      
      toast({ 
        title: "Profile Saved!", 
        description: "Your profile has been updated successfully!" 
      });
    } catch (err: any) {
      console.error('Profile update error:', err);
      toast({ 
        title: "Save Failed", 
        description: "Failed to update profile. Please try again.", 
        variant: "destructive" 
      });
    }
    setSaving(false);
  };

  const addCoTraveler = () => {
    if (!newCoTraveler.name || !newCoTraveler.relationship) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and relationship",
        variant: "destructive"
      });
      return;
    }

    const traveler = {
      id: Date.now().toString(),
      name: newCoTraveler.name,
      relationship: newCoTraveler.relationship,
      age: newCoTraveler.age || 0,
      email: newCoTraveler.email || '',
      phone: newCoTraveler.phone || ''
    };
    
    setCoTravelers(prev => [...prev, traveler]);
    setNewCoTraveler({});
    
    toast({
      title: "Success",
      description: "Co-traveler added successfully!"
    });
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
      <div className="container mx-auto p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-muted-foreground text-lg">Manage your travel profile and preferences</p>
        </div>

        <div className="glassmorphism-card rounded-3xl shadow-2xl overflow-hidden">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glassmorphism-tabs">
              <TabsTrigger value="personal" className="data-[state=active]:glassmorphism-active">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="travel" className="data-[state=active]:glassmorphism-active">
                Preferences
              </TabsTrigger>
              <TabsTrigger value="companions" className="data-[state=active]:glassmorphism-active">
                Co-Travelers
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:glassmorphism-active">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="p-8">
              <Card className="glassmorphism-inner border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Users className="h-6 w-6 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-32 w-32 shadow-xl border-4 border-white/60 ring-4 ring-blue-200/50">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                          {profile?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2">
                        <Button
                          size="sm"
                          className="rounded-full h-10 w-10 p-0 shadow-lg glassmorphism-button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={avatarUploading}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{profile?.full_name || 'User'}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{profile?.email}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={avatarUploading}
                        className="glassmorphism-button"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        {avatarUploading ? "Uploading..." : "Change Photo"}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        PNG/JPG up to 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profile?.full_name || ''}
                        onChange={e => setProfile((p: any) => ({ ...p, full_name: e.target.value }))}
                        className="glassmorphism-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <Input
                        id="location"
                        value={profile?.location || ''}
                        onChange={e => setProfile((p: any) => ({ ...p, location: e.target.value }))}
                        className="glassmorphism-input"
                        placeholder="Your current location"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile?.bio || ''}
                      onChange={e => setProfile((p: any) => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell us about yourself and your travel experiences..."
                      className="glassmorphism-input min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Travel Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <Badge
                          key={interest}
                          variant={profile?.preferred_interests?.includes(interest) ? "default" : "outline"}
                          className="cursor-pointer transition-all hover:scale-105 glassmorphism-badge"
                          onClick={() => {
                            const arr = profile?.preferred_interests || [];
                            if (arr.includes(interest)) {
                              setProfile((p: any) => ({
                                ...p,
                                preferred_interests: arr.filter((i: string) => i !== interest)
                              }));
                            } else {
                              setProfile((p: any) => ({
                                ...p,
                                preferred_interests: [...arr, interest]
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

            <TabsContent value="travel" className="p-8">
              <Card className="glassmorphism-inner border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Globe className="h-6 w-6 text-green-600" />
                    Travel Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgetMin">Minimum Budget (₹)</Label>
                      <Input
                        id="budgetMin"
                        type="number"
                        value={travelPreferences.budget_min}
                        onChange={(e) => setTravelPreferences((prev: any) => ({ 
                          ...prev, 
                          budget_min: parseInt(e.target.value) || 0 
                        }))}
                        className="glassmorphism-input"
                        placeholder="10000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetMax">Maximum Budget (₹)</Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        value={travelPreferences.budget_max}
                        onChange={(e) => setTravelPreferences((prev: any) => ({ 
                          ...prev, 
                          budget_max: parseInt(e.target.value) || 0 
                        }))}
                        className="glassmorphism-input"
                        placeholder="100000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelStyle">Travel Style</Label>
                      <Input
                        id="travelStyle"
                        value={travelPreferences.travel_style}
                        onChange={(e) => setTravelPreferences((prev: any) => ({ ...prev, travel_style: e.target.value }))}
                        className="glassmorphism-input"
                        placeholder="e.g., Adventure, Leisure, Business"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accommodation">Accommodation Type</Label>
                      <Input
                        id="accommodation"
                        value={travelPreferences.accommodation_type}
                        onChange={(e) => setTravelPreferences((prev: any) => ({ ...prev, accommodation_type: e.target.value }))}
                        className="glassmorphism-input"
                        placeholder="e.g., Hotel, Resort, Hostel"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="companions" className="p-8">
              <Card className="glassmorphism-inner border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Heart className="h-6 w-6 text-pink-600" />
                    Co-Travelers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glassmorphism-inner rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold">Add New Co-Traveler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={newCoTraveler.name || ''}
                        onChange={(e) => setNewCoTraveler((prev: any) => ({ ...prev, name: e.target.value }))}
                        placeholder="Name"
                        className="glassmorphism-input"
                      />
                      <Input
                        value={newCoTraveler.relationship || ''}
                        onChange={(e) => setNewCoTraveler((prev: any) => ({ ...prev, relationship: e.target.value }))}
                        placeholder="Relationship (e.g., Spouse, Friend)"
                        className="glassmorphism-input"
                      />
                      <Input
                        type="number"
                        value={newCoTraveler.age || ''}
                        onChange={(e) => setNewCoTraveler((prev: any) => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                        placeholder="Age"
                        className="glassmorphism-input"
                      />
                      <Input
                        type="email"
                        value={newCoTraveler.email || ''}
                        onChange={(e) => setNewCoTraveler((prev: any) => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        className="glassmorphism-input"
                      />
                    </div>
                    <Button onClick={addCoTraveler} className="w-full glassmorphism-save-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Co-Traveler
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {coTravelers.map((traveler) => (
                      <div key={traveler.id} className="glassmorphism-inner rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{traveler.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {traveler.relationship} • Age {traveler.age}
                            </p>
                            {traveler.email && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {traveler.email}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCoTraveler(traveler.id)}
                            className="glassmorphism-button"
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

            <TabsContent value="settings" className="p-8">
              <Card className="glassmorphism-inner border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Settings className="h-6 w-6 text-purple-600" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Input
                      id="userType"
                      value={profile?.user_type || ''}
                      onChange={(e) => setProfile((prev: any) => ({ ...prev, user_type: e.target.value }))}
                      className="glassmorphism-input"
                      placeholder="e.g., Student, Teacher, Traveler"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile?.email || ''}
                      readOnly
                      className="glassmorphism-input opacity-60 cursor-not-allowed"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="p-8 border-t border-white/20">
            <div className="flex justify-end">
              <Button 
                onClick={updateProfile} 
                disabled={saving || loading} 
                size="lg" 
                className="px-8 py-3 text-lg glassmorphism-save-button"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
