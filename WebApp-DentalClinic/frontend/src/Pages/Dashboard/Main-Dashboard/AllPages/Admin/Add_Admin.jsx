import React, { useEffect, useMemo, useState } from "react";
import '../Admin/CSS/Add_Dentist.css'
import { useDispatch, useSelector } from "react-redux";
import { AdminRegister } from "../../../../../redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import admin from "../../../../../Assets/admin1.PNG";
import Sidebar from "../GlobalFiles/Sidebar";
const notify = (text) => toast(text);
const AddAdmin = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const initData = {
        emriMbiemri: "",
        username: "",
        email: "",
        password: "",
        password: "",


    };
    const [AdminValue, setAdminValue] = useState(initData);

    const HandleAdminChange = (e) => {
        setAdminValue({ ...AdminValue, [e.target.name]: e.target.value });
    };

    const HandleAdminSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(AdminRegister(AdminValue)).then((res) => {
            if (res.message === "Admin already exists") {
                setLoading(false);
                return notify("Admin Already Exist");
            }
            setAdminValue(initData);
            return notify("Admin added");
        });

    };


    return (
        <>
            <ToastContainer />
            <div className="container1">
                <Sidebar/>
                <div className="AfterSideBar1">
                    <div className="Main_Add_Doctor_div">
                        <h1>Add Admin</h1>
                        <img src={admin} alt="doctor" className="avatarimg" />
                        <form onSubmit={HandleAdminSubmit}>
                            <div>
                                <label>Admin Full Name</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        name="emriMbiemri"
                                        value={AdminValue.emriMbiemri}
                                        onChange={HandleAdminChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Admin Username</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={AdminValue.username}
                                        onChange={HandleAdminChange}
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
                                        value={AdminValue.email}
                                        onChange={HandleAdminChange}
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
                                        value={AdminValue.password}
                                        onChange={HandleAdminChange}
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

export default AddAdmin;