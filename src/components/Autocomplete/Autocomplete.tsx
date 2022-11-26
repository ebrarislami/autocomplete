import { ChangeEvent, useState } from "react";
import { useSearch } from "@/services/search";
import useDebounce from "@/hooks/useDebounce";
import { AutocompleteProps } from "./types";
import "./Autocomplete.css";

function Autocomplete({
  onSelect,
  initialValue = "",
  placeholder,
}: AutocompleteProps) {
  const [input, setInput] = useState(initialValue);
  const debouncedSearch = useDebounce(input);
  const [data, isLoading, error] = useSearch(debouncedSearch);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="Autocomplete">
      <input
        onChange={handleInputChange}
        value={input}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Autocomplete;
