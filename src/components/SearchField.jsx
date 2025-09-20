import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

const SearchField = ({ searchQuery, setSearchQuery }) => {
  const inputEl = useRef(null);

  //Automcatically focusing on input element on app load
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setSearchQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default SearchField;
