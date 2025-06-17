import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  destination: string;
  coordinates?: { lat: number; lng: number };
}

const WeatherWidget = ({ destination, coordinates }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!destination) return;
      
      setLoading(true);
      setError(null);
      
      try {
        let url;
        if (coordinates) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${API_KEY}&units=metric`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)}&appid=${API_KEY}&units=metric`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Unable to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination, coordinates, API_KEY]);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('rain')) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (condition.includes('cloud')) return <Cloud className="h-6 w-6 text-gray-500" />;
    return <Sun className="h-6 w-6 text-yellow-500" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Weather in {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weather && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getWeatherIcon(weather.weather[0].main.toLowerCase())}
                <span className="capitalize">{weather.weather[0].description}</span>
              </div>
              <span className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Feels like</p>
                <p className="font-medium">{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div>
                <p className="text-muted-foreground">Humidity</p>
                <p className="font-medium">{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Min / Max</p>
                <p className="font-medium">{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</p>
              </div>
              <div>
                <p className="text-muted-foreground">Wind Speed</p>
                <p className="font-medium">{weather.wind?.speed || 0} m/s</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
