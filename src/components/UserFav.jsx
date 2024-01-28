import { useEffect, useState } from "react";
import { useFavorite } from "../utils/FavouriteContext";
import ImgMediaCard from "./AnimeCard";
import { useAuth0 } from "@auth0/auth0-react";

function UserFav({}) {
  const { user, isAuthenticated } = useAuth0();
  const [userFav, setUserFav] = useState();

  useEffect(() => {
    if (isAuthenticated && user) {
      const storedItems = JSON.parse(
        localStorage.getItem(`favorites_${user.sub}`) || []
      );
      setUserFav(storedItems);
    }
  }, [isAuthenticated, user]);

  if (!user || !isAuthenticated) return null;
  if (!userFav) return null;

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {userFav.map((fav) => {
        return <ImgMediaCard key={fav.mal_id} item={fav} />;
      })}
    </div>
  );
}

export default UserFav;
