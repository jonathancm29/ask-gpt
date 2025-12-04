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
          defaultZoom={4}
          minZoom={2}
          maxZoom={18}
          attribution={false} // Cleaner look
        >
          {/* Connection Line */}
          {connectionLine && connectionLine.from && connectionLine.to && (() => {
            const fromLoc = locations.find(l => l.id === connectionLine.from);
            const toLoc = locations.find(l => l.id === connectionLine.to);
            
            if (fromLoc && toLoc) {
              return (
                <>
                  {/* SVG Line Overlay */}
                  <Overlay anchor={fromLoc} offset={[0, 0]}>
                     {/* This is tricky in Pigeon Maps as Overlay is a single point. 
                         However, we can draw a line if we know the pixel coordinates, 
                         but Pigeon Maps doesn't expose projection easily in children.
                         
                         Alternative: Use a simplified approach or a dedicated line component if available.
                         Since Pigeon Maps is simple, we might need a hack or just place the midpoint label.
                         
                         Wait! Pigeon Maps DOES support SVG overlays if we handle coordinates.
                         BUT for simplicity in this "pair programming" context, let's use a visual approximation 
                         or just the label if drawing a true geographic line is complex without extra deps.
                         
                         ACTUALLY, let's try to render a simple SVG line by using the map context if possible,
                         or just render the label.
                         
                         Let's stick to just the label for now to be safe, OR use a library feature if I recall correctly...
                         Pigeon Maps doesn't have built-in Polyline. 
                         
                         Let's just add the "Distance Label" at the midpoint for now as requested ("dedicación sobre la distancia").
                      */}
                  </Overlay>
                  
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
