import { useState, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useBooks } from "./hooks/useBooks"
import SearchBar from "./components/SearchBar"
import BookCard from "./components/BookCard"
import BookModal from "./components/BookModal"
import DarkModeToggle from "./components/DarkModeToggle"
import Favorites from "./pages/Favorites"
import debounce from "lodash.debounce"

export default function App() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState("title")

  // Debounce search
  const debouncedSearch = useCallback(
    debounce((val) => setDebouncedQuery(val), 400),
    []
  )

  useEffect(() => {
    debouncedSearch(query)
    setPage(1)
  }, [query, debouncedSearch])

  const { results, loading, error, numFound } = useBooks(debouncedQuery, page, mode)

  function handleSearch(e) {
    e.preventDefault()
    setDebouncedQuery(query)
    setPage(1)
  }

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        results.length < numFound
      ) {
        setPage(prev => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, results, numFound])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <header className="sticky top-0 z-40 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            📚 Book Finder
          </h1>
          <nav className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
              <SearchBar query={query} setQuery={setQuery} onSubmit={handleSearch} mode={mode} setMode={setMode} />

              {loading && <p className="text-center text-gray-500">Loading...</p>}
              {error && <p className="text-center text-red-600">Error: {error}</p>}
              {!loading && !error && debouncedQuery && results.length === 0 && (
                <p className="text-center text-gray-500">No results found.</p>
              )}
              {numFound > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                  Found {numFound.toLocaleString()} results
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((doc, i) => (
                  <BookCard key={i} doc={doc} onClick={setSelected} />
                ))}
              </div>

              {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}
            </main>
          } />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

        <DarkModeToggle />
      </div>
    </Router>
  )
}
