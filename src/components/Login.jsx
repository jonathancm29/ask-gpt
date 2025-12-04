import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Gift, Lock } from 'lucide-react';

// PASSWORD CONFIGURATION
const CORRECT_PASSWORD = "1829"; // You can change this to any password
const PASSWORD_LENGTH = CORRECT_PASSWORD.length;

const Login = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState(Array(PASSWORD_LENGTH).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (value.length > 1) return; // Only allow 1 char

    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    // Move to next input if value is entered
    if (value && index < PASSWORD_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check password when all fields are filled
    if (newPassword.every(char => char !== "") && index === PASSWORD_LENGTH - 1) {
      checkPassword(newPassword.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on Backspace
    if (e.key === 'Backspace' && !password[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const checkPassword = (enteredPassword) => {
    if (enteredPassword === CORRECT_PASSWORD) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  const handleError = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
      setPassword(Array(PASSWORD_LENGTH).fill(""));
      inputRefs.current[0].focus();
    }, 500);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    setShowConfetti(true);
    
    // Wait for gift animation and confetti before unlocking
    setTimeout(() => {
      onLoginSuccess();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {showConfetti && (
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} 
          numberOfPieces={500} 
          gravity={0.2}
        />
      )}

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div 
            key="login-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            className="w-full max-w-md px-6 text-center"
          >
            <motion.div 
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
                <Lock className="w-8 h-8 text-white/70" />
              </div>
              
              <h2 className="text-2xl font-light text-white mb-8 font-['Great_Vibes'] tracking-widest text-4xl">
                ¿Cuál es la clave para abrir este capítulo?
              </h2>

              <div className="flex justify-center gap-3 mb-8">
                {password.map((char, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text" // Changed to text to show dots via CSS or font, but let's just use password type or text-security
                    className="w-12 h-14 md:w-14 md:h-16 rounded-xl bg-white/10 border-2 border-white/20 text-center text-2xl text-white focus:border-blue-400 focus:bg-white/20 focus:outline-none transition-all duration-300 shadow-inner"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{ WebkitTextSecurity: 'disc' }} // Hides text like password dots
                    inputMode="text"
                    autoComplete="off"
                  />
                ))}
              </div>

              <p className="text-white/30 text-sm">
                Ingresa la palabra secreta
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="gift-animation"
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                rotate: [0, -5, 5, -5, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 1.5, times: [0, 0.6, 1] }}
              className="relative z-10"
            >
              <Gift size={120} className="text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" strokeWidth={1.5} />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 text-4xl md:text-6xl text-white font-['Great_Vibes'] drop-shadow-lg"
            >
              ¡Que empiece el baile!
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
