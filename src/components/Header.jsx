import SearchBar from "./SearchBar";
import { SimplePagination } from "./Pagination";
import SortBy from "./SortBy";
import Authenticate from "./Authentication";
import UserFavComponent from "./UserFavComponent";
import { DarkAndLightMode } from "./DarkAndLightMode";
import { useAuth0 } from "@auth0/auth0-react";
import FilterComponent from "./FilterComponent";

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
  return (
    <header className="flex gap-8 items-center w-full py-4">
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
