import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {EditFilled,DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteKontakti, GetAllKontaktet } from "../../../../redux/Datas/action";

const Kontaktet = () => {
  
  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  
  const user = user1;

  const {token1} = useSelector((store) => store.auth.data);



    const columns = [
        { title: "Contact-Id", dataIndex: "kontaktiId", key: "kontaktiId" },
      { title: "Message", dataIndex: "mesazhi", key: "mesazhi" },
      { title: "Name", dataIndex: "emri", key: "emri" },
      { title: "Email", dataIndex: "email", key: "email" },
     
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteKontakti(record.kontaktiId,token1))
          }/>
          </>
        )
      } }
    ];


    const { kontaktet } = useSelector((store) => store.data);
    const {message} = useSelector((store)=> store.data);


    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(GetAllKontaktet(token1));
    }, []);

    return (
        <>
         {kontaktet != null && kontaktet.length && user?.adminId ?
      (<div className="patientDetails1">
        <h1>Contact Details</h1>
        <div className="patientBox">
          <Table columns={columns} dataSource={kontaktet} />
        </div>
      </div>):("") }
     

    </>
    )
}    

export default Kontaktet;