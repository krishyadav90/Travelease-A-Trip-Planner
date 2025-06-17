
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Navigation } from "lucide-react";

interface InteractiveMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  style?: string;
}

const InteractiveMap = ({ lat = 27.1751, lng = 78.0421, zoom = 5, style = "mapbox://styles/mapbox/streets-v11" }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenSet, setTokenSet] = useState(false);
  const [mapboxgl, setMapboxgl] = useState<any>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (tokenSet && mapboxToken) {
      import('mapbox-gl').then((mapboxModule) => {
        import('mapbox-gl/dist/mapbox-gl.css');
        setMapboxgl(mapboxModule.default);
      });
    }
  }, [tokenSet, mapboxToken]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl || !mapboxToken || !lat || !lng) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [lng, lat],
      zoom,
    });

    const nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    });
    map.current.addControl(nav, 'top-right');
    
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    
    new mapboxgl.Marker({ color: '#3B82F6' })
      .setLngLat([lng, lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lat, lng, zoom, style, mapboxgl, mapboxToken]);

  const handleSetToken = () => {
    if (mapboxToken.trim()) {
      setTokenSet(true);
    }
  };

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleGetDirections = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert("Unable to retrieve your location. Please ensure location services are enabled in your browser settings.");
        setIsGettingLocation(false);
      }
    );
  };

  if (!tokenSet) {
    return (
      <Card className="w-full bg-white/25 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To display the interactive map, please enter your Mapbox public token. 
            You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              type="password"
            />
            <Button onClick={handleSetToken} disabled={!mapboxToken.trim()}>
              Set Token
            </Button>
          </div>
          <div className="pt-4 mt-4 border-t space-y-2">
            <Button 
              onClick={openInGoogleMaps}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Google Maps
            </Button>
            <Button
              onClick={handleGetDirections}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={isGettingLocation}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isGettingLocation ? 'Getting Location...' : 'Get Directions'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-lg" />
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        <Button 
          onClick={openInGoogleMaps}
          variant="secondary"
          size="sm"
          className="bg-white/90 hover:bg-white"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Google Maps
        </Button>
         <Button
          onClick={handleGetDirections}
          variant="secondary"
          size="sm"
          className="bg-white/90 hover:bg-white"
          disabled={isGettingLocation}
        >
          <Navigation className="h-4 w-4 mr-2" />
          {isGettingLocation ? 'Getting...' : 'Directions'}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveMap;
