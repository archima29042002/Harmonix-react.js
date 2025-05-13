"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Grid, List, Search, Plus, Play, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { MainLayout } from "../components/main-layout"

// Mock data for playlists
const playlists = [
  {
    id: "1",
    title: "Liked Songs",
    owner: "You",
    songCount: 237,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: true,
  },
  {
    id: "2",
    title: "Discover Weekly",
    owner: "Spotify",
    songCount: 30,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: true,
  },
  {
    id: "3",
    title: "Release Radar",
    owner: "Spotify",
    songCount: 30,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "4",
    title: "Chill Mix",
    owner: "Spotify",
    songCount: 50,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "5",
    title: "Workout Playlist",
    owner: "You",
    songCount: 45,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "6",
    title: "Road Trip",
    owner: "You",
    songCount: 78,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "7",
    title: "Party Mix",
    owner: "You",
    songCount: 62,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "8",
    title: "Throwbacks",
    owner: "You",
    songCount: 120,
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
]

// Mock data for artists
const artists = [
  {
    id: "1",
    name: "Drake",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: true,
  },
  {
    id: "2",
    name: "Taylor Swift",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: true,
  },
  {
    id: "3",
    name: "The Weeknd",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "4",
    name: "Kendrick Lamar",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "5",
    name: "Billie Eilish",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "6",
    name: "Post Malone",
    type: "Artist",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
]

// Mock data for albums
const albums = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: true,
  },
  {
    id: "2",
    title: "Folklore",
    artist: "Taylor Swift",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "3",
    title: "DAMN.",
    artist: "Kendrick Lamar",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "4",
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "5",
    title: "Certified Lover Boy",
    artist: "Drake",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
  {
    id: "6",
    title: "Hollywood's Bleeding",
    artist: "Post Malone",
    imageUrl: "/placeholder.svg?height=150&width=150",
    pinned: false,
  },
]

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("playlists")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

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

  const getFilteredData = () => {
    if (!searchQuery) {
      switch (activeTab) {
        case "playlists":
          return playlists
        case "artists":
          return artists
        case "albums":
          return albums
        default:
          return []
      }
    }

    const query = searchQuery.toLowerCase()

    switch (activeTab) {
      case "playlists":
        return playlists.filter(
          (playlist) => playlist.title.toLowerCase().includes(query) || playlist.owner.toLowerCase().includes(query),
        )
      case "artists":
        return artists.filter((artist) => artist.name.toLowerCase().includes(query))
      case "albums":
        return albums.filter(
          (album) => album.title.toLowerCase().includes(query) || album.artist.toLowerCase().includes(query),
        )
      default:
        return []
    }
  }

  const filteredData = getFilteredData()

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Library</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-400" />
              <Input
                className="pl-10 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-12 text-base text-black dark:text-white"
                placeholder="Search in Your Library"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button> */}
          </div>
        </div>

        <Tabs defaultValue="playlists" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-purple-600">
            <TabsTrigger 
              value="playlists" 
              className="text-white hover:bg-purple-400"
            >
              Playlists
            </TabsTrigger>
            <TabsTrigger 
              value="artists" 
              className="text-white hover:bg-purple-400"
            >
              Artists
            </TabsTrigger>
            <TabsTrigger 
              value="albums" 
              className="text-white hover:bg-purple-400"
            >
              Albums
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {viewMode === "grid" ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-zinc-800/40 p-4 rounded-md group"
              >
                <div className="relative mb-4">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title || item.name}
                    className="w-full aspect-square object-cover rounded-md shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full bg-purple-500 text-black h-10 w-10 shadow-lg">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold truncate">{item.title || item.name}</h3>
                <p className="text-sm text-zinc-400 truncate">
                  {item.owner || item.type || item.artist}
                  {item.songCount && ` • ${item.songCount} songs`}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                variants={item}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                className="flex items-center gap-4 p-2 rounded-md group bg-white dark:bg-transparent"
              >
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title || item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.title || item.name}</h3>
                  <p className="text-sm text-zinc-400 truncate">
                    {item.owner || item.type || item.artist}
                    {item.songCount && ` • ${item.songCount} songs`}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}

