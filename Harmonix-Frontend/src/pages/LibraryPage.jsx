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
    imageUrl: "https://images.squarespace-cdn.com/content/v1/6635b968db68a92f85deec29/9d01a1e1-bd5d-4374-a8f8-c40298c5f4fc/aesthetic-spotify-playlist-covers.jpeg",
    pinned: true,
  },
  {
    id: "2",
    title: "Discover Weekly",
    owner: "Spotify",
    songCount: 30,
    imageUrl: "https://cherryontopblog.com/wp-content/uploads/2021/09/f96fdab163527ae959674c0530949abe.jpg",
    pinned: true,
  },
  {
    id: "3",
    title: "Release Radar",
    owner: "Spotify",
    songCount: 30,
    imageUrl: "https://i.pinimg.com/originals/84/0d/0b/840d0b75aaa9cfcf136748829f6f8ce5.jpg",
    pinned: false,
  },
  {
    id: "4",
    title: "Chill Mix",
    owner: "Spotify",
    songCount: 50,
    imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84b917ec31346f0a09bf44b9bc",
    pinned: false,
  },
  {
    id: "5",
    title: "Workout Playlist",
    owner: "You",
    songCount: 45,
    imageUrl: "https://i.pinimg.com/474x/20/99/09/2099097c86f03cf02abdf16761c504f4.jpg",
    pinned: false,
  },
  {
    id: "6",
    title: "Road Trip",
    owner: "You",
    songCount: 78,
    imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848ff6cab242350ca67b1af3b5",
    pinned: false,
  },
  {
    id: "7",
    title: "Party Mix",
    owner: "You",
    songCount: 62,
    imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844f229866d473bc332e25670b",
    pinned: false,
  },
  {
    id: "8",
    title: "Throwbacks",
    owner: "You",
    songCount: 120,
    imageUrl: "https://i.pinimg.com/564x/25/2c/44/252c444a00b4d2089116c2822178804f.jpg",
    pinned: false,
  },
]

// Mock data for artists
const artists = [
  {
    id: "1",
    name: "Drake",
    type: "Artist",
    imageUrl: "https://heavyhits.com/wp-content/uploads/2023/11/Best-Of-Drake-John-Lee_NOLOGO-300x300.jpeg",
    pinned: true,
  },
  {
    id: "2",
    name: "Taylor Swift",
    type: "Artist",
    imageUrl: "https://cdn01.justjared.com/wp-content/uploads/headlines/2020/04/taylor-swift-what-shes-up-to-in-quarantine.jpg",
    pinned: true,
  },
  {
    id: "3",
    name: "The Weeknd",
    type: "Artist",
    imageUrl: "https://ourculturemag.com/wp-content/uploads/2024/09/K1600_TheWeekndAlbumCover-1-300x300.jpg",
    pinned: false,
  },
  {
    id: "4",
    name: "Selena Gomez",
    type: "Artist",
    imageUrl: "https://cdn01.justjared.com/wp-content/uploads/headlines/2022/04/selena-gomez-didnt-win-grammy-fans-upset.jpg",
    pinned: false,
  },
  {
    id: "5",
    name: "Billie Eilish",
    type: "Artist",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpo_p9FZAGGFmGixmGrjJfjIzE1uLwmGEhg&s",
    pinned: false,
  },
  {
    id: "6",
    name: "Ariana Grande",
    type: "Artist",
    imageUrl: "https://i.pinimg.com/474x/d4/1b/a4/d41ba4602e8f774b98bc2bc263ccbbf7.jpg",
    pinned: false,
  },
]

// Mock data for albums
const albums = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png",
    pinned: true,
  },
  {
    id: "2",
    title: "Folklore",
    artist: "Taylor Swift",
    imageUrl: "https://media.socastsrm.com/wordpress/wp-content/blogs.dir/981/files/2021/01/taylors.jpg",
    pinned: false,
  },
  {
    id: "3",
    title: "Eternal Sunshine",
    artist: "Kendrick Lamar",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7e/Ariana_Grande_-_Eternal_Sunshine.png",
    pinned: false,
  },
  {
    id: "4",
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Billie_Eilish_-_Happier_Than_Ever.png",
    pinned: false,
  },
  {
    id: "5",
    title: "Certified Lover Boy",
    artist: "Drake",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuDgH9NpniCt_B4AMI8k8tRnV6q1DZJIbTw&s",
    pinned: false,
  },
  {
    id: "6",
    title: "Hollywood's Bleeding",
    artist: "Post Malone",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png",
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

