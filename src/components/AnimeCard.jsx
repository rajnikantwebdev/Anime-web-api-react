import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFavorite } from "../utils/FavouriteContext";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ImgMediaCard({ item }) {
  const { state, dispatch } = useFavorite();
  const { user } = useAuth0();
  // console.log(user.sub);
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
  let trimTitle =
    item.title?.length > 20 ? item.title.slice(0, 20) + "..." : item.title;

  const addToFavorites = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button
    e.stopPropagation();

    // const storedItems = () => {
    //   try {
    //     return JSON.parse(localStorage.getItem(`favorites_${user.sub}`)) || [];
    //   } catch (error) {
    //     return null;
    //   }
    // };
    // console.log("stored items: ", storedItems);
    // if (!storedItems.some((stored) => stored.mal_id === item.mal_id)) {

    // }

    const updatedItems = [...state.favourites, item];
    localStorage.setItem(`favorites_${user.sub}`, JSON.stringify(updatedItems));
    console.log("updated Items: ", updatedItems);
    dispatch({ type: "ADD_FAV", payload: item });

    // localStorage.setItem(
    //   `favorites_${user.sub}`,
    //   JSON.stringify([...state.favourites, item])
    // );
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="max-h-[40rem]">
      <CardMedia
        component="img"
        alt={item.title}
        image={item.images.webp.large_image_url}
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
      <CardActions className="max-h-[10vh] ">
        <Button
          size="small"
          className="p-2 border border-black"
          onClick={addToFavorites}
        >
          Add to Fav
        </Button>
      </CardActions>
    </Card>
  );
}
