import { useState, useEffect } from "react";

// 🔁 Custom hook to fetch data from any API function
// <T> = Type of the data you expect (e.g., list of movies, movie details, etc.)
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // 📦 Data from API will be stored here (initially null)
  const [data, setData] = useState<T | null>(null);

  // 🔄 True while data is loading
  const [loading, setLoading] = useState(false);

  // ⚠️ Error info if something goes wrong
  const [error, setError] = useState<Error | null>(null);

  // 📲 Function to actually fetch the data
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      setError(null);   // Clear any old errors

      const result = await fetchFunction(); // Call your fetch function
      setData(result); // Save the result in state
    } catch (err) {
      // If something goes wrong, store the error
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false); // Whether success or fail, stop loading
    }
  };

  // 🧹 Function to clear all states (start fresh)
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // 🚀 Auto-fetch when the component mounts (if autoFetch is true)
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []); // Empty array = run only once when the component is first loaded

  // 🧑‍💻 Return all important stuff for the component to use
  return {
    data,         // Data returned from fetch (or null)
    loading,      // Whether it's currently loading
    error,        // Any error that occurred (or null)
    refetch: fetchData, // Function to call fetch again
    reset         // Reset everything
  };
};

export default useFetch;
