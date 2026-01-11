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
    name: "Rotterdam Office",
    address: "10th Floor, Weena 290, Rotterdam, Netherlands",
    lat: 51.9244,
    lng: 4.4777,
  },
  {
    name: "Nasr City – Samir Abd El-Raouf (21)",
    lat: 30.0522681,
    lng: 31.3463478,
    address: "Samir Abd El-Raouf, Al Manteqah Al Thamenah, Nasr City, Cairo, Egypt",
  },
  {
    name: "8th District, Nasr City, Cairo",
    lat: 30.0522600,
    lng: 31.3463400,
    address: "8th District, 21 Samir Abd El-Raouf St, 2nd Floor, Nasr City, Cairo, Egypt",
  },
  {
    name: "Al-Mottaheda Tower, Kafr El-Shaikh",
    lat: 31.5610792,
    lng: 31.0813185,
    address: "Al-Mottaheda Tower, 2nd & 9th Floor, Kafr El-Shaikh, Egypt",
  },
  {
    name: "Gadallah Tower, Kafr El-Shaikh",
    lat: 31.5584737,
    lng: 31.0816364,
    address: "Gadallah Tower, 3rd & 4th Floor, Kafr El-Shaikh, Egypt",
  },
  {
    name: "Al Malaz, Riyadh",
    lat: 24.6624446,
    lng: 46.7287761,
    address: "Al Malaz, Riyadh, Saudi Arabia",
  },
  {
    name: "Office 17, North Ring Road, Riyadh",
    lat: 24.7666484,
    lng: 46.7050514,
    address: "Office 17, North Ring Road, Al Wady Dist, Exit 6, Riyadh, Saudi Arabia",
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
  address: string;
}

export default function WorldDottedMap() {
  const [active, setActive] = useState<Location | null>(null);

  return (
    <div className="w-full relative  max-h-[70vh]">
      <ComposableMap
        className="w-full h-[70vh] relative -top-20"
        projectionConfig={{
          scale: 150,
          center: [0, 0]
        }}>
        {/* World shape */}
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: GeographyObject[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--color-muted)"
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
            <circle r={3} fill="var(--color-primary)" />
            {active?.name === loc.name && (
              <g className="animate-in fade-in zoom-in absolute z-50" transform={`translate(0, ${-45})`}>
                <rect
                  x="-75"
                  y="-40"
                  width="150"
                  height="35"
                  rx="5"
                  fill="var(--color-background)"
                  className="shadow-md"
                />
                <text
                  x="-65"
                  y="-20"
                  className="text-[10px] fill-[--color-foreground] font-bold"
                >
                  {loc.name}
                </text>
                <text x="-65" y="-8" className="text-[8px] fill-[--color-muted-foreground]">
                  {loc.address}
                </text>
              </g>
            )}
          </Marker>
        ))}
      </ComposableMap>

    </div>
  );
}