"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Home,
  Search,
  Library,
  PlusSquare,
  Heart,
  Download,
  LogIn,
  UserPlus,
  CreditCard,
  Settings,
  ChevronUp,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "./ui/button"

// Simple theme toggle for React version
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "dark"
  })

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark")
    // Save theme to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-8 h-8 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-purple-700" />}
    </Button>
  )
}

export function Sidebar() {
  const sidebarRef = useRef(null)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const checkScroll = () => {
    if (!sidebarRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current
    setCanScrollUp(scrollTop > 0)
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 5)
    setShowScrollButtons(scrollHeight > clientHeight)
  }

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      checkScroll()
      sidebar.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [])

  const scrollUp = () => {
    if (!sidebarRef.current) return
    sidebarRef.current.scrollBy({ top: -100, behavior: "smooth" })
  }

  const scrollDown = () => {
    if (!sidebarRef.current) return
    sidebarRef.current.scrollBy({ top: 100, behavior: "smooth" })
  }

  return (
    <div className="relative flex flex-col h-full w-[210px] bg-background border-r border-border text-foreground">
      {showScrollButtons && canScrollUp && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-16 left-1/2 -translate-x-1/2 z-10 rounded-full bg-background/80 hover:bg-accent/90 w-8 h-8"
          onClick={scrollUp}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}

      <div className="p-6 flex items-center justify-between">
        <Link to="/homepage" className="flex items-center gap-2">
          <div className="bg-purple-600 rounded-full p-2">
            <svg viewBox="0 0 24 24" width="30" height="24">
              <path
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-bold">Harmonix</span>
        </Link>
        <ThemeToggle />
      </div>

      <div ref={sidebarRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="px-3 space-y-1">
          <Link to="/homepage" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
          <Link
            to="/library"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
          >
            <Library className="h-5 w-5" />
            Your Library
          </Link>
        </nav>

        <div className="mt-6">
          <nav className="px-3 space-y-1">
            <Link
              to="/create-playlist"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <PlusSquare className="h-5 w-5" />
              Create Playlist
            </Link>
            <Link
              to="/liked-songs"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <Heart className="h-5 w-5" />
              Liked Songs
            </Link>
            <Link
              to="/downloaded"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <Download className="h-5 w-5" />
              Downloaded
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <nav className="px-3 space-y-1">
            {/* <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <LogIn className="h-5 w-5" />
              Log In
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <UserPlus className="h-5 w-5" />
              Sign Up
            </Link> */}
            <Link
              to="/premium-plans"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <CreditCard className="h-5 w-5" />
              Premium Plans
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/50"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Add extra space to ensure scrolling is possible */}
        <div className="h-20"></div>
      </div>

      {showScrollButtons && canScrollDown && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-background/80 hover:bg-accent/90 w-8 h-8"
          onClick={scrollDown}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

