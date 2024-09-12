import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAdmin} from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { EditFilled, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteAdmin } from "../../../../../redux/Datas/action";



const Admin = () => {
  const columns = [
    { title: "Admin-ID", dataIndex: "adminId", key: "adminId" },
    { title: "Name", dataIndex:  "emriMbiemri", key:"emriMbiemri"},
    { title: "Email", dataIndex:  "email", key:"email"},
    {
      title: "Actions", key: "action", render: (record) => {
        return (
          <>
            <EditFilled className="edit" onClick={() => {
  
              return navigate(`/editAdmin/${record.adminId}`);
            }} />
            <DeleteOutlined className="edit" style={{ color: "red", marginLeft: 10 }} onClick={() =>

              dispatch(DeleteAdmin(record.adminId,token1))
            } />
          </>
        )
      }
    }
  ];


  const navigate = useNavigate();
  const { admins } = useSelector((store) => store.data);
  const { message } = useSelector((store) => store.data);

  const {token1} = useSelector((store)=>store.auth.data);

  const dispatch = useDispatch();
  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  const user = user1;

  useEffect(() => {
    dispatch(GetAllAdmin(token1));
  }, []);

  return (
    <>

      {admins != undefined &&  admins.length  &&  (user?.adminId) ?
        (<div className="patientDetails1">
          <h1>Admin Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={admins} />
          </div>
        </div>) :("")}
    

    </>
  )
}

export default Admin;