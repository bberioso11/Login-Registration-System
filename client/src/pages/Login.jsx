import React, { useEffect, useRef, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, setUserData } from "../store/userdataSlice";

import axios from "axios";
const Login = () => {
  //const { userData, handleValidateToken } = useContext(UserDataContext);
  const userData = useSelector((state) => state.userdata.data);
  console.log(userData);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();
    if (!email) {
      emailRef.current.focus();
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      return;
    }

    const { data } = await axios.get(
      `/api/authenticate/login?email=${email}&password=${password}`
    );

    if (!data.isSuccess) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.message || "Something Wrong!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Login Successfully!",
    }).then(() => {
      getUserData().then((userData) => {
        dispatch(setUserData(userData));
      });
      navigate("/");
    });
  };
  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}>
        <div className="row mx-1">
          <div className="col-12 border shadow rounded">
            <div className="text-center my-5">
              <h3 className="">Login</h3>
            </div>
            <div className="px-5 pb-5">
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    ref={passwordRef}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div className="mt-3">
                  <p className="fw-light">
                    Don't Have An Account?{" "}
                    <Link to="/register" className="d-block d-md-inline">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
