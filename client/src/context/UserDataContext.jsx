import React, { useContext, useEffect, useState, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const UserDataContext = createContext();

const UserDataProver = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    handleValidateToken();
  }, []);

  useEffect(() => {
    console.log(isValidToken);
    if (isValidToken) {
      axios.get(`/api/userdata/get-userdata`).then((response) => {
        if (response.data.isSuccess) {
          setUserData(response.data.userdata);
        }
      });
    }
  }, [isValidToken]);

  const handleValidateToken = () => {
    console.log("validate");
    axios.get(`/api/authenticate/validate-token`).then((response) => {
      setIsValidToken(response.data.isValid);
    });
  };

  const logout = () => {
    setUserData(null);
    setIsValidToken(false);
  };
  return (
    <>
      <UserDataContext.Provider
        value={{ userData, handleValidateToken, logout }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export { UserDataContext, UserDataProver };
