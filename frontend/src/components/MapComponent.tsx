import { useEffect, useRef } from 'react';

interface MapComponentProps {
  onMapLoad?: (map: google.maps.Map) => void;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

export function MapComponent({ onMapLoad, center = { lat: -23.5505, lng: -46.6333 }, zoom = 12 }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapInstanceRef.current = map;
    if (onMapLoad) {
      onMapLoad(map);
    }
  }, [center, zoom, onMapLoad]);

  return <div ref={mapRef} className="w-full h-full" />;
}
