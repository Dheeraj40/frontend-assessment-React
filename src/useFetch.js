// useFetch.js

import { useState, useEffect } from 'react';
import { getRequest } from './axios'; // Import your request function

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(url);
        // console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call fetchData when the component mounts

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, [url]); // Re-run effect if the URL changes

  return { data, loading, error };
};

export default useFetch;
