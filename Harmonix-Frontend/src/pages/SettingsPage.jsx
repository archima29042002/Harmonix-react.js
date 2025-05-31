//settings.jsx
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Volume2, Lock, Eye, Globe, Database, HelpCircle, Info, ChevronLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Switch } from "../components/ui/switch"
import { Slider } from "../components/ui/slider"
import { Separator } from "../components/ui/separator"
import { MainLayout } from "../components/main-layout"
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  
  const [volume, setVolume] = useState(80)
  const [notifications, setNotifications] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [explicitContent, setExplicitContent] = useState(false)
  const [dataSaver, setDataSaver] = useState(false)
  const navigate = useNavigate();
 const handleLogout =()=>{
  localStorage.clear();
    navigate("/");
 }
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/premium-plans">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-300">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="space-y-4 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-zinc-400">user@example.com</p>
                </div>
                <Button variant="outline" className="text-sm bg-purple-700 text-white hover:bg-purple-400 hover:text-black">
                  Change
                </Button>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-zinc-400">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" className="text-sm bg-purple-700 text-white hover:bg-purple-400 hover:text-black">
                  Change
                </Button>
              </div>

              
            </div>
          </section>

          

          <section>
            <h2 className="text-xl font-bold mb-4">Content</h2>
            <div className="space-y-4 rounded-lg p-4">
              <div className="flex items-center justify-between">
                
              </div>

             

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-zinc-400" />
                  <div>
                    <h3 className="font-medium">Language</h3>
                    <p className="text-sm text-zinc-400">Choose your preferred language</p>
                  </div>
                </div>
                <Button variant="outline" className="text-sm bg-purple-700 text-white hover:bg-purple-400 hover:text-black">
                  English
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Data</h2>
            <div className="space-y-4 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-zinc-400" />
                  <div>
                    <h3 className="font-medium">Data Saver</h3>
                    <p className="text-sm text-zinc-400">Reduces data usage while streaming</p>
                  </div>
                </div>
                <Switch 
                  checked={dataSaver} 
                  onCheckedChange={setDataSaver} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>

              <Separator className="bg-zinc-800" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-zinc-400" />
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-zinc-400">Receive notifications about new releases</p>
                  </div>
                </div>
                <Switch checked={notifications} className="data-[state=checked]:bg-purple-600" onCheckedChange={setNotifications} />
              </div>
            </div>
          </section>

          <div className="pt-4 pb-8 flex justify-between">
        
            <Button variant="outline" className="text-sm bg-purple-700 text-white hover:bg-purple-400 hover:text-black" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
const handleLogout = () => {
  // Remove only authentication-related items
  localStorage.removeItem('userid');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  // Add any other auth-related items that need to be cleared
  
  navigate("/");
}