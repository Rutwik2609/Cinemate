import { useState, useEffect } from "react";

// Custom hook for fetching data
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // State for storing fetched data (null initially)
  const [data, setData] = useState<T | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);
  // State for error handling
  const [error, setError] = useState<Error | null>(null);

  // Function to perform the actual data fetching
  const fetchData = async () => {
    try {
      setLoading(true);        // Start loading
      setError(null);         // Clear previous errors

      const result = await fetchFunction();  // Execute provided fetch function
      setData(result);        // Store successful result
    } catch (err) {
      // Handle errors (convert to Error object if not already)
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);     // Stop loading regardless of success/error
    }
  };

  // Function to reset all states to initial values
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // Automatically fetch on component mount when autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);  // Empty dependency array = runs only on first render

  // Return state values and control functions
  return { 
    data,      // Fetched data (T | null)
    loading,   // Loading status (boolean)
    error,     // Error object (Error | null)
    refetch: fetchData,  // Function to re-fetch data manually
    reset      // Function to reset all states
  };
};

export default useFetch;

// Generics Support (<T>)
// Works with any data type you want to fetch