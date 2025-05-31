"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Download, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { MainLayout } from "../components/main-layout";
import axios from "axios";
import Songs from "./Songs";

export default function HomePage() {

  const [songs, setSongs] = useState([]);
  const audioRefs = React.useRef({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const [mutedIndex, setMutedIndex] = useState(null); // Track which song is muted
  const [sliderValues, setSliderValues] = useState({});
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

   const handleLike = (song) => {
    setLikedSongs(prev => {
      const isLiked = prev.some(item => item.id === song._id);
      let newLikedSongs;
      
      if (isLiked) {
        newLikedSongs = prev.filter(item => item.id !== song._id);
      } else {
        newLikedSongs = [...prev, {
          id: song._id,
          title: song.name,
          imageUrl: song.thumbnail,
          audio: song.audio,
          addedAt: new Date().toLocaleDateString(),
          duration: "0:00" // You can calculate actual duration if needed
        }];
      }
      
      localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
      return newLikedSongs;
    });
  };

  // Add this function to handle song downloads
  const [downloadedIds, setDownloadedIds] = useState(() => {
    // Initialize downloaded song IDs from localStorage
    const saved = JSON.parse(localStorage.getItem("downloadedSongs")) || [];
    return saved.map((song) => song.id);
  });

  const handleDownload = (song) => {
    // Ensure the audio URL exists
    if (!song.audio) {
      console.error("Audio URL missing");
      return;
    }

    // Create an invisible link and trigger download
    const link = document.createElement("a");
    link.href = song.audio; // must be a direct downloadable MP3 URL
    link.setAttribute("download", `${song.name || "song"}.mp3`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Track in localStorage
    const existingDownloads =
      JSON.parse(localStorage.getItem("downloadedSongs")) || [];
    const isAlreadyDownloaded = existingDownloads.some(
      (item) => item.id === song._id
    );

    if (!isAlreadyDownloaded) {
      const downloadedSong = {
        id: song._id,
        title: song.name || "Untitled",
        artist: song.artist || "Unknown Artist",
        album: song.album || "Unknown Album",
        downloadedAt: new Date().toLocaleDateString(),
        duration: song.duration || "3:30",
        imageUrl: song.thumbnail || song.imageUrl,
        audio: song.audio,
      };

      localStorage.setItem(
        "downloadedSongs",
        JSON.stringify([...existingDownloads, downloadedSong])
      );
    }
  };

  // Function to handle play event
  const handlePlay = (currentIndex) => {
    // If clicking on the currently playing song, pause it
    if (playingIndex === currentIndex) {
      audioRefs.current[currentIndex].pause();
      setPlayingIndex(null);
      return;
    }

    // Pause all other audio elements
    Object.keys(audioRefs.current).forEach((key) => {
      if (parseInt(key) !== currentIndex && audioRefs.current[key]) {
        audioRefs.current[key].pause();
      }
    });

    // Play the selected audio
    if (audioRefs.current[currentIndex]) {
      audioRefs.current[currentIndex].play();
      setPlayingIndex(currentIndex);
    }
  };

  const toggleMute = (index) => {
    if (audioRefs.current[index]) {
      // If clicking on already muted song, unmute it
      if (mutedIndex === index) {
        audioRefs.current[index].muted = false;
        setMutedIndex(null);
        return;
      }

      // Unmute any previously muted audio
      if (mutedIndex !== null && audioRefs.current[mutedIndex]) {
        audioRefs.current[mutedIndex].muted = false;
      }

      // Mute the selected audio
      audioRefs.current[index].muted = true;
      setMutedIndex(index);
    }
  };

  useEffect(() => {
    // Fetch songs
    axios
      .get("http://localhost:4000/api/v1/song/getallsongs")
      .then((res) => setSongs(res.data.songs));
  }, []);
  useEffect(() => {
    const checkChange = () => {
      if (localStorage.getItem("songsChanged") === "true") {
        axios
          .get("http://localhost:4000/api/v1/song/getallsongs")
          .then((res) => setSongs(res.data.songs)); // your logic to reload songs
        localStorage.setItem("songsChanged", "false");
      }
    };

    window.addEventListener("focus", checkChange); // check when user comes back

    return () => window.removeEventListener("focus", checkChange);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Add this function to update slider position
  const updateSliderPosition = (index) => {
    if (audioRefs.current[index]) {
      const audio = audioRefs.current[index];
      const percentage = (audio.currentTime / audio.duration) * 100 || 0;
      setSliderValues((prev) => ({
        ...prev,
        [index]: percentage,
      }));
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          {/* {greeting} */}
        </motion.h1>
        {/* Songs Card Grid */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">
            Hello! {localStorage.getItem("name")}
          </h1>
          <h1 className="text-lg font-semibold mb-4">All Songs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {songs.map((song, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black hover:bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center transition-colors"
              >
                <img
                  src={song.thumbnail}
                  alt={song.name}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white truncate w-full">
                  {song.name.split(" ").length > 25
                    ? song.name.split(" ").slice(0, 25).join(" ") + "..."
                    : song.name}
                </h3>

                <div >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800 h-8 w-8 "
                    title="Download Song"
                    onClick={() => handleDownload(song)}
                  >
                    <Download className="h-5 w-5" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800 h-8 w-8"
                    onClick={() => handleLike(song)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedSongs.some((item) => item.id === song._id)
                          ? "text-purple-600 fill-purple-600"
                          : ""
                      }`}
                    />
                  </Button>
                </div>

                {/* Custom Audio Player */}
                <div className="w-full flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                  <Button
                    onClick={() => handlePlay(index)}
                    size="icon"
                    className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br rounded-3xl text-white h-8 w-8 flex items-center justify-center"
                  >
                    {playingIndex === index ? (
                      <Pause className="h-4 w-9" />
                    ) : (
                      <Play className="h-4 w-10" />
                    )}
                  </Button>
                  <div className="flex-grow">
                    <input
                      type="range"
                      className="w-full accent-purple-600"
                      value={sliderValues[index] || 0}
                      onChange={(e) => {
                        if (audioRefs.current[index]) {
                          audioRefs.current[index].currentTime =
                            (e.target.value *
                              audioRefs.current[index].duration) /
                            100;
                        }
                      }}
                    />
                  </div>

                  <Button
                    onClick={() => toggleMute(index)}
                    size="icon"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 h-8 w-8"
                  >
                    {mutedIndex === index ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  {/* Hidden audio element for actual playback */}
                  <audio
                    ref={(el) => {
                      audioRefs.current[index] = el;
                    }}
                    className="hidden"
                    onEnded={() => setPlayingIndex(null)}
                    onTimeUpdate={() => updateSliderPosition(index)}
                    onLoadedMetadata={() => updateSliderPosition(index)}
                  >
                    <source src={song.audio} />
                    Your browser does not support the audio element.
                  </audio>
     
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
