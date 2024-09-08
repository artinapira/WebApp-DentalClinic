import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import { AppDispatch } from "../redux/store";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const notify = (text: string) => toast(text);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const res = await dispatch(authLogin(form));
  
      if (res.success && res.message === "Logged in successfully") {
        notify("Login Successful.");
        navigate("/Home");
      } else if (!res.success) {
        notify("Wrong credentials, Please try again.");
      } else {
        notify("Unexpected response from the server.");
      }
    } catch (error) {
      notify("Error occurred, unable to Login.");
      console.error("Login error:", error); // Log the error for debugging
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
                  <div className="fform3-group3" onClick={handleClick}>
                    <button
                      type="button"
                      className="btn mb-30 btn-lg btn-primary w-100"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <h4 style={{ marginTop: "10px" }}>Login as a hospital member?</h4>
                <a href="/">Click here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
