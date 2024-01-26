import ImgMediaCard from "./AnimeCard";
import useAnimeApi from "../utils/useAnimeApi";
import { Link } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { SimplePagination } from "./Pagination";

function Api() {
  const [query, setQuery] = useState("");
  const [filteredAnimeData, setFilteredAnimeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, fetchData } = useAnimeApi(pageNumber, query);

  function handleOnClick() {
    fetchData();
  }

  useEffect(() => {
    setFilteredAnimeData(data.data);
  }, [query, data.data]);

  return !filteredAnimeData ? (
    <ShimmerEffect />
  ) : (
    <div className="flex flex-col items-center gap-8">
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
      <div className="flex gap-4 flex-wrap justify-center">
        {filteredAnimeData.map((anime) => {
          return (
            <Link to={`/anime/${anime.mal_id}/full`} key={anime.mal_id}>
              <ImgMediaCard
                title={anime.title}
                description={anime.background}
                src={anime.images.webp.large_image_url}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Api;
