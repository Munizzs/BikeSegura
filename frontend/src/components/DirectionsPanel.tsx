import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navigation, MapPin, Clock, Route } from 'lucide-react';

interface DirectionsPanelProps {
  onDirectionsRequest: (origin: string, destination: string) => void;
  directionsData: google.maps.DirectionsResult | null;
  isLoading: boolean;
}

export function DirectionsPanel({ onDirectionsRequest, directionsData, isLoading }: DirectionsPanelProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      onDirectionsRequest(origin, destination);
    }
  };

  const route = directionsData?.routes[0];
  const leg = route?.legs[0];

  return (
    <div className="w-full md:w-96 bg-white shadow-lg overflow-y-auto flex flex-col">
      <div className="p-6 border-b">
        <h1 className="mb-6 text-blue-600 flex items-center gap-2">
          <Navigation className="w-6 h-6" />
          Directions
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              Origin
            </label>
            <Input
              type="text"
              placeholder="Choose starting point..."
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-red-500" />
              Destination
            </label>
            <Input
              type="text"
              placeholder="Choose destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!origin || !destination || isLoading}
          >
            {isLoading ? 'Getting Directions...' : 'Get Directions'}
          </Button>
        </form>
      </div>

      {leg && (
        <div className="p-6 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Route className="w-5 h-5" />
                <span>Distance</span>
              </div>
              <span className="text-blue-600">{leg.distance?.text}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <span>Duration</span>
              </div>
              <span className="text-blue-600">{leg.duration?.text}</span>
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="text-gray-700">Step-by-step directions</h3>
            <div className="space-y-2">
              {leg.steps?.map((step, index) => (
                <Card key={index} className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                      />
                      <div className="text-gray-500 mt-1">
                        {step.distance?.text} · {step.duration?.text}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {!directionsData && !isLoading && (
        <div className="p-6 text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Enter origin and destination to get directions</p>
        </div>
      )}
    </div>
  );
}
