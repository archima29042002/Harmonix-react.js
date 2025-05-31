import React from "react";
import AdminLayout from "./AminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Users, Play, ChartBar, Plus, Settings, Shield } from "lucide-react";

const Dashboard = () => {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="ml-64 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50"
      >
        <div className="p-8">
          <motion.div
            variants={headerVariants}
            className="flex items-center gap-6 mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
          >
            <div className="p-4 bg-purple-600 rounded-xl shadow-purple-300 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                Welcome to Harmonix
              </h1>
              <p className="text-gray-600 mt-2">Manage your music platform with our enhanced dashboard</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Music, title: "Total Songs", value: "48", color: "purple" },
              { icon: Users, title: "Active Users", value: "5", color: "purple" },
              { icon: Play, title: "Total Plays", value: "25", color: "purple" },
              // { icon: ChartBar, title: "Revenue", value: "$12.5k", color: "green" }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-${stat.color}-100 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100/50`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  {/* <span className={`text-${stat.color}-500 text-sm font-medium`}>
                    +12.5%
                  </span> */}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Settings className="w-5 h-5 text-purple-600" />
                </motion.button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Plus, text: "Add New Song", color: "purple" },
                  { icon: Users, text: "Manage Users", color: "purple" },
                  { icon: ChartBar, text: "View Analytics", color: "purple" }
                ].map((action, index) => (
                  <motion.button
                    key={action.text}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center p-4 rounded-xl bg-${action.color}-50/50 hover:bg-${action.color}-100/50 transition-colors`}
                  >
                    <action.icon className={`w-5 h-5 text-${action.color}-500 mr-3`} />
                    <span className="text-gray-700 font-medium">{action.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[
                  { title: "New Song Added", desc: "'Summer Vibes' by John Doe", time: "2 hours ago" },
                  { title: "User Milestone", desc: "1000th user joined the platform", time: "5 hours ago" },
                  { title: "System Update", desc: "Platform performance improved", time: "1 day ago" }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
                    <div>
                      <h3 className="text-gray-800 font-medium">{activity.title}</h3>
                      <p className="text-gray-600 text-sm">{activity.desc}</p>
                      <span className="text-gray-400 text-xs">{activity.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;
