import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.jsx";
import { FavouriteProvider } from "./utils/FavouriteContext.jsx";
import { PageProvider } from "./utils/PageNumberContext.jsx";
import { ThemeProvider } from "./utils/ThemeContext.jsx";
import FilterProvider from "./utils/FilterContext.jsx";
import AuthProvider from "./utils/AuthContext.jsx";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <FilterProvider>
          <PageProvider>
            <FavouriteProvider>
              <RouterProvider router={router} />
            </FavouriteProvider>
          </PageProvider>
        </FilterProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
