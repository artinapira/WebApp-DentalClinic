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
  
  const admin = useSelector((state) => state.auth.data.admin);
  
  console.log('admin in kontaktet: ',admin);

  const {token1} = useSelector((store) => store.auth.data);
  console.log('token: ',token1);



    const columns = [
        { title: "Contact-Id", dataIndex: "kontaktiId", key: "kontaktiId" },
      { title: "Message", dataIndex: "mesazhi", key: "mesazhi" },
      { title: "Name", dataIndex: "emri", key: "emri" },
      { title: "Email", dataIndex: "email", key: "email" },
     
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          
          <DeleteOutlined className="edit" style={{color:"red",marginLeft:10}} onClick={()=>
            dispatch(DeleteKontakti(record.kontaktiId,token1)).then(() => {
              setRefresh(!refresh);
            })
          }/>
          </>
        )
      } }
    ];


    const  kontaktet  = useSelector((store) => store.data.kontaktet["$values"] || []);
    const {message} = useSelector((store)=> store.data);
    console.log('kontaktet: ',kontaktet);


    const dispatch = useDispatch();

    const [refresh, setRefresh] = React.useState(false);

    useEffect(() => {
      dispatch(GetAllKontaktet(token1));
    }, [refresh]);

    return (
        <>
         {kontaktet && kontaktet.length > 0 && admin?.adminId ?
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