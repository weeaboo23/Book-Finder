import React from 'react'

export default function Suggestions({ items, onSelect }) {
  return (
    <ul className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto text-left">
      {items.map((doc, idx) => (
        <li
          key={idx}
          onClick={() => onSelect(doc)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <p className="text-sm font-medium">{doc.title}</p>
          <p className="text-xs text-gray-500">{doc.author_name?.[0] || 'Unknown Author'}</p>
        </li>
      ))}
    </ul>
  )
}
