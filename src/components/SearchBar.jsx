import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { useTheme } from "../utils/ThemeContext";

function SearchBar({ value, onClick, onChange }) {
  // bg-[#23272F]
  const { theme } = useTheme();
  return (
    <div className="flex gap-2">
      <Input
        label="Search for Anime..."
        type="text"
        placeholder="Search Anime..."
        className={`px-2 py-1 border border-white rounded-full ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        value={value}
        onChange={onChange}
      />
      <IconButton
        onClick={onClick}
        className={`rounded-full w-12 h-12 ${theme === "dark" && "bg-white"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={`${theme === "dark" ? "black" : "currentColor"}`}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </IconButton>
    </div>
  );
}

export default SearchBar;
