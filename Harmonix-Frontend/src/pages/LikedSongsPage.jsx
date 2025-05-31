"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Play, Clock, MoreHorizontal, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { MainLayout } from "../components/main-layout"

export default function LikedSongsPage() {
  const [likedSongs, setLikedSongs] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSongId, setHoveredSongId] = useState(null)

  // Get the current user ID from localStorage
  const userId = localStorage.getItem('userid')
  
  // Create a storage key based on user ID or use a guest key if not logged in
  const storageKey = userId ? `likedSongs_${userId}` : 'likedSongs_guest'

  useEffect(() => {
    // First check if there are songs in the user-specific storage
    const userLikedSongs = localStorage.getItem(storageKey);
    
    if (userLikedSongs) {
      setLikedSongs(JSON.parse(userLikedSongs));
    } else {
      // If no user-specific songs found, check the old generic storage
      const oldLikedSongs = localStorage.getItem('likedSongs');
      
      if (oldLikedSongs) {
        // Migrate data from old storage to user-specific storage
        const parsedSongs = JSON.parse(oldLikedSongs);
        setLikedSongs(parsedSongs);
        localStorage.setItem(storageKey, oldLikedSongs);
      }
    }
  }, [storageKey]);

  const filteredSongs = searchQuery
    ? likedSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (song.album && song.album.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : likedSongs

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
    const updatedSongs = likedSongs.filter(song => song.id !== id);
    setLikedSongs(updatedSongs);
    localStorage.setItem(storageKey, JSON.stringify(updatedSongs));
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
              <Heart className="h-24 w-24 text-white" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm font-medium uppercase text-white">Playlist</p>
              <h1 className="text-7xl font-bold mt-2 mb-6 text-white">Liked Songs</h1>
              <p className="text-sm text-zinc-300">{likedSongs.length} songs</p>
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <motion.div whileHover={{scale: 1.05}} whileTap={{ scale: 0.95 }} >
            </motion.div>

            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                placeholder="Search in Liked Songs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-12 text-xs text-black dark:text-zinc-400 border-b border-zinc-800">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              {/* <div className="col-span-3">ALBUM</div> */}
              <div className="col-span-2">DATE ADDED</div>
              <div className="col-span-1 pl-1">ACTION</div>
              {/* <div className="col-span-1 flex justify-end">
                <Clock className="h-4 w-4" />
              </div> */}
            </div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 mt-2">
              {filteredSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  variants={item}
                  className="grid grid-cols-12 items-center px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 group"
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
                  <div className="col-span-5 flex items-center gap-3">
                    <img src={song.imageUrl || song.thumbnail || "/placeholder.svg"} alt={song.title} className="w-10 h-10 rounded" />
                    <div>
                      <p className="font-medium">{song.title || song.name}</p>
                      <p className="text-sm text-zinc-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-black dark:text-zinc-400">{song.addedAt}</div>
                  <div className="text-sm text-zinc-400">
                    <button
                      onClick={() => handleRemove(song.id)}
                      className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                      Dislike
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

