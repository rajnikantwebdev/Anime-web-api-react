import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";
import UserFav from "./components/UserFav";
import Card from "./components/Card";
import UserProfilePage from "./components/UserProfilePage";
import Basic from "./components/Form";
import Header from "./components/Header";
import { useContext } from "react";
import { PageContext } from "./utils/PageNumberContext";
import useAnimeApi from "./utils/useAnimeApi";
import { FilterContext } from "./utils/FilterContext";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      {
        path: "/card",
        element: <Card />,
      },
      {
        path: "/user",
        element: <UserProfilePage />,
      },

      {
        path: "/login",
        element: <Basic />,
      },
    ],
  },
]);

function App() {
  const {
    query,
    setQuery,
    pageNumber,
    setPageNumber,
    airing,
    data,
    fetchData,
    setAiring,
    setFilteredAnimeData,
  } = useContext(PageContext);

  function handleOnClick() {
    setFilteredAnimeData(null);
    fetchData();
  }
  return (
    <>
      <Header
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        page={pageNumber}
        onClick={handleOnClick}
        setPage={setPageNumber}
        hasNextPage={data.pagination?.has_next_page}
        setAiring={setAiring}
      />
      <Outlet />
    </>
  );
}

export default App;
