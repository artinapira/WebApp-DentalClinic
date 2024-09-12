import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteAnkesat, GetAllAnkesat } from "../../../../../redux/Datas/action";

const Ankesat = () => {
  
  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  
  const user = user1;

  const {token1} = useSelector((store) => store.auth.data);



    const columns = [
        { title: "Ankesa-Id", dataIndex: "ankesatId", key: "ankesatId" },
      { title: "Ankesa", dataIndex: "ankesa", key: "ankesa" },
      { title: "Dentist-Id", dataIndex: "dentistId", key: "dentistId" },
      { title: "Patient-Id", dataIndex: "patientId", key: "patientId" },
     
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteAnkesat(record.ankesatId,token1))
          }/>
          </>
        )
      } }
    ];


    const { ankesats } = useSelector((store) => store.data);
    const {message} = useSelector((store)=> store.data);


    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(GetAllAnkesat(token1));
    }, []);

    return (
        <>
         {ankesats != null && ankesats.length && user?.adminId ?
      (<div className="patientDetails1">
        <h1>Ankesa</h1>
        <div className="patientBox">
          <Table columns={columns} dataSource={ankesats} />
        </div>
      </div>):("") }
     

    </>
    )
}    

export default Ankesat;