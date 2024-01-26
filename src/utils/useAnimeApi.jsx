import { useEffect, useState } from "react";

const useAnimeApi = (pageNumber, query) => {
  const [data, setData] = useState({ data: null, pagination: null });

  const fetchData = async () => {
    try {
      let apiUrl = `https://api.jikan.moe/v4/anime?page=${pageNumber}`;
      if (query) {
        apiUrl += `&q=${encodeURIComponent(query)}`;
      }
      const response = await fetch(apiUrl);
      const json = await response.json();
      console.log(json.data);
      setData({ data: json.data, pagination: json.pagination });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return { data, fetchData };
};

export default useAnimeApi;
