import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetAllMedicalRecord } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteMedicalRecord } from "../../../../../redux/Datas/action";
const MedicalRecord = () => {

    
  const {token1} = useSelector((store) => store.auth.data);
    const columns = [
      { title: "Description", dataIndex: "pershkrimi", key: "pershkrimi" },
      { title: "Symptoms", dataIndex: "simptomat", key: "simptomat" },
      { title: "Diagnosis", dataIndex: "diagnoza", key: "diagnoza" },
      { title: "Result", dataIndex: "rezultati", key: "rezultati"},
      { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          <EditFilled className="edit" onClick={()=>{
            ;
            return navigate(`/editMedicalRecord/${record.medicalRecordId}`);
          }}/>
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteMedicalRecord(record.medicalRecordId,token1))
          }/>
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    const { medicalrecords } = useSelector((store) => store.data);
    useEffect(() => {
      if (medicalrecords == []){
        window.location.reload()
      }
    },[])
    const {message} = useSelector((store)=> store.data);
    console.log(medicalrecords)

    const dispatch = useDispatch();

    const {
      data: { user1 },
    } = useSelector((state) => state.auth);
    const user = user1;
 

  useEffect(() => {
    dispatch(GetAllMedicalRecord(token1));
  }, []);

    return (
        <>

         {medicalrecords != null && medicalrecords.length && (user?.dentistId) ? (
      <div className="patientDetails1">
        <h1>Medical Record Details</h1>
        <div className="patientBox1">
          <Table columns={columns} dataSource={medicalrecords} />
        </div>
      </div> ):("")}


    </>
    )
}    

export default MedicalRecord;