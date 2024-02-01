import { useContext, useState } from "react";
import { FilterContext } from "../utils/FilterContext";
import { useTheme } from "../utils/ThemeContext";

const FilterComponent = () => {
  const { filterOption, setFilterOption } = useContext(FilterContext);
  const { theme } = useTheme();
  const optionsArr = [
    { value: "anime", text: "Anime" },
    { value: "manga", text: "Manga" },
    { value: "characters", text: "Characters" },
  ];
  return (
    <>
      <select
        name="Genre"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        className={`${theme === "dark" && "bg-[#23272F] text-white"} px-2`}
      >
        {optionsArr.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default FilterComponent;
