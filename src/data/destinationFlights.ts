
export const destinationFlights = {
  'goa': [
    {
      id: 1,
      airline: "IndiGo",
      flightNumber: "6E 6147",
      departure: { time: "08:30", airport: "DEL", city: "Delhi" },
      arrival: { time: "11:15", airport: "GOI", city: "Goa" },
      duration: "2h 45m",
      price: 6500,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 89
    },
    {
      id: 2,
      airline: "Air India",
      flightNumber: "AI 439",
      departure: { time: "14:20", airport: "BOM", city: "Mumbai" },
      arrival: { time: "15:35", airport: "GOI", city: "Goa" },
      duration: "1h 15m",
      price: 4800,
      stops: "Non-stop",
      amenities: ["meals", "entertainment"],
      class: "Economy",
      aircraft: "Boeing 737-800",
      onTimePerformance: 85
    },
    {
      id: 3,
      airline: "Vistara",
      flightNumber: "UK 881",
      departure: { time: "19:45", airport: "DEL", city: "Delhi" },
      arrival: { time: "22:30", airport: "GOI", city: "Goa" },
      duration: "2h 45m",
      price: 8900,
      stops: "Non-stop",
      amenities: ["wifi", "meals", "entertainment"],
      class: "Premium Economy",
      aircraft: "Airbus A321",
      onTimePerformance: 92
    }
  ],
  'kerala': [
    {
      id: 4,
      airline: "IndiGo",
      flightNumber: "6E 385",
      departure: { time: "06:45", airport: "DEL", city: "Delhi" },
      arrival: { time: "10:15", airport: "COK", city: "Kochi" },
      duration: "3h 30m",
      price: 7200,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 88
    },
    {
      id: 5,
      airline: "Air India Express",
      flightNumber: "IX 539",
      departure: { time: "12:30", airport: "BOM", city: "Mumbai" },
      arrival: { time: "14:45", airport: "TRV", city: "Trivandrum" },
      duration: "2h 15m",
      price: 5400,
      stops: "Non-stop",
      amenities: ["snacks"],
      class: "Economy",
      aircraft: "Boeing 737-800",
      onTimePerformance: 82
    },
    {
      id: 6,
      airline: "SpiceJet",
      flightNumber: "SG 461",
      departure: { time: "16:10", airport: "BLR", city: "Bangalore" },
      arrival: { time: "17:25", airport: "COK", city: "Kochi" },
      duration: "1h 15m",
      price: 3800,
      stops: "Non-stop",
      amenities: ["snacks"],
      class: "Economy",
      aircraft: "Boeing 737-800",
      onTimePerformance: 79
    }
  ],
  'rajasthan': [
    {
      id: 7,
      airline: "IndiGo",
      flightNumber: "6E 6671",
      departure: { time: "07:15", airport: "DEL", city: "Delhi" },
      arrival: { time: "08:45", airport: "JAI", city: "Jaipur" },
      duration: "1h 30m",
      price: 4200,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 91
    },
    {
      id: 8,
      airline: "Air India",
      flightNumber: "AI 9819",
      departure: { time: "13:45", airport: "BOM", city: "Mumbai" },
      arrival: { time: "15:20", airport: "UDR", city: "Udaipur" },
      duration: "1h 35m",
      price: 6800,
      stops: "Non-stop",
      amenities: ["meals", "entertainment"],
      class: "Economy",
      aircraft: "ATR 72",
      onTimePerformance: 86
    },
    {
      id: 9,
      airline: "Vistara",
      flightNumber: "UK 693",
      departure: { time: "18:30", airport: "DEL", city: "Delhi" },
      arrival: { time: "19:45", airport: "JDH", city: "Jodhpur" },
      duration: "1h 15m",
      price: 7500,
      stops: "Non-stop",
      amenities: ["wifi", "meals", "entertainment"],
      class: "Premium Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 89
    }
  ],
  'himachal': [
    {
      id: 10,
      airline: "IndiGo",
      flightNumber: "6E 6025",
      departure: { time: "09:20", airport: "DEL", city: "Delhi" },
      arrival: { time: "10:35", airport: "KUU", city: "Kullu" },
      duration: "1h 15m",
      price: 5500,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "ATR 72",
      onTimePerformance: 87
    },
    {
      id: 11,
      airline: "Air India",
      flightNumber: "AI 9814",
      departure: { time: "15:45", airport: "CHD", city: "Chandigarh" },
      arrival: { time: "16:30", airport: "KUU", city: "Kullu" },
      duration: "45m",
      price: 3200,
      stops: "Non-stop",
      amenities: ["snacks"],
      class: "Economy",
      aircraft: "ATR 42",
      onTimePerformance: 83
    }
  ],
  'agra': [
    {
      id: 12,
      airline: "IndiGo",
      flightNumber: "6E 2025",
      departure: { time: "08:00", airport: "BOM", city: "Mumbai" },
      arrival: { time: "10:15", airport: "AGR", city: "Agra" },
      duration: "2h 15m",
      price: 6200,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 90
    },
    {
      id: 13,
      airline: "Air India",
      flightNumber: "AI 402",
      departure: { time: "14:30", airport: "DEL", city: "Delhi" },
      arrival: { time: "15:15", airport: "AGR", city: "Agra" },
      duration: "45m",
      price: 3800,
      stops: "Non-stop",
      amenities: ["snacks"],
      class: "Economy",
      aircraft: "ATR 72",
      onTimePerformance: 88
    }
  ],
  'kashmir': [
    {
      id: 14,
      airline: "IndiGo",
      flightNumber: "6E 6169",
      departure: { time: "07:30", airport: "DEL", city: "Delhi" },
      arrival: { time: "09:15", airport: "SXR", city: "Srinagar" },
      duration: "1h 45m",
      price: 7800,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 85
    },
    {
      id: 15,
      airline: "Air India",
      flightNumber: "AI 821",
      departure: { time: "12:45", airport: "BOM", city: "Mumbai" },
      arrival: { time: "15:30", airport: "SXR", city: "Srinagar" },
      duration: "2h 45m",
      price: 9500,
      stops: "Non-stop",
      amenities: ["meals", "entertainment"],
      class: "Economy",
      aircraft: "Boeing 737-800",
      onTimePerformance: 82
    }
  ],
  'rishikesh': [
    {
      id: 16,
      airline: "IndiGo",
      flightNumber: "6E 2134",
      departure: { time: "10:15", airport: "BOM", city: "Mumbai" },
      arrival: { time: "12:30", airport: "DED", city: "Dehradun" },
      duration: "2h 15m",
      price: 6800,
      stops: "Non-stop",
      amenities: ["wifi", "snacks"],
      class: "Economy",
      aircraft: "Airbus A320",
      onTimePerformance: 89
    },
    {
      id: 17,
      airline: "SpiceJet",
      flightNumber: "SG 8194",
      departure: { time: "16:20", airport: "DEL", city: "Delhi" },
      arrival: { time: "17:15", airport: "DED", city: "Dehradun" },
      duration: "55m",
      price: 4200,
      stops: "Non-stop",
      amenities: ["snacks"],
      class: "Economy",
      aircraft: "Bombardier Q400",
      onTimePerformance: 84
    }
  ]
};

export const getAllDestinationFlights = () => destinationFlights;

export const getFlightsByDestination = (destinationId: string) => {
  return destinationFlights[destinationId as keyof typeof destinationFlights] || [];
};
