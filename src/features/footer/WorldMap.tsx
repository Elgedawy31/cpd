"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  offset,
  flip,
  shift,
  arrow,
  Placement,
  computePosition,
} from "@floating-ui/react";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const saudiArabiaLocations: Location[] = [
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

const saudiArabiaGroup: LocationGroup = {
  locations: saudiArabiaLocations,
  lat: (saudiArabiaLocations[0].lat + saudiArabiaLocations[1].lat) / 2,
  lng: (saudiArabiaLocations[0].lng + saudiArabiaLocations[1].lng) / 2,
};

const egyptLocations: Location[] = [
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
];

const egyptGroup: LocationGroup = {
  locations: egyptLocations,
  lat: egyptLocations.reduce((sum, loc) => sum + loc.lat, 0) / egyptLocations.length,
  lng: egyptLocations.reduce((sum, loc) => sum + loc.lng, 0) / egyptLocations.length,
};

const individualLocations: Location[] = [
  {
    name: "Rotterdam Office",
    address: "10th Floor, Weena 290, Rotterdam, Netherlands",
    lat: 51.9244,
    lng: 4.4777,
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

interface LocationGroup {
  locations: Location[];
  lat: number;
  lng: number;
}

interface PopoverProps {
  location?: Location;
  group?: LocationGroup;
  position: { x: number; y: number } | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

function LocationPopover({ location, group, position, containerRef, isOpen, onClose }: PopoverProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [computedStyles, setComputedStyles] = useState<{ left: number; top: number; placement: Placement } | null>(null);
  
  useEffect(() => {
    if (!isOpen || !position || !containerRef.current) {
      setComputedStyles(null);
      return;
    }

    // Calculate position relative to container
    const containerRect = containerRef.current.getBoundingClientRect();
    const left = position.x - containerRect.left;
    const top = position.y - containerRect.top;

    // Simple positioning - above the marker
    setComputedStyles({
      left: left,
      top: top - 60, // Position above marker
      placement: "top",
    });

    // Then use computePosition to refine if popover ref is available
    if (popoverRef.current) {
      const virtualRef = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: position.x,
          y: position.y,
          top: position.y,
          left: position.x,
          right: position.x,
          bottom: position.y,
        }),
      };

      computePosition(virtualRef as unknown as Element, popoverRef.current, {
        placement: "top",
        strategy: "absolute",
        middleware: [
          offset(12),
          flip({ fallbackAxisSideDirection: "start" }),
          shift({ padding: 8 }),
          arrow({ element: arrowRef.current }),
        ],
      }).then(({ x, y, placement: computedPlacement }) => {
        setComputedStyles({
          left: x,
          top: y,
          placement: computedPlacement,
        });
      }).catch(() => {
        // Fallback to simple positioning if computePosition fails
      });
    }
  }, [position, isOpen, containerRef]);

  // Determine flag based on location
  const getFlagSrc = (loc?: Location, grp?: LocationGroup) => {
    if (grp) {
      // Group is always Saudi Arabia
      return "/ar.png";
    }
    if (loc) {
      // Check if location is in Saudi Arabia locations
      const isSaudiArabia = saudiArabiaLocations.some(
        saLoc => saLoc.name === loc.name && saLoc.lat === loc.lat && saLoc.lng === loc.lng
      );
      return isSaudiArabia ? "/ar.png" : "/en.png";
    }
    return "/en.png";
  };

  const content = location ? (
    <>
      <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
        <Image src={getFlagSrc(location)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
      </div>
      <p className="text-sm font-bold text-card-foreground mb-1.5">{location.name}</p>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{location.address}</p>
    </>
  ) : group ? (
    <>
      <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
        <Image src={getFlagSrc(undefined, group)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
      </div>
      {group.locations.map((loc, index) => (
        <div key={index} className={index > 0 ? "mt-3 pt-3 border-t border-border" : ""}>
          <p className="text-sm font-bold text-card-foreground mb-1.5">{loc.name}</p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{loc.address}</p>
        </div>
      ))}
    </>
  ) : null;

  if (!isOpen || !content || !position || !containerRef.current || !computedStyles) return null;

  return (
    <div
      ref={popoverRef}
      style={{
        left: `${computedStyles.left}px`,
        top: `${computedStyles.top}px`,
      }}
      className="absolute z-50 animate-in fade-in-0 zoom-in-95 duration-200"
      data-popover
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      <div className="flex flex-col items-center p-4 bg-card rounded-xl shadow-xl text-center border border-border backdrop-blur-sm">
        {content}
      </div>
      <div
        ref={arrowRef}
        className="absolute w-3 h-3 bg-card border-l border-b border-border"
        style={{
          transform: computedStyles.placement.includes("top") ? "rotate(45deg)" : "rotate(225deg)",
          bottom: computedStyles.placement.includes("top") ? "-6px" : "auto",
          top: computedStyles.placement.includes("bottom") ? "-6px" : "auto",
          left: "50%",
          marginLeft: "-6px",
        }}
      />
    </div>
  );
}

export default function WorldDottedMap() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [activeGroup, setActiveGroup] = useState<LocationGroup | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMarkerEnter = (loc: Location, event: React.MouseEvent<SVGCircleElement>) => {
    setActiveLocation(loc);
    setActiveGroup(null);
    const circleRect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: circleRect.left + circleRect.width / 2,
      y: circleRect.top + circleRect.height / 2,
    });
  };

  const handleGroupMarkerEnter = (group: LocationGroup, event: React.MouseEvent<SVGCircleElement>) => {
    setActiveGroup(group);
    setActiveLocation(null);
    const circleRect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: circleRect.left + circleRect.width / 2,
      y: circleRect.top + circleRect.height / 2,
    });
  };

  const handleMarkerLeave = () => {
    // Small delay to allow moving to popover
    setTimeout(() => {
      if (!mapContainerRef.current?.querySelector('[data-popover]:hover')) {
        setActiveLocation(null);
        setActiveGroup(null);
        setPopoverPosition(null);
      }
    }, 100);
  };

  return (
    <div ref={mapContainerRef} className="w-full relative max-h-[70vh]">
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

        {/* Individual Location Markers */}
        {individualLocations.map((loc, i) => (
          <Marker
            key={i}
            coordinates={[loc.lng, loc.lat]}
          >
            {/* Pulse */}
            <circle 
              r={6} 
              fill="rgba(var(--shadow-color-rgb),0.15)" 
              onMouseEnter={(e) => handleMarkerEnter(loc, e)}
              onMouseLeave={handleMarkerLeave}
            />
            <circle 
              r={3} 
              fill="var(--color-primary)"
              onMouseEnter={(e) => handleMarkerEnter(loc, e)}
              onMouseLeave={handleMarkerLeave}
            />
          </Marker>
        ))}

        {/* Saudi Arabia Grouped Marker */}
        <Marker
          coordinates={[saudiArabiaGroup.lng, saudiArabiaGroup.lat]}
        >
          {/* Pulse */}
          <circle 
            r={6} 
            fill="rgba(var(--shadow-color-rgb),0.15)" 
            onMouseEnter={(e) => handleGroupMarkerEnter(saudiArabiaGroup, e)}
            onMouseLeave={handleMarkerLeave}
          />
          <circle 
            r={3} 
            fill="var(--color-primary)"
            onMouseEnter={(e) => handleGroupMarkerEnter(saudiArabiaGroup, e)}
            onMouseLeave={handleMarkerLeave}
          />
        </Marker>
      </ComposableMap>

      {/* Professional Popover */}
      <LocationPopover
        location={activeLocation || undefined}
        group={activeGroup || undefined}
        position={popoverPosition}
        containerRef={mapContainerRef}
        isOpen={!!(activeLocation || activeGroup)}
        onClose={() => {
          setActiveLocation(null);
          setActiveGroup(null);
          setPopoverPosition(null);
        }}
      />
    </div>
  );
}