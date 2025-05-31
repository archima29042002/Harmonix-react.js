import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HarmonixHome() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/src/components/Icons/banner-bg.jpg')"
      }}
    >
      {/* Overlay with animated gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-pink-700/40 z-0"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          background: [
            "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(88,28,135,0.6), rgba(219,39,119,0.4))",
            "linear-gradient(to bottom right, rgba(88,28,135,0.7), rgba(219,39,119,0.6), rgba(0,0,0,0.4))",
            "linear-gradient(to bottom right, rgba(219,39,119,0.7), rgba(0,0,0,0.6), rgba(88,28,135,0.4))"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          variants={itemVariants}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Harmonix
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl md:text-2xl text-white/90 font-medium tracking-wide backdrop-blur-sm py-2 px-4 rounded-lg"
        >
          Experience the next generation of music.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg backdrop-blur-sm border border-purple-400/30"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-lg shadow-lg border border-white/30 hover:bg-white/20 transition-colors duration-300"
            onClick={() => navigate('/login')}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated floating music notes */}
      <motion.div
        className="absolute text-5xl text-purple-300/40 backdrop-blur-sm"
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "20%", left: "20%" }}
      >
        ♪
      </motion.div>
      <motion.div
        className="absolute text-6xl text-pink-300/40 backdrop-blur-sm"
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "20%", right: "20%" }}
      >
        ♫
      </motion.div>
    </div>
  );
}