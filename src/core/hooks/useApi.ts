import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { ApiResponse } from "../model/api";

export function useApi<T>(apiCall: () => Promise<ApiResponse<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiCall();

        if (!mounted) return;

        if (!res.success) {
          setError(res.message || "Something went wrong");
          return;
        }

        setData(res.data);
      } catch (err: unknown) {
        if (!mounted) return;

        let message = "Network error";

        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<ApiResponse<unknown>>;
          message =
            axiosError.response?.data?.message || axiosError.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [apiCall]);

  return { data, loading, error };
}
