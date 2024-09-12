import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetAllPatientNote } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeletePatientNote } from "../../../../../redux/Datas/action";
const PatientNote = () => {

    
  const {token1} = useSelector((store) => store.auth.data);
    const columns = [
      { title: "Description", dataIndex: "pershkrimi", key: "pershkrimi" },
      { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          <EditFilled className="edit" onClick={()=>{
            ;
            return navigate(`/editPatientNote/${record.patientNoteId}`);
          }}/>
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeletePatientNote(record.patientNoteId,token1))
          }/>
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    const { patientnotes } = useSelector((store) => store.data);
    useEffect(() => {
      if (patientnotes == []){
        window.location.reload()
      }
    },[])
    const {message} = useSelector((store)=> store.data);
    console.log(patientnotes)

    const dispatch = useDispatch();

    const {
      data: { user1 },
    } = useSelector((state) => state.auth);
    const user = user1;
 

  useEffect(() => {
    dispatch(GetAllPatientNote(token1));
  }, []);

    return (
        <>

         {patientnotes != null && patientnotes.length && (user?.dentistId) ? (
      <div className="patientDetails1">
        <h1>Patient Note Details</h1>
        <div className="patientBox1">
          <Table columns={columns} dataSource={patientnotes} />
        </div>
      </div> ):("")}


    </>
    )
}    

export default PatientNote;