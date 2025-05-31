// LikedSongsContext.js
import { createContext, useContext, useState } from 'react'

const LikedSongsContext = createContext()

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([])

  return (
    <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
      {children}
    </LikedSongsContext.Provider>
  )
}

export const useLikedSongs = () => useContext(LikedSongsContext)
