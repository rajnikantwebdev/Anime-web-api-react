import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useAnimeApi = (query, pageNumber, airing) => {
  const [data, setData] = useState({ data: null, pagination: null });

  const fetchData = async () => {
    try {
      let apiUrl = `https://api.jikan.moe/v4/anime?page=${pageNumber}`;
      if (query) {
        apiUrl += `&q=${encodeURIComponent(query)}`;
      }

      if (airing) {
        apiUrl += `&status=airing`;
      }

      const response = await fetch(apiUrl);
      const json = await response.json();
      // console.log(json.data);
      setData({ data: json.data, pagination: json.pagination });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setData({ data: null, pagination: null });
    fetchData();
  }, [pageNumber, airing]);

  return { data, fetchData };
};

export function useGetInfo(pageNumber, airing) {
  const { id } = useParams();
  const { data } = useAnimeApi("", pageNumber, airing);

  if (!data.data) return null;
  const filteredCard = data.data.filter((d) => d.mal_id == id);
  return filteredCard;
}

export default useAnimeApi;
