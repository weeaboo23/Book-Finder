import React from 'react'
import { coverUrl } from '../utils/api'

function BookCard({ doc, onClick }) {
  const img = coverUrl(doc)
  const author = (doc.author_name && doc.author_name.join(', ')) || 'Unknown author'
  return (
    <button
      onClick={() => onClick(doc)}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-lg text-left"
    >
      <div className="w-full h-48 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {img ? (
          <img src={img} alt={`${doc.title} cover`} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="text-sm text-gray-500">No cover</div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold line-clamp-2">{doc.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{author}</p>
      </div>
    </button>
  )
}

export default React.memo(BookCard)
