import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });

    return unsubscribe;
  }, [auth]);

  // console.log("current user: ", auth.currentUser);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
