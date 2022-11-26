import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, waitTime: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, waitTime);

    return () => clearTimeout(timeout);
  }, [value, waitTime]);

  return debouncedValue;
};

export default useDebounce;
