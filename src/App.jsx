import { createBrowserRouter, Outlet } from "react-router-dom";
import AnimeCardDetailPage from "./components/AnimeCardDetailPage";
import Homepage from "../pages/Homepage";
import { PageProvider } from "./utils/PageNumberContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageProvider>
        <Homepage />
      </PageProvider>
    ),
  },
  {
    path: "/anime/:id/full",
    element: (
      <PageProvider>
        <AnimeCardDetailPage />
      </PageProvider>
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
