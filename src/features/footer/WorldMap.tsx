"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState } from "react";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations: Location[] = [
  {
    name: "Rotterdam, NL",
    lat: 51.9233814,
    lng: 4.4742916,
  },
  {
    name: "Cairo, EG",
    lat: 30.0522681,
    lng: 31.3463478,
  },
  {
    name: "Riyadh, SA",
    lat: 24.6624446,
    lng: 46.7287761,
  },
  {
    name: "Melbourne, AU",
    lat: -37.8136,
    lng: 144.9631,
  },
];

interface GeographyObject {
  rsmKey: string;
  // Add other properties if needed based on the actual structure of a geography object
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

export default function WorldDottedMap() {
  const [active, setActive] = useState<Location | null>(null);

  return (
    <div className="w-full relative container mx-auto max-h-[70vh]">
      <ComposableMap
        className="w-full h-fit relative -top-20"
      >
        {/* World shape */}
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: GeographyObject[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--color-background)"
                stroke="none"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Markers */}
        {locations.map((loc, i) => (
          <Marker
            key={i}
            coordinates={[loc.lng, loc.lat]}
            onMouseEnter={() => setActive(loc)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Pulse */}
            <circle r={6} fill="rgba(var(--shadow-color-rgb),0.15)" />
            <circle r={3} fill="var(--color-primary)/10" />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip Card */}
      {active && (
        <div className="absolute right-10 bottom-10 bg-white shadow-lg rounded-lg p-4 text-sm">
          <strong>{active.name}</strong>
          <div className="opacity-70 mt-1">Office location</div>
        </div>
      )}
    </div>
  );
}
