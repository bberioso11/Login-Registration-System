import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserData, setUserData } from "./store/userdataSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userdata.loading);
  useEffect(() => {
    getUserData().then((userData) => {
      dispatch(setUserData(userData));
    });
  }, []);
  return <>{loading ? <div>Loading</div> : <Outlet />}</>;
};

export default Layout;
