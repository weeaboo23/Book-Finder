import React from 'react'
import { coverUrl } from '../utils/api'


export default function BookModal({ book, onClose }) {
if (!book) return null
return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-6">
<div className="absolute inset-0 bg-black/50" onClick={onClose} />
<div className="relative z-10 max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
<div className="flex gap-4">
<div className="w-36">
{coverUrl(book) ? (
<img src={coverUrl(book)} alt={`${book.title} cover`} className="w-full h-full object-cover rounded-lg" />
) : (
<div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">No cover</div>
)}
</div>
<div className="flex-1">
<h2 className="text-xl font-bold">{book.title}</h2>
<p className="text-sm text-gray-500">{(book.author_name && book.author_name.join(', ')) || 'Unknown author'}</p>
<p className="mt-2 text-sm">First published: {book.first_publish_year || '—'}</p>
<div className="mt-4 flex gap-2">
<a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Open in OpenLibrary</a>
<button onClick={onClose} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm">Close</button>
</div>
</div>
</div>
</div>
</div>
)
}