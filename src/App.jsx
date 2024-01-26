import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "anime/:id/full",
    element: <AnimeCardDetailPage />,
  },
]);

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
