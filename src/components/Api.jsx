import ImgMediaCard from "./AnimeCard";
import useAnimeApi from "../utils/useAnimeApi";
import { Link } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../utils/PageNumberContext";
import { useTheme } from "../utils/ThemeContext";
import Header from "./Header";
import { FilterContext } from "../utils/FilterContext";

function Api() {
  const [query, setQuery] = useState("");
  const [filteredAnimeData, setFilteredAnimeData] = useState([]);
  const { theme } = useTheme();
  const { filterOption } = useContext(FilterContext);
  const { pageNumber, setPageNumber, airing, setAiring } =
    useContext(PageContext);
  const { data, fetchData } = useAnimeApi(
    query,
    pageNumber,
    airing,
    filterOption
  );

  function handleOnClick() {
    setFilteredAnimeData(null);
    fetchData();
  }

  useEffect(() => {
    setFilteredAnimeData(data.data);
  }, [query, data.data, airing]);

  return (
    <div className={`px-6 ${theme === "dark" ? "bg-[#23272F]" : "bg-white"}`}>
      <Header
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={handleOnClick}
        page={pageNumber}
        setPage={setPageNumber}
        hasNextPage={data.pagination?.has_next_page}
        setAiring={setAiring}
      />
      <div className="flex gap-4 flex-wrap justify-around">
        {!filteredAnimeData ? (
          <ShimmerEffect />
        ) : (
          filteredAnimeData.map((anime) => {
            return (
              <Link to={`/anime/${anime.mal_id}/full`} key={anime.mal_id}>
                <ImgMediaCard item={anime} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Api;
