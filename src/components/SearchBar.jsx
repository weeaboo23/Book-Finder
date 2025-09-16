import React from 'react'


export default function SearchBar({ query, setQuery, onSubmit }) {
return (
<form onSubmit={onSubmit} className="flex items-center gap-3 mb-6">
<label htmlFor="search" className="sr-only">Search for books</label>
<input
id="search"
type="search"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Search by title, author, ISBN..."
className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
/>
<button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400">Search</button>
</form>
)
}