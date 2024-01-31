import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";
// import { PageProvider } from "./utils/PageNumberContext";
import UserFav from "./components/UserFav";
// import { FavouriteProvider } from "./utils/FavouriteContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/anime/:id/full",
    element: <AnimeCardDetailPage />,
  },
  {
    path: "/user-favourite",
    element: <UserFav />,
  },
]);

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
