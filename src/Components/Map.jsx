import React, { useState, useRef, useCallback, useEffect } from "react";

export default function MapComponent({ onLocationSelect, latitude: propLat, longitude: propLng }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const defaultCenter = { lat: 36.7538, lng: 3.0588 }; // Algiers

  const placeMarker = (lat, lng, map) => {
    setLatitude(lat);
    setLongitude(lng);
    onLocationSelect?.(lat, lng);

    if (markerRef.current) markerRef.current.setMap(null);

    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      draggable: true,
    });

    markerRef.current.addListener("dragend", (e) => {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      setLatitude(newLat);
      setLongitude(newLng);
      onLocationSelect?.(newLat, newLng);
    });
  };

  const initMap = useCallback(() => {
    // Use props if available at init
    const hasProps = propLat != null && propLng != null;
    const initialCenter = hasProps
      ? { lat: Number(propLat), lng: Number(propLng) }
      : defaultCenter;

    const map = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: hasProps ? 12 : 8,
    });

    map.addListener("click", (e) => {
      placeMarker(e.latLng.lat(), e.latLng.lng(), map);
    });

    mapInstance.current = map;
    setIsMapReady(true);

    // Drop marker if props already provided on mount
    if (hasProps) {
      placeMarker(Number(propLat), Number(propLng), map);
    }
  }, [propLat, propLng]);

  // Load Google Maps script once
  useEffect(() => {
    if (!window.google) {
      if (!document.getElementById("google-maps-sdk")) {
        const script = document.createElement("script");
        script.id = "google-maps-sdk";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.body.appendChild(script);
      }
    } else {
      initMap();
    }
  }, [initMap]);

  // Recenter when props change AND map is ready
  useEffect(() => {
    if (!isMapReady || mapInstance.current == null) return;
    if (propLat == null || propLng == null) return;

    const lat = Number(propLat);
    const lng = Number(propLng);

    // Avoid redundant re-center if same position
    if (latitude !== null && longitude !== null) {
      const same =
        Math.abs(latitude - lat) < 1e-9 && Math.abs(longitude - lng) < 1e-9;
      if (same) return;
    }

    mapInstance.current.setCenter({ lat, lng });
    mapInstance.current.setZoom(12);
    placeMarker(lat, lng, mapInstance.current);
  }, [propLat, propLng, isMapReady]); // intentionally NOT depending on latitude/longitude

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Cliquez sur la carte ou sélectionnez une ville
      </h1>

      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg mb-4"
      />

      {latitude !== null && longitude !== null && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium">
            Latitude: <span className="font-semibold">{latitude.toFixed(6)}</span>
          </p>
          <p className="text-lg font-medium">
            Longitude: <span className="font-semibold">{longitude.toFixed(6)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
