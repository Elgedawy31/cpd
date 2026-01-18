"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// SVG dimensions
const SVG_WIDTH = 1152;
const SVG_HEIGHT = 375;

// Manual position overrides for accurate placement (in percentage of SVG dimensions)
// Adjust these values to match your SVG's actual projection
const manualPositions: Record<string, { xPercent: number; yPercent: number }> = {
  'saudi-arabia': { xPercent: 53.5, yPercent: 40 },
  'egypt': { xPercent: 48.5, yPercent: 37 },
  'rotterdam': { xPercent: 41.2, yPercent: 20 },
};

// Convert lat/lng to pixel coordinates on the SVG
const latLngToPixel = (
  lat: number, 
  lng: number, 
  locationKey?: string
): { x: number; y: number } => {
  // Check if we have a manual position override by location key
  if (locationKey && manualPositions[locationKey]) {
    const pos = manualPositions[locationKey];
    return {
      x: (pos.xPercent / 100) * SVG_WIDTH,
      y: (pos.yPercent / 100) * SVG_HEIGHT,
    };
  }
  
  // Fallback: Equirectangular projection
  const minLng = -180;
  const maxLng = 180;
  const minLat = -85;
  const maxLat = 85;
  
  const normalizedLng = (lng - minLng) / (maxLng - minLng);
  const x = normalizedLng * SVG_WIDTH;
  
  const normalizedLat = (lat - minLat) / (maxLat - minLat);
  const y = (1 - normalizedLat) * SVG_HEIGHT;
  
  return { x, y };
};

// Location data
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
    address: "10th Floor, Weena 290, City Centre, Rotterdam 3012 NJ, Netherlands",
    lat: 51.9244,
    lng: 4.4777,
  },
];

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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function LocationPopover({ location, group, position, containerRef, isOpen, onMouseEnter, onMouseLeave }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [computedStyles, setComputedStyles] = useState<{ left: number; top: number; placement: "top" | "bottom" } | null>(null);
  
  useEffect(() => {
    if (!isOpen || !position || !containerRef.current) {
      setComputedStyles(null);
      return;
    }

    const calculatePosition = () => {
      if (!containerRef.current) return null;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const markerX = position.x - containerRect.left;
      const markerY = position.y - containerRect.top;
      
      // Get actual popover dimensions if available, otherwise use estimates
      const popoverRect = popoverRef.current?.getBoundingClientRect();
      const actualHeight = popoverRect?.height || (group ? 220 : 120);
      const actualWidth = popoverRect?.width || 240;
      
      const offset = 16;
      const padding = 12;
      const minSpaceAbove = markerY;
      const minSpaceBelow = containerRect.height - markerY;
      
      // Smart placement: prefer bottom if marker is in upper 40% of container, otherwise prefer top
      // But also check if there's enough space
      let placement: "top" | "bottom" = "bottom";
      
      if (minSpaceAbove > minSpaceBelow) {
        // More space above, prefer top
        if (minSpaceAbove > actualHeight + offset + padding) {
          placement = "top";
        }
      } else {
        // More space below, prefer bottom
        if (minSpaceBelow < actualHeight + offset + padding) {
          // Not enough space below, try top
          if (minSpaceAbove > actualHeight + offset + padding) {
            placement = "top";
          }
        }
      }
      
      // Calculate position based on placement
      let popoverTop: number;
      let popoverLeft = markerX - actualWidth / 2;
      
      if (placement === "top") {
        popoverTop = markerY - actualHeight - offset;
      } else {
        popoverTop = markerY + offset;
      }
      
      // Constrain horizontally
      if (popoverLeft < padding) {
        popoverLeft = padding;
      } else if (popoverLeft + actualWidth > containerRect.width - padding) {
        popoverLeft = containerRect.width - actualWidth - padding;
      }
      
      // Constrain vertically - if popover goes out of bounds, adjust
      if (popoverTop < padding) {
        popoverTop = padding;
        // If we're at the top edge, switch to bottom if possible
        if (placement === "top" && markerY + offset + actualHeight + padding <= containerRect.height) {
          popoverTop = markerY + offset;
          placement = "bottom";
        }
      } else if (popoverTop + actualHeight > containerRect.height - padding) {
        popoverTop = containerRect.height - actualHeight - padding;
        // If we're at the bottom edge, switch to top if possible
        if (placement === "bottom" && markerY - offset - actualHeight - padding >= 0) {
          popoverTop = markerY - actualHeight - offset;
          placement = "top";
        }
      }

      return {
        left: popoverLeft,
        top: popoverTop,
        placement,
      };
    };

    // Calculate initial position immediately
    const initialStyles = calculatePosition();
    if (initialStyles) {
      setComputedStyles(initialStyles);
    }

    // Update position after render to get actual dimensions
    const updatePosition = () => {
      const newStyles = calculatePosition();
      if (newStyles) {
        setComputedStyles(newStyles);
      }
    };

    // Update position after render to get actual dimensions
    const timer = setTimeout(updatePosition, 10);
    
    return () => {
      clearTimeout(timer);
    };
  }, [position, isOpen, containerRef, location, group]);

  const getFlagSrc = (loc?: Location, grp?: LocationGroup) => {
    if (grp) {
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
      const isSaudiArabia = saudiArabiaLocations.some(
        saLoc => saLoc.name === loc.name && saLoc.lat === loc.lat && saLoc.lng === loc.lng
      );
      const isEgypt = egyptLocations.some(
        egLoc => egLoc.name === loc.name && egLoc.lat === loc.lat && egLoc.lng === loc.lng
      );
      const isIndividual = individualLocations.some(
        indLoc => indLoc.name === loc.name && indLoc.lat === loc.lat && indLoc.lng === loc.lng
      );
      if (isSaudiArabia) return "/ar.png";
      if (isEgypt) return "/eg.webp";
      if (isIndividual) return "/netherland.webp";
      return "/netherland.webp";
    }
    return "/netherland.webp";
  };

  // Extract city and country from address
  const extractCityAndCountry = (address: string): { city: string; country: string } => {
    const parts = address.split(',').map(p => p.trim());
    const country = parts[parts.length - 1] || '';
    
    // Common city names to look for
    const cityNames = ['Rotterdam', 'Cairo', 'Riyadh', 'Kafr El-Shaikh', 'Nasr City'];
    let city = '';
    
    // Try to find city in the address parts (check from end to beginning)
    for (let i = parts.length - 2; i >= 0; i--) {
      const part = parts[i];
      // Check if part contains a known city name
      for (const cityName of cityNames) {
        if (part.includes(cityName)) {
          city = cityName;
          break;
        }
      }
      if (city) break;
    }
    
    // If no city found, try to extract from second-to-last part
    if (!city && parts.length >= 2) {
      const secondLast = parts[parts.length - 2];
      // Extract city name from part (might have postal code like "Rotterdam 3012 NJ")
      const cityMatch = secondLast.match(/([A-Za-z\s]+?)(?:\s+\d+.*)?$/);
      if (cityMatch && cityMatch[1]) {
        city = cityMatch[1].trim();
      } else if (!/^\d+/.test(secondLast) && secondLast.length < 30) {
        city = secondLast;
      }
    }
    
    // Fallback: try third-to-last if second-to-last didn't work
    if (!city && parts.length >= 3) {
      const thirdLast = parts[parts.length - 3];
      for (const cityName of cityNames) {
        if (thirdLast.includes(cityName)) {
          city = cityName;
          break;
        }
      }
    }
    
    return { city: city || 'Unknown', country };
  };

  const content = location ? (() => {
    const { city, country } = extractCityAndCountry(location.address);
    return (
      <>
        <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
          <Image src={getFlagSrc(location)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
        </div>
        <p className="text-sm font-bold text-card-foreground mb-1">{city}, {country}</p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{location.address}</p>
      </>
    );
  })() : group ? (() => {
    const isSaudiArabia = group.locations.some(
      gloc => saudiArabiaLocations.some(
        saLoc => saLoc.name === gloc.name && saLoc.lat === gloc.lat && saLoc.lng === gloc.lng
      )
    );
    const isEgypt = group.locations.some(
      gloc => egyptLocations.some(
        egLoc => egLoc.name === gloc.name && egLoc.lat === gloc.lat && egLoc.lng === gloc.lng
      )
    );

    if (isSaudiArabia) {
      // For Saudi Arabia: Show "Riyadh, Saudi Arabia" once at the top
      const { city, country } = extractCityAndCountry(group.locations[0].address);
      return (
        <>
          <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
            <Image src={getFlagSrc(undefined, group)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
          </div>
          <p className="text-sm font-bold text-card-foreground mb-3">{city}, {country}</p>
          {group.locations.map((loc, index) => (
            <div key={index} className={index > 0 ? "mt-3 pt-3 border-t border-border" : ""}>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{loc.address}</p>
            </div>
          ))}
        </>
      );
    } else if (isEgypt) {
      // For Egypt: Show only 2 titles (group locations by main city)
      const getMainCity = (address: string): string => {
        const parts = address.split(',').map(p => p.trim());
        // Prioritize main cities: Cairo and Kafr El-Shaikh
        for (let i = parts.length - 2; i >= 0; i--) {
          const part = parts[i];
          if (part.includes('Cairo')) return 'Cairo';
          if (part.includes('Kafr El-Shaikh')) return 'Kafr El-Shaikh';
        }
        // Fallback to extracted city
        return extractCityAndCountry(address).city;
      };
      
      const locationsByCity = new Map<string, Location[]>();
      group.locations.forEach(loc => {
        const mainCity = getMainCity(loc.address);
        if (!locationsByCity.has(mainCity)) {
          locationsByCity.set(mainCity, []);
        }
        locationsByCity.get(mainCity)!.push(loc);
      });
      
      const cityGroups = Array.from(locationsByCity.entries()).slice(0, 2); // Only show first 2 cities
      
      return (
        <>
          <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
            <Image src={getFlagSrc(undefined, group)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
          </div>
          {cityGroups.map(([city, locations], cityIndex) => {
            const { country } = extractCityAndCountry(locations[0].address);
            return (
              <div key={cityIndex} className={cityIndex > 0 ? "mt-3 pt-3 border-t border-border" : ""}>
                <p className="text-sm font-bold text-card-foreground mb-1">{city}, {country}</p>
                {locations.map((loc, locIndex) => (
                  <p key={locIndex} className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mt-1">{loc.address}</p>
                ))}
              </div>
            );
          })}
        </>
      );
    } else {
      // Default behavior for other groups
      return (
        <>
          <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center overflow-hidden shrink-0">
            <Image src={getFlagSrc(undefined, group)} alt="flag" width={32} height={32} className="w-full h-full object-cover rounded-full" />
          </div>
          {group.locations.map((loc, index) => {
            const { city, country } = extractCityAndCountry(loc.address);
            return (
              <div key={index} className={index > 0 ? "mt-3 pt-3 border-t border-border" : ""}>
                <p className="text-sm font-bold text-card-foreground mb-1">{city}, {country}</p>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{loc.address}</p>
              </div>
            );
          })}
        </>
      );
    }
  })() : null;

  if (!isOpen || !content || !position || !containerRef.current) return null;
  
  // Fallback styles if computedStyles not ready yet
  const styles = computedStyles || (() => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) {
      return { left: 0, top: 0, placement: "bottom" as const };
    }
    const markerX = position.x - containerRect.left;
    const markerY = position.y - containerRect.top;
    return {
      left: Math.max(12, Math.min(markerX - 120, containerRect.width - 252)),
      top: markerY + 16,
      placement: "bottom" as const,
    };
  })();

  return (
    <div
      ref={popoverRef}
      style={{
        left: `${styles.left}px`,
        top: `${styles.top}px`,
        pointerEvents: "auto",
      }}
      className="absolute z-50 animate-in fade-in-0 zoom-in-95 duration-200"
      data-popover
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onMouseLeave();
      }}
    >
      <div className="flex flex-col items-center p-4 bg-card/95 backdrop-blur-sm rounded-xl shadow-2xl text-center border border-border min-w-[200px] max-w-[280px]">
        {content}
      </div>
      {/* Arrow pointing to marker */}
      
    </div>
  );
}

export default function WorldMap() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [activeGroup, setActiveGroup] = useState<LocationGroup | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringPopoverRef = useRef(false);

  const clearLeaveTimeout = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handleMarkerEnter = (loc: Location, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clearLeaveTimeout();
    isHoveringPopoverRef.current = false;
    setActiveLocation(loc);
    setActiveGroup(null);
    const markerRect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: markerRect.left + markerRect.width / 2,
      y: markerRect.top + markerRect.height / 2,
    });
  };

  const handleGroupMarkerEnter = (group: LocationGroup, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clearLeaveTimeout();
    isHoveringPopoverRef.current = false;
    setActiveGroup(group);
    setActiveLocation(null);
    const markerRect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: markerRect.left + markerRect.width / 2,
      y: markerRect.top + markerRect.height / 2,
    });
  };

  const handleMarkerLeave = () => {
    clearLeaveTimeout();
    leaveTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopoverRef.current) {
        setActiveLocation(null);
        setActiveGroup(null);
        setPopoverPosition(null);
      }
    }, 100);
  };

  const handlePopoverEnter = () => {
    clearLeaveTimeout();
    isHoveringPopoverRef.current = true;
  };

  const handlePopoverLeave = () => {
    isHoveringPopoverRef.current = false;
    clearLeaveTimeout();
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveLocation(null);
      setActiveGroup(null);
      setPopoverPosition(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearLeaveTimeout();
    };
  }, []);

  // Calculate pixel positions for markers
  const saudiArabiaPos = latLngToPixel(saudiArabiaGroup.lat, saudiArabiaGroup.lng, 'saudi-arabia');
  const egyptPos = latLngToPixel(egyptGroup.lat, egyptGroup.lng, 'egypt');
  const individualPositions = individualLocations.map(loc => ({
    location: loc,
    position: latLngToPixel(loc.lat, loc.lng, 'rotterdam'),
  }));

  return (
    <div className="w-full">
      <div ref={mapContainerRef} className="w-full relative ">
        {/* SVG Map */}
        <div 
          className="w-full relative" 
          style={{ 
            aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
            maxWidth: "100%"
          }}
        >
          <Image
            src="/map.svg"
            alt="World Map"
            fill
            className="object-contain"
            style={{ 
              objectFit: "contain",
              objectPosition: "right center"
            }}
          />
          
          {/* Individual Location Markers */}
          {individualPositions.map(({ location: loc, position: pos }, i) => (
            <div
              key={i}
              className="absolute cursor-pointer group animate-in fade-in duration-500"
              style={{
                left: `${(pos.x / SVG_WIDTH) * 100}%`,
                top: `${(pos.y / SVG_HEIGHT) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={(e) => handleMarkerEnter(loc, e)}
              onMouseLeave={handleMarkerLeave}
            >
              {/* Invisible larger area for easier hover */}
              <div
                className="absolute"
                style={{
                  width: "clamp(24px, 3vw, 32px)",
                  height: "clamp(24px, 3vw, 32px)",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Pulse circle - animated */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                  boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 50%, transparent)",
                  transform: "translate(-50%, -50%)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              {/* Main marker */}
              <div
                className="absolute rounded-full transition-all duration-200 group-hover:scale-125"
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "var(--color-primary)",
                  boxShadow: "0 0 15px color-mix(in srgb, var(--color-primary) 80%, transparent), 0 0 30px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          ))}

          {/* Saudi Arabia Grouped Marker */}
          <div
            className="absolute cursor-pointer group animate-in fade-in duration-500"
            style={{
              left: `${(saudiArabiaPos.x / SVG_WIDTH) * 100}%`,
              top: `${(saudiArabiaPos.y / SVG_HEIGHT) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={(e) => handleGroupMarkerEnter(saudiArabiaGroup, e)}
            onMouseLeave={handleMarkerLeave}
          >
            <div
              className="absolute"
              style={{
                width: "clamp(24px, 3vw, 32px)",
                height: "clamp(24px, 3vw, 32px)",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(12px, 1.5vw, 16px)",
                height: "clamp(12px, 1.5vw, 16px)",
                backgroundColor: "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 50%, transparent)",
                transform: "translate(-50%, -50%)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full transition-all duration-200 group-hover:scale-125"
              style={{
                width: "clamp(8px, 1vw, 10px)",
                height: "clamp(8px, 1vw, 10px)",
                backgroundColor: "var(--color-primary)",
                boxShadow: "0 0 15px color-mix(in srgb, var(--color-primary) 80%, transparent), 0 0 30px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          {/* Egypt Grouped Marker */}
          <div
            className="absolute cursor-pointer group animate-in fade-in duration-500"
            style={{
              left: `${(egyptPos.x / SVG_WIDTH) * 100}%`,
              top: `${(egyptPos.y / SVG_HEIGHT) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={(e) => handleGroupMarkerEnter(egyptGroup, e)}
            onMouseLeave={handleMarkerLeave}
          >
            <div
              className="absolute"
              style={{
                width: "clamp(24px, 3vw, 32px)",
                height: "clamp(24px, 3vw, 32px)",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(12px, 1.5vw, 16px)",
                height: "clamp(12px, 1.5vw, 16px)",
                backgroundColor: "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 50%, transparent)",
                transform: "translate(-50%, -50%)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full transition-all duration-200 group-hover:scale-125"
              style={{
                width: "clamp(8px, 1vw, 10px)",
                height: "clamp(8px, 1vw, 10px)",
                backgroundColor: "var(--color-primary)",
                boxShadow: "0 0 15px color-mix(in srgb, var(--color-primary) 80%, transparent), 0 0 30px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>

        {/* Professional Popover */}
        <LocationPopover
          location={activeLocation || undefined}
          group={activeGroup || undefined}
          position={popoverPosition}
          containerRef={mapContainerRef}
          isOpen={!!(activeLocation || activeGroup)}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        />
      </div>

    </div>
  );
}
