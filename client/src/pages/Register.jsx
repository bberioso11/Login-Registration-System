import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { useSelector } from "react-redux";
const Register = () => {
  // const { userData } = useContext(UserDataContext);
  const userData = useSelector((state) => state.userdata.data);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!firstname) {
      firstnameRef.current.focus();
      return;
    }
    if (!lastname) {
      lastnameRef.current.focus();
      return;
    }
    if (!email) {
      emailRef.current.focus();
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      return;
    }
    const { data } = await axios.post(`/api/authenticate/register`, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
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
      text: "Register Succesfully!",
    }).then(() => navigate("/login"));
  };
  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}>
        <div className="row mx-1">
          <div className="col-12 border shadow rounded">
            <div className="text-center my-4">
              <h3 className="">Register</h3>
            </div>
            <div className="px-5 pb-5">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    ref={firstnameRef}
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    ref={lastnameRef}
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </div>
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
                    Do You Have An Account?{" "}
                    <Link to="/login" className="d-block d-md-inline">
                      Login
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

export default Register;
