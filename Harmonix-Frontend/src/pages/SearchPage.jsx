"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SearchIcon } from "lucide-react"
import { Input } from "../components/ui/input"
import { MainLayout } from "../components/main-layout"
import axios from "axios"
import { useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useRef } from "react"

// Mock data for browse categories
// const browseCategories = [
  // {
  //   id: "1",
  //   name: "Podcasts",
  //   color: "from-purple-700 to-purple-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // {
  //   id: "2",
  //   name: "Live Events",
  //   color: "from-orange-700 to-orange-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // {
  //   id: "3",
  //   name: "Made For You",
  //   color: "from-blue-700 to-blue-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // {
  //   id: "4",
  //   name: "New Releases",
  //   color: "from-pink-700 to-pink-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // { id: "5", name: "Pop", color: "from-red-700 to-red-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // {
  //   id: "6",
  //   name: "Hip-Hop",
  //   color: "from-yellow-700 to-yellow-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // { id: "7", name: "Rock", color: "from-purple-700 to-purple-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // { id: "8", name: "Latin", color: "from-teal-700 to-teal-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // { id: "9", name: "Mood", color: "from-indigo-700 to-indigo-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // {
  //   id: "10",
  //   name: "Dance/Electronic",
  //   color: "from-cyan-700 to-cyan-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // {
  //   id: "11",
  //   name: "Indie",
  //   color: "from-fuchsia-700 to-fuchsia-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // { id: "12", name: "Trending", color: "from-rose-700 to-rose-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // {
  //   id: "13",
  //   name: "Workout",
  //   color: "from-amber-700 to-amber-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // { id: "14", name: "R&B", color: "from-lime-700 to-lime-500", imageUrl: "/placeholder.svg?height=150&width=150" },
  // {
  //   id: "15",
  //   name: "Country",
  //   color: "from-emerald-700 to-emerald-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
  // {
  //   id: "16",
  //   name: "Folk & Acoustic",
  //   color: "from-sky-700 to-sky-500",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  // },
// ]

// Mock data for trending searches
// const trendingSearches = [
  // "Taylor Swift",
  // "Drake",
  // "Kendrick Lamar",
  // "Billie Eilish",
  // "The Weeknd",
  // "Bad Bunny",
  // "Doja Cat",
  // "Post Malone",
  // "Ariana Grande",
  // "Travis Scott",
// ]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [songs, setSongs] = useState([])
  const [playingIndex, setPlayingIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRefs = useRef([])

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/song/getallsongs").then(res => setSongs(res.data.songs))
  }, [])

  const handlePlayPause = (index) => {
    if (playingIndex !== null && playingIndex !== index && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex].pause()
      audioRefs.current[playingIndex].currentTime = 0
    }
    if (playingIndex === index && isPlaying) {
      audioRefs.current[index].pause()
      setIsPlaying(false)
      setPlayingIndex(null)
    } else {
      audioRefs.current[index].volume = volume
      audioRefs.current[index].muted = muted
      audioRefs.current[index].play()
      setIsPlaying(true)
      setPlayingIndex(index)
    }
  }

  const handleMuteToggle = (index) => {
    setMuted((prev) => {
      const newMuted = !prev
      if (audioRefs.current[index]) {
        audioRefs.current[index].muted = newMuted
      }
      return newMuted
    })
  }

  // Remove handleVolumeChange function

  const handleTimeUpdate = (index) => {
    if (audioRefs.current[index]) {
      setProgress(audioRefs.current[index].currentTime)
    }
  }

  const handleLoadedMetadata = (index) => {
    if (audioRefs.current[index]) {
      setDuration(audioRefs.current[index].duration)
    }
  }

  const handleSeek = (e, index) => {
    const newTime = parseFloat(e.target.value)
    if (audioRefs.current[index]) {
      audioRefs.current[index].currentTime = newTime
      setProgress(newTime)
    }
  }

  const filteredSongs = searchQuery
    ? songs.filter(song =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (song.album && song.album.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

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

  // Add this function to handle search and update recent searches
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim() !== "") {
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== value.toLowerCase());
        return [value, ...filtered].slice(0, 5);
      });
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-400" />
            <Input
              className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Recent Searches</h3>
            <ul className="flex flex-wrap gap-2">
              {recentSearches.map((search, idx) => (
                <li
                  key={idx}
                  className="bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded-full cursor-pointer text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800"
                  onClick={() => handleSearchChange(search)}
                >
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!searchQuery && (
          <>
            {/* <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Browse all</h2>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
              >
                {browseCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className={`relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br ${category.color} cursor-pointer`}
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                    </div>
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover transform rotate-25 translate-x-1/4 translate-y-1/4"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section> */}

            {/* <section>
              <h2 className="text-2xl font-bold mb-4">Trending searches</h2>
              <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full px-4 py-2 cursor-pointer hover:bg-purple-400 dark:hover:bg-purple-800"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </motion.div>
                ))}
              </motion.div>
            </section> */}
          </>
        )}

        {searchQuery && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Top results for "{searchQuery}"</h2>
            {filteredSongs.length === 0 ? (
              <p className="text-zinc-400">No songs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSongs.map((song, index) => (
                  <div key={index} className="bg-white dark:bg-black hover:bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center transition-colors">
                    <img src={song.thumbnail} alt={song.name} className="w-full h-40 object-cover rounded-md mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white truncate w-full">
                      {song.name}
                    </h3>
                    <p className="text-sm text-zinc-400">{song.artist}</p>
                    <div className="flex items-center gap-2 mt-2 w-full justify-center">
                      <button
                        onClick={() => handlePlayPause(index)}
                        className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none"
                      >
                        {playingIndex === index && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button
                        onClick={() => handleMuteToggle(index)}
                        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                      >
                        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                    {playingIndex === index && (
                      <div className="flex items-center gap-2 w-full mt-2">
                        <span className="text-xs text-zinc-400">{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')}</span>
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          step="0.1"
                          value={progress}
                          onChange={e => handleSeek(e, index)}
                          className="flex-1 accent-purple-600"
                        />
                        <span className="text-xs text-zinc-400">{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
                      </div>
                    )}
                    <audio
                      ref={el => (audioRefs.current[index] = el)}
                      src={song.audio}
                      onTimeUpdate={() => handleTimeUpdate(index)}
                      onLoadedMetadata={() => handleLoadedMetadata(index)}
                      onEnded={() => {
                        setIsPlaying(false)
                        setPlayingIndex(null)
                        setProgress(0)
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

