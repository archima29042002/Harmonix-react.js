import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Admin/AminLayout';
import { motion } from 'framer-motion';
import { Upload, Music, Image, X } from 'lucide-react';

const UploadForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState('');
  const [track, setTrack] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({ image: null });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview({ image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !audio) {
      alert('Please select both image and audio files.');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);
    formData.append('name', name);
    formData.append('track', track);
  
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:4000/api/v1/song/createsong', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data) {
        navigate('/songs');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto mt-10 px-4"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          Upload Your Song
        </motion.h2>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-lg font-medium text-pink-200">Song Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter song title"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-lg font-medium text-pink-200">Artist Name</label>
            <input
              type="text"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full p-3 mt-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter artist name"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <label className="block text-lg font-medium text-pink-200 mb-2">Image File</label>
            <div className="relative h-40 border-2 border-dashed border-white/20 rounded-lg overflow-hidden hover:border-purple-500 transition-colors">
              {preview.image ? (
                <div className="relative w-full h-full">
                  <img src={preview.image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview({ image: null });
                      setImage(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <Image className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-400">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-lg font-medium text-pink-200 mb-2">Audio File</label>
            <div className="relative h-20 border-2 border-dashed border-white/20 rounded-lg hover:border-purple-500 transition-colors">
              <label className="flex items-center justify-center h-full cursor-pointer">
                <Music className="w-8 h-8 text-gray-400 mr-2" />
                <span className="text-gray-400">
                  {audio ? audio.name : 'Click to upload audio'}
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudio(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Files
                </div>
              )}
            </button>
          </motion.div>
        </motion.form>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center bg-green-500/10 p-6 rounded-lg border border-green-500/20"
          >
            <h3 className="text-2xl font-semibold text-green-400">Uploaded Successfully</h3>
            <div className="mt-4 text-gray-300">
              <p><strong>Image URL:</strong> <a href={response.imageUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300">{response.imageUrl}</a></p>
              <p><strong>Audio URL:</strong> <a href={response.audioUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300">{response.audioUrl}</a></p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default UploadForm;
