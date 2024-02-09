import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const useAnimeApi = (query, pageNumber, airing, filter) => {
  const [data, setData] = useState({ data: null, pagination: null });

  const fetchData = async () => {
    try {
      let apiUrl = `https://api.jikan.moe/v4/${filter}?page=${pageNumber}`;
      if (query) {
        apiUrl += `&q=${encodeURIComponent(query)}`;
      }

      if (airing) {
        apiUrl += `&status=airing`;
      }

      const response = await fetch(apiUrl);
      const json = await response.json();

      setData({ data: json.data, pagination: json.pagination });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setData({ data: null, pagination: null });
    fetchData();
  }, [pageNumber, airing, filter]);

  // const datafromUseMemo = useMemo(fetchData, [pageNumber, airing, filter]);
  // console.log("useMemo data: ", datafromUseMemo);

  return { data, fetchData };
};

export function useGetInfo(pageNumber, airing, filter) {
  const { id } = useParams();
  const { data } = useAnimeApi("", pageNumber, airing, filter);

  if (!data.data) return null;
  const filteredCard = data.data.filter((d) => d.mal_id == id);
  return filteredCard;
}

export default useAnimeApi;
