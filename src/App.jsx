import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Recommendation from './pages/Recommendation'
import Profile from './pages/Profile'
import MyLibrary from './pages/MyLibrary'
import ReadingProgress from './pages/ReadingProgress'
import Settings from './pages/Settings'
import './App.css'
import Analytics from './pages/Analytics'

function App() {
  return (
    <div className="min-h-screen bg-[#0e0c0a] text-[#f4ede1] font-serif">
      <NavBar />
      <div className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recommend" element={<Recommendation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/progress" element={<ReadingProgress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  )
}

export default App