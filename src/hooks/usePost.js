import { useState } from 'react';
import axios from 'axios';

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(url, postData);
      setData(response.data);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { postData, loading, error, data };
};

export default usePost;