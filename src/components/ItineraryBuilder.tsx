
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Trash2, Save, Share, MapPin, Clock, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ItineraryDay {
  id: string;
  day_number: number;
  date: string;
  title: string;
  notes: string;
  activities: ItineraryActivity[];
}

interface ItineraryActivity {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  estimated_cost: number;
  notes: string;
  order_index: number;
}

interface ItineraryBuilderProps {
  destinationId?: string;
  initialData?: any;
}

const ItineraryBuilder = ({ destinationId, initialData }: ItineraryBuilderProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStartDate(initialData.start_date || "");
      setEndDate(initialData.end_date || "");
    }
  }, [initialData]);

  useEffect(() => {
    calculateTotalCost();
  }, [days]);

  const calculateTotalCost = () => {
    const total = days.reduce((sum, day) => {
      return sum + day.activities.reduce((daySum, activity) => daySum + (activity.estimated_cost || 0), 0);
    }, 0);
    setTotalCost(total);
  };

  const generateDays = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Start and end dates are required to generate itinerary days.",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newDays: ItineraryDay[] = [];
    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      newDays.push({
        id: `day-${i}`,
        day_number: i + 1,
        date: currentDate.toISOString().split('T')[0],
        title: `Day ${i + 1}`,
        notes: "",
        activities: []
      });
    }
    setDays(newDays);
  };

  const addActivity = (dayIndex: number) => {
    const newActivity: ItineraryActivity = {
      id: `activity-${Date.now()}`,
      title: "",
      description: "",
      start_time: "09:00",
      end_time: "10:00",
      estimated_cost: 0,
      notes: "",
      order_index: days[dayIndex].activities.length
    };

    const updatedDays = [...days];
    updatedDays[dayIndex].activities.push(newActivity);
    setDays(updatedDays);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: string, value: any) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex] = {
      ...updatedDays[dayIndex].activities[activityIndex],
      [field]: value
    };
    setDays(updatedDays);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities.splice(activityIndex, 1);
    setDays(updatedDays);
  };

  const updateDay = (dayIndex: number, field: string, value: string) => {
    const updatedDays = [...days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value
    };
    setDays(updatedDays);
  };

  const saveItinerary = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your itinerary.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your itinerary.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Save itinerary
      const { data: itinerary, error: itineraryError } = await supabase
        .from('itineraries')
        .insert({
          user_id: user.id,
          title,
          description,
          start_date: startDate,
          end_date: endDate,
          total_days: days.length,
          estimated_cost: totalCost
        })
        .select()
        .single();

      if (itineraryError) throw itineraryError;

      // Save days and activities
      for (const day of days) {
        const { data: dayData, error: dayError } = await supabase
          .from('itinerary_days')
          .insert({
            itinerary_id: itinerary.id,
            day_number: day.day_number,
            date: day.date,
            title: day.title,
            notes: day.notes
          })
          .select()
          .single();

        if (dayError) throw dayError;

        if (day.activities.length > 0) {
          const activitiesData = day.activities.map(activity => ({
            day_id: dayData.id,
            title: activity.title,
            description: activity.description,
            start_time: activity.start_time,
            end_time: activity.end_time,
            estimated_cost: activity.estimated_cost,
            notes: activity.notes,
            order_index: activity.order_index
          }));

          const { error: activitiesError } = await supabase
            .from('itinerary_activities')
            .insert(activitiesData);

          if (activitiesError) throw activitiesError;
        }
      }

      toast({
        title: "Itinerary saved!",
        description: "Your travel itinerary has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving itinerary",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Itinerary Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Trip title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                <DollarSign className="h-4 w-4 mr-1" />
                ₹{totalCost.toLocaleString()}
              </Badge>
            </div>
          </div>
          
          <Textarea
            placeholder="Trip description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={generateDays} variant="outline" className="w-full">
                Generate Days
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={saveItinerary} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Itinerary"}
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Days */}
      {days.map((day, dayIndex) => (
        <Card key={day.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Day {day.day_number} - {new Date(day.date).toLocaleDateString()}
              </CardTitle>
              <Button 
                size="sm" 
                onClick={() => addActivity(dayIndex)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Day title"
              value={day.title}
              onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
            />
            
            <Textarea
              placeholder="Day notes"
              value={day.notes}
              onChange={(e) => updateDay(dayIndex, 'notes', e.target.value)}
              rows={2}
            />

            {/* Activities */}
            <div className="space-y-3">
              {day.activities.map((activity, activityIndex) => (
                <div key={activity.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <Input
                        type="time"
                        value={activity.start_time}
                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'start_time', e.target.value)}
                        className="w-24 h-8"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={activity.end_time}
                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'end_time', e.target.value)}
                        className="w-24 h-8"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeActivity(dayIndex, activityIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Activity title"
                      value={activity.title}
                      onChange={(e) => updateActivity(dayIndex, activityIndex, 'title', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Cost (₹)"
                      value={activity.estimated_cost}
                      onChange={(e) => updateActivity(dayIndex, activityIndex, 'estimated_cost', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Activity description"
                    value={activity.description}
                    onChange={(e) => updateActivity(dayIndex, activityIndex, 'description', e.target.value)}
                    rows={2}
                    className="mt-3"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ItineraryBuilder;
