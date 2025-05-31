// components/AdminLayout.js
import React from 'react';
import Sidebar from './AdminPage';
import { motion } from 'framer-motion';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.6, 0.05, 0.01, 0.9],
          staggerChildren: 0.1 
        }}
      >
        <Sidebar />
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          delay: 0.3,
          ease: "easeOut"
        }}
        className="ml-64 w-full"
      >
        <div className="p-8">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className="rounded-2xl bg-black/20 backdrop-blur-sm border border-purple-900/20 shadow-2xl"
          >
            <div className="p-6 min-h-[calc(100vh-8rem)]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6,
                  ease: "easeInOut"
                }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
