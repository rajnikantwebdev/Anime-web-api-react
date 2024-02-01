import { useFavorite } from "../utils/FavouriteContext";
import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FilterContext } from "../utils/FilterContext";
import { useTheme } from "../utils/ThemeContext";
import YoutubeLogo from "../assets/youtube-logo.svg";

function Card({ item }) {
  const { state, dispatch } = useFavorite();
  const { user, isAuthenticated } = useAuth0();
  const { theme } = useTheme();
  const { filterOption } = useContext(FilterContext);
  const [storeId, setStoreId] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("item")) || [];
    return storedItems.map((item) => item.mal_id);
  });
  const notify = (title) => {
    toast(title + " added to favourite");
  };

  let newDescription;

  if (item.background !== null) {
    newDescription =
      item.background?.length > 100
        ? item.background.slice(0, 100) + "..."
        : item.background;
  } else {
    newDescription =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae nisi...";
  }
  let trimTitle;

  if (filterOption === "characters") {
    trimTitle =
      item?.name?.length > 15 ? item?.name.slice(0, 15) + "..." : item.name;
  } else {
    trimTitle =
      item?.title?.length > 12 ? item.title.slice(0, 12) + "..." : item.title;
  }

  const addToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(isAuthenticated && user)) {
      window.open(
        "https://dev-sz7lu7z7pspugpt0.us.auth0.com/u/login?state=hKFo2SBVTGFlLU5mZG9hVm9waGNYZFBBSUgyYmN4aDhrby1mNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFOVkNVa2lKRzd0ZUctNlBZbnMtRUt5eUVPMmRyX2FRo2NpZNkgSUFXbEdjSEdvVHpjdlgwZUhwdXhmd3ZTd3VaQmVzNEI"
      );
    } else {
      let globalItem = ([...state.favourites] =
        JSON.parse(localStorage.getItem("item")) || []);

      if (![...state.favourites].some((old) => old.mal_id === item.mal_id)) {
        globalItem = [...state.favourites, item];
        localStorage.setItem("item", JSON.stringify(globalItem));
        setStoreId(globalItem.map((up) => up.mal_id));
        notify(trimTitle);
      } else {
        dispatch({ type: "REMOVE_FAV", payload: item });
        const newArr = JSON.parse(localStorage.item).filter((removedItem) => {
          return removedItem.mal_id !== item.mal_id;
        });

        state.favourites = newArr;
        setStoreId(storeId.filter((newStoreId) => newStoreId !== item.mal_id));
        localStorage.setItem("item", JSON.stringify(state.favourites));
      }

      dispatch({ type: "ADD_FAV", payload: item });
    }
  };

  return (
    <div
      className={`max-w-lg flex max-h-80 h-72 rounded-md shadow-md ${
        theme === "dark" && "bg-[#16181D]"
      }`}
    >
      <div className="w-1/2">
        <img
          className="w-full h-full object-cover"
          alt={item.title}
          src={
            filterOption === "characters"
              ? item.images.webp.image_url
              : item.images.webp.large_image_url
          }
        />
      </div>
      <div className="w-1/2 px-2 my-4">
        <h2
          className={`${
            theme === "dark" && "text-white"
          } text-gray-900 text-xl my-4`}
        >
          {trimTitle}
        </h2>
        <p
          className={`${
            theme === "dark" && "text-white"
          } text-gray-900 text-sm`}
        >
          {newDescription}
        </p>
        {/* <p>{item.trailer.embed_url}</p> */}
        <button className="my-4" onClick={addToFavorites}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={storeId.includes(item.mal_id) ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;

export const HigerOrderComponent = (Card) => {
  return ({ item }) => {
    const handleYoutubeClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(item?.trailer?.embed_url);
    };
    return (
      <div style={{ position: "relative" }}>
        <img
          src={YoutubeLogo}
          alt={item.title + " trailer"}
          className="w-12 h-12 absolute bottom-0 left-0 object-cover mx-4 drop-shadow-lg"
          onClick={handleYoutubeClick}
        />

        <Card item={item} />
      </div>
    );
  };
};
