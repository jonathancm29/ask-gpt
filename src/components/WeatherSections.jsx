import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import photos
import imgWinter1 from '../photos/1 (1).jpeg';
import imgWinter2 from '../photos/1 (3).jpeg';
import imgSunset1 from '../photos/1 (4).jpeg';
import imgSummer1 from '../photos/1 (5).jpeg';
import imgSunset2 from '../photos/1 (7).jpeg';
import imgSummer2 from '../photos/1 (10).jpeg';

const WeatherSections = () => {
  return (
    <div className="w-full relative z-20">
      <ColdSection />
      <WarmSection />
      <SunsetSection />
    </div>
  );
};

const SunsetSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Parallax for images
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">
      {/* Sunset Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-700 pointer-events-none" />
      
      {/* Soft lighting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,200,100,0.2),transparent_50%)] pointer-events-none" />
      
      {/* Floating Particles/Fireflies Effect */}
      <FirefliesEffect />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-['Great_Vibes'] text-rose-100 drop-shadow-[0_0_15px_rgba(255,100,100,0.5)]">
              Atardeceres Mágicos
            </h2>
            <p className="text-lg md:text-xl text-rose-100/90 font-light leading-relaxed font-['Inter']">
              "Cuando el sol se despide y el cielo se pinta de colores imposibles, el tiempo parece detenerse. En ese instante dorado, donde el día abraza a la noche, encuentro en tu mirada el reflejo de mil atardeceres, prometiéndonos que mañana, el sol volverá a brillar aún más fuerte para nosotros."
            </p>
            <div className="w-24 h-1 bg-rose-400/50 mx-auto md:mx-0 rounded-full" />
          </motion.div>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-4 rotate-2 hover:rotate-0 transition-transform duration-500">
            <motion.div 
              style={{ y }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group"
            >
              <img 
                src={imgSunset1}
                alt="Pareja contemplando el atardecer" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
            
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl translate-y-12 group"
            >
              <img 
                src={imgSunset2}
                alt="Momento romántico bajo la luz dorada" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FirefliesEffect = () => {
  const fireflies = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
    moveX: Math.random() * 40 - 20,
    moveY: Math.random() * 40 - 20
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [0, fly.moveX],
            y: [0, fly.moveY],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            delay: fly.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const ColdSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">
      {/* Snow Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026] to-[#1B2735] pointer-events-none" />
      <SnowEffect />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-['Great_Vibes'] text-blue-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Juntos en el Frío
            </h2>
            <p className="text-lg md:text-xl text-blue-200 font-light leading-relaxed font-['Inter']">
              "Aunque el viento sople fuerte y la nieve cubra nuestros pasos, tu abrazo es el refugio eterno donde siempre encuentro calor. En cada invierno, nuestro amor florece más fuerte."
            </p>
            <div className="w-24 h-1 bg-blue-400/30 mx-auto md:mx-0 rounded-full" />
          </motion.div>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-4 rotate-2 hover:rotate-0 transition-transform duration-500">
            <motion.div 
              style={{ y }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group"
            >
              <img 
                src={imgWinter1}
                alt="Pareja en la nieve" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
            
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl translate-y-12 group"
            >
              <img 
                src={imgWinter2}
                alt="Abrazo en invierno" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const WarmSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Sun Animation
  const sunY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bgIntensity = useTransform(scrollYProgress, [0, 1], ["#1a1a1a", "#f59e0b22"]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">
      {/* Sunrise Background Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-slate-900 to-slate-900 pointer-events-none"
        style={{ backgroundColor: bgIntensity }}
      />
      
      {/* Animated Sun */}
      <motion.div 
        style={{ y: sunY, opacity: sunOpacity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-orange-400 via-yellow-200 to-transparent rounded-full blur-[100px] pointer-events-none opacity-30"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Photos (Order swapped for visual balance) */}
          <div className="grid grid-cols-2 gap-4 -rotate-2 hover:rotate-0 transition-transform duration-500 order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-orange-100/20 shadow-2xl group"
            >
              <img 
                src={imgSummer1}
                alt="Pareja en verano" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-orange-100/20 shadow-2xl translate-y-12 group"
            >
              <img 
                src={imgSummer2}
                alt="Playa y amor" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right space-y-6 order-1 md:order-2"
          >
            <h2 className="text-5xl md:text-7xl font-['Great_Vibes'] text-orange-100 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              Bajo el Sol Radiante
            </h2>
            <p className="text-lg md:text-xl text-orange-100/90 font-light leading-relaxed font-['Inter']">
              "Como el amanecer ilumina el mundo, tú iluminas mis días. En cada rayo de sol, en cada brisa cálida, celebro la alegría de compartir este viaje bajo cualquier cielo."
            </p>
            <div className="w-24 h-1 bg-orange-400/50 mx-auto md:ml-auto md:mr-0 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// CSS-based Snow Effect Component
const SnowEffect = () => {
  // Create an array of snowflakes with random properties
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    opacity: Math.random(),
    size: `${Math.random() * 4 + 2}px`
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-fall"
          style={{
            left: flake.left,
            top: -10,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10px) translateX(0px); }
          50% { transform: translateY(50vh) translateX(20px); }
          100% { transform: translateY(100vh) translateX(-20px); }
        }
      `}</style>
    </div>
  );
};

export default WeatherSections;
