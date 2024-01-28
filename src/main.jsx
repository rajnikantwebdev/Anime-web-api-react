import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { FavouriteProvider } from "./utils/FavouriteContext.jsx";
import { PageProvider } from "./utils/PageNumberContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sz7lu7z7pspugpt0.us.auth0.com"
      clientId="IAWlGcHGoTzcvX0eHpuxfwvSwuZBes4B"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <PageProvider>
        <FavouriteProvider>
          <RouterProvider router={router} />
        </FavouriteProvider>
      </PageProvider>
    </Auth0Provider>
  </React.StrictMode>
);
