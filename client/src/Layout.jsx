import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserDataContext, UserDataProver } from "./context/UserDataContext";
import axios from "axios";

const Layout = () => {
  // if (loading) {
  //   return null;
  // }
  return (
    <>
      <UserDataProver>
        <Outlet />
      </UserDataProver>
    </>
  );
};

export default Layout;
