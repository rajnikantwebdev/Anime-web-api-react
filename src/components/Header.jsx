import SearchBar from "./SearchBar";
import Authenticate from "./Authentication";
import UserFavComponent from "./UserFavComponent";
import { DarkAndLightMode } from "./DarkAndLightMode";
import { useTheme } from "../utils/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { AuthContext } from "../utils/AuthContext";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ query, onClick, onChange }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });

    return () => unsubscribe;
  }, [auth]);

  const { theme } = useTheme();
  return (
    <header
      className={`flex gap-8 items-center w-full py-8 px-6 ${
        theme === "dark" && "bg-[#23272F]"
      }`}
    >
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className=" flex items-center gap-4">
          <Link to={"/"}>
            <img src={Logo} alt={"Otaku logo"} className="w-12 h-12" />
          </Link>
          <SearchBar value={query} onChange={onChange} onClick={onClick} />
        </div>
        <div className="flex items-center gap-8">
          <Authenticate />
          {userInfo && <UserFavComponent />}
          <DarkAndLightMode />
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 lg:hidden block"
        onClick={() => setIsOpen(!isOpen)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      {isOpen && (
        <ul className="lg:hidden block z-50 absolute left-0 bg-red-500 w-full mt-96">
          <SearchBar value={query} onChange={onChange} onClick={onClick} />

          <Authenticate />
          {userInfo && <UserFavComponent />}
          <DarkAndLightMode />
        </ul>
      )}
    </header>
  );
};

export default Header;
