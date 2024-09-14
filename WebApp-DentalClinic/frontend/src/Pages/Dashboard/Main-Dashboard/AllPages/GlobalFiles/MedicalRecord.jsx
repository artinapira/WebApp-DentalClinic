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
            return navigate(`/EditMedicalRecord/${record.medicalRecordId}`);
          }}/>
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteMedicalRecord(record.medicalRecordId,token1)).then(() => {
              setRefresh(!refresh);
            })
          }/>
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    const medicalrecords = useSelector((store) => store.data?.medicalrecords?.["$values"] || []);

    const {token1} = useSelector((store) => store.auth.data);

    const {message} = useSelector((store)=> store.data);
    console.log(medicalrecords);

    const dispatch = useDispatch();

    const {dentist} = useSelector((state) => state.auth.data);
    const {admin} = useSelector((state) => state.auth.data);
    console.log('user: ',dentist);
    console.log('user: ',admin);

    const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    dispatch(GetAllMedicalRecord(token1));
  }, [refresh]);
  console.log('medical records: ',medicalrecords);

    return (
        <>

         {medicalrecords && medicalrecords.length > 0  ? (
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