import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Carousel from './components/Carousel';
import MusicPlayer from './components/MusicPlayer';
import WeatherSections from './components/WeatherSections';
import Login from './components/Login';
import StarMap from './components/StarMap';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ------------------------------------------------------------------
// CONFIGURACIÓN DEL MAPA DE ESTRELLAS
// ------------------------------------------------------------------
// Agrega aquí tus lugares especiales.
// Puedes obtener las coordenadas (lat, lng) en Google Maps.
const LOCATIONS = [
  { 
    id: 'murillo',
    lat: 4.8741922, 
    lng: -75.1755788, 
    title: "El Comienzo, Bendito Murillo, bendita casualidad", 
    description: "Aquí es donde nuestra historia comenzó a escribirse.", 
    emoji: "❤️" 
  },
  { 
    id: 'norcasia',
    lat: 5.5756063, 
    lng: -74.8906979, 
    title: "Aventura, (Norcasia)", 
    description: "Donde las carreteras se hicieron cortas a nuestro lado.", 
    emoji: "✈️" 
  },
  {
    id: 'cali',
    lat: 3.4516,
    lng: -76.5320,
    title: "Mi Hogar (Cali)",
    description: "La sucursal del cielo, desde donde te pienso cada día.",
    emoji: "🕺"
  },
  {
    id: 'manizales',
    lat: 5.0703,
    lng: -75.5138,
    title: "Tu Hogar (Manizales)",
    description: "La ciudad donde vive mi corazón.",
    emoji: "🏡"
  }
];

const CONNECTION = {
  from: 'cali',
  to: 'manizales',
  label: "260km que no son nada para este amor"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return; // Don't listen to scroll if not logged in

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative min-h-screen w-full overflow-hidden"
      >
        <Background scrollYProgress={scrollYProgress} />
        
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full pb-20">
          <section className="w-full min-h-screen flex flex-col items-center justify-center p-4 snap-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-8"
            >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg font-serif">
              No pares de bailar hasta que llueva
            </h1>
            <p className="text-blue-200 text-lg font-light tracking-wide">
              El capítulo digital de nuestra historia
            </p>
          </motion.div>
          
          <Carousel />

          <motion.div 
            className={`absolute bottom-10 left-0 right-0 flex justify-center transition-opacity duration-500 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* New Weather Sections */}
        <WeatherSections />

        {/* Star Map Section */}
        <StarMap locations={LOCATIONS} connectionLine={CONNECTION} />

        <section className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4 snap-start">
          <div className="max-w-md w-full bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">La banda sonora de nuestro libro</h2>
            <MusicPlayer />
          </div>
        </section>
        
        <footer className="w-full py-8 text-center text-white/40 text-sm flex flex-col items-center gap-4">
          <p>Escrito en código y papel con 🤍 para ti</p>
        </footer>

      </main>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
