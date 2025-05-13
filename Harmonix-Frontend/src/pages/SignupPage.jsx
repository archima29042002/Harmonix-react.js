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

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <header className="w-full border-b border-zinc-800 p-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-purple-600 rounded-full p-2">
            <svg viewBox="0 0 24 24" width="30" height="24">
              <path
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                fill="white"
              ></path>
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">Harmonix</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Sign up to start listening</h1>

          {/* <div className="space-y-4 mb-8">
            <Button variant="outline" className="w-full text-white gap-2">
              <Facebook className="h-5 w-5 text-blue-500" />
              Sign up with Facebook
            </Button>
            <Button variant="outline" className="w-full text-white gap-2">
              <Apple className="h-5 w-5" />
              Sign up with Apple
            </Button>
            <Button variant="outline" className="w-full text-white">Sign up with Google</Button>
          </div> */}

          {/* <div className="relative mb-8">
            <Separator className="bg-zinc-800" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-zinc-400 text-sm">
              or
            </span>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <Input
                id="int"
                name="firstName"
                type="text"
                className="pl-5 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
                placeholder="Enter your first name"
                value={regdata.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="int"
                name="lastName"
                type="text"
                className="pl-5 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
                placeholder="Enter your last name"
                value={regdata.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="int"
                name="email"
                type="email"
                className="pl-5 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
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
                  id="int"
                  name="password"
                  className="pl-5 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-400"
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
                className="border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600" required
              />
              <Label htmlFor="termsConsent" className="text-white text-sm">
                I agree to the terms and conditions
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-400 text-black font-bold"
              disabled={isLoading || !regdata.termsConsent}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <Link to="/login" className="text-white underline hover:text-purple-300">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
