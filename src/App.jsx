import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";
// import { PageProvider } from "./utils/PageNumberContext";
import UserFav from "./components/UserFav";
// import { FavouriteProvider } from "./utils/FavouriteContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <FavouriteProvider>
      //   <PageProvider>
      <Homepage />
      //   </PageProvider>
      // </FavouriteProvider>
    ),
  },
  {
    path: "/anime/:id/full",
    element: (
      // <FavouriteProvider>
      //   <PageProvider>
      <AnimeCardDetailPage />
      //   </PageProvider>
      // </FavouriteProvider>
    ),
  },
  {
    path: "/user-favourite",
    element: (
      // <FavouriteProvider>
      // <PageProvider>
      <UserFav />
      // </PageProvider>
      // </FavouriteProvider>
    ),
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
