"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Facebook, Apple } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [regdata, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/register", regdata);
      console.log(res);
      if (res.data.success) {
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        alert("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      alert(error?.response?.data?.message || "Registration failed.");
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
          <h1 className="text-3xl font-bold text-white text-center mb-8">Sign up to start listening</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                className="bg-white/10 border-purple-500/50 text-white"
                placeholder="Enter your first name"
                value={regdata.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                className="bg-white/10 border-purple-500/50 text-white"
                placeholder="Enter your last name"
                value={regdata.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-white/10 border-purple-500/50 text-white"
                placeholder="Enter your email"
                value={regdata.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Create a password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  className="bg-white/10 border-purple-500/50 text-white pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={regdata.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-black "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsConsent"
                name="termsConsent"
                checked={regdata.termsConsent}
                onCheckedChange={(checked) =>
                  setRegData((prev) => ({ ...prev, termsConsent: checked }))
                }
                className="border-purple-500 data-[state=checked]:bg-purple-600"
                required
              />
              <Label htmlFor="termsConsent" className="text-white text-sm">
                I agree to the terms and conditions
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
              disabled={isLoading || !regdata.termsConsent}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <Separator className="my-8 bg-zinc-800" />

          <div className="text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
