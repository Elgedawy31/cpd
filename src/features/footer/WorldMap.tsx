"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const popoverRef = useRef<HTMLDivElement>(null);
  const [computedStyles, setComputedStyles] = useState<{ left: number; top: number; placement: "top" | "bottom" } | null>(null);
  
  useEffect(() => {
    if (!isOpen || !position || !containerRef.current) {
      setComputedStyles(null);
      return;
    }

    const updatePosition = () => {
      if (!popoverRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      
      // Calculate position relative to container
      const markerX = position.x - containerRect.left;
      const markerY = position.y - containerRect.top;
      
      // Try positioning above first (top)
      const offset = 12;
      const estimatedHeight = popoverRect.height || 150; // Fallback estimate
      const estimatedWidth = popoverRect.width || 200; // Fallback estimate
      
      let popoverTop = markerY - estimatedHeight - offset;
      let popoverLeft = markerX - estimatedWidth / 2;
      let placement: "top" | "bottom" = "top";
      
      // Check if popover would go above viewport
      if (popoverTop < 8) {
        // Position below instead
        popoverTop = markerY + offset;
        placement = "bottom";
      }
      
      // Keep popover within container bounds horizontally
      const padding = 8;
      if (popoverLeft < padding) {
        popoverLeft = padding;
      } else if (popoverLeft + estimatedWidth > containerRect.width - padding) {
        popoverLeft = containerRect.width - estimatedWidth - padding;
      }
      
      // Keep popover within container bounds vertically
      if (popoverTop < padding) {
        popoverTop = padding;
      } else if (popoverTop + estimatedHeight > containerRect.height - padding) {
        popoverTop = containerRect.height - estimatedHeight - padding;
      }

      setComputedStyles({
        left: popoverLeft,
        top: popoverTop,
        placement,
      });
    };

    // Initial position calculation
    updatePosition();

    // Update position after a short delay to get actual dimensions
    const timer = setTimeout(updatePosition, 10);
    return () => clearTimeout(timer);
  }, [position, isOpen, containerRef]);

  // Determine flag based on location
  const getFlagSrc = (loc?: Location, grp?: LocationGroup) => {
    if (grp) {
      // Check if group is Saudi Arabia or Egypt
      const isSaudiArabia = grp.locations.some(
        gloc => saudiArabiaLocations.some(
          saLoc => saLoc.name === gloc.name && saLoc.lat === gloc.lat && saLoc.lng === gloc.lng
        )
      );
      const isEgypt = grp.locations.some(
        gloc => egyptLocations.some(
          egLoc => egLoc.name === gloc.name && egLoc.lat === gloc.lat && egLoc.lng === gloc.lng
        )
      );
      if (isSaudiArabia) return "/ar.png";
      if (isEgypt) return "/eg.webp";
      return "/netherland.webp";
    }
    if (loc) {
      // Check if location is in Saudi Arabia or Egypt locations
      const isSaudiArabia = saudiArabiaLocations.some(
        saLoc => saLoc.name === loc.name && saLoc.lat === loc.lat && saLoc.lng === loc.lng
      );
      const isEgypt = egyptLocations.some(
        egLoc => egLoc.name === loc.name && egLoc.lat === loc.lat && egLoc.lng === loc.lng
      );
      if (isSaudiArabia) return "/ar.png";
      if (isEgypt) return "/eg.webp";
      return "/netherland.webp";
    }
    return "/netherland.webp";
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
      {/* Arrow pointing to marker */}
      <div
        className="absolute w-3 h-3 bg-card border-l border-b border-border"
        style={{
          transform: computedStyles.placement === "top" ? "rotate(45deg)" : "rotate(225deg)",
          bottom: computedStyles.placement === "top" ? "-6px" : "auto",
          top: computedStyles.placement === "bottom" ? "-6px" : "auto",
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
    <div ref={mapContainerRef} className="w-full relative ">
      <ComposableMap
        className="w-full  relative"
        projectionConfig={{
          center: [15, 0]
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

        {/* Egypt Grouped Marker */}
        <Marker
          coordinates={[egyptGroup.lng, egyptGroup.lat]}
        >
          {/* Pulse */}
          <circle 
            r={6} 
            fill="rgba(var(--shadow-color-rgb),0.15)" 
            onMouseEnter={(e) => handleGroupMarkerEnter(egyptGroup, e)}
            onMouseLeave={handleMarkerLeave}
          />
          <circle 
            r={3} 
            fill="var(--color-primary)"
            onMouseEnter={(e) => handleGroupMarkerEnter(egyptGroup, e)}
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