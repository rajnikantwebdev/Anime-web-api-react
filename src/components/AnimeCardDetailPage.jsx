import { useContext } from "react";
import { useGetInfo } from "../utils/useAnimeApi";
import { PageContext } from "../utils/PageNumberContext";

function AnimeCardDetailPage() {
  const { pageNumber, airing } = useContext(PageContext);
  const filteredData = useGetInfo(pageNumber, airing);

  if (!filteredData) return null;
  return <div>{filteredData[0].title}</div>;
}

export default AnimeCardDetailPage;
