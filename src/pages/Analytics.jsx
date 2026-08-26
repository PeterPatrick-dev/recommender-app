import { useState, useEffect } from 'react'
import axios from 'axios'

function Analytics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(response.data)
      } catch (err) {
        console.error('Error fetching analytics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return <div className="max-w-3xl mx-auto py-16 text-center text-[#9a9186]">Loading...</div>
  }

  if (!stats) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <p className="text-[#9a9186]">Please log in to view your reading analytics.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-medium mb-2">Reading Analytics</h1>
      <p className="text-[#9a9186] mb-10">Your reading habits at a glance</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-6 text-center">
          <p className="text-3xl font-medium text-[#c9a96e]">{stats.booksCompleted}</p>
          <p className="text-sm text-[#9a9186] mt-1">Books Completed</p>
        </div>
        <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-6 text-center">
          <p className="text-3xl font-medium text-[#c9a96e]">{stats.totalPagesRead.toLocaleString()}</p>
          <p className="text-sm text-[#9a9186] mt-1">Pages Read</p>
        </div>
        <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-6 text-center">
          <p className="text-3xl font-medium text-[#c9a96e]">{stats.currentStreak}</p>
          <p className="text-sm text-[#9a9186] mt-1">Day Streak</p>
        </div>
        <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-4 py-6 text-center">
          <p className="text-lg font-medium text-[#c9a96e]">{stats.favoriteGenre}</p>
          <p className="text-sm text-[#9a9186] mt-1">Favorite Genre</p>
        </div>
      </div>

      <div className="border border-[#3a352d] bg-[#161310] rounded-lg px-6 py-5">
        <p className="text-sm text-[#9a9186]">
          Total books in your library: <span className="text-[#c9a96e] font-medium">{stats.totalBooks}</span>
        </p>
      </div>
    </div>
  )
}

export default Analytics