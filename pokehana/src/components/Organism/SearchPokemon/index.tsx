import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  onSearch: (query: string) => void;
};

const SearchPokemon: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // debounce search input by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [input, onSearch]);

  return (
    <TextField
      label="Search Pokémon"
      variant="outlined"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      fullWidth
      size="small"
      autoComplete="off"
    />
  );
};

export default SearchPokemon;
