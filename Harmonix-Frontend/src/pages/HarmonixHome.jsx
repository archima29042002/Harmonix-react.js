import React from "react";
import { useNavigate } from "react-router-dom";

export default function HarmonixHome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/src/components/Icons/banner-bg.jpg')"
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-pink-700/40 z-0 animate-fadeIn"></div>
      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 drop-shadow-lg animate-textPop">
          Harmonix
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white/80 font-medium animate-fadeIn delay-200">
          Experience the next generation of music.
        </p>
        <div className="mt-10 flex gap-6 animate-fadeIn delay-300">
          <button
            className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-pink-500 transition duration-300"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          <button
            className="px-8 py-3 rounded-full bg-white/80 text-purple-700 font-bold text-lg shadow-lg hover:bg-yellow-300 transition duration-300"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
      {/* Floating animated music notes */}
      <div className="absolute left-10 top-10 animate-spin-slow text-5xl text-yellow-300 opacity-60">&#9835;</div>
      <div className="absolute right-10 bottom-10 text-5xl animate-spin-slow text-pink-300 opacity-30">&#119070;</div>
      <div className="absolute left-1/2 bottom-20 animate-spin-slow text-6xl text-purple-300 opacity-50">&#9833;</div>
    </div>
  );
}