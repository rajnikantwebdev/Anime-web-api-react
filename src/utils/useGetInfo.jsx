import { useParams } from "react-router-dom"
import useAnimeApi from "./useAnimeApi";

function getAnimeDataHelper() {
    const data = useAnimeApi();
    return data
}

export default function useGetInfo() {
    const {id} = useParams();
    const data = getAnimeDataHelper();
    if(!data) return null;
    const filteredCard = data.filter((d) => d.mal_id == id);
    return filteredCard
}
