import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoTravelersProps {
  coTravelers: any[];
  setCoTravelers: (travelers: any[]) => void;
}

const relationshipTypes = [
  "Spouse/Partner", "Family Member", "Friend", "Colleague", 
  "Travel Buddy", "Guide", "Other"
];

const CoTravelers = ({ coTravelers, setCoTravelers }: CoTravelersProps) => {
  const { toast } = useToast();
  const [newCoTraveler, setNewCoTraveler] = useState({
    name: "",
    relationship: "",
    age: "",
    contact_email: "",
    contact_phone: "",
    dietary_restrictions: "",
    accessibility_needs: "",
    emergency_contact: "",
    notes: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const addCoTraveler = () => {
    if (!newCoTraveler.name || !newCoTraveler.relationship) {
      toast({
        title: "Error",
        description: "Name and relationship are required fields.",
        variant: "destructive"
      });
      return;
    }

    const traveler = {
      id: Date.now().toString(),
      ...newCoTraveler,
      age: newCoTraveler.age ? parseInt(newCoTraveler.age) : 0,
    };

    setCoTravelers([...coTravelers, traveler]);
    setNewCoTraveler({
      name: "",
      relationship: "",
      age: "",
      contact_email: "",
      contact_phone: "",
      dietary_restrictions: "",
      accessibility_needs: "",
      emergency_contact: "",
      notes: ""
    });

    toast({
      title: "Success",
      description: "Co-traveler added successfully!"
    });
  };

  const removeCoTraveler = (id: string) => {
    setCoTravelers(coTravelers.filter(traveler => traveler.id !== id));
    toast({
      title: "Success",
      description: "Co-traveler removed successfully!"
    });
  };

  const updateCoTraveler = (id: string, updatedData: any) => {
    setCoTravelers(coTravelers.map(traveler => 
      traveler.id === id ? { ...traveler, ...updatedData } : traveler
    ));
    setEditingId(null);
    toast({
      title: "Success",
      description: "Co-traveler updated successfully!"
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Co-Traveler */}
      <Card className="bg-white/25 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Co-Traveler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newCoTraveler.name}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, name: e.target.value})}
                placeholder="Full name"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship *</Label>
              <Select 
                value={newCoTraveler.relationship} 
                onValueChange={(value) => setNewCoTraveler({...newCoTraveler, relationship: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={newCoTraveler.age}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, age: e.target.value})}
                placeholder="Age"
              />
            </div>
            <div>
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={newCoTraveler.contact_email}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, contact_email: e.target.value})}
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={newCoTraveler.contact_phone}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, contact_phone: e.target.value})}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label htmlFor="emergency_contact">Emergency Contact</Label>
              <Input
                id="emergency_contact"
                value={newCoTraveler.emergency_contact}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, emergency_contact: e.target.value})}
                placeholder="Emergency contact details"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dietary">Dietary Restrictions</Label>
              <Textarea
                id="dietary"
                value={newCoTraveler.dietary_restrictions}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, dietary_restrictions: e.target.value})}
                placeholder="Any dietary restrictions..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="accessibility">Accessibility Needs</Label>
              <Textarea
                id="accessibility"
                value={newCoTraveler.accessibility_needs}
                onChange={(e) => setNewCoTraveler({...newCoTraveler, accessibility_needs: e.target.value})}
                placeholder="Any accessibility requirements..."
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={newCoTraveler.notes}
              onChange={(e) => setNewCoTraveler({...newCoTraveler, notes: e.target.value})}
              placeholder="Additional notes about this co-traveler..."
              rows={2}
            />
          </div>

          <Button onClick={addCoTraveler} className="w-full">
            Add Co-Traveler
          </Button>
        </CardContent>
      </Card>

      {/* Existing Co-Travelers */}
      {coTravelers && coTravelers.length > 0 && (
        <Card className="bg-white/25 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Co-Travelers ({coTravelers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coTravelers.map((traveler) => (
                <div key={traveler.id} className="border rounded-lg p-4 bg-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{traveler.name}</h4>
                      <Badge variant="outline">{traveler.relationship}</Badge>
                      {traveler.age > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          Age: {traveler.age}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(traveler.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCoTraveler(traveler.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {traveler.contact_email && (
                      <div><strong>Email:</strong> {traveler.contact_email}</div>
                    )}
                    {traveler.contact_phone && (
                      <div><strong>Phone:</strong> {traveler.contact_phone}</div>
                    )}
                    {traveler.emergency_contact && (
                      <div><strong>Emergency:</strong> {traveler.emergency_contact}</div>
                    )}
                    {traveler.dietary_restrictions && (
                      <div><strong>Dietary:</strong> {traveler.dietary_restrictions}</div>
                    )}
                    {traveler.accessibility_needs && (
                      <div><strong>Accessibility:</strong> {traveler.accessibility_needs}</div>
                    )}
                    {traveler.notes && (
                      <div><strong>Notes:</strong> {traveler.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoTravelers;
