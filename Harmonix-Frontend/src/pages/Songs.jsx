import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Songs = () => {
  const navigate = useNavigate();
  const [songid, setSongid] = useState("");
  const deleteSong = async (songid) => {
    const responce = await axios.delete(`http://localhost:4000/api/v1/song/deletesong/${songid}`);
    if(responce){
      setSongid("");
      console.log(responce.data);
    }
  }

  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    const responce = await axios.get('http://localhost:4000/api/v1/song/getallsongs');
    setSongs(responce.data.songs);
    console.log(responce.data.songs);
  }
  useEffect(() => {
    fetchSongs();
  },[songid])
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">My Songs</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 border-separate border-spacing-0 border-[1px] border-black">
          <thead className="bg-purple-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Artist</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Audio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-12px] border-black">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {songs.map((song, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 pt-1 pb-1 w-64 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">{song.name}</td>
                <td className="px-6 pt-1 pb-1 w-64 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">{song.track}</td>
                <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap border-b-[1px] border-r-[1px] border-black">
                  <audio controls className="w-40">
                    <source src={song.audio} />
                  </audio>
                </td>
                <td className="px-10 pt-1 pb-1 w-40 whitespace-nowrap border-b-[1px] border-r-[1px] border-black">
                  <img src={song.thumbnail} alt={song.name} className="w-24 h-24 object-cover rounded shadow" />
                </td>
                <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap border-b-[1px] border-black">
                  <button
                    onClick={() => {
                      deleteSong(song._id);
                      setSongid(song._id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          navigate('/addsongs')
        }}
        className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition shadow"
      >
        Upload Songs
      </button>
    </div>
  )
}

export default Songs
