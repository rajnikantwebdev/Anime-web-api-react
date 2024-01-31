import { useContext, useState } from "react";
import { FilterContext } from "../utils/FilterContext";

const FilterComponent = () => {
  const { filterOption, setFilterOption } = useContext(FilterContext);
  const optionsArr = [
    { value: "anime", text: "Anime" },
    { value: "manga", text: "Manga" },
    { value: "characters", text: "Characters" },
  ];
  return (
    <>
      <select
        name="selectedFruit"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        className="px-2"
      >
        {optionsArr.map((opt) => {
          return <option value={opt.value}>{opt.text}</option>;
        })}
      </select>
    </>
  );
};

export default FilterComponent;
