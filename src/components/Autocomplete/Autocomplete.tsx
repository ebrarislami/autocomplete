import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useSearch } from "@/services/search";
import useDebounce from "@/hooks/useDebounce";
import { ViewMode } from "@/interfaces/ViewMode";
import { AutocompleteProps } from "./types";
import "./Autocomplete.css";
import { getHighlightedText } from "@/utils/highlight";

function Autocomplete({
  onSelect,
  initialValue = "",
  placeholder,
}: AutocompleteProps) {
  const [input, setInput] = useState(initialValue);
  const debouncedSearch = useDebounce(input);
  const [data, isLoading, error] = useSearch(debouncedSearch);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const computeViewMode = () => {
    if (isLoading) return ViewMode.Loading;
    if (!!error) return ViewMode.Error;
    if (!(data?.length > 0)) return ViewMode.Empty;
    if (data?.length > 0) return ViewMode.Data;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setShowList(true);
    }
  };

  const handleFocus = () => {
    if (input.length > 0) {
      setShowList(true);
    }
  };

  const handleSelect = (e: MouseEvent<HTMLLIElement>, value: string) => {
    setShowList(false);
    setInput(value);
    onSelect();
  };

  const renderAutocompleteList = () => {
    const viewMode = computeViewMode();

    return (
      <div ref={listRef} className="Autocomplete-list">
        {viewMode === ViewMode.Loading && (
          <p className="Autocomplete-item">Loading...</p>
        )}
        {viewMode === ViewMode.Error && (
          <p className="Autocomplete-item Autocomplete-item__error">{error}</p>
        )}
        {viewMode === ViewMode.Empty && (
          <p className="Autocomplete-item">No data</p>
        )}
        {viewMode === ViewMode.Data && (
          <ul>
            {data.map((item) => (
              <li key={item.id} onClick={(e) => handleSelect(e, item.name)}>
                {getHighlightedText(item.name, input)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        inputRef.current &&
        listRef.current &&
        !inputRef.current.contains(event.target) &&
        !listRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Autocomplete">
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onChange={handleInputChange}
        value={input}
        placeholder={placeholder}
      />
      {showList && renderAutocompleteList()}
    </div>
  );
}

export default Autocomplete;
