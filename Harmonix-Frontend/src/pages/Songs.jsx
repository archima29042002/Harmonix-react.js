import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Admin/AminLayout';
import { Plus, Trash2, Music, AlertCircle, Shield } from 'lucide-react';

const Songs = () => {
  const navigate = useNavigate();
  const [songid, setSongid] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteSong = async (songid) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:4000/api/v1/song/deletesong/${songid}`);
      if(response) {
        setSongid("");
        fetchSongs();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete song');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/song/getallsongs');
      setSongs(response.data.songs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch songs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="p-8 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50"
      >
        <motion.div
          variants={headerVariants}
          className="flex items-center gap-6 mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
        >
          <div className="p-4 bg-purple-600 rounded-xl shadow-purple-300 shadow-lg">
            <Music className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
              Song Management
            </h1>
            <p className="text-gray-600 mt-2">Manage your music collection</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/addsongs')}
            className="ml-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors"
          >
            <Plus size={20} />
            Upload Songs
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <div className="absolute inset-0 border-4 border-purple-300 border-t-transparent rounded-full animate-ping" />
              </div>
              <p className="text-purple-600 font-medium animate-pulse">Loading songs...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg flex items-center gap-4"
            >
              <AlertCircle className="h-6 w-6 text-red-500 animate-bounce" />
              <p className="text-red-700 font-medium">{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={tableVariants}
              initial="hidden"
              animate="show"
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Artist</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Audio</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.length > 0 ? (
                      songs.map((song, index) => (
                        <motion.tr
                          key={song._id}
                          variants={rowVariants}
                          className={`border-b border-purple-50 backdrop-blur-sm ${
                            index % 2 === 0 ? 'bg-purple-50/30' : 'bg-white/30'
                          }`}
                          whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Music className="text-purple-500" size={20} />
                              <span className="font-medium text-purple-900">{song.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-purple-700">{song.track}</td>
                          <td className="px-6 py-4">
                            <audio controls className="w-48 h-10">
                              <source src={song.audio} />
                            </audio>
                          </td>
                          <td className="px-6 py-4">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              src={song.thumbnail}
                              alt={song.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-md"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <motion.button
                              whileHover={{ scale: 1.05, backgroundColor: '#EF4444' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                deleteSong(song._id);
                                setSongid(song._id);
                              }}
                              className="flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr variants={rowVariants}>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <motion.div 
                            className="flex flex-col items-center gap-3 text-purple-500"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <Music size={48} />
                            <p className="font-medium text-lg">No songs found</p>
                          </motion.div>
                        </td>
                      </motion.tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

export default Songs;
