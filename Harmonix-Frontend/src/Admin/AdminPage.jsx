// components/Sidebar.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Music, Users, PlusCircle,LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
const handleLogout = () => {
    localStorage.clear();
    Navigate('/admin-login');
  };
  const menuItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/addsongs', label: 'Add Song', icon: <PlusCircle size={20} /> },
    { path: '/songs', label: 'All Songs', icon: <Music size={20} /> },
    { path: '/user', label: 'All Users', icon: <Users size={20} /> },
  ];

  const navItemClass = (path) =>
    `flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-violet-800 hover:text-white transition-all duration-300 ${
    location.pathname === path 
        ? 'bg-violet-900 text-white shadow-lg shadow-violet-900/50' 
        : 'text-violet-100'
    }`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-64 bg-gradient-to-b from-slate-900 to-violet-950 p-6 shadow-xl fixed"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/50">
            <span className="text-2xl">🎵</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>

        </div>
        {/* <div className="p-4 rounded-xl bg-violet-700/20 border border-violet-500/20 backdrop-blur-sm">
          <p className="text-sm text-violet-300 text-center">
            Welcome to Harmonix Admin
          </p>
        </div> */}
        
      </motion.div>

      <nav className="space-y-3">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <Link to={item.path} className={navItemClass(item.path)}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <Link 
          to="/login"
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 hover:scale-[1.02] group"
        >
          <Home size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          <span onClick={handleLogout}>Log Out</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;