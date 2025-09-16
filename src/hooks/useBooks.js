import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";

export function useBooks(query, page) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numFound, setNumFound] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) {
      // Reset when query is cleared
      setResults([]);
      setNumFound(0);
      setTotalPages(0);
      return;
    }

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBooks(query, page);
        setResults(data.docs);
        setNumFound(data.numFound);
        setTotalPages(Math.ceil(data.numFound / 100)); // OpenLibrary returns 100/page
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [query, page]);

  return { results, loading, error, numFound, totalPages };
}
