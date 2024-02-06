import { useContext } from "react";
import { useGetInfo } from "../utils/useAnimeApi";
import { PageContext } from "../utils/PageNumberContext";
import { useTheme } from "../utils/ThemeContext";
import { FilterContext } from "../utils/FilterContext";

function AnimeCardDetailPage() {
  const { filterOption } = useContext(FilterContext);
  const { pageNumber, airing } = useContext(PageContext);
  const filteredData = useGetInfo(pageNumber, airing, filterOption);
  const { theme } = useTheme();

  if (!filteredData) return null;
  return (
    <section
      className={`${
        theme === "dark" && "bg-[#23272F]"
      } w-full min-h-screen py-12 px-12`}
    >
      <div
        className={`${theme === "dark" && "bg-[#16181D]"} py-6 px-4 rounded`}
      >
        <div className="flex gap-4">
          <div className="">
            <img
              src={filteredData[0].images.webp.large_image_url}
              alt={filteredData[0].title}
            />
          </div>
          <div className="">
            <div>
              <li className="text-[#149ECA] text-lg">
                {filteredData[0]?.duration}
              </li>
              <li className="text-[#149ECA] text-lg">
                {"Total no of episodes " + filteredData[0]?.episodes}
              </li>
              <li className="text-[#149ECA] text-lg">
                {filteredData[0]?.rating}
              </li>
              <li className="text-[#149ECA] text-lg">
                {new Date(filteredData[0].aired.from).toLocaleDateString() +
                  " - " +
                  new Date(filteredData[0].aired.to).toLocaleDateString()}
              </li>
            </div>
          </div>
        </div>
        <div>
          <h1
            className={`${
              theme === "dark" && "text-white"
            } text-2xl mt-8 mb-4 font-bold`}
          >
            {filteredData[0]?.title}
          </h1>
          <p className={`${theme === "dark" && "text-white"} mb-8`}>
            {filteredData[0]?.background}
          </p>

          <div>
            <span
              htmlFor="synopsis"
              className={`${
                theme === "dark" && "text-white"
              } text-2xl font-bold`}
            >
              Synopsis
            </span>
            <p
              id="synopsis"
              className={`${theme === "dark" && "text-white"} mt-4`}
            >
              {filteredData[0]?.synopsis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimeCardDetailPage;
// bg-[#23272F] bg-[#16181D] color text: #149ECA
