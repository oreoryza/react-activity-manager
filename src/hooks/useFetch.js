import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error, fetchData];
};

export default useFetch;