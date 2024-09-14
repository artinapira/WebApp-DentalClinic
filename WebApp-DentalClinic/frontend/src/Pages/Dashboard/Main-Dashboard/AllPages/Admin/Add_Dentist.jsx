import React, { useEffect, useMemo, useState } from "react";
import './CSS/Add_Dentist.css'
import { useDispatch, useSelector } from "react-redux";
import { DentistRegister } from "../../../../../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dentist from "../../../../../Assets/dentist.png";
import { Navigate } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";

const notify = (text) => toast(text);

const AddDentist = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initData = {
    emriMbiemri: "",
    degree:"",
    orari: "",
    paga: "",
    username: "",
    email: "",
    password: "",
    departmentId: "A-",
    
    };

    const [DentistValue, setDentistValue] = useState(initData);






   


  const HandleDentistChange = (e) => {
    setDentistValue({ ...DentistValue, [e.target.name]: e.target.value });
  };

  const HandleDentistSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(DentistRegister(DentistValue)).then((res) => {
      if (res.message === "Mjeku already exists") {
        setLoading(false);
        return notify("Dentist Already Exist");
      }
      setDentistValue(initData);
      return notify("Dentist added");
    });
    
  };


  return (
    <>
      <ToastContainer />
      <div className="container1">
        <Sidebar/>

        <div className="AfterSideBar1">
          <div className="Main_Add_Doctor_div">
            <h1>Add Dentist</h1>
            <img src={dentist} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDentistSubmit}>
              <div>
                <label>Dentist Full Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="emriMbiemri"
                    value={DentistValue.emriMbiemri}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Degree</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Degree"
                    name="degree"
                    value={DentistValue.degree}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Schedule</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Schedule"
                    name="orari"
                    value={DentistValue.orari}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Salary</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Salary"
                    name="paga"
                    value={DentistValue.paga}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Username</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={DentistValue.username}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={DentistValue.email}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={DentistValue.password}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Department ID</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="departmentId"
                    name="departmentId"
                    value={DentistValue.departmentId}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDentist;
