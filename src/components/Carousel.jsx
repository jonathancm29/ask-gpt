import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

const photosImport = import.meta.glob('../photos/*.jpeg', { eager: true, import: 'default' });
const initialImages = Object.values(photosImport);

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8
  })
};

const Carousel = () => {
  // Randomize images on component mount
  const [images] = useState(() => {
    return [...initialImages].sort(() => Math.random() - 0.5);
  });

  const [[page, direction], setPage] = useState([0, 0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -10000) {
      paginate(1);
    } else if (swipe > 10000) {
      paginate(-1);
    }
  };

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-video mx-auto flex items-center justify-center">
      {/* Main Carousel */}
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-black/20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            onClick={() => setIsZoomed(true)}
            className="absolute w-full h-full object-cover cursor-zoom-in"
            alt="Momentos juntos"
            loading="lazy"
          />
        </AnimatePresence>
        
        {/* Controls */}
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm hover:bg-black/70 transition z-10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm hover:bg-black/70 transition z-10"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-[90%] overflow-x-auto no-scrollbar px-2">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${idx === imageIndex ? 'bg-white w-4' : 'bg-white/40'}`}
            />
          ))}
        </div>
        
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
           <ZoomIn className="text-white/70 w-5 h-5 drop-shadow-md" />
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>
            
            <motion.img
              src={images[imageIndex]}
              layoutId={`image-${imageIndex}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
