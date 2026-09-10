import axios from 'axios'
import { useState, useEffect } from 'react'

const statusColors = {
  "Reading": "text-[#c9a96e]",
  "Completed": "text-[#8fae8b]",
  "Want to Read": "text-[#9a9186]",
}

function MyLibrary() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [totalPages, setTotalPages] = useState("")
  const [error, setError] = useState("")

  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [minPages, setMinPages] = useState("")
  const [maxPages, setMaxPages] = useState("")
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
      if (minPages) params.append('minPages', minPages)
      if (maxPages) params.append('maxPages', maxPages)
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
    setMinPages("")
    setMaxPages("")
    setMinRating("")
    fetchBooks()
  }

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-medium mb-2">My Library</h1>
      <p className="text-[#9a9186] mb-8">{books.length} books saved</p>

      <form onSubmit={addBook} className="flex flex-col gap-3 mb-8 border border-[#3a352d] bg-[#161310] rounded-lg p-5">
        <h2 className="text-sm tracking-wide text-[#c9a96e] uppercase mb-1">Add a book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e]"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e]"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e]"
        />
        <input
          type="number"
          placeholder="Total pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          min="1"
          required
          className="w-full px-4 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e]"
        />
        {error && <p className="text-sm text-[#c97a6e]">{error}</p>}
        <button
          type="submit"
          className="self-start px-5 py-2 rounded-md bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors"
        >
          Add Book
        </button>
      </form>

      <div className="flex flex-col gap-3 mb-8 border border-[#3a352d] bg-[#161310] rounded-lg p-5">
        <h2 className="text-sm tracking-wide text-[#c9a96e] uppercase mb-1">Search & Filter</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e]"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Genre"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] text-sm focus:outline-none focus:border-[#c9a96e]"
          />
          <input
            type="number"
            placeholder="Min pages"
            value={minPages}
            onChange={(e) => setMinPages(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] text-sm focus:outline-none focus:border-[#c9a96e]"
          />
          <input
            type="number"
            placeholder="Max pages"
            value={maxPages}
            onChange={(e) => setMaxPages(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] text-sm focus:outline-none focus:border-[#c9a96e]"
          />
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0e0c0a] border border-[#3a352d] text-[#f4ede1] text-sm focus:outline-none focus:border-[#c9a96e]"
          >
            <option value="">Any rating</option>
            <option value="1">1+ stars</option>
            <option value="2">2+ stars</option>
            <option value="3">3+ stars</option>
            <option value="4">4+ stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-md bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="px-5 py-2 rounded-md border border-[#3a352d] text-[#9a9186] hover:text-[#c9a96e] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="text-[#9a9186]">Your library is empty. Add a book above to get started.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <div key={book._id} className="border border-[#3a352d] bg-[#161310] rounded-lg px-5 py-4">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-[#9a9186] text-sm">by {book.author}</p>
                </div>
                <button
                  onClick={() => removeBook(book._id)}
                  className="text-sm text-[#9a9186] hover:text-[#c9a96e] transition-colors flex-shrink-0"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs px-2 py-1 rounded-full border border-[#3a352d] text-[#9a9186]">
                  {book.category}
                </span>
                <select
                  value={book.status}
                  onChange={(e) => updateStatus(book._id, e.target.value)}
                  className={`text-sm font-medium bg-transparent border border-[#3a352d] rounded-md px-2 py-1 ${statusColors[book.status]}`}
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateRating(book._id, star)}
                    className={`text-lg ${star <= book.rating ? "text-[#c9a96e]" : "text-[#3a352d]"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyLibrary