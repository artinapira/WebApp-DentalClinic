import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPatients } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeletePatient } from "../../../../../redux/Datas/action";
import Sidebar from "./Sidebar";
import MedicalRecord from "./MedicalRecord";
import PatientNote from "./PatientNote";
import Dentist from "./Dentist";
import Kontaktet from "../GetKontakti";
import Prescription from "./Prescription";
import Vlersimet from "./Vlersimet";
import Ankesat from "./Ankesat";
import Terminet from "./Terminet";
import Admin from "./Admin";
import "./CommonCSS.css";
const FrontPage = () => {

  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  const user = user1;
  const {token1} = useSelector((store) => store.auth.data);

    const columns = [
      { title: "Full Name", dataIndex: "emriMbiemri", key: "emriMbiemri" },
      { title: "Birthdate", dataIndex: "dataLindjes", key: "dataLindjes" },
      { title: "Gender", dataIndex: "gjinia", key: "gjinia" },
      { title: "Email", dataIndex: "email", key: "email" },
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          <EditFilled className="edit" onClick={()=>{
            ;
            return navigate(`/editPatient/${record.patientId}`);
          }}/>
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeletePatient(record.pacientiId,token1))
          }/>
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    const { patients } = useSelector((store) => store.data);
    const {message} = useSelector((store)=> store.data);


    const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(GetAllPatients(token1));
  }, []);

    return (
        <div className="container1">
          <Sidebar />
          <div className="AfterSideBar1">
        {patients != null  && patients.length &&  (user?.dentistId || user?.adminId) ? (<div className="patientDetails1">
            <h1>Patient Details</h1>
            <div className="patientBox1">
              <Table columns={columns} dataSource={patients} />
            </div>
          </div>): ("")}
           
        <Terminet/>
        <MedicalRecord/>
        <PatientNote/>
        <Prescription/>
        <Vlersimet/>
        <Kontaktet/>
        <Ankesat/>
    
        <Dentist/>
        <Admin/>
        </div>
    </div>
    )
}    

export default FrontPage;