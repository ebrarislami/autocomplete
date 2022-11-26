import { useState } from "react";
import Autocomplete from "@/components/Autocomplete";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "@/interfaces/Search";
import { useSearch } from "@/services/search";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input);
  const [data, isLoading, error] = useSearch(debouncedSearch);

  return (
    <div className="App">
      <h1>Autocomplete</h1>
      <Autocomplete<Search>
        highlight
        value={input}
        data={data}
        isLoading={isLoading}
        error={error}
        keyName="id"
        titleName="name"
        placeholder="Search City"
        onSelect={(item) => setInput(item.name)}
        onChange={(value) => setInput(value)}
      />
    </div>
  );
}

export default App;
