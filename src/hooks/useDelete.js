import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`${url}/${id}`);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;