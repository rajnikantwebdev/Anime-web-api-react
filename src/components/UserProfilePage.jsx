import { useTheme } from "../utils/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { IfNoImg } from "../utils/constants";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

function UserProfilePage() {
  const { userInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    userName: userInfo.displayName,
    photoUrl: userInfo.photoURL,
  });

  const [isUpdateTrue, setIsUpdateTrue] = useState(false);
  // console.log("userInfo: ", userInfo);
  // console.log("userData: ", userData);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserData({
        ...userData,
        photoUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleUpdateUserName = async () => {
    try {
      console.log("clicked");
      const newUserName = await updateProfile(auth.currentUser, {
        displayName: userData.userName,
        photoURL: userData.photoUrl,
      });
      setIsUpdateTrue(false);
    } catch (error) {
      console.log("username updating error: ", error);
    }
  };

  useEffect(() => {
    handleUpdateUserName();
  }, []);

  const handleNotUpdateUserName = () => {
    setUserData({ ...userData, userName: userInfo?.displayName });
    setIsUpdateTrue(false);
  };

  useEffect(() => {
    setUserData({
      userName: userInfo?.displayName,
      photoUrl: userInfo?.photoURL,
    });
  }, [userInfo]);

  const { theme } = useTheme();
  if (!userInfo) return null;
  return (
    <section
      className={`${
        theme === "dark" && "bg-[#23272F] text-white"
      } w-full min-h-screen px-24 py-24 flex flex-col items-center`}
    >
      <div className="w-full border border-white px-6 py-8 flex">
        <div className="flex-shrink px-12">
          <img
            src={!userData?.photoUrl ? IfNoImg : userData?.photoUrl}
            alt={userData?.displayName}
            className="rounded-full w-24 h-24 ring-4 ring-white object-cover"
          />
        </div>

        <div className="flex-1 flex items-center gap-2 px-12">
          <label htmlFor="username">Username: </label>
          <span id="username" className="text-2xl font-bold">
            {userData.userName}
          </span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsUpdateTrue(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </div>
      {isUpdateTrue ? (
        <div className="flex flex-col items-center px-6 py-12 border-white border bg-[#16181D] absolute rounded max-w-96">
          <div className="absolute right-2 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={handleNotUpdateUserName}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          {/* <div className=" items-center gap-2"> */}
          <div className="flex flex-col items-center gap-4 mb-8 ">
            <img
              src={!userData?.photoUrl ? IfNoImg : userData?.photoUrl}
              alt={userData?.displayName}
              className="rounded-full w-24 h-24 ring-4 ring-white object-cover "
            />
            <div className="w-full">
              <input type="file" onChange={handleImageChange} className="" />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={userData.userName}
              className="text-white rounded px-2 py-2 bg-transparent border-b border-white focus:outline-none"
              onChange={(e) => {
                setUserData({ ...userData, userName: e.target.value });
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={handleUpdateUserName}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      ) : (
        // </div>
        ""
      )}
    </section>
  );
}

export default UserProfilePage;
// bg-[#23272F] bg-[#16181D]
