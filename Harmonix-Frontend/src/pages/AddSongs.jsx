import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const UploadForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState(null);
  const [track, setTrack] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if both files are selected
    if (!image || !audio) {
      alert('Please select both image and audio files.');
      return;
    }
  
    // Create FormData before making the request
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
      
      // If the upload is successful, navigate to the songs page
      if (res.data) {
        navigate('/songs');
      } else {
        console.error("Not working");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

   
  

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Upload Your Song</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image File Input */}
        <div>
          <label className="block text-lg font-medium">Song Title</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Artist Name</label>
          <input
            type="text"
            onChange={(e) => setTrack(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          </div>

        {/* Audio File Input */}
        <div>
          <label className="block text-lg font-medium">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
       

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </form>

      {/* Response */}
      {response && (
        <div className="mt-8 text-center bg-green-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold">Uploaded Successfully</h3>
          <div className="mt-4">
            <p><strong>Image URL:</strong> <a href={response.imageUrl} target="_blank" rel="noreferrer" className="text-indigo-600">{response.imageUrl}</a></p>
            <p><strong>Audio URL:</strong> <a href={response.audioUrl} target="_blank" rel="noreferrer" className="text-indigo-600">{response.audioUrl}</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
