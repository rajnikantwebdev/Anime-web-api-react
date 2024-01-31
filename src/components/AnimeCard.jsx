import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFavorite } from "../utils/FavouriteContext";
import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FilterContext } from "../utils/FilterContext";

export default function ImgMediaCard({ item }) {
  const { state, dispatch } = useFavorite();
  const { user, isAuthenticated } = useAuth0();
  const { filterOption } = useContext(FilterContext);
  const [storeId, setStoreId] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("item")) || [];
    return storedItems.map((item) => item.mal_id);
  });
  const notify = (title) => {
    toast(title + "added to favourite");
  };

  let newDescription;

  if (item.background !== null) {
    newDescription =
      item.background?.length > 100
        ? item.background.slice(0, 100) + "..."
        : item.background;
  } else {
    newDescription =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae nisi, asperiores placeat accusamus deserunt...";
  }
  let trimTitle;

  if (filterOption === "characters") {
    trimTitle =
      item?.name?.length > 20 ? item?.name.slice(0, 20) + "..." : item.name;
  } else {
    trimTitle =
      item?.title?.length > 20 ? item.title.slice(0, 20) + "..." : item.title;
  }

  const addToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(isAuthenticated && user)) {
      // return window.location.replace(
      //   "https://dev-sz7lu7z7pspugpt0.us.auth0.com/u/login?state=hKFo2SBwSHdVZGUwYzgwWlFFVWYzZWFzTVVBbkpyLXA2Y1NBMaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGU0aFpVVlV4V2tOQ0NDUC1DeEh3dlBaanlhX1c4QWhmo2NpZNkgSUFXbEdjSEdvVHpjdlgwZUhwdXhmd3ZTd3VaQmVzNEI"
      // );
      return (
        <Link
          to={
            "https://dev-sz7lu7z7pspugpt0.us.auth0.com/u/login?state=hKFo2SBwSHdVZGUwYzgwWlFFVWYzZWFzTVVBbkpyLXA2Y1NBMaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGU0aFpVVlV4V2tOQ0NDUC1DeEh3dlBaanlhX1c4QWhmo2NpZNkgSUFXbEdjSEdvVHpjdlgwZUhwdXhmd3ZTd3VaQmVzNEI"
          }
          target="_blank"
        />
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
    <Card sx={{ maxWidth: 345 }} className="max-h-[40rem]">
      <CardMedia
        component="img"
        alt={item.title}
        image={
          filterOption === "characters"
            ? item.images.webp.image_url
            : item.images.webp.large_image_url
        }
        className="bg-blue-400 border-8 border-black w-full object-contain max-h-[70vh]"
      />
      <CardContent className="max-h-[20vh]">
        <Typography gutterBottom variant="h5" component="div" className="">
          {trimTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newDescription}
        </Typography>
      </CardContent>
      {filterOption !== "characters" && (
        <CardActions className="max-h-[10vh] ">
          <Button
            size="small"
            className="p-2 border border-black"
            onClick={addToFavorites}
          >
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
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
