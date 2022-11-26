import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ViewMode } from "@/interfaces/ViewMode";
import { getHighlightedText } from "@/utils/highlight";
import { AutocompleteProps } from "./types";
import "./Autocomplete.css";

function Autocomplete<T>({
  onSelect,
  onChange,
  value = "",
  placeholder,
  highlight,
  isLoading,
  error,
  data,
  keyName,
  titleName,
}: AutocompleteProps<T>) {
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
    onChange(e.target.value);
    if (e.target.value.length > 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  const handleFocus = () => {
    if (value.length > 0) {
      setShowList(true);
    }
  };

  const handleSelect = (item: T) => {
    setShowList(false);
    onSelect(item);
  };

  const renderAutocompleteList = () => {
    const viewMode = computeViewMode();

    type KeyType = keyof typeof data[0];

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
            {data.map((item) => {
              const name = String(item[titleName as KeyType]);
              const key = String(item[keyName as KeyType]);
              return (
                <li key={key} onClick={() => handleSelect(item)}>
                  {highlight ? getHighlightedText(name, value) : name}
                </li>
              );
            })}
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
        value={value}
        placeholder={placeholder}
      />
      {showList && renderAutocompleteList()}
    </div>
  );
}

export default Autocomplete;
