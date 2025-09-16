// utils/favorites.js

const FAVORITES_KEY = "myFavoriteBooks"

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addFavorite(book) {
  const favs = getFavorites()
  if (!favs.some(b => b.key === book.key)) {
    favs.push(book)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
  }
}

export function removeFavorite(key) {
  let favs = getFavorites()
  favs = favs.filter(b => b.key !== key)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
}
