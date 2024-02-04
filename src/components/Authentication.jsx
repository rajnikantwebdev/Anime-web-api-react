import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-tailwind/react";
import { useTheme } from "../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

function Authenticate() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const { userInfo } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  function handleLogOUt() {
    signOut(auth)
      .then(() => {
        console.log("loggedout");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // if (!userInfo) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (userInfo) {
    return (
      <div className="flex items-center gap-2">
        <Link to={"/user"}>
          {userInfo?.photoUrl ? (
            <img
              src={userInfo?.photoUrl}
              alt={userInfo?.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={theme === "dark" && "gray"}
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Link>
        <Button
          onClick={() => handleLogOUt()}
          className={`flex items-center gap-2${
            theme === "dark" && "bg-[#16181D]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2"
      >
        <span>Login</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </Button>
    );
  }
}

export default Authenticate;
