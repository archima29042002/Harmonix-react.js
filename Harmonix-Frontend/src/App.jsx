//App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HarmonixHome from "./pages/HarmonixHome"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import LibraryPage from "./pages/LibraryPage"
import CreatePlaylistPage from "./pages/CreatePlaylistPage"
import LikedSongsPage from "./pages/LikedSongsPage"
import DownloadedPage from "./pages/DownloadedPage"
import SettingsPage from "./pages/SettingsPage"
import PaymentPage from "./pages/PaymentPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PremiumPlansPage from "./pages/PremiumPlansPage"
// import PaymentCompletePage from "./pages/PaymentCompletePage"
import PaymentGatewayPage from "./pages/PaymentGatewayPage"
import Songs from "./pages/Songs"
import AddSong  from "./pages/AddSongs"
import User from "./pages/User"
import PrivateRoute from "./security/PrivateRoute"
import Dashboard from "./Admin/Dashboard"
import AdminPage from "./Admin/AdminPage"
import AdminLogin from "./Admin/AdminLogin"
import AdminRouter from "./security/AdminRouter"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HarmonixHome />} />
        <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        <Route path="/library" element={<PrivateRoute><LibraryPage /></PrivateRoute>} />
        <Route path="/create-playlist" element={<PrivateRoute><CreatePlaylistPage /></PrivateRoute>} />
        <Route path="/liked-songs" element={<PrivateRoute><LikedSongsPage /></PrivateRoute>} />
        <Route path="/downloaded" element={<PrivateRoute><DownloadedPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path="/payment-gateway" element={<PrivateRoute><PaymentGatewayPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/premium-plans" element={<PrivateRoute><PremiumPlansPage /></PrivateRoute>} />
        <Route path="/songs" element={<PrivateRoute><Songs/></PrivateRoute>} />
        <Route path="/addsongs" element={<PrivateRoute><AddSong/></PrivateRoute>} />
        {/* <Route path="/harmonixhome" element={<HarmonixHome />} /> */}
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRouter><AdminPage /></AdminRouter>} />
        <Route path="/admin-dashboard" element={<AdminRouter><Dashboard /></AdminRouter>} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* <Route path="/payment-complete" element={<PaymentCompletePage />} /> */}
      </Routes>
    </Router>
  )
}

export default App