"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Image, Plus, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { MainLayout } from "../components/main-layout"

export default function CreatePlaylistPage() {
  const [playlistName, setPlaylistName] = useState("")
  const [playlistDescription, setPlaylistDescription] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])
  const [coverImage, setCoverImage] = useState(null)

  // Mock data for search results
  const searchResults = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "2",
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "3",
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:35",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "4",
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      duration: "2:21",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "5",
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "6",
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      album: "MONTERO",
      duration: "2:17",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "7",
      title: "Bad Habits",
      artist: "Ed Sheeran",
      album: "=",
      duration: "3:51",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "8",
      title: "Peaches",
      artist: "Justin Bieber",
      album: "Justice",
      duration: "3:18",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
  ]

  const addSong = (song) => {
    if (!selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const removeSong = (songId) => {
    setSelectedSongs(selectedSongs.filter((song) => song.id !== songId))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
      <div className="p-6">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
          Create New Playlist
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1">
            <div className="p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <div
                  className="relative aspect-square bg-white dark:bg-zinc-900 rounded-md flex items-center justify-center mb-4 overflow-hidden cursor-pointer"
                  onClick={() => document.getElementById("cover-upload")?.click()}
                >
                  {coverImage ? (
                    <img
                      src={coverImage || "/placeholder.svg"}
                      alt="Playlist cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="h-12 w-12 text-zinc-700" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-sm font-medium">Choose image</p>
                  </div>
                  <input
                    type="file"
                    id="cover-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="playlist-name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="playlist-name"
                      placeholder="My Playlist"
                      className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="playlist-description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="playlist-description"
                      placeholder="Give your playlist a catchy description"
                      className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                      rows={3}
                      value={playlistDescription}
                      onChange={(e) => setPlaylistDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Selected Songs ({selectedSongs.length})</h3>
                {selectedSongs.length === 0 ? (
                  <p className="text-sm text-black dark:text-zinc-400">
                    No songs added yet. Search and add songs from the right panel.
                  </p>
                ) : (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-2 max-h-[300px] overflow-y-auto pr-2"
                  >
                    {selectedSongs.map((song) => (
                      <motion.div
                        key={song.id}
                        variants={item}
                        className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 p-2 rounded-md group"
                      >
                      <img src={song.imageUrl || "/placeholder.svg"} alt={song.title} className="w-10 h-10 rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{song.title}</p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-400 truncate">{song.artist}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100"
                          onClick={() => removeSong(song.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-purple-600 hover:bg-purple-400">Create Playlist</Button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2">
            <div className="p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <Input
                    className= "pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                    placeholder="Search for songs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Search Results</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-12 text-xs dark:text-zinc-400 text-zinc-600 px-2 py-1">
                    <div className="col-span-6">TITLE</div>
                    <div className="col-span-4">ALBUM</div>
                    <div className="col-span-2 text-right">DURATION</div>
                  </div>

                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
                    {searchResults.map((song) => (
                      <motion.div
                        key={song.id}
                        variants={item}
                        whileHover={{ backgroundColor: "rgba(156, 96, 96, 0.05)" }}
                        className="grid grid-cols-12 items-center p-2 rounded-md group cursor-pointer"
                        onClick={() => addSong(song)}
                      >
                        <div className="col-span-6 flex items-center gap-3">
                          {/* <img
                            src={song.imageUrl || "/placeholder.svg"}
                            alt={song.title}
                            className="w-10 h-10 rounded"
                          /> */}
                          <div>
                            <p className="font-medium">{song.title}</p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-400">{song.artist}</p>
                          </div>
                        </div>
                        <div className="col-span-4 text-sm dark:text-zinc-400 text-zinc-600 truncate">{song.album}</div>
                        <div className="col-span-2 text-right text-sm text-zinc-400 dark:text-zinc-400 flex items-center justify-end gap-2">
                          <span>{song.duration}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}

