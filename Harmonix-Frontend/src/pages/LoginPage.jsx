"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        console.log(res);
         localStorage.setItem("userid",res.data.user.id)
         localStorage.setItem("email",res.data.user.email)
         localStorage.setItem("name",res.data.user.name)
        // Redirect to home page
        // if(res.data.user.isAdmin){
        //   navigate("/admin-dashboard", { replace: true }); // Add replace: true to prevent back navigation
        // }else{
          navigate("/homepage", { replace: true }); // Add replace: true to prevent back navigation
        //}
        // Add replace: true to prevent back navigation
      } else {
        alert(res.data.message || "Invalid login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the main container and styling
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center">
      <header className="w-full border-b border-purple-800/30 p-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-purple-600 rounded-full p-2">
            <svg viewBox="0 0 24 24" width="30" height="24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="white" />
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">Harmonix</span>
        </Link>
      </header>
  
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-purple-500/20"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-8">Login to start listening</h1>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email or username</Label>
              <Input
                id="email"
                type="text"
                className="bg-white/10 border-purple-500/50 text-white"
                placeholder="Email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white/10 border-purple-500/50 text-white pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
  
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
                className="border-purple-500 data-[state=checked]:bg-purple-600"
                required
              />
              <Label htmlFor="remember" className="text-white text-sm">
                I am not a robot
              </Label>
            </div>
  
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
  
          <Separator className="my-8 bg-zinc-800" />
  
          <div className="text-center">
            <p className="text-zinc-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                Sign up for Harmonix
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Are you an Admin?{" "}
              <Link to="/admin-login" className="text-purple-400 hover:text-purple-300">
                Admin Login
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}