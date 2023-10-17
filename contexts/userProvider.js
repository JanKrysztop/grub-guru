import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}/users/profile`,
          { withCredentials: true }
        );
        if (response.data) {
          console.log(response.data);
          setIsLoggedIn(true);
          setUserData(response.data);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
