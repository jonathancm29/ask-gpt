import React, { useEffect, useRef } from 'react';
import { useTransform, motion } from 'framer-motion';

const Background = ({ scrollYProgress }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Dynamic background color based on scroll
  // Starts dark blue/purple and goes to deeper black/night
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#0f172a', '#020617']
  );

  const opacityRain = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let raindrops = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize stars/particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
        opacity: Math.random()
      });
    }

    const createRaindrop = () => {
      return {
        x: Math.random() * canvas.width,
        y: -20,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 5,
        opacity: Math.random() * 0.5 + 0.1
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = 'white';
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Twinkle effect
        p.opacity += (Math.random() - 0.5) * 0.05;
        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 1) p.opacity = 1;
      });

      // Draw Rain based on scroll
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = Math.min(scrollY / (window.innerHeight * 0.5), 1); // Fully active after half screen scroll
      
      if (scrollRatio > 0.1) {
        if (raindrops.length < 100 * scrollRatio) {
           if (Math.random() > 0.9) raindrops.push(createRaindrop());
        }
        
        ctx.strokeStyle = `rgba(174, 194, 224, ${0.5 * scrollRatio})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        raindrops.forEach((drop, index) => {
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.length);
          
          drop.y += drop.speed;
          
          if (drop.y > canvas.height) {
            raindrops[index] = createRaindrop();
            raindrops[index].y = -20; // Reset to top
          }
        });
        ctx.stroke();
      } else {
        // Clear rain if scrolled back to top
        raindrops = [];
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 -z-10 transition-colors duration-700 ease-in-out"
      style={{ backgroundColor }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Simulated lighting/gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      
      {/* Moon or light source */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-100 rounded-full blur-[80px] opacity-20 pointer-events-none" />
    </motion.div>
  );
};

export default Background;
