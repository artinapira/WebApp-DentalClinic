import React, { useEffect, useMemo, useState } from "react";
import './CSS/Add_Pacient.css'
import patient from "../../../../../Assets/pacienti.png";
import { useDispatch, useSelector } from "react-redux";
import { PatientRegister } from "../../../../../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";
import "./CSS/Profile.css";
const notify = (text) => toast(text);

const AddPatient = () => {

        
  const {token1} = useSelector((store) => store.auth.data);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const initData = {
        emriMbiemri: "",
        dataLindjes: "",
        gjinia: "",
        username: "",
        email: "",
        password: "",

    
    };
    const [PatientValue, setPatientValue] = useState(initData);



    const HandlePatientChange = (e) => {
        setPatientValue({ ...PatientValue, [e.target.name]: e.target.value });
    };

    const HandlePatientSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(PatientRegister(PatientValue,token1)).then((res) => {
            if (res.message === "Patient already exists") {
                setLoading(false);
                return notify("Patient Already Exist");
            }
            setPatientValue(initData);
            return notify("Patient added");
        });

    };


    return (
        <>
            <ToastContainer />
          
     
   
            <div className="container1">
                <Sidebar/>
                <div className="AfterSideBar1">
                    <div className="Main_Add_Pacient_div">
                        <h1>Add Patient</h1>
                        <img src={patient} alt="doctor" className="avatarimg" />

                        <form onSubmit={HandlePatientSubmit}>
                            <div>
                                <label>Patient Full Name</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        name="emriMbiemri"
                                        value={PatientValue.emriMbiemri}
                                        onChange={HandlePatientChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Birthdate</label>
                                <div className="inputdiv">
                                    <input
                                        type="date"
                                        placeholder="dd-mm-yy"
                                        name="dataLindjes"
                                        value={PatientValue.dataLindjes}
                                        onChange={HandlePatientChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Gender</label>
                                <div className="inputdiv">
                                    <select
                                        name="gjinia"
                                        value={PatientValue.gjinia}
                                        onChange={HandlePatientChange}
                                        required
                                    >
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </div>   
                            <div>
                                <label>Username</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={PatientValue.username}
                                        onChange={HandlePatientChange}
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
                                        value={PatientValue.email}
                                        onChange={HandlePatientChange}
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
                                        value={PatientValue.password}
                                        onChange={HandlePatientChange}
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

export default AddPatient;