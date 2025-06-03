// Install dependencies:
// npm install react-simple-maps d3-geo

import React, { useState, MouseEvent } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// TopoJSON endpoint for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Define your locations here
const markers = [
  { name: "Mexico", coordinates: [-102.0, 23.0] },
  { name: "Colombia", coordinates: [-74.2973, 4.5709] },
  { name: "Brazil", coordinates: [-51.9253, -14.235] },
  { name: "Germany", coordinates: [10.4515, 51.1657] },
  { name: "Russia", coordinates: [105.3188, 61.524] },
  { name: "China", coordinates: [104.1954, 35.8617] },
  { name: "India", coordinates: [78.9629, 20.5937] },
  { name: "Indonesia", coordinates: [106.8456, -6.2088] },
  { name: "United Arab Emirates", coordinates: [54.0, 24.0] },
  { name: "Kingdom of Saudi Arabia", coordinates: [45.0792, 23.8859] },
  { name: "Egypt", coordinates: [30.8025, 26.8206] },
  { name: "Cameroon", coordinates: [12.3547, 7.3697] },
  { name: "Gabon", coordinates: [12.2714, -0.8037] },
];

/**
 * InteractiveWorldMap
 * - Renders world map with markers
 * - Shows a fixed-position tooltip on hover
 */
const InteractiveWorldMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (
    evt: MouseEvent<SVGCircleElement>,
    marker: (typeof markers)[0]
  ) => {
    // Use clientX/Y and position: fixed for accurate placement
    setTooltipContent(marker.name);
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ComposableMap projectionConfig={{ scale: 150 }} width={800} height={450}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E0E0E0"
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {markers.map((marker: any) => (
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <circle
              r={8}
              fill="#d4a736"
              opacity={0.3}
              className="animate-ping"
            />
            {/* Solid center dot */}
            <circle
              r={4}
              fill="#d4a736"
              stroke="#FFFFFF"
              strokeWidth={1.5}
              cursor="pointer"
              onMouseEnter={(evt) => handleMouseEnter(evt, marker)}
              onMouseLeave={handleMouseLeave}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Fixed-position tooltip */}
      {tooltipContent && (
        <div
          className="pointer-events-none bg-white text-sm px-2 py-1 rounded shadow-md"
          style={{
            position: "fixed",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            zIndex: 1000,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default InteractiveWorldMap;
