import { createContext, useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import useAnimeApi from "./useAnimeApi";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [airing, setAiring] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredAnimeData, setFilteredAnimeData] = useState([]);
  const { filterOption } = useContext(FilterContext);
  const { data, fetchData } = useAnimeApi(
    query,
    pageNumber,
    airing,
    filterOption
  );
  return (
    <PageContext.Provider
      value={{
        filteredAnimeData,
        setFilteredAnimeData,
        pageNumber,
        setPageNumber,
        airing,
        setAiring,
        query,
        setQuery,
        data,
        fetchData,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
