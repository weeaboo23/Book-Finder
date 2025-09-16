export async function fetchBooks(query, page = 1, signal, mode = "title", limit = 20) {
  const encoded = encodeURIComponent(query)
  const url = `https://openlibrary.org/search.json?${mode}=${encoded}&page=${page}&limit=${limit}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}



export function coverUrl(doc) {
if (doc.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
if (doc.isbn && doc.isbn.length) return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`
return null
}