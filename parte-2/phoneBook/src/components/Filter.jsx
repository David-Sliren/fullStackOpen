import React, { useState } from "react";

const Filter = ({ onAction }) => {
  const [search, setSearch] = useState("");

  function searchName(e) {
    const value = e.target.value;
    setSearch(value);
    onAction(value.toLowerCase());
  }

  return (
    <div>
      filter shown with:{" "}
      <input type="text" value={search} onChange={searchName} />
    </div>
  );
};

export default Filter;
