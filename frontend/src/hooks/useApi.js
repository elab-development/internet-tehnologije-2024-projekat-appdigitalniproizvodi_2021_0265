import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const useApi = (url, options = {}) => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setLoading(false);
        setData(null);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Konfiguracija za axios zahtev
        const config = {
          method: options.method || 'GET',
          url: url,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
          },
          ...options,
        };

        // Dodaj token ako postoji
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios(config);
        setData(response.data);
      } catch (err) {
        console.error('API Error:', err);
        setError({
          message: err.response?.data?.message || err.message || 'Greška pri učitavanju podataka',
          status: err.response?.status,
          data: err.response?.data,
        });
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, options.method, JSON.stringify(options)]);

  // Funkcija za refetch podataka
  const refetch = () => {
    if (url) {
      setLoading(true);
      setError(null);
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useApi;
