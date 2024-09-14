import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteVlersimet, GetAllVlersimet } from "../../../../../redux/Datas/action";

const Vlersimet = () => {
  
  const {dentist, admin} = useSelector((state) => state.auth.data);
  
  const user = admin;

  const {token1} = useSelector((store) => store.auth.data);



    const columns = [
        { title: "Rating-Id", dataIndex: "vlersimetId", key: "vlersimetId" },
      { title: "Service", dataIndex: "sherbimi", key: "sherbimi" },
      { title: "Behaviour", dataIndex: "sjellja", key: "sjellja" },
      { title: "Dentist-Id", dataIndex: "dentistId", key: "dentistId" },
      { title: "Patient-Id", dataIndex: "patientId", key: "patientId" },
     
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteVlersimet(record.vlersimetId,token1)).then(() => {
              setRefresh(!refresh);
            })
          }/>
          </>
        )
      } }
    ];


    const  vlersimets  = useSelector((store) => store.data.vlersimets["$values"] || []);
    const {message} = useSelector((store)=> store.data);


    const dispatch = useDispatch();

    const [refresh, setRefresh] = React.useState(false);

    useEffect(() => {
      dispatch(GetAllVlersimet(token1));
    }, [refresh]);

    return (
        <>
         {vlersimets && vlersimets.length > 0 && user?.adminId ?
      (<div className="patientDetails1">
        <h1>Vlersimet</h1>
        <div className="patientBox">
          <Table columns={columns} dataSource={vlersimets} />
        </div>
      </div>):("") }
     

    </>
    )
}    

export default Vlersimet;