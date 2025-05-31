"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, CheckCircle2, Music, Users, Shield } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { MainLayout } from "../components/main-layout"

export default function PremiumPlansPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/downloaded">
            <Button variant="ghost" size="icon" className="rounded-full bg-background/40 hover:bg-background/60">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Premium Plans</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-purple-400"
            animate={{
              scale: [1, 1.02, 1],
              color: ["#9333ea", "#a855f7", "#9333ea"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            Get Premium for the whole family
          </motion.h2>
          <p className="text-lg text-black dark:text-muted-foreground max-w-2xl mx-auto">
            Listen without limits on your phone, speaker, and other devices. Pay your way with various payment options.
          </p>
        </motion.div>

        <Tabs defaultValue="monthly" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/20">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="space-y-8">
            <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("individual")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border transition-all duration-300 ₹{
                    hoveredCard === "individual" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "individual"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Music className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Individual</CardTitle>
                    <CardDescription>For individual music lovers</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹9.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-individual" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("duo")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border relative transition-all duration-300 ₹{
                    hoveredCard === "duo" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground font-medium py-1 text-center text-sm"
                    animate={
                      hoveredCard === "duo"
                        ? {
                            scale: [1, 1.05, 1],
                            backgroundColor: ["hsl(328, 85%, 70%)", "hsl(328, 85%, 60%)", "hsl(328, 85%, 70%)"],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: hoveredCard === "duo" ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    Most Popular
                  </motion.div>
                  <CardHeader className="pb-4 pt-8">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "duo"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Duo</CardTitle>
                    <CardDescription>For couples who live together</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹12.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>2 Premium accounts</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-duo" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("family")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border transition-all duration-300 ₹{
                    hoveredCard === "family" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "family"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Family</CardTitle>
                    <CardDescription>For family members who live together</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹15.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>6 Premium accounts</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Block explicit music</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-family" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-8">
            <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("individual-yearly")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border transition-all duration-300 ₹{
                    hoveredCard === "individual-yearly" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "individual-yearly"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Music className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Individual</CardTitle>
                    <CardDescription>For individual music lovers</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹95.88</span>
                      <span className="text-muted-foreground">/year</span>
                      <motion.div
                        className="text-primary text-sm font-medium"
                        animate={
                          hoveredCard === "individual-yearly"
                            ? {
                                scale: [1, 1.1, 1],
                                color: ["hsl(328, 85%, 70%)", "hsl(328, 85%, 60%)", "hsl(328, 85%, 70%)"],
                              }
                            : {}
                        }
                        transition={{ duration: 1 }}
                      >
                        Save ₹23.88
                      </motion.div>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "individual-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-individual-yearly" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("duo-yearly")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border relative transition-all duration-300 ₹{
                    hoveredCard === "duo-yearly" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground font-medium py-1 text-center text-sm"
                    animate={
                      hoveredCard === "duo-yearly"
                        ? {
                            scale: [1, 1.05, 1],
                            backgroundColor: ["hsl(328, 85%, 70%)", "hsl(328, 85%, 60%)", "hsl(328, 85%, 70%)"],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: hoveredCard === "duo-yearly" ? Number.POSITIVE_INFINITY : 0,
                    }}
                  >
                    Most Popular
                  </motion.div>
                  <CardHeader className="pb-4 pt-8">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "duo-yearly"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Duo</CardTitle>
                    <CardDescription>For couples who live together</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹124.99</span>
                      <span className="text-muted-foreground">/year</span>
                      <motion.div
                        className="text-primary text-sm font-medium"
                        animate={
                          hoveredCard === "duo-yearly"
                            ? {
                                scale: [1, 1.1, 1],
                                color: ["hsl(328, 85%, 70%)", "hsl(328, 85%, 60%)", "hsl(328, 85%, 70%)"],
                              }
                            : {}
                        }
                        transition={{ duration: 1 }}
                      >
                        Save ₹30.89
                      </motion.div>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>2 Premium accounts</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "duo-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-duo-yearly" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard("family-yearly")}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`bg-card border-border transition-all duration-300 ₹{
                    hoveredCard === "family-yearly" ? "border-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <motion.div
                      className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      animate={
                        hoveredCard === "family-yearly"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl">Premium Family</CardTitle>
                    <CardDescription>For family members who live together</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹153.99</span>
                      <span className="text-muted-foreground">/year</span>
                      <motion.div
                        className="text-primary text-sm font-medium"
                        animate={
                          hoveredCard === "family-yearly"
                            ? {
                                scale: [1, 1.1, 1],
                                color: ["hsl(328, 85%, 70%)", "hsl(328, 85%, 60%)", "hsl(328, 85%, 70%)"],
                              }
                            : {}
                        }
                        transition={{ duration: 1 }}
                      >
                        Save ₹37.89
                      </motion.div>
                    </div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>6 Premium accounts</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Block explicit music</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Ad-free music listening</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Play anywhere - even offline</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        animate={hoveredCard === "family-yearly" ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>On-demand playback</span>
                      </motion.li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/payment-gateway?plan=premium-family-yearly" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="bg-card/60 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ boxShadow: "0 0 15px rgba(199, 25, 252, 0.2)" }}
        >
          <h2 className="text-xl font-bold mb-4">Why go Premium?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div className="space-y-2" whileHover={{ scale: 1.05}}>
              <motion.div
                className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Music className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <h3 className="font-medium">Download music</h3>
              <p className="text-sm text-muted-foreground">Listen anywhere, even without internet.</p>
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-primary-foreground">
                  <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5S6.5 15.59 6.5 12 9.41 5.5 13 5.5s6.5 2.91 6.5 6.5zm-13 0c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5z" />
                  <path d="M12 3.5c-4.694 0-8-3.806-8-8s3.806 8-8 8 8-3.806 8-8-3.806-8-8-8.5zm0 16.5c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                  <path d="M13 10.8l3.5 2.2-3.5 2.2V10.8z" />
                </svg>
              </motion.div>
              <h3 className="font-medium">Ad-free music listening</h3>
              <p className="text-sm text-muted-foreground">Enjoy uninterrupted music.</p>
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  backgroundColor: ["hsl(285, 50.20%, 48.00%)", "hsl(285, 60.50%, 56.30%)", "hsl(292, 69.30%, 55.30%)"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-primary-foreground">
                  <path d="M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" />
                </svg>
              </motion.div>
              <h3 className="font-medium">Play any song</h3>
              <p className="text-sm text-muted-foreground">Even on mobile, play any song, any time.</p>
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 15, 0, -15, 0],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-primary-foreground">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </motion.div>
              <h3 className="font-medium">Unlimited skips</h3>
              <p className="text-sm text-muted-foreground">Just hit next to skip any song.</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Terms and conditions apply. 1 month free not available for users who have already tried Premium.</p>
        </div>
      </div>
    </MainLayout>
  )
}

