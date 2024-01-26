import { Button } from "@material-tailwind/react";

function SearchBar({ value, onClick, onChange }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search Anime..."
        className="px-2 py-1 border border-black"
        value={value}
        onChange={onChange}
      />
      <Button onClick={onClick}>Search</Button>
    </div>
  );
}

export default SearchBar;
