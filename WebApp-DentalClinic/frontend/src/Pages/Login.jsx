import React, { useState, useEffect } from 'react';
import "./CSS/Login.css";
import logo from "../Assets/logoo.png";
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Nav/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";

const notify = (text) => toast(text);

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token1} = useSelector((store) => store.auth.data);
  useEffect(() => {
    if (token1) {
      console.log("Token stored in Redux:", token1);  // This will ensure token is logged after it is updated
    }
  }, [token1]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(authLogin(form));
      // Since token1 might not be immediately updated, check if it's retrieved from localStorage:
      const storedToken = localStorage.getItem("token1");
      console.log("Token from localStorage:", storedToken);
      if (res.success && storedToken) {
        notify("Login Successful.");
        navigate("/Home");
      } else {
        notify("Wrong credentials, Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      notify("Error occurred, unable to Login.");
    }
  };
  
  
  

  return (
    <>
      <ToastContainer />
      <div className="section-area account-wraper2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="appointment-form form-wraper">
                <div className="logo">
                  <img src={logo} alt="img" />
                </div>
                <form className="form3" action="#">
                  <h4>Patient Email</h4>
                  <div className="fform3-group3">
                    <input
                      name="email"
                      value={form.email}
                      type="text"
                      className="fform3-control3"
                      placeholder="Email"
                      onChange={onChange}
                    />
                  </div>
                  <h4>Password</h4>
                  <div className="fform3-group3">
                    <input
                      name="password"
                      value={form.password}
                      type="password"
                      className="fform3-control3"
                      placeholder="Password"
                      onChange={onChange}
                    />
                  </div>
                  <div className="fform3-group3">
                    <button
                      type="button"
                      className="btn mb-30 btn-lg btn-primary w-100"
                      onClick={handleClick}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <h4 style={{ marginTop: "10px" }}>Login as a member ? </h4>
                <a href="/">Click here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
