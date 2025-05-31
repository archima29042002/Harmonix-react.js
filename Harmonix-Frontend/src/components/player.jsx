"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Maximize2,
  ListMusic,
  Heart,
  Laptop,
} from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isLiked, setIsLiked] = useState(false)

  // Mock song data
  const currentSong = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200, // in seconds
    imageUrl: "/placeholder.svg?height=56&width=56",
  }

  // Simulate progress when playing
  useEffect(() => {
    let interval

    if (isPlaying && currentTime < currentSong.duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            clearInterval(interval)
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, currentSong.duration])

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center gap-4 w-[30%]">
          <img src={currentSong.imageUrl || "/placeholder.svg"} alt={currentSong.title} className="w-14 h-14 rounded" />
          <div>
            <p className="font-medium">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isLiked ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </Button>
        </div> */}

        {/* <div className="flex flex-col items-center w-[40%]"> */}
          {/* <div className="flex items-center gap-4 mb-2"> */}
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Shuffle className="h-4 w-4" />
            </Button> */}
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <SkipBack className="h-8 w-8" />
            </Button> */}
            {/* <Button
              size="icon"
              className="rounded-full bg-purple-500 text-white h-8 w-8"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button> */}
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <SkipForward className="h-4 w-4" />
            </Button> */}
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Repeat className="h-4 w-4" />
            </Button> */}
          {/* </div> */}

          {/* <div className="flex items-center gap-2 w-full"> */}
            {/* <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={currentSong.duration}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(currentSong.duration)}</span> */}
          {/* </div> */}
        {/* </div> */}

        {/* <div className="flex items-center gap-3 w-[30%] justify-end"> */}
          {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <ListMusic className="h-4 w-4" />
          </Button> */}
          {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Laptop className="h-4 w-4" />
          </Button> */}
          {/* <div className="flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="w-full"
            />
          </div> */}
          {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Maximize2 className="h-4 w-4" />
          </Button> */}
        {/* </div> */}
      </div>
    </div>
  )
}

