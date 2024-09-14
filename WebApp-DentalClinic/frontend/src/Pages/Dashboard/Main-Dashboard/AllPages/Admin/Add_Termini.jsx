import React, { useEffect, useMemo, useState } from "react";
import './CSS/Add_Pacient.css'
import termini from "../../../../../Assets/termini.png";
import { useDispatch, useSelector } from "react-redux";
import { TerminetAdd } from "../../../../../redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";
import "./CSS/Profile.css";
const notify = (text) => toast(text);

const AddTermini = () => {

        
  const {token1} = useSelector((store) => store.auth.data);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const initData = {
        dataT: "",
        ora: "",
        ceshtja: "",
        stafiId: "",
        pacientiId: "",

    
    };
    const [TerminiValue, setTerminiValue] = useState(initData);



    const HandleTerminiChange = (e) => {
        setTerminiValue({ ...TerminiValue, [e.target.name]: e.target.value });
    };

    const HandleTerminiSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(TerminetAdd(TerminiValue,token1)).then((res) => {
            if (res.message === "Termini already exists") {
                setLoading(false);
                return notify("Appointment Already Exist");
            }
            setTerminiValue(initData);
            return notify("Appointment added");
        });

    };


    return (
        <>
            <ToastContainer />
          
     
   
            <div className="container1">
                <Sidebar/>
                <div className="AfterSideBar1">
                    <div className="Main_Add_Pacient_div">
                        <h1>Add Termini</h1>
                        <img src={termini} alt="doctor" className="avatarimg" />

                        <form onSubmit={HandleTerminiSubmit}>
                            <div>
                                <label>Date</label>
                                <div className="inputdiv">
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        name="dataT"
                                        value={TerminiValue.dataT}
                                        onChange={HandleTerminiChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Time</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Time"
                                        name="ora"
                                        value={TerminiValue.ora}
                                        onChange={HandleTerminiChange}
                                        required
                                    />
                                </div>
                            </div>  
                            <div>
                                <label>Reason</label>
                                <div className="inputdiv">
                                    <input
                                        type="text"
                                        placeholder="Reason"
                                        name="ceshtja"
                                        value={TerminiValue.ceshtja}
                                        onChange={HandleTerminiChange}
                                        required
                                    />
                                </div>
                            </div>            
                            <div>
                                <label>Dentist Id</label>
                                <div className="inputdiv">
                                    <input
                                        type="number"
                                        placeholder="Dentist Id"
                                        name="stafiId"
                                        value={TerminiValue.stafiId}
                                        onChange={HandleTerminiChange}
                                        required
                                    />
                                </div>
                            </div>          
                            <div>
                                <label>Patient Id</label>
                                <div className="inputdiv">
                                    <input
                                        type="number"
                                        placeholder="Patient Id"
                                        name="pacientiId"
                                        value={TerminiValue.pacientiId}
                                        onChange={HandleTerminiChange}
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

export default AddTermini;