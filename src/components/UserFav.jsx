import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFavorite } from "../utils/FavouriteContext";
import Card from "./Card";

function UserFav({}) {
  const { user, isAuthenticated } = useAuth0();
  const { state } = useFavorite();
  const [userFav, setUserFav] = useState(() => {
    return JSON.parse(localStorage.getItem(user?.sub.slice(14))) || [];
  });

  if (!userFav) return null;

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {userFav.map((fav) => {
        return <Card key={fav.mal_id} item={fav} />;
      })}
    </div>
  );
}

export default UserFav;
