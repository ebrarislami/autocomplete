interface UseFetchProps {
  url: RequestInfo | URL;
  options: RequestInit | undefined;
}

const BASE_URL = "https://weatherapi-com.p.rapidapi.com/search.json";

const useFetch = ({ url, options }: UseFetchProps) => {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      ...options?.headers,
      "X-RapidAPI-Key": "1d34cdc447msh4b00f7f629be921p1910e8jsn0a8587b146f8",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
    ...options,
  });
};

export default useFetch;
