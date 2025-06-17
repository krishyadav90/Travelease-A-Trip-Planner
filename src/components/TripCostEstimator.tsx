
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PlusCircle, MinusCircle } from "lucide-react";

const TripCostEstimator = () => {
  const [tripData, setTripData] = useState({
    duration: 3,
    travelers: 2,
    accommodation: "mid-range",
    transport: "flight",
    activities: 5
  });

  const [customExpenses, setCustomExpenses] = useState([
    { name: "", amount: 0 }
  ]);

  const costBreakdown = {
    accommodation: {
      budget: 1500,
      "mid-range": 3500,
      luxury: 8000
    },
    transport: {
      bus: 500,
      train: 1200,
      flight: 5000,
      car: 2000
    },
    food: {
      budget: 800,
      "mid-range": 1500,
      luxury: 3000
    },
    activities: 1000
  };

  const calculateTotal = () => {
    const accommodation = costBreakdown.accommodation[tripData.accommodation as keyof typeof costBreakdown.accommodation] * tripData.duration;
    const transport = costBreakdown.transport[tripData.transport as keyof typeof costBreakdown.transport] * tripData.travelers;
    const food = costBreakdown.food[tripData.accommodation as keyof typeof costBreakdown.food] * tripData.duration * tripData.travelers;
    const activities = costBreakdown.activities * tripData.activities * tripData.travelers;
    const custom = customExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    
    return {
      accommodation,
      transport,
      food,
      activities,
      custom,
      total: accommodation + transport + food + activities + custom
    };
  };

  const costs = calculateTotal();

  const addCustomExpense = () => {
    setCustomExpenses([...customExpenses, { name: "", amount: 0 }]);
  };

  const removeCustomExpense = (index: number) => {
    setCustomExpenses(customExpenses.filter((_, i) => i !== index));
  };

  const updateCustomExpense = (index: number, field: string, value: string | number) => {
    const updated = [...customExpenses];
    updated[index] = { ...updated[index], [field]: value };
    setCustomExpenses(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Trip Cost Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Trip Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={tripData.duration}
              onChange={(e) => setTripData({...tripData, duration: parseInt(e.target.value) || 1})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers">Number of Travelers</Label>
            <Input
              id="travelers"
              type="number"
              min="1"
              value={tripData.travelers}
              onChange={(e) => setTripData({...tripData, travelers: parseInt(e.target.value) || 1})}
            />
          </div>

          <div className="space-y-2">
            <Label>Accommodation Type</Label>
            <Select value={tripData.accommodation} onValueChange={(value) => setTripData({...tripData, accommodation: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (₹1,500/night)</SelectItem>
                <SelectItem value="mid-range">Mid-range (₹3,500/night)</SelectItem>
                <SelectItem value="luxury">Luxury (₹8,000/night)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Transport Mode</Label>
            <Select value={tripData.transport} onValueChange={(value) => setTripData({...tripData, transport: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">Bus (₹500/person)</SelectItem>
                <SelectItem value="train">Train (₹1,200/person)</SelectItem>
                <SelectItem value="flight">Flight (₹5,000/person)</SelectItem>
                <SelectItem value="car">Car Rental (₹2,000/person)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="activities">Number of Activities</Label>
            <Input
              id="activities"
              type="number"
              min="0"
              value={tripData.activities}
              onChange={(e) => setTripData({...tripData, activities: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        {/* Custom Expenses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Custom Expenses</Label>
            <Button type="button" size="sm" onClick={addCustomExpense}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
          
          {customExpenses.map((expense, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Expense name"
                value={expense.name}
                onChange={(e) => updateCustomExpense(index, 'name', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => updateCustomExpense(index, 'amount', parseFloat(e.target.value) || 0)}
              />
              {customExpenses.length > 1 && (
                <Button type="button" size="sm" variant="outline" onClick={() => removeCustomExpense(index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold">Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Accommodation ({tripData.duration} nights)</span>
              <span>₹{costs.accommodation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Transport ({tripData.travelers} travelers)</span>
              <span>₹{costs.transport.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Food & Dining</span>
              <span>₹{costs.food.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Activities ({tripData.activities} activities)</span>
              <span>₹{costs.activities.toLocaleString()}</span>
            </div>
            {costs.custom > 0 && (
              <div className="flex justify-between">
                <span>Custom Expenses</span>
                <span>₹{costs.custom.toLocaleString()}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Estimated Cost</span>
              <span className="text-green-600">₹{costs.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          * Prices are estimates based on average costs. Actual prices may vary depending on season, availability, and specific choices.
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCostEstimator;
