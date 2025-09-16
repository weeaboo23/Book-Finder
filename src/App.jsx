import { useState, useEffect } from "react"
import { fetchBooks, coverUrl } from "./utils/api"

export default function App() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) {
      setBooks([])   // clear results when search is empty
      setError(null)
      return
    }

    const controller = new AbortController()

    async function loadBooks() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchBooks(query, 1, controller.signal, "title", 20)
        setBooks(data.docs || [])
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
    return () => controller.abort()
  }, [query])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      {/* Title + Search Bar */}
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <span role="img" aria-label="book">📚</span> Book Finder
        </h1>

        {/* Search Bar with Clear button */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search books by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 text-base sm:text-lg rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-lg sm:text-xl"
            >
              ❌
            </button>
          )}
        </div>

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 w-full max-w-6xl">
        {books.map((book, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-xl shadow hover:shadow-md transition"
          >
            {coverUrl(book) ? (
              <img
                src={coverUrl(book)}
                alt={book.title}
                className="w-full h-48 sm:h-56 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 sm:h-56 bg-gray-300 flex items-center justify-center rounded">
                <span>No Cover</span>
              </div>
            )}
            <h2 className="mt-3 font-semibold text-sm sm:text-base">{book.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {book.author_name?.[0] || "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
