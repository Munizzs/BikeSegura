import { useEffect, useState, useCallback } from 'react';
import { MapComponent } from '../MapComponent';
import { DirectionsPanel } from '../DirectionsPanel';
import { Toaster, toast } from "sonner";
import { Card } from '../ui/card';
import { AlertCircle } from 'lucide-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const GOOGLE_MAPS_API_KEY = 'AIzaSyC-FBLwAcZyUKa3kr1w-bB7BLwfjl6e6rM';

const isApiKeyConfigured = "AIzaSyC-FBLwAcZyUKa3kr1w-bB7BLwfjl6e6rM";
 
export default function MapPage() {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [directionsData, setDirectionsData] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);


  // Load Google Maps script
  useEffect(() => {
    if (!isApiKeyConfigured) {
      setHasError(true);
      return;
    }

    if (window.google?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      setHasError(false);
    };
    script.onerror = () => {
      setHasError(true);
      toast.error('Failed to load Google Maps. Please check your API key.');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isApiKeyConfigured]);

  // Initialize directions renderer when map is loaded
  useEffect(() => {
    if (mapInstance && !directionsRenderer && isScriptLoaded) {
      const renderer = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#4285F4',
          strokeWeight: 5,
          strokeOpacity: 0.8,
        },
      });
      setDirectionsRenderer(renderer);
    }
  }, [mapInstance, directionsRenderer, isScriptLoaded]);

  const handleDirectionsRequest = useCallback(
    async (origin: string, destination: string) => {
      if (!isScriptLoaded || !directionsRenderer) {
        toast.error('Map is still loading. Please wait...');
        return;
      }

      setIsLoading(true);
      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await directionsService.route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        directionsRenderer.setDirections(result);
        setDirectionsData(result);
        toast.success('Directions loaded successfully!');
      } catch (error) {
        console.error('Directions request failed:', error);
        toast.error('Could not calculate directions. Please check your locations.');
        setDirectionsData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [directionsRenderer, isScriptLoaded]
  );

  if (hasError || !isApiKeyConfigured) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-2xl p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-red-600 mb-4">Google Maps API Key Required</h2>
              <div className="space-y-3 text-gray-700">
                <p>To use this application, you need to configure a Google Maps API key.</p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="mb-2">Follow these steps:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                    <li>Create a new project or select an existing one</li>
                    <li>Enable the following APIs:
                      <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
                        <li>Maps JavaScript API</li>
                        <li>Directions API</li>
                        <li>Places API (optional)</li>
                      </ul>
                    </li>
                    <li>Create credentials and get your API key</li>
                    <li>Open <code className="bg-gray-200 px-2 py-1 rounded">/App.tsx</code> and replace <code className="bg-gray-200 px-2 py-1 rounded">AIzaSyC-vl7QTewu1iXnePFjgT_EjY7bb0ml5n4</code> with your actual API key</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <p className="text-blue-800">
                    <strong>Note:</strong> This is for academic/development purposes only. In production, API keys should be secured on the backend.
                  </p>
                </div>

                <p className="mt-4">
                  <a 
                    href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    📚 View Google Maps API Documentation →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!isScriptLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <DirectionsPanel
        onDirectionsRequest={handleDirectionsRequest}
        directionsData={directionsData}
        isLoading={isLoading}
      />
      <div className="flex-1 relative">
        <MapComponent onMapLoad={setMapInstance} />
      </div>
    </div>
  );
}
