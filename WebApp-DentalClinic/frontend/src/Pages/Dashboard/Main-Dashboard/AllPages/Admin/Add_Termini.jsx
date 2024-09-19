import React, { useEffect, useState } from "react";
import './CSS/Add_Pacient.css'
import termini from "../../../../../Assets/termini.png";
import { useDispatch, useSelector } from "react-redux";
import { TerminetAdd, GetAllDentists, GetAllPatients } from "../../../../../redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "./CSS/Profile.css";

const notify = (text) => toast(text);

const AddTermini = () => {
  const dispatch = useDispatch();
  const { token1 } = useSelector((store) => store.auth.data);
  
  // Fetch all dentists and patients from the Redux store
  const dentists = useSelector((store) => store.data.dentists || []);
  const patients = useSelector((store) => store.data.patients || []);

  const [loading, setLoading] = useState(false);

  const initData = {
    dataT: "",
    ora: "",
    ceshtja: "",
    dentistId: "", // Will hold selected dentistId
    patientId: "", // Will hold selected patientId
  };

  const [TerminiValue, setTerminiValue] = useState(initData);

  useEffect(() => {
    if (token1) {
      dispatch(GetAllDentists(token1)); // Fetch dentists
      dispatch(GetAllPatients(token1)); // Fetch patients
    }
  }, [dispatch, token1]);

  const HandleTerminiChange = (e) => {
    setTerminiValue({ ...TerminiValue, [e.target.name]: e.target.value });
  };

  const HandleTerminiSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(TerminetAdd(TerminiValue, token1)).then((res) => {
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
        <Sidebar />
        <div className="AfterSideBar1">
          <div className="Main_Add_Pacient_div">
            <h1>Add Appointment</h1>
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
                <label>Select Dentist</label>
                <div className="inputdiv">
                  <select
                    name="dentistId"
                    value={TerminiValue.dentistId}
                    onChange={HandleTerminiChange}
                    required
                  >
                    <option value="">Select a Dentist</option>
                    {dentists.map((dentist) => (
                      <option key={dentist.dentistId} value={dentist.dentistId}>
                        {dentist.emriMbiemri} {/* Display dentist name */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label>Select Patient</label>
                <div className="inputdiv">
                  <select
                    name="patientId"
                    value={TerminiValue.patientId}
                    onChange={HandleTerminiChange}
                    required
                  >
                    <option value="">Select a Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.patientId} value={patient.patientId}>
                        {patient.emriMbiemri} {/* Display patient name */}
                      </option>
                    ))}
                  </select>
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
