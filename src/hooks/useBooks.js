import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";

export function useBooks(query, page, mode = "title") {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numFound, setNumFound] = useState(0);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setNumFound(0);
      return;
    }

    const controller = new AbortController();

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBooks(query, page, controller.signal, mode, 50);
        setNumFound(data.numFound);

        if (page === 1) {
          setResults(data.docs);
        } else {
          setResults(prev => [...prev, ...data.docs]); // append for infinite scroll
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => controller.abort();
  }, [query, page, mode]);

  return { results, loading, error, numFound };
}
