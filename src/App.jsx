import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";
import UserFav from "./components/UserFav";
import Card from "./components/Card";

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
  {
    path: "/card",
    element: <Card />,
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
