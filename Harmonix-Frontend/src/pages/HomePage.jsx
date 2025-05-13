"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { MainLayout } from "../components/main-layout"
import axios from 'axios';
import Songs from "./Songs";

// Mock data for recently played
// const recentlyPlayed = [
  // {
  //   id: "1",
  //   title: "Chill Mix",
  //   description: "Relaxing beats for your day",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "2",
  //   title: "Hip Hop Mix",
  //   description: "Fresh hip hop tracks",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "3",
  //   title: "Workout Mix",
  //   description: "Energetic beats to keep you moving",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
//     id: "4",
//     title: "Focus Mix",
//     description: "Concentration-enhancing tracks",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "5",
//     title: "Throwback Mix",
//     description: "Nostalgic hits from the past",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "6",
//     title: "Discover Weekly",
//     description: "Your weekly mixtape of fresh music",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
// ]

// Mock data for featured playlists
// const featuredPlaylists = [
//   {
//     id: "7",
//     title: "Today's Top Hits",
//     description: "Drake is on top of the Hottest 50!",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "8",
//     title: "RapCaviar",
//     description: "New music from Kendrick Lamar, Drake and more",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "9",
//     title: "All Out 2010s",
//     description: "The biggest songs of the 2010s",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "10",
//     title: "Rock Classics",
//     description: "Rock legends & epic songs",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "11",
//     title: "Chill Hits",
//     description: "Kick back to the best new and recent chill hits",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
//   {
//     id: "12",
//     title: "Viva Latino",
//     description: "Today's top Latin hits",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     type: "playlist",
//   },
// ]

// Mock data for made for you
// const madeForYou = [
  // {
  //   id: "13",
  //   title: "Daily Mix 1",
  //   description: "Kendrick Lamar, J. Cole, Drake and more",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "14",
  //   title: "Daily Mix 2",
  //   description: "The Weeknd, Doja Cat, Post Malone and more",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "15",
  //   title: "Daily Mix 3",
  //   description: "Coldplay, Imagine Dragons, OneRepublic and more",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "16",
  //   title: "Daily Mix 4",
  //   description: "Taylor Swift, Olivia Rodrigo, Billie Eilish and more",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "17",
  //   title: "Release Radar",
  //   description: "Catch all the latest music from artists you follow",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
  // {
  //   id: "18",
  //   title: "On Repeat",
  //   description: "Songs you've been playing most",
  //   imageUrl: "/placeholder.svg?height=150&width=150",
  //   type: "playlist",
  // },
// ]

export default function HomePage() {
  // const [greeting, setGreeting] = useState()
  // ("Good morning")
  const [songs, setSongs] = useState([])
  const audioRefs = React.useRef({})
  const [playingIndex, setPlayingIndex] = useState(null)
  const [mutedIndex, setMutedIndex] = useState(null) // Track which song is muted
  const [sliderValues, setSliderValues] = useState({}) 
  
  // Add this function to handle song downloads
  const handleDownload = (song) => {
    // Get existing downloaded songs from localStorage
    const existingDownloads = JSON.parse(localStorage.getItem('downloadedSongs')) || [];
    
    // Check if song is already downloaded (by id)
    const isAlreadyDownloaded = existingDownloads.some(item => item.id === song._id);
    
    if (!isAlreadyDownloaded) {
      // Format the song data to match the structure expected in DownloadedPage
      const downloadedSong = {
        id: song._id,
        title: song.name,
        artist: song.artist || 'Unknown Artist',
        album: song.album || 'Unknown Album',
        downloadedAt: new Date().toLocaleDateString(),
        duration: '3:30', // You might want to calculate this from the audio file
        imageUrl: song.thumbnail,
        audio: song.audio
      };
      
      // Add to downloaded songs
      const updatedDownloads = [...existingDownloads, downloadedSong];
      
      // Save to localStorage
      localStorage.setItem('downloadedSongs', JSON.stringify(updatedDownloads));
      
      // Optional: Show success message
      console.log(`Downloaded: ${song.name}`);
      
      // Trigger the actual download
      const link = document.createElement('a');
      link.href = song.audio;
      link.download = song.name + '.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(`${song.name} is already downloaded`);
      
      // Still trigger the download even if already in library
      const link = document.createElement('a');
      link.href = song.audio;
      link.download = song.name + '.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Function to handle play event
  const handlePlay = (currentIndex) => {
    // If clicking on the currently playing song, pause it
    if (playingIndex === currentIndex) {
      audioRefs.current[currentIndex].pause()
      setPlayingIndex(null)
      return
    }
    
    // Pause all other audio elements
    Object.keys(audioRefs.current).forEach(key => {
      if (parseInt(key) !== currentIndex && audioRefs.current[key]) {
        audioRefs.current[key].pause()
      }
    })
    
    // Play the selected audio
    if (audioRefs.current[currentIndex]) {
      audioRefs.current[currentIndex].play()
      setPlayingIndex(currentIndex)
    }
  }

  const toggleMute = (index) => {
    if (audioRefs.current[index]) {
      // If clicking on already muted song, unmute it
      if (mutedIndex === index) {
        audioRefs.current[index].muted = false
        setMutedIndex(null)
        return
      }
      
      // Unmute any previously muted audio
      if (mutedIndex !== null && audioRefs.current[mutedIndex]) {
        audioRefs.current[mutedIndex].muted = false
      }
      
      // Mute the selected audio
      audioRefs.current[index].muted = true
      setMutedIndex(index)
    }
  }

  useEffect(() => {
    // Fetch songs
    axios.get('http://localhost:4000/api/v1/song/getallsongs').then(res => setSongs(res.data.songs))
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Add this function to update slider position
  const updateSliderPosition = (index) => {
    if (audioRefs.current[index]) {
      const audio = audioRefs.current[index];
      const percentage = (audio.currentTime / audio.duration) * 100 || 0;
      setSliderValues(prev => ({
        ...prev,
        [index]: percentage
      }));
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
          {/* {greeting} */}
        </motion.h1>
        {/* Songs Card Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">All Songs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {songs.map((song, index) => (
              <div key={index} className="bg-white dark:bg-black hover:bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center transition-colors">
                <img src={song.thumbnail} alt={song.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white truncate w-full">
                  {song.name.split(' ').length > 25 
                    ? song.name.split(' ').slice(0, 25).join(' ') + '...' 
                    : song.name}
                </h3>
                
                {/* Custom Audio Player */}
                <div className="w-full flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                  <Button 
                    onClick={() => handlePlay(index)} 
                    size="icon" 
                    className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br rounded-3xl text-white h-8 w-8 flex items-center justify-center"
                  >
                    {playingIndex === index ? 
                      <Pause className="h-4 w-9" /> : 
                      <Play className="h-4 w-10" />}
                  </Button>
                  <div className="flex-grow">
                    <input 
                      type="range" 
                      className="w-full accent-purple-600"
                      value={sliderValues[index] || 0}
                      onChange={(e) => {
                        if (audioRefs.current[index]) {
                          audioRefs.current[index].currentTime = e.target.value * audioRefs.current[index].duration / 100
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
                    {mutedIndex === index ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  {/* Hidden audio element for actual playback */}
                  <audio 
                    ref={el => { audioRefs.current[index] = el }}
                    className="hidden"
                    onEnded={() => setPlayingIndex(null)}
                    onTimeUpdate={() => updateSliderPosition(index)}
                    onLoadedMetadata={() => updateSliderPosition(index)}
                  >
                    <source src={song.audio} />
                    Your browser does not support the audio element.
                  </audio>
                  {/* Download Button - Purple beside slider */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800 h-8 w-8"
                    title="Download Song"
                    onClick={() => handleDownload(song)}
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* <Songs /> */}

        {/* <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {recentlyPlayed.slice(0, 6).map((item) => (
            <motion.div
              key={item.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="rounded-md overflow-hidden flex items-center h-20 shadow-md bg-black hover:bg-gray-800 transition-colors"
            >
              <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="h-12 w-12 object-cover" />
              <div className="flex-1 truncate px-3 dark:text-white">{item.title}</div>
              <div className="opacity-0 group-hover:opacity-100 p-2">
                <Button size="icon" variant="ghost" className="rounded-full bg-purple-500 text-black h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Playlists</h2>
            <Button variant="link" className="text-purple-500 hover:text-purple-300">
              Show all
            </Button>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {featuredPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="p-4 rounded-md group bg-black hover:bg-gray-800 transition-colors"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.imageUrl || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-md shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full bg-purple-600 text-black h-10 w-10 shadow-lg hover:bg-purple-400">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold truncate dark:text-white">{playlist.title}</h3>
                <p className="text-sm text-zinc-700 line-clamp-2">{playlist.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section> */}

        {/* <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Made For You</h2>
            <Button variant="link" className="text-purple-500 hover:text-purple-300">
              Show all
            </Button>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {madeForYou.map((playlist) => (
              <motion.div
                key={playlist.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="p-4 rounded-md group bg-black hover:bg-gray-800 transition-colors"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.imageUrl || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-md shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full bg-purple-600 text-white h-10 w-10 shadow-lg hover:bg-purple-400">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold truncate dark:text-white">{playlist.title}</h3>
                <p className="text-sm text-zinc-700 line-clamp-2">{playlist.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section> */}
      </div>
    </MainLayout>
  )
}

