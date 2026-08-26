import { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {
  const [user, setUser] = useState(null)
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }

    const token = localStorage.getItem('token')
    if (!token) return

    async function fetchHistory() {
      try {
        const response = await axios.get('http://localhost:5000/api/recommendations/history', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHistory(response.data)
      } catch (err) {
        console.error('Error fetching history:', err)
      }
    }

    async function fetchStats() {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(response.data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }

    fetchHistory()
    fetchStats()
  }, [])

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <p className="text-[#9a9186]">You're not logged in. Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-16">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-[#c9a96e] text-[#0e0c0a] flex items-center justify-center text-2xl font-medium flex-shrink-0">
          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-medium">{user.name}</h1>
          <p className="text-[#9a9186] text-sm">{user.email}</p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-5 text-center">
            <p className="text-2xl font-medium text-[#c9a96e]">{stats.booksCompleted}</p>
            <p className="text-sm text-[#9a9186] mt-1">Books Read</p>
          </div>
          <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-5 text-center">
            <p className="text-2xl font-medium text-[#c9a96e]">{stats.currentStreak}</p>
            <p className="text-sm text-[#9a9186] mt-1">Day Streak</p>
          </div>
          <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-5 text-center">
            <p className="text-lg font-medium text-[#c9a96e]">{stats.favoriteGenre}</p>
            <p className="text-sm text-[#9a9186] mt-1">Favorite Genre</p>
          </div>
        </div>
      )}

      <button className="px-6 py-2 rounded-lg border border-[#3a352d] text-[#f4ede1] hover:border-[#c9a96e] transition-colors mb-12">
        Edit Profile
      </button>

      <h2 className="text-xl font-medium mb-4">Past Recommendations</h2>
      {history.length === 0 ? (
        <p className="text-[#9a9186] text-sm">
          No recommendation history yet — head to Recommend to get your first picks.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((session) => (
            <div key={session._id} className="border border-[#3a352d] bg-[#161310] rounded-lg px-5 py-4">
              <p className="text-xs text-[#6b6357] mb-3">
                {new Date(session.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              <div className="flex flex-col gap-2">
                {session.recommendations.map((book, i) => (
                  <p key={i} className="text-sm">
                    <span className="text-[#c9a96e]">{book.title}</span>
                    <span className="text-[#9a9186]"> by {book.author}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile