import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
const Home = () => {
  const { userData, logout } = useContext(UserDataContext);

  const handleLogout = () => {
    axios.delete("/api/authenticate/logout").then(() => {
      logout();
    });
  };
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-12 border shadow rounded p-5 text-center">
            <h5>
              Hi{" "}
              {userData
                ? userData.firstname + " " + userData.lastname
                : "Guest"}{" "}
              <FaHandsClapping className="mb-1" />
            </h5>
            <div className="mt-4">
              {userData ? (
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary ms-2">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
