import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Camera, 
  User, 
  Globe, 
  Heart, 
  Settings, 
  Plus, 
  Trash2, 
  CalendarIcon,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Sparkles,
  Smile
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { uploadProfileAvatar } from "@/utils/profileAvatarUpload";

interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  user_type: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  preferred_interests: InterestType[] | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  nationality: string | null;
  emergency_contact: any;
  settings: any;
  created_at?: string;
  updated_at?: string;
}

interface CoTraveler {
  id: string;
  name: string;
  relationship: string;
  age: number;
  email: string;
  phone: string;
}

const interestOptions = [
  'adventure', 'wildlife', 'beaches', 'historical', 'cultural',
  'food', 'nature', 'urban', 'spiritual', 'photography'
] as const;

type InterestType = typeof interestOptions[number];

const emojiOptions = [
  '😊', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
  '✈️', '🌍', '🌎', '🌏', '🗺️', '🧳', '🎒', '📷', '🏖️', '🏔️',
  '🌋', '🏕️', '🎭', '🎨', '🎪', '🎡', '🎢', '🎠', '🎯', '🎲',
  '🍕', '🍔', '🍟', '🌮', '🍜', '🍱', '🍣', '🍰', '🧁', '🍭',
  '❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '💕',
  '⭐', '🌟', '✨', '💫', '🌙', '☀️', '🌈', '🔥', '💎', '🎉'
];

const FuturisticProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [coTravelers, setCoTravelers] = useState<CoTraveler[]>([]);
  const [newCoTraveler, setNewCoTraveler] = useState<Partial<CoTraveler>>({});
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear() - 20);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [travelPreferences, setTravelPreferences] = useState({
    budget_min: 10000,
    budget_max: 100000,
    preferred_destinations: [] as string[],
    travel_style: 'leisure',
    accommodation_type: 'hotel'
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        // Filter preferred_interests to only include valid interest types
        const validInterests = Array.isArray(data.preferred_interests) 
          ? data.preferred_interests
              .map(String)
              .filter((interest: string): interest is InterestType => 
                interestOptions.includes(interest as InterestType)
              )
          : [];

        // Transform the data to match our ProfileData interface
        const profileData: ProfileData = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          user_type: data.user_type,
          avatar_url: data.avatar_url,
          bio: data.bio,
          location: data.location,
          preferred_interests: validInterests,
          phone: (data as any).phone || null,
          date_of_birth: (data as any).date_of_birth || null,
          gender: (data as any).gender || null,
          nationality: (data as any).nationality || null,
          emergency_contact: (data as any).emergency_contact || null,
          settings: data.settings || null,
          created_at: data.created_at,
          updated_at: data.updated_at
        };

        setProfile(profileData);
        
        if (profileData.date_of_birth) {
          const dob = new Date(profileData.date_of_birth);
          setDateOfBirth(dob);
          setSelectedYear(dob.getFullYear());
          setSelectedMonth(dob.getMonth());
        }
        
        // Load settings data
        const settings = profileData.settings as any;
        if (settings) {
          if (settings.co_travelers) {
            setCoTravelers(Array.isArray(settings.co_travelers) ? settings.co_travelers : []);
          }
          if (settings.travel_preferences) {
            setTravelPreferences({ ...travelPreferences, ...settings.travel_preferences });
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (selectedYear && selectedMonth !== undefined) {
      const newDate = new Date(selectedYear, selectedMonth, 1);
      setDateOfBirth(newDate);
    }
  }, [selectedYear, selectedMonth]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !profile) return;
    
    // Reset the input value to allow selecting the same file again
    e.target.value = '';
    
    setUploading(true);
    try {
      console.log('Starting avatar upload...', { 
        userId: user.id, 
        fileName: file.name, 
        fileSize: file.size,
        fileType: file.type 
      });
      
      // Check authentication status
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session ? 'authenticated' : 'not authenticated');
      
      // Use the profile avatar upload utility
      const publicUrl = await uploadProfileAvatar(user.id, file);
      
      if (!publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }

      console.log('Upload successful, updating profile...', publicUrl);

      // Update the profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
      
      toast({ 
        title: "Success!", 
        description: "Your profile photo has been updated successfully." 
      });
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      toast({ 
        title: "Upload Failed", 
        description: err.message || "Failed to upload photo. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async () => {
    if (!profile || !user) return;
    
    setSaving(true);
    try {
      // Prepare settings object with additional data
      const updatedSettings = {
        ...(profile.settings as any || {}),
        co_travelers: coTravelers,
        travel_preferences: travelPreferences,
        // Store additional profile fields in settings since they don't exist in the schema
        date_of_birth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : null,
        gender: profile.gender,
        nationality: profile.nationality,
        emergency_contact: profile.emergency_contact,
        phone: profile.phone
      };

      console.log('Updating profile with data:', {
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        preferred_interests: profile.preferred_interests,
        user_type: profile.user_type,
        settings: updatedSettings
      });

      // Only update fields that exist in the database schema
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          bio: profile.bio,
          location: profile.location,
          preferred_interests: profile.preferred_interests,
          user_type: profile.user_type,
          settings: updatedSettings,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }
      
      console.log('Profile updated successfully');
      toast({ 
        title: "Profile Saved!", 
        description: "Your profile has been updated successfully!" 
      });
    } catch (err: any) {
      console.error('Profile update error:', err);
      toast({ 
        title: "Save Failed", 
        description: err.message || "Failed to update profile. Please try again.", 
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

    const traveler: CoTraveler = {
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

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = profile?.bio || '';
      const newText = text.substring(0, start) + emoji + text.substring(end);
      setProfile(prev => prev ? { ...prev, bio: newText } : null);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(start + emoji.length, start + emoji.length);
          textareaRef.current.focus();
        }
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
          <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-400/20"></div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-cyan-400 mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Profile
            </h1>
            <Sparkles className="h-8 w-8 text-cyan-400 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300">Your digital identity in the travel universe</p>
        </div>

        {/* Main Profile Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent border-b border-white/10 rounded-none">
              <TabsTrigger 
                value="personal" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 text-gray-400 hover:text-white transition-all duration-300"
              >
                <User className="h-4 w-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger 
                value="travel" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-300 text-gray-400 hover:text-white transition-all duration-300"
              >
                <Globe className="h-4 w-4 mr-2" />
                Travel
              </TabsTrigger>
              <TabsTrigger 
                value="companions" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-red-500/20 data-[state=active]:text-pink-300 text-gray-400 hover:text-white transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Companions
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-indigo-300 text-gray-400 hover:text-white transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="p-8">
              <div className="space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative">
                      <Avatar className="h-40 w-40 border-4 border-white/20">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                          {profile?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2">
                        <Button
                          size="sm"
                          className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-2 border-white/20 shadow-lg"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          ) : (
                            <Camera className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left space-y-4">
                    <h2 className="text-3xl font-bold text-white">{profile?.full_name || 'Traveler'}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <span>{profile?.email}</span>
                    </div>
                    <p className="text-sm text-gray-400">PNG/JPG up to 2MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>

                {/* Personal Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Full Name</Label>
                    <Input
                      value={profile?.full_name || ''}
                      onChange={e => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Phone</Label>
                    <Input
                      value={profile?.phone || ''}
                      onChange={e => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Location</Label>
                    <Input
                      value={profile?.location || ''}
                      onChange={e => setProfile(prev => prev ? { ...prev, location: e.target.value } : null)}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 transition-all duration-300"
                      placeholder="Your current location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Date of Birth</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20 max-h-48 overflow-y-auto">
                          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {Array.from({ length: 12 }, (_, i) => ({
                            value: i,
                            label: new Date(0, i).toLocaleString('default', { month: 'long' })
                          })).map((month) => (
                            <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Gender</Label>
                    <Select 
                      value={profile?.gender || ''} 
                      onValueChange={(value) => setProfile(prev => prev ? { ...prev, gender: value } : null)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-300 font-medium">Nationality</Label>
                    <Input
                      value={profile?.nationality || ''}
                      onChange={e => setProfile(prev => prev ? { ...prev, nationality: e.target.value } : null)}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 transition-all duration-300"
                      placeholder="Your nationality"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-cyan-300 font-medium">Bio</Label>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="bg-white/5 border-white/20 text-cyan-300 hover:bg-white/10"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      {showEmojiPicker && (
                        <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-white/20 rounded-lg p-4 shadow-xl z-50 max-h-48 overflow-y-auto">
                          <div className="grid grid-cols-8 gap-2">
                            {emojiOptions.map((emoji, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleEmojiSelect(emoji)}
                                className="text-lg hover:bg-white/10 rounded p-1 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Textarea
                    ref={textareaRef}
                    value={profile?.bio || ''}
                    onChange={e => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                    placeholder="Tell us about yourself and your travel experiences... 😊✈️🌍"
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 transition-all duration-300 min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-cyan-300 font-medium">Travel Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={profile?.preferred_interests?.includes(interest) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:scale-105 px-4 py-2",
                          profile?.preferred_interests?.includes(interest)
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent"
                            : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-cyan-400/50"
                        )}
                        onClick={() => {
                          const arr = profile?.preferred_interests || [];
                          if (arr.includes(interest)) {
                            setProfile(prev => prev ? ({
                              ...prev,
                              preferred_interests: arr.filter((i: InterestType) => i !== interest)
                            }) : null);
                          } else {
                            setProfile(prev => prev ? ({
                              ...prev,
                              preferred_interests: [...arr, interest]
                            }) : null);
                          }
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="travel" className="p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Travel Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-purple-300 font-medium">Minimum Budget (₹)</Label>
                    <Input
                      type="number"
                      value={travelPreferences.budget_min}
                      onChange={(e) => setTravelPreferences(prev => ({ 
                        ...prev, 
                        budget_min: parseInt(e.target.value) || 0 
                      }))}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 transition-all duration-300"
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-300 font-medium">Maximum Budget (₹)</Label>
                    <Input
                      type="number"
                      value={travelPreferences.budget_max}
                      onChange={(e) => setTravelPreferences(prev => ({ 
                        ...prev, 
                        budget_max: parseInt(e.target.value) || 0 
                      }))}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 transition-all duration-300"
                      placeholder="100000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-300 font-medium">Travel Style</Label>
                    <Select
                      value={travelPreferences.travel_style}
                      onValueChange={(value) => setTravelPreferences(prev => ({ ...prev, travel_style: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400">
                        <SelectValue placeholder="Select travel style" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="leisure">Leisure</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-300 font-medium">Accommodation Type</Label>
                    <Select
                      value={travelPreferences.accommodation_type}
                      onValueChange={(value) => setTravelPreferences(prev => ({ ...prev, accommodation_type: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400">
                        <SelectValue placeholder="Select accommodation" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
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
              </div>
            </TabsContent>

            <TabsContent value="companions" className="p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Co-Travelers</h3>
                
                {/* Add New Co-Traveler */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-pink-300 mb-4">Add New Co-Traveler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      value={newCoTraveler.name || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Name"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                    />
                    <Input
                      value={newCoTraveler.relationship || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, relationship: e.target.value }))}
                      placeholder="Relationship"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                    />
                    <Input
                      type="number"
                      value={newCoTraveler.age || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      placeholder="Age"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                    />
                    <Input
                      type="email"
                      value={newCoTraveler.email || ''}
                      onChange={(e) => setNewCoTraveler(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
                    />
                  </div>
                  <Button onClick={addCoTraveler} className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Co-Traveler
                  </Button>
                </div>

                {/* Existing Co-Travelers */}
                <div className="space-y-4">
                  {coTravelers.map((traveler) => (
                    <div key={traveler.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{traveler.name}</h4>
                          <p className="text-gray-300">{traveler.relationship} • Age {traveler.age}</p>
                          {traveler.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                              <Mail className="h-3 w-3" />
                              {traveler.email}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCoTraveler(traveler.id)}
                          className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {coTravelers.length === 0 && (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No co-travelers added yet</p>
                      <p className="text-gray-500">Add your travel companions above</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Account Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-indigo-300 font-medium">User Type</Label>
                    <Select 
                      value={profile.user_type} 
                      onValueChange={(value) => setProfile(prev => prev ? { ...prev, user_type: value } : null)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-indigo-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="traveler">Traveler</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-indigo-300 font-medium">Email</Label>
                    <Input
                      value={profile.email}
                      readOnly
                      className="bg-white/5 border-white/20 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="p-8 border-t border-white/10">
            <Button 
              onClick={updateProfile} 
              disabled={saving} 
              size="lg" 
              className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Saving Profile...
                </div>
              ) : (
                'Save Profile'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticProfile;
