import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function NavBar() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function fetchNotifications() {
      const token = localStorage.getItem('token')
      const remindersEnabled = localStorage.getItem('dailyReminders') !== 'false'
      if (!token || !remindersEnabled) return

      try {
        const response = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const withIds = response.data.notifications.map((n) => ({ ...n, key: `${n.id}-${Date.now()}` }))
        setNotifications(withIds)

        // Auto-dismiss each toast after 5 seconds
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
      <nav className="w-full border-b border-[#2a2520] px-6 py-4 flex gap-6 flex-wrap items-center">
        <Link to="/" className="text-[#c9a96e] hover:underline">Home</Link>
        <Link to="/login" className="text-[#c9a96e] hover:underline">Login</Link>
        <Link to="/signup" className="text-[#c9a96e] hover:underline">Sign Up</Link>
        <Link to="/recommend" className="text-[#c9a96e] hover:underline">Recommend</Link>
        <Link to="/profile" className="text-[#c9a96e] hover:underline">Profile</Link>
        <Link to="/library" className="text-[#c9a96e] hover:underline">My Library</Link>
        <Link to="/progress" className="text-[#c9a96e] hover:underline">Progress</Link>
        <Link to="/analytics" className="text-[#c9a96e] hover:underline">Analytics</Link>
        <Link to="/settings" className="text-[#c9a96e] hover:underline">Settings</Link>
      </nav>

      <div className="fixed top-20 right-6 flex flex-col gap-2 z-50">
        {notifications.map((note) => (
          <div
            key={note.key}
            className="bg-[#2a2520] border border-[#3a352d] text-[#e8dcc5] text-sm px-4 py-3 rounded-lg shadow-lg max-w-xs animate-[fadeIn_0.3s_ease-out]"
          >
            📖 {note.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavBar