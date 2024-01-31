import { createContext, useState } from "react";

export const FilterContext = createContext("anime");

const FilterProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState("anime");
  return (
    <FilterContext.Provider value={{ filterOption, setFilterOption }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
