import axios from 'axios'
import { useState, useEffect } from 'react'

const statusStyles = {
  "Reading": { border: "border-l-[#a8763a]", icon: "📖", badge: "bg-[#f5e8d3] text-[#a8763a]" },
  "Completed": { border: "border-l-[#5a8a6e]", icon: "✓", badge: "bg-[#e3f0e6] text-[#3d6b4f]" },
  "Want to Read": { border: "border-l-[#e3dcc9]", icon: "🔖", badge: "bg-[#f2ecdd] text-[#7a7060]" },
}

function MyLibrary() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [totalPages, setTotalPages] = useState("")
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [minRating, setMinRating] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBooks(response.data)
    } catch (err) {
      console.error('Error fetching library:', err)
    }
  }

  async function addBook(e) {
    e.preventDefault()
    setError("")
    const token = localStorage.getItem('token')
    if (!token) {
      setError("Please log in to add books to your library.")
      return
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/books',
        { title, author, category: category || "Uncategorized", totalPages: Number(totalPages) || 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setBooks([...books, response.data])
      setTitle("")
      setAuthor("")
      setCategory("")
      setTotalPages("")
      setShowAddForm(false)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong adding the book.")
    }
  }

  async function removeBook(id) {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBooks(books.filter((book) => book._id !== id))
    } catch (err) {
      console.error('Error removing book:', err)
    }
  }

  async function updateStatus(id, newStatus) {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/books/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setBooks(books.map((book) => (book._id === id ? response.data : book)))
    } catch (err) {
      console.error('Error updating book:', err)
    }
  }

  async function updateRating(id, newRating) {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/books/${id}`,
        { rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setBooks(books.map((book) => (book._id === id ? response.data : book)))
    } catch (err) {
      console.error('Error updating rating:', err)
    }
  }

  async function handleSearch() {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('q', searchQuery)
      if (genreFilter) params.append('genre', genreFilter)
      if (minRating) params.append('minRating', minRating)
      const response = await axios.get(`http://localhost:5000/api/books/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBooks(response.data)
    } catch (err) {
      console.error('Error searching library:', err)
    }
  }

  function clearFilters() {
    setSearchQuery("")
    setGenreFilter("")
    setMinRating("")
    fetchBooks()
  }

  const booksCompleted = books.filter((b) => b.status === "Completed").length
  const totalPagesRead = books.reduce((sum, b) => sum + (b.status === "Completed" ? (b.totalPages || 0) : (b.currentPage || 0)), 0)

  return (
    <div className="max-w-5xl mx-auto py-16">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-medium mb-1 text-[#2b2620]">My Library</h1>
          <p className="text-[#7a7060]">{books.length} books saved</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2 rounded-lg bg-[#a8763a] text-white font-medium hover:bg-[#b8854a] transition-colors"
        >
          {showAddForm ? "Cancel" : "+ Add book"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={addBook} className="flex flex-col gap-3 mb-6 border border-[#e3dcc9] bg-white rounded-xl p-5">
          <input
            type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full px-4 py-2 rounded-md bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a]"
          />
          <input
            type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required
            className="w-full px-4 py-2 rounded-md bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-md bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a]"
            />
            <input
              type="number" placeholder="Total pages" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} min="1" required
              className="px-4 py-2 rounded-md bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a]"
            />
          </div>
          {error && <p className="text-sm text-[#c0503a]">{error}</p>}
          <button type="submit" className="self-start px-5 py-2 rounded-md bg-[#a8763a] text-white font-medium hover:bg-[#b8854a] transition-colors">
            Save book
          </button>
        </form>
      )}

      <div className="flex gap-3 items-center mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a39a86]">⌕</span>
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#e3dcc9] text-[#2b2620] text-sm focus:outline-none focus:border-[#a8763a]"
          />
        </div>
        <input
          type="text" placeholder="Genre" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}
          className="w-32 px-3 py-2 rounded-lg bg-white border border-[#e3dcc9] text-[#2b2620] text-sm focus:outline-none focus:border-[#a8763a]"
        />
        <select
          value={minRating} onChange={(e) => setMinRating(e.target.value)}
          className="w-32 px-3 py-2 rounded-lg bg-white border border-[#e3dcc9] text-[#2b2620] text-sm focus:outline-none focus:border-[#a8763a]"
        >
          <option value="">Any rating</option>
          <option value="1">1+ stars</option>
          <option value="2">2+ stars</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="5">5 stars</option>
        </select>
        <button onClick={handleSearch} className="px-4 py-2 rounded-lg bg-[#a8763a] text-white text-sm font-medium hover:bg-[#b8854a] transition-colors">
          Search
        </button>
        <button onClick={clearFilters} className="px-4 py-2 rounded-lg border border-[#e3dcc9] text-[#7a7060] text-sm hover:text-[#a8763a] transition-colors">
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-white border border-[#e3dcc9] rounded-lg p-4">
          <p className="text-xs text-[#7a7060] mb-1">Completed</p>
          <p className="text-2xl font-medium text-[#2b2620]">{booksCompleted}</p>
        </div>
        <div className="bg-white border border-[#e3dcc9] rounded-lg p-4">
          <p className="text-xs text-[#7a7060] mb-1">Pages read</p>
          <p className="text-2xl font-medium text-[#2b2620]">{totalPagesRead.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-[#e3dcc9] rounded-lg p-4">
          <p className="text-xs text-[#7a7060] mb-1">In library</p>
          <p className="text-2xl font-medium text-[#2b2620]">{books.length}</p>
        </div>
        <div className="bg-white border border-[#e3dcc9] rounded-lg p-4">
          <p className="text-xs text-[#7a7060] mb-1">Reading now</p>
          <p className="text-2xl font-medium text-[#2b2620]">{books.filter((b) => b.status === "Reading").length}</p>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="text-[#7a7060] text-center py-8">Your library is empty. Add a book above to get started.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {books.map((book) => {
            const style = statusStyles[book.status]
            const percent = book.totalPages > 0 ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100)) : 0
            return (
              <div
                key={book._id}
                className={`bg-white border border-[#e3dcc9] border-l-4 ${style.border} rounded-r-xl rounded-l-none px-5 py-4 flex gap-4 items-start`}
              >
                <div className="w-10 h-13 rounded bg-[#f2ecdd] flex items-center justify-center text-lg flex-shrink-0 mt-1">
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-3 mb-1">
                    <h3 className="font-semibold text-[#2b2620]">{book.title}</h3>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => updateRating(book._id, star)}
                          className={`text-sm ${star <= book.rating ? "text-[#a8763a]" : "text-[#e3dcc9]"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#7a7060] mb-2">{book.author} · {book.category}</p>

                  {book.status === "Reading" && book.totalPages > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-1 bg-[#f2ecdd] rounded-full overflow-hidden">
                        <div className="h-full bg-[#a8763a]" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="text-xs text-[#7a7060]">{percent}%</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <select
                      value={book.status}
                      onChange={(e) => updateStatus(book._id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-md ${style.badge} border-none focus:outline-none`}
                    >
                      <option value="Want to Read">Want to Read</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      onClick={() => removeBook(book._id)}
                      className="text-xs text-[#a39a86] hover:text-[#a8763a] transition-colors ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyLibrary