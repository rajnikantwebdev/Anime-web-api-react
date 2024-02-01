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
  const ComponentWithYoutube = HigerOrderComponent(Card);

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

      {!filteredAnimeData ? (
        <ShimmerEffect />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 content-end">
          {filteredAnimeData.map((anime) => {
            return (
              <Link to={`/anime/${anime.mal_id}/full`} key={anime.mal_id}>
                {anime?.trailer?.embed_url !== null ? (
                  <ComponentWithYoutube item={anime} />
                ) : (
                  <Card item={anime} />
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
