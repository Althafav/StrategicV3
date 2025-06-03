// Install dependencies:
// npm install react-simple-maps d3-scale

import React, { useState, MouseEvent } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// World map TopoJSON
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Pin data
const markers = [
  { name: 'Mexico', coordinates: [-102.0, 23.0] },
  { name: 'Colombia', coordinates: [-74.2973, 4.5709] },
  { name: 'Brazil', coordinates: [-51.9253, -14.2350] },
  { name: 'Germany', coordinates: [10.4515, 51.1657] },
  { name: 'Russia', coordinates: [105.3188, 61.5240] },
  { name: 'China', coordinates: [104.1954, 35.8617] },
  { name: 'India', coordinates: [78.9629, 20.5937] },
  { name: 'Indonesia', coordinates: [106.8456, -6.2088] },
  { name: 'United Arab Emirates', coordinates: [54.0, 24.0] },
  { name: 'Kingdom of Saudi Arabia', coordinates: [45.0792, 23.8859] },
  { name: 'Egypt', coordinates: [30.8025, 26.8206] },
  { name: 'Cameroon', coordinates: [12.3547, 7.3697] },
  { name: 'Gabon', coordinates: [12.2714, -0.8037] },
];

// Highlight set and color scale
const highlightSet = new Set(markers.map((m) => m.name));
const fillScale = scaleLinear<string>()
  .domain([0, 1])
  .range(['#F5F5F5', '#38BDF8']);

const InteractiveWorldMap2: React.FC = () => {
  const [tooltip, setTooltip] = useState<string>('');
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onEnter = (evt: MouseEvent<SVGCircleElement>, m: typeof markers[0]) => {
    setTooltip(m.name);
    setPos({ x: evt.clientX, y: evt.clientY });
  };
  const onLeave = () => setTooltip('');

  // Map dimensions
  const width = 960;
  const height = 500;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: width / 6, center: [0, 20] }}
        width={width}
        height={height}
      >
        {/* Graticule grid lines */}
        <Graticule stroke="#DDD" strokeWidth={0.5} />

        {/* Countries with shading */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const isHighlighted = highlightSet.has(name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                //   fill={fillScale(isHighlighted ? 1 : 0)}
                  stroke="#E0E0E0"
                  strokeWidth={0.4}
                />
              );
            })
          }
        </Geographies>

        {/* Pulsating markers */}
        {markers.map((m: any) => (
          <Marker key={m.name} coordinates={m.coordinates}>
            <circle
              r={12}
              fill="#d4a736"
              opacity={0.3}
              style={{ animation: 'ping 2000ms ease-out infinite' }}
            />
            <circle
              r={5}
              fill="#d4a736"
              stroke="#FFF"
              strokeWidth={1.5}
              cursor="pointer"
              onMouseEnter={(e) => onEnter(e, m)}
              onMouseLeave={onLeave}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-white bg-opacity-90 text-gray-900 text-sm px-3 py-1 rounded-md shadow-lg transition-opacity duration-150"
          style={{ top: pos.y + 10, left: pos.x + 10, zIndex: 1000 }}
        >
          {tooltip}
        </div>
      )}

      {/* Ping keyframes fallback */}
      <style>{`
        @keyframes ping {
          0% { transform: scale(0.8); opacity: 1; }
          75% { transform: scale(1.5); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveWorldMap2;
