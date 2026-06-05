import { useState, useEffect } from 'react';

/**
 * useCounter Hook
 */
interface UseCounterOptions {
  step?: number;
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { step = 1, min = -Infinity, max = Infinity } = options;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
}

/**
 * useFetch Hook
 */
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [prevUrl, setPrevUrl] = useState(url);
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  if (url !== prevUrl) {
    setPrevUrl(url);
    setState({ data: null, loading: true, error: null });
  }

  useEffect(() => {
    let active = true;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json() as Promise<T>;
      })
      .then(data => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(err => {
        if (active) {
          setState({ data: null, loading: false, error: (err as Error).message });
        }
      });

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}
