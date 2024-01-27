import ImgMediaCard from "./AnimeCard";
import useAnimeApi from "../utils/useAnimeApi";
import { Link } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import { SimplePagination } from "./Pagination";
import { PageContext } from "../utils/PageNumberContext";
import SortBy from "./SortBy";

function Api() {
  const [query, setQuery] = useState("");
  const [filteredAnimeData, setFilteredAnimeData] = useState([]);
  const { pageNumber, setPageNumber, airing, setAiring } =
    useContext(PageContext);
  const { data, fetchData } = useAnimeApi(query, pageNumber, airing);
  console.log("airing: ", airing);

  function handleOnClick() {
    setFilteredAnimeData(null);
    fetchData();
  }

  useEffect(() => {
    setFilteredAnimeData(data.data);
  }, [query, data.data, airing]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-12 my-8">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={handleOnClick}
        />
        <SimplePagination
          page={pageNumber}
          setPage={setPageNumber}
          hasNextPage={data.pagination?.has_next_page}
        />
        <SortBy setAiring={setAiring} />
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {!filteredAnimeData ? (
          <ShimmerEffect />
        ) : (
          filteredAnimeData.map((anime) => {
            return (
              <Link to={`/anime/${anime.mal_id}/full`} key={anime.mal_id}>
                <ImgMediaCard
                  title={anime.title}
                  description={anime.background}
                  src={anime.images.webp.large_image_url}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Api;
