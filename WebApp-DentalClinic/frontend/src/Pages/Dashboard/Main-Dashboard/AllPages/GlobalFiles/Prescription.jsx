import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetAllPrescription } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeletePrescription } from "../../../../../redux/Datas/action";
const PatientNote = () => {

    
  const {token1} = useSelector((store) => store.auth.data);
    const columns = [
      { title: "Diagnosis", dataIndex: "diagnoza", key: "diagnoza" },
      { title: "Medicine", dataIndex: "medicina", key: "medicina" },
      { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          <EditFilled className="edit" onClick={()=>{
            ;
            return navigate(`/editPatientNote/${record.prescriptionId}`);
          }}/>
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeletePrescription(record.prescriptionId,token1))
          }/>
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    const { prescriptions } = useSelector((store) => store.data);
    useEffect(() => {
      if (prescriptions == []){
        window.location.reload()
      }
    },[])
    const {message} = useSelector((store)=> store.data);
    console.log(prescriptions)

    const dispatch = useDispatch();

    const {
      data: { user1 },
    } = useSelector((state) => state.auth);
    const user = user1;
 

  useEffect(() => {
    dispatch(GetAllPrescription(token1));
  }, []);

    return (
        <>

         {prescriptions != null && prescriptions.length && (user?.dentistId) ? (
      <div className="patientDetails1">
        <h1>Patient Note Details</h1>
        <div className="patientBox1">
          <Table columns={columns} dataSource={prescriptions} />
        </div>
      </div> ):("")}


    </>
    )
}    

export default PatientNote;