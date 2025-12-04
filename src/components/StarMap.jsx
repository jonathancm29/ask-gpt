import React, { useState } from 'react';
import { Map, Overlay } from 'pigeon-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Custom provider for Dark Mode map (CartoDB Dark Matter)
const darkProvider = (x, y, z, dpr) => {
  return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`;
};

const StarMap = ({ locations, connectionLine }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Default center (can be adjusted or calculated based on locations)
  const defaultCenter = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : [4.6097, -74.0817]; // Bogota as fallback
    
  // Helper to calculate midpoint for the distance label
  const getMidpoint = (loc1, loc2) => {
      if (!loc1 || !loc2) return null;
      return [(loc1.lat + loc2.lat) / 2, (loc1.lng + loc2.lng) / 2];
  };

  const midPoint = connectionLine && connectionLine.from && connectionLine.to
    ? getMidpoint(
        locations.find(l => l.id === connectionLine.from),
        locations.find(l => l.id === connectionLine.to)
    )
    : null;

  // Helper to convert lat/lng to pixel coordinates (Pigeon Maps doesn't expose this easily in children without a custom component)
  // So we will use a simple SVG overlay approach assuming linear interpolation is "good enough" for short distances or just use a specialized Line component if we were using a heavier library.
  // BUT, Pigeon Maps `Overlay` passes `left` and `top` props to its children if we were to use a custom component, but here we are using standard Overlay.
  //
  // ACTUALLY, the best way in Pigeon Maps to draw a line is to create a custom component that receives mapState.
  // However, to keep it simple within this file, we can use a full-canvas SVG overlay that sits on top of the map.
  // But that requires access to latLngToPixel which is only available inside the Map context.
  
  // Let's try a simpler visual hack: A series of dots (dashes) between the two points?
  // Or better: Let's implement a custom "MapLine" component inside StarMap.

  const MapLine = ({ mapState, latLngToPixel, from, to }) => {
    if (!from || !to || !latLngToPixel) return null;

    const [x1, y1] = latLngToPixel([from.lat, from.lng]);
    const [x2, y2] = latLngToPixel([to.lat, to.lng]);

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
        <line 
          x1={x1} y1={y1} 
          x2={x2} y2={y2} 
          stroke="#ec4899" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>
    );
  };

  return (
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 z-10 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-['Great_Vibes'] text-blue-100 drop-shadow-[0_0_15px_rgba(100,200,255,0.5)] mb-4">
          Nuestro Mapa de Estrellas
        </h2>
        <p className="text-blue-200/80 text-lg font-light">
          Los lugares donde nuestra historia dejó huella
        </p>
      </motion.div>

      {/* Map Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl h-[500px] md:h-[600px] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative z-10 mx-4 bg-[#1a1a1a]"
      >
        <Map 
          provider={darkProvider}
          defaultCenter={defaultCenter}
          defaultZoom={7}
          minZoom={2}
          maxZoom={18}
          metaWheelZoom={true} // Requires Cmd/Ctrl + Scroll to zoom (prevents accidental zoom)
          touchEvents={true} // Enables touch gestures
          attribution={false} // Cleaner look
        >

          {locations.map((loc, index) => (
            <Overlay key={index} anchor={[loc.lat, loc.lng]} offset={[0, 0]}>
              <div className="relative group">
                {/* Marker (Emoji) */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedLocation(selectedLocation === index ? null : index)}
                  className={`text-3xl md:text-4xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 ${selectedLocation === index ? 'scale-125 z-50' : 'z-10 hover:z-40'}`}
                >
                  {loc.emoji}
                </motion.button>
                
                {/* Pulse Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                   <div className="w-8 h-8 bg-white/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </Overlay>
          ))}

          {/* Tooltip / Popup */}
          {locations.map((loc, index) => (
             <Overlay key={`tooltip-${index}`} anchor={[loc.lat, loc.lng]} offset={[0, -40]}>
                <AnimatePresence>
                  {selectedLocation === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl text-center z-[100]"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocation(null);
                        }}
                        className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <h3 className="text-white font-bold text-lg mb-1 pr-4">{loc.title}</h3>
                      <p className="text-blue-200 text-sm font-light leading-relaxed">{loc.description}</p>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/90 border-b border-r border-white/20 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
             </Overlay>
          ))}

          {/* Connection Line Geometry */}
          {connectionLine && connectionLine.from && connectionLine.to && (() => {
            const fromLoc = locations.find(l => l.id === connectionLine.from);
            const toLoc = locations.find(l => l.id === connectionLine.to);
            
            if (fromLoc && toLoc) {
               // We inject the custom component as a child of Map. 
               // Pigeon Maps automatically injects `latLngToPixel` and `pixelToLatLng` props to direct children.
               return <MapLine from={fromLoc} to={toLoc} />;
            }
            return null;
          })()}

          {/* Connection Label */}
          {connectionLine && connectionLine.from && connectionLine.to && (() => {
            const fromLoc = locations.find(l => l.id === connectionLine.from);
            const toLoc = locations.find(l => l.id === connectionLine.to);
            
            if (fromLoc && toLoc) {
              return (
                <>
                  {/* Distance Label at Midpoint */}
                  {midPoint && (
                    <Overlay anchor={midPoint} offset={[0, 0]}>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-slate-900/80 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs text-blue-200 whitespace-nowrap flex items-center gap-2 shadow-xl z-0"
                      >
                        <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                        {connectionLine.label}
                      </motion.div>
                    </Overlay>
                  )}
                </>
              );
            }
          })()}
        </Map>

        {/* Overlay Gradient for better integration */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      </motion.div>
      
      <p className="mt-6 text-white/30 text-xs">
        Toca los emojis para ver los recuerdos
      </p>
    </section>
  );
};

export default StarMap;
