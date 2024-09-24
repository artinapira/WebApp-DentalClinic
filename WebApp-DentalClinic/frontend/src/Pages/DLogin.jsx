import React, { useState, useEffect} from "react";
import { Radio } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import admin from '../Assets/admin.png';
import banner from '../Assets/banner.png';
import "./CSS/DLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogin, DentistLogin } from "../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";

const notify = (text) => toast(text);

const DLogin = () => {
  const [loading, setLoading] = useState(false);
  const [placement, setPlacement] = useState("Admin");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token1 } = useSelector((store) => store.auth.data);
  useEffect(() => {
    if (token1) {
      console.log("Token stored in Redux:", token1);  // This will ensure token is logged after it is updated
    }
  }, [token1]);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formValue.email !== "" && formValue.password !== "") {
      let data = {
        ...formValue,
        email: formValue.email.toLowerCase(),
        password: formValue.password
      };

      if (data.email.includes("admin")) {
        dispatch(AdminLogin(data)).then((res) => {
          setLoading(false);
          if (res.message === "Login successful") {
            notify("Login Successful");
            return navigate("/Home");
          } else if (res.message === "Password incorrect") {
            notify("Wrong credentials");
          } else if (res.message === "recepsionisti not found") {
            notify("Email not found");
          }
        });
      } else if (data.email.includes("dentist")) {
        dispatch(DentistLogin(data)).then((res) => {
          console.log('Response after login:', res);
          console.log('Token after dentist login: ',token1);
          setLoading(false);
          if (res.message === "Logged in successfully") {
            notify("Login Successful");
            return navigate("/Home");
          } else if (res.message === "Password incorrect") {
            notify("Wrong credentials");
          } else if (res.message === "Mjeku not found") {
            notify("Email not found");
          }
        });
      }
    }
  };

  
  

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                required
              />
              <button type="submit">{loading ? "Loading..." : "Submit"}</button>
              <h4 style={{ marginTop: "10px" }}>Login as a patient?</h4>
              <a href="/Login">Click here</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
