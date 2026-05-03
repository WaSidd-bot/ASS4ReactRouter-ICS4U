import axios from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    console.log(import.meta.env.VITE_REACT_APP_API_KEY);
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_API_KEY, //replace this with actual key that you have in .env
            ...params,
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, params]);

  return { data };
}