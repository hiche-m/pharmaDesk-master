import * as React from 'react';
import { useState, useMemo, useCallback } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"

function LocationMarker({ onLocationChange }) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })

  return position === null ? null : <Marker position={position} />
}

export default function MapComponent() {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const handleLocationChange = useCallback((lat, lng) => {
    setLatitude(lat)
    setLongitude(lng)
  }, [])

  const defaultCenter = useMemo(() => [51.505, -0.09], []) // Default to London

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Click on the Map to Get Coordinates</h1>
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg mb-4">
        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Default OpenStreetMap tiles
          />
          <LocationMarker onLocationChange={handleLocationChange} />
        </MapContainer>
      </div>
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
  )
}
