"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Play, Clock, MoreHorizontal, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { MainLayout } from "../components/main-layout"

// Mock data for liked songs
const likedSongs = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    addedAt: "2 weeks ago",
    duration: "3:20",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    addedAt: "1 month ago",
    duration: "3:23",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    addedAt: "3 weeks ago",
    duration: "3:35",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    addedAt: "1 week ago",
    duration: "2:21",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "5",
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    addedAt: "2 months ago",
    duration: "2:58",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "6",
    title: "Montero (Call Me By Your Name)",
    artist: "Lil Nas X",
    album: "MONTERO",
    addedAt: "3 months ago",
    duration: "2:17",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "7",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    addedAt: "1 month ago",
    duration: "3:51",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "8",
    title: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    addedAt: "2 months ago",
    duration: "3:18",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "9",
    title: "drivers license",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    addedAt: "5 months ago",
    duration: "4:02",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "10",
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    album: "Planet Her",
    addedAt: "3 months ago",
    duration: "3:28",
    imageUrl: "/placeholder.svg?height=50&width=50",
  },
]

export default function LikedSongsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSongId, setHoveredSongId] = useState(null)

  const filteredSongs = searchQuery
    ? likedSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase()),
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
              <Button size="icon" className="rounded-full bg-purple-500 text-black h-14 w-14 shadow-lg ">
                <Play className="h-7 w-7" />
              </Button>
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
            <div className="grid grid-cols-12 text-xs text-zinc-400 border-b border-zinc-800 px-4 py-2">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2">DATE ADDED</div>
              <div className="col-span-1 flex justify-end">
                <Clock className="h-4 w-4" />
              </div>
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
                      <span className="text-zinc-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <img src={song.imageUrl || "/placeholder.svg"} alt={song.title} className="w-10 h-10 rounded" />
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-zinc-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-sm text-zinc-400 truncate">{song.album}</div>
                  <div className="col-span-2 text-sm text-zinc-400">{song.addedAt}</div>
                  <div className="col-span-1 flex items-center justify-end gap-2 text-sm text-zinc-400">
                    <span>{song.duration}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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

