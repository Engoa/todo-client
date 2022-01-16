import React, { FC } from "react";
import { TextField } from "@mui/material";
import { useTodosContext } from "../../store/todos";

const SearchBar: FC = (): JSX.Element => {
  const { handleSearch, searchTerm, searchResults } = useTodosContext();

  return (
    <div className="todos__search" style={{ width: "100%" }}>
      <TextField
        style={{ width: "100%" }}
        label="Search for a task description"
        onChange={handleSearch}
        type="text"
        value={searchTerm}
        autoComplete="off"
        spellCheck={false}
      />
      {searchTerm && (
        <div className="todos__search--results">
          <span>{searchResults.length ? `${searchResults.length} results` : "No Results"}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
