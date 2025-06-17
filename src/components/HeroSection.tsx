import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Plane, Building, Palmtree, TrainFront, Bus } from "lucide-react";
import { format } from "date-fns";

const HeroSection = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [journeyDate, setJourneyDate] = useState<Date>();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[600px] bg-cover bg-center" style={{ backgroundImage: `url('/photos/e8c23dcb-2219-46b0-a0c9-c137f3ed6d0d.png')` }}>
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore the World
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover amazing destinations, book flights & hotels, and create unforgettable memories
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-6">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/20">
                <TabsTrigger value="flights" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                  <Plane className="h-4 w-4" />
                  Flights
                </TabsTrigger>
                <TabsTrigger value="trains" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                  <TrainFront className="h-4 w-4" />
                  Trains
                </TabsTrigger>
                <TabsTrigger value="buses" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                  <Bus className="h-4 w-4" />
                  Buses
                </TabsTrigger>
                <TabsTrigger value="hotels" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                  <Building className="h-4 w-4" />
                  Hotels
                </TabsTrigger>
                <TabsTrigger value="holidays" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30">
                  <Palmtree className="h-4 w-4" />
                  Holidays
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flights" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="from" placeholder="Delhi" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="to" placeholder="Mumbai" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Departure</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Return</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button className="w-full mt-6 gradient-button" size="lg" onClick={() => navigate('/flights')}>
                  Search Flights
                </Button>
              </TabsContent>

              <TabsContent value="trains" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-train">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="from-train" placeholder="Delhi" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-train">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="to-train" placeholder="Mumbai" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Journey</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {journeyDate ? format(journeyDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={journeyDate}
                          onSelect={setJourneyDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button className="w-full mt-6 gradient-button" size="lg" onClick={() => navigate('/trains')}>
                  Search Trains
                </Button>
              </TabsContent>

              <TabsContent value="buses" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-bus">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="from-bus" placeholder="Delhi" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-bus">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="to-bus" placeholder="Mumbai" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Journey</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {journeyDate ? format(journeyDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={journeyDate}
                          onSelect={setJourneyDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button className="w-full mt-6 gradient-button" size="lg" onClick={() => navigate('/buses')}>
                  Search Buses
                </Button>
              </TabsContent>

              <TabsContent value="hotels" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="city" placeholder="Goa" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/20 border-white/30 hover:bg-white/30">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Guests</Label>
                    <Select>
                      <SelectTrigger className="bg-white/20 border-white/30">
                        <SelectValue placeholder="2 Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full mt-6 gradient-button" size="lg" onClick={() => navigate('/hotels')}>
                  Search Hotels
                </Button>
              </TabsContent>

              <TabsContent value="holidays" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="destination" placeholder="Kerala" className="pl-10 bg-white/20 border-white/30 placeholder:text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select>
                      <SelectTrigger className="bg-white/20 border-white/30">
                        <SelectValue placeholder="7 Days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="10">10 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <Select>
                      <SelectTrigger className="bg-white/20 border-white/30">
                        <SelectValue placeholder="₹20,000 - ₹50,000" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">₹10,000 - ₹25,000</SelectItem>
                        <SelectItem value="mid">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="luxury">₹50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full mt-6 gradient-button" size="lg" onClick={() => navigate('/holidays')}>
                  Explore Packages
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
