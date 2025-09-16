import React, { useState } from 'react'
import { coverUrl } from '../utils/api'
import { addFavorite, removeFavorite, getFavorites } from '../utils/favorites'

export default function BookModal({ book, onClose }) {
  if (!book) return null

  const [isFav, setIsFav] = useState(getFavorites().some(f => f.key === book.key))
  const [toast, setToast] = useState("")

  const handleFavorite = () => {
    if (isFav) {
      removeFavorite(book.key)
      setIsFav(false)
      setToast("Removed from favorites")
    } else {
      addFavorite(book)
      setIsFav(true)
      setToast("Added to favorites")
    }

    setTimeout(() => setToast(""), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-36 flex-shrink-0">
            {coverUrl(book) ? (
              <img src={coverUrl(book)} alt={`${book.title} cover`} className="w-full h-full object-cover rounded-lg" loading="lazy" />
            ) : (
              <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">No cover</div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-sm text-gray-500">{(book.author_name && book.author_name.join(', ')) || 'Unknown author'}</p>
            <p className="mt-2 text-sm">First published: {book.first_publish_year || '—'}</p>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Open in OpenLibrary</a>
              <button onClick={handleFavorite} className={`px-3 py-2 rounded-lg text-sm ${isFav ? "bg-yellow-500 dark:bg-yellow-600" : "bg-gray-200 dark:bg-gray-700"}`}>
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <button onClick={onClose} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm">Close</button>
            </div>

            {toast && (
              <div className="mt-3 p-2 bg-green-400 text-white text-sm rounded">{toast}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
