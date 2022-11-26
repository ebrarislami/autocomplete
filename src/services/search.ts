import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Search } from "@/interfaces/Search";

type UseSearchReturn = [Search[], boolean, string];

export const useSearch = (param: string): UseSearchReturn => {
  const [data, setData] = useState<Search[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (param: string, abortController: AbortController) => {
    if (!param) {
      setIsLoading(false);
      setError("");
      setData([]);
      return;
    }

    const fetch = useFetch({
      url: !!param ? `?q=${param}` : "",
      options: { method: "GET", signal: abortController.signal },
    });

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch;
      const result = await response.json();

      if (!response.ok) {
        throw result?.error?.message || result?.message;
      }

      setData(result);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(param, abortController);

    return () => {
      abortController.abort();
    };
  }, [param]);

  return [data, isLoading, error];
};
