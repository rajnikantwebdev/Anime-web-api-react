import { useParams } from "react-router-dom"
import useGetInfo from "../utils/useGetInfo"
import useAnimeApi from "../utils/useAnimeApi";

function AnimeCardDetailPage() {
    const filteredData = useGetInfo();

    if(!filteredData) return null;
    return (
        <div>
            {filteredData[0].title}
        </div>
    )
}

export default AnimeCardDetailPage