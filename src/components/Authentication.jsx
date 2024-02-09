import { useTheme } from "../utils/ThemeContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

function Authenticate() {
  const { userInfo } = useContext(AuthContext);
  const [userName, setUserName] = useState(userInfo?.displayName);
  const { theme } = useTheme();

  function handleLogOUt() {
    signOut(auth)
      .then(() => {
        console.log("loggedout");
      })
      .catch((err) => {
        console.log("log out error: ", err);
      });
  }

  // useEffect(() => {
  //   setUserName(userInfo?.displayName);
  // }, [userInfo]);

  if (userInfo) {
    return (
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleLogOUt}
      >
        <span className={`text-base ${theme === "dark" && "text-white"}`}>
          {userName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={`${theme === "dark" ? "white" : "currentColor"}`}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <Link to={"/login"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={`${theme === "dark" ? "white" : "currentColor"}`}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      </Link>
    );
  }
}

export default Authenticate;
