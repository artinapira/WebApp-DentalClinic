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
  
  const admin = useSelector((state) => state.auth.data.admin);
  console.log('Admin in ankesat: ',admin);
  

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
            dispatch(DeleteAnkesat(record.ankesatId,token1)).then(() => {
              setRefresh(!refresh);
            })
          }/>
          </>
        )
      } }
    ];


    const  ankesats  = useSelector((store) => store.data.ankesats["$values"] || []);
    console.log('ankesat',ankesats);
    const {message} = useSelector((store)=> store.data);


    const dispatch = useDispatch();

    const [refresh, setRefresh] = React.useState(false);

    useEffect(() => {
      dispatch(GetAllAnkesat(token1));
    }, [refresh]);

    return (
        <>
         {ankesats && ankesats.length > 0 && admin?.adminId ?
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