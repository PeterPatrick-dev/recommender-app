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

function App() {
  return (
    <div className="min-h-screen bg-[#f7f2e7] text-[#2b2620] font-serif">
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recommend" element={<Recommendation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/progress" element={<ReadingProgress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default App