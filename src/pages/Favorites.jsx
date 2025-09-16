import React, { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import { getFavorites } from '../utils/favorites'

export default function Favorites() {
  const [books, setBooks] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setBooks(getFavorites())
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">My Favorite Books</h1>
      {books.length === 0 && <p className="text-center text-gray-500">No favorites yet.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <BookCard key={i} doc={book} onClick={setSelected} />
        ))}
      </div>
      {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
