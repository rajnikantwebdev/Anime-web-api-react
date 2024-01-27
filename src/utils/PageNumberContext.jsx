import { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [airing, setAiring] = useState(false);

  return (
    <PageContext.Provider
      value={{ pageNumber, setPageNumber, airing, setAiring }}
    >
      {children}
    </PageContext.Provider>
  );
};
