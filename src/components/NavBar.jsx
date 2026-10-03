import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.png'
import { API_URL } from '../config'

function NavBar() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function fetchNotifications() {
      const token = localStorage.getItem('token')
      const remindersEnabled = localStorage.getItem('dailyReminders') !== 'false'
      if (!token || !remindersEnabled) return

      try {
        const response = await axios.get(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const withIds = response.data.notifications.map((n) => ({ ...n, key: `${n.id}-${Date.now()}` }))
        setNotifications(withIds)

        withIds.forEach((note) => {
          setTimeout(() => {
            setNotifications((current) => current.filter((n) => n.key !== note.key))
          }, 5000)
        })
      } catch (err) {
        console.error('Error fetching notifications:', err)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="relative">
      <nav className="w-full border-b border-[#e3dcc9] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6 flex-wrap">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-medium text-[#2b2620]">BookMind</span>
          </Link>
          <div className="flex gap-6 flex-wrap items-center">
            <Link to="/" className="text-[#a8763a] hover:underline">Home</Link>
            <Link to="/login" className="text-[#a8763a] hover:underline">Log In</Link>
            <Link to="/recommend" className="text-[#a8763a] hover:underline">Recommend</Link>
            <Link to="/profile" className="text-[#a8763a] hover:underline">Profile</Link>
            <Link to="/library" className="text-[#a8763a] hover:underline">My Library</Link>
            <Link to="/progress" className="text-[#a8763a] hover:underline">Progress</Link>
            <Link to="/settings" className="text-[#a8763a] hover:underline">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="fixed top-20 right-6 flex flex-col gap-2 z-50">
        {notifications.map((note) => (
          <div
            key={note.key}
            className="bg-white border border-[#e3dcc9] text-[#2b2620] shadow-sm text-sm px-4 py-3 rounded-lg shadow-lg max-w-xs animate-[fadeIn_0.3s_ease-out]"
          >
            📖 {note.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavBar