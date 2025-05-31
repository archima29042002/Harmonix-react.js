"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Play, Pause, Clock, MoreHorizontal, Search, Wifi, WifiOff } from "lucide-react"
import { Input } from "../components/ui/input"
import { MainLayout } from "../components/main-layout"
import { useLocation } from 'react-router-dom';
import { useRef } from "react"

// Remove the mock data and replace with useState
export default function DownloadedPage() {
  const [downloadedSongs, setDownloadedSongs] = useState([])
  // const [searchQuery, setSearchQuery] = useState("")
  // const [hoveredSongId, setHoveredSongId] = useState(null)
  // const [offlineMode, setOfflineMode] = useState(false)
  // const location = useLocation();
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef({});
  const [sliderValues, setSliderValues] = useState({});
  
  // Add this function to update slider position
  const updateSliderPosition = (index) => {
    if (audioRefs.current[index]) {
      const audio = audioRefs.current[index];
      setSliderValues(prev => ({
        ...prev,
        [index]: (audio.currentTime / audio.duration) * 100 || 0
      }));
    }
  };

  // Add this function to handle slider change
  const handleSliderChange = (index, value) => {
    if (audioRefs.current[index]) {
      const audio = audioRefs.current[index];
      const time = (value * audio.duration) / 100;
      audio.currentTime = time;
      setSliderValues(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };
  const handlePlayPause = (index) => {
    if (playingIndex === index) {
      audioRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      Object.keys(audioRefs.current).forEach(key => {
        if (audioRefs.current[key]) audioRefs.current[key].pause();
      });
      audioRefs.current[index].play();
      setPlayingIndex(index);
    }
  };
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSongId, setHoveredSongId] = useState(null)
  const [offlineMode, setOfflineMode] = useState(false)
  const location = useLocation();

  // Load downloaded songs from localStorage whenever location changes
  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('downloadedSongs')) || [];
    setDownloadedSongs(storedSongs);
  }, [location]); // This dependency array ensures the effect runs when navigation occurs
 
  const filteredSongs = searchQuery
    ? downloadedSongs.filter(
        (song) => {
          const matchesSearch = (
            (song.title && song.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (song.track && song.track.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()))
          );
          
          // If this is the currently playing song, always include it
          if (playingIndex !== null && song === downloadedSongs[playingIndex]) {
            return true;
          }
          
          return matchesSearch;
        }
      )
    : downloadedSongs;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleRemove = (id) => {
    const updatedSongs = downloadedSongs.filter(song => song.id !== id);
    setDownloadedSongs(updatedSongs);
    localStorage.setItem('downloadedSongs', JSON.stringify(updatedSongs));
  };
  return (
    <MainLayout>
      <div>
        <div className="bg-purple-900 p-8">
          <div className="flex items-end gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-52 h-52 bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center rounded-md shadow-lg"
            >
              <Download className="h-24 w-24 text-white" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm font-medium uppercase text-white">Playlist</p>
              <h1 className="text-7xl font-bold mt-2 mb-6 text-white">Downloaded</h1>
              <p className="text-sm text-zinc-300">{downloadedSongs.length} songs</p>
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {/* <Button size="icon" className="rounded-full bg-purple-500 text-black h-14 w-14 shadow-lg"> */}
                  {/* <Play className="h-7 w-7" /> */}
                {/* </Button> */}
              </motion.div>

              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                  placeholder="Search in Downloaded"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <span className="text-sm">{offlineMode ? "Offline Mode" : "Online Mode"}</span>
              <div className="flex items-center gap-2">
                <WifiOff className={`h-4 w-4 ${offlineMode ? "text-purple-500" : "text-zinc-500"}`} />
                <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
                <Wifi className={`h-4 w-4 ${!offlineMode ? "text-purple-500" : "text-zinc-500"}`} />
              </div>
            </div> */}
          </div>

          <div className="">
            <div className="grid grid-cols-12 text-xs text-black dark:text-zinc-400 border-b border-zinc-800">
              <div className="col-span-1">#</div>
              <div className="col-span-4">TITLE</div>
              {/* <div className="col-span-3">ALBUM</div> */}
              <div className="col-span-3">DOWNLOADED ON</div>
              <div className="col-span-2">PLAY</div>
              <div className="col-span-2">REMOVE DOWNLOAD</div>
              {/* <div className="col-span-1 flex justify-end">
                <Clock className="h-4 w-4" />
              </div> */}
            </div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 mt-2">
              {filteredSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  variants={item}
                  className="grid grid-cols-12 items-center px-4 py-2 rounded-md group"
                  onMouseEnter={() => setHoveredSongId(song.id)}
                  onMouseLeave={() => setHoveredSongId(null)}
                >
                  <div className="col-span-1">
                    {hoveredSongId === song.id ? (
                      <Play className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-black dark:text-zinc-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <img src={song.imageUrl || "/placeholder.svg"} alt={song.title} className="w-10 h-10 rounded" />
                    <div>
                      <p className="font-medium">
                        {song.title.length > 15 ? `${song.title.substring(0, 15)}...` : song.title}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-span-3 text-sm text-zinc-400 truncate">{song.album}</div> */}
                  <div className="col-span-2 text-sm text-black dark:text-zinc-400 flex items-center gap-2">
                    {song.downloadedAt}
                  </div>
                  <div className="col-span-2 flex items-center gap-3">
                    <button
                      className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 focus:outline-none"
                      onClick={() => handlePlayPause(index)}
                      title={playingIndex === index ? "Pause" : "Play"}
                    >
                      {playingIndex === index ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    {/* <div className="w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValues[index] || 0}
                        onChange={(e) => handleSliderChange(index, parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div> */}
                    <div className="flex-grow">
                    <input
                      type="range"
                      className="w-50 accent-purple-600"
                      value={sliderValues[index] || 0}
                      onChange={(e) => {
                        if (audioRefs.current[index]) {
                          audioRefs.current[index].currentTime = e.target.value * audioRefs.current[index].duration / 100
                        }}}/>
                  </div>
                    <audio
                      ref={el => { audioRefs.current[index] = el; }}
                      src={song.audio}
                      onEnded={() => setPlayingIndex(null)}
                      onTimeUpdate={() => updateSliderPosition(index)}
                      onLoadedMetadata={() => updateSliderPosition(index)}
                      className="hidden"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2 text-sm text-zinc-400">
                  <button
                      onClick={() => handleRemove(song.id)}
                      className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* <div className="mt-8 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">About Downloaded Music</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Downloaded songs are available offline. You can manage your downloads in the settings. When offline mode
              is enabled, only downloaded content will be available for playback.
            </p>
            <Button variant="outline" size="sm" className="bg-purple-400">
              Manage Downloads
            </Button>
          </div> */}
        </div>
      </div>
    </MainLayout>
  )
}



