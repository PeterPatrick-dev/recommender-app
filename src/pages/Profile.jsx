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
        <p className="text-[#7a7060]">You're not logged in. Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-16">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-[#a8763a] text-white flex items-center justify-center text-2xl font-medium flex-shrink-0">
          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-medium text-[#2b2620]">{user.name}</h1>
          <p className="text-[#7a7060] text-sm">{user.email}</p>
        </div>
      </div>

      {stats && (
        <>
          <h2 className="text-sm tracking-wide text-[#a8763a] uppercase mb-4">Reading Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <div className="bg-white border border-[#e3dcc9] rounded-lg px-4 py-5 text-center">
              <p className="text-2xl font-medium text-[#a8763a]">{stats.booksCompleted}</p>
              <p className="text-sm text-[#7a7060] mt-1">Books Read</p>
            </div>
            <div className="bg-white border border-[#e3dcc9] rounded-lg px-4 py-5 text-center">
              <p className="text-2xl font-medium text-[#a8763a]">{stats.totalPagesRead.toLocaleString()}</p>
              <p className="text-sm text-[#7a7060] mt-1">Pages Read</p>
            </div>
            <div className="bg-white border border-[#e3dcc9] rounded-lg px-4 py-5 text-center">
              <p className="text-2xl font-medium text-[#a8763a]">{stats.currentStreak}</p>
              <p className="text-sm text-[#7a7060] mt-1">Day Streak</p>
            </div>
            <div className="bg-white border border-[#e3dcc9] rounded-lg px-4 py-5 text-center">
              <p className="text-lg font-medium text-[#a8763a]">{stats.favoriteGenre}</p>
              <p className="text-sm text-[#7a7060] mt-1">Favorite Genre</p>
            </div>
          </div>
        </>
      )}

      <button className="px-6 py-2 rounded-lg border border-[#e3dcc9] text-[#2b2620] hover:border-[#a8763a] transition-colors mb-12">
        Edit Profile
      </button>

      <h2 className="text-xl font-medium mb-4 text-[#2b2620]">Past Recommendations</h2>
      {history.length === 0 ? (
        <p className="text-[#7a7060] text-sm">
          No recommendation history yet — head to Recommend to get your first picks.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((session) => (
            <div key={session._id} className="bg-white border border-[#e3dcc9] rounded-lg px-5 py-4">
              <p className="text-xs text-[#a39a86] mb-3">
                {new Date(session.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              <div className="flex flex-col gap-2">
                {session.recommendations.map((book, i) => (
                  <p key={i} className="text-sm">
                    <span className="text-[#a8763a]">{book.title}</span>
                    <span className="text-[#7a7060]"> by {book.author}</span>
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