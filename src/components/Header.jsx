import SearchBar from "./SearchBar";
import { SimplePagination } from "./Pagination";
import SortBy from "./SortBy";
import Authenticate from "./Authentication";
import UserFavComponent from "./UserFavComponent";
import { DarkAndLightMode } from "./DarkAndLightMode";
import { useAuth0 } from "@auth0/auth0-react";
import FilterComponent from "./FilterComponent";
import { useTheme } from "../utils/ThemeContext";

const Header = ({
  query,
  onClick,
  onChange,
  page,
  setPage,
  hasNextPage,
  setAiring,
  filterValue,
  setFilterValue,
}) => {
  const { isAuthenticated } = useAuth0();
  const { theme } = useTheme();
  return (
    <header
      className={`flex gap-8 items-center w-full py-8 px-6 ${
        theme === "dark" && "bg-[#23272F]"
      }`}
    >
      <SearchBar value={query} onChange={onChange} onClick={onClick} />
      <SimplePagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
      <SortBy setAiring={setAiring} />
      <FilterComponent value={filterValue} onChange={setFilterValue} />
      <Authenticate />
      {isAuthenticated && <UserFavComponent />}
      <DarkAndLightMode />
    </header>
  );
};

export default Header;
