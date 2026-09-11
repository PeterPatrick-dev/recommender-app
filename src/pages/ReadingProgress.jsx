import { useState, useEffect } from 'react'
import axios from 'axios'

function ReadingProgress() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReading() {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:5000/api/books/reading', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBooks(response.data)
      } catch (err) {
        console.error('Error fetching reading list:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReading()
  }, [])

  async function updatePage(id, newPage) {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/books/${id}/progress`,
        { currentPage: Number(newPage) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setBooks(books.map((book) => (book._id === id ? response.data : book)))
    } catch (err) {
      console.error('Error updating progress:', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-medium mb-2 text-[#2b2620]">Reading Progress</h1>
      <p className="text-[#7a7060] mb-10">Books currently in progress</p>

      {loading ? (
        <p className="text-[#7a7060]">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-[#7a7060]">
          You're not currently reading anything. Mark a book as "Reading" from your library to see it here.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {books.map((book) => {
            const percent = book.totalPages > 0
              ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
              : 0

            return (
              <div key={book._id} className="bg-white border border-[#e3dcc9] rounded-lg px-5 py-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2b2620]">{book.title}</h3>
                    <p className="text-[#7a7060] text-sm">by {book.author}</p>
                  </div>
                  <span className="text-[#a8763a] font-medium text-sm">{percent}%</span>
                </div>

                <div className="w-full h-1.5 bg-[#f2ecdd] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-[#a8763a] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {book.totalPages > 0 ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="text-sm text-[#7a7060]">Current page:</label>
                    <input
                      type="number"
                      min="0"
                      max={book.totalPages}
                      value={book.currentPage}
                      onChange={(e) => updatePage(book._id, e.target.value)}
                      className="w-20 px-3 py-1 rounded-md bg-white border border-[#e3dcc9] text-[#2b2620] text-sm focus:outline-none focus:border-[#a8763a]"
                    />
                    <span className="text-sm text-[#7a7060]">of {book.totalPages} pages</span>
                  </div>
                ) : (
                  <p className="text-xs text-[#a39a86]">
                    No total page count set for this book — edit it in My Library to track progress by percentage.
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ReadingProgress