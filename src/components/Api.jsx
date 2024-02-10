import useAnimeApi from "../utils/useAnimeApi";
import { Link } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../utils/PageNumberContext";
import { useTheme } from "../utils/ThemeContext";
import Header from "./Header";
import { FilterContext } from "../utils/FilterContext";
import Card from "./Card";
import { HigerOrderComponent } from "./Card";
import { SimplePagination } from "./Pagination";
import SortBy from "./SortBy";
import FilterComponent from "./FilterComponent";

function Api() {
  const { theme } = useTheme();
  const { filterOption } = useContext(FilterContext);
  const {
    query,
    setQuery,
    pageNumber,
    setPageNumber,
    airing,
    setAiring,
    setFilteredAnimeData,
    filteredAnimeData,
    data,
  } = useContext(PageContext);

  const ComponentWithYoutube = HigerOrderComponent(Card);

  useEffect(() => {
    setFilteredAnimeData(data.data);
  }, [query, data.data, airing]);

  return (
    <div
      className={`px-6 ${
        theme === "dark" ? "bg-[#23272F]" : "bg-white"
      }  py-12 flex flex-col items-center gap-8`}
    >
      <div className="flex items-center gap-8">
        <SimplePagination
          page={pageNumber}
          setPage={setPageNumber}
          hasNextPage={data.pagination?.has_next_page}
        />
        {/* <SortBy /> */}
        <FilterComponent />
      </div>
      {!filteredAnimeData ? (
        <ShimmerEffect />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 content-end">
          {filteredAnimeData.map((anime) => {
            return (
              <Link to={`/anime/${anime.mal_id}/full`} key={anime.mal_id}>
                {anime?.trailer?.embed_url === null ||
                filterOption === "manga" ||
                filterOption === "characters" ? (
                  <Card item={anime} />
                ) : (
                  <ComponentWithYoutube item={anime} />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Api;
