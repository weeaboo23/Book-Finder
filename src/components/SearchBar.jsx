import React from 'react'

export default function SearchBar({ query, setQuery, onSubmit, mode, setMode }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
      {/* Input field */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search by ${mode}...`}
        className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm sm:text-base w-full"
      />

      {/* Mode selector */}
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm sm:text-base"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      {/* Submit button */}
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
      >
        Search
      </button>
    </form>
  )
}
