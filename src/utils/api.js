// Fetch books from OpenLibrary API
export async function fetchBooks(query, page = 1, signal, mode = "title", limit = 20) {
  const encoded = encodeURIComponent(query)
  const url = `https://openlibrary.org/search.json?${mode}=${encoded}&page=${page}&limit=${limit}`

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Get cover image URL for a book
export function coverUrl(doc) {
  // Try cover_i first
  if (doc.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`

  // Then try ISBN
  if (doc.isbn && doc.isbn.length) return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`

  // Then try OpenLibrary edition key
  if (doc.cover_edition_key) return `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`

  // Fallback to null if no cover available
  return null
}
