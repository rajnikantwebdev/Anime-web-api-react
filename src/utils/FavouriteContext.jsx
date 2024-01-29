import { createContext, useReducer, useContext } from "react";

const FavouriteContext = createContext();

const initialState = {
  favourites: [],
};

const actions = {
  ADD_FAV: "ADD_FAV",
  LOAD_FAV: "LOAD_FAV",
  REMOVE_FAV: "REMOVE_FAV",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_FAV:
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };

    case actions.LOAD_FAV:
      return {
        ...state,
        favourites: action.payload,
      };

    case actions.REMOVE_FAV:
      return {
        ...state,
        favourites: state.favourites.filter((fav) => {
          fav.mal_id !== action.payload.mal_id;
          // console.log("remove context: ", action.payload.mal_id),
          // console.log("fav context: ", fav.mal_id);
        }),
      };

    default:
      return state;
  }
};

const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavouriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavouriteContext.Provider>
  );
};

const useFavorite = () => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export { FavouriteProvider, useFavorite };
