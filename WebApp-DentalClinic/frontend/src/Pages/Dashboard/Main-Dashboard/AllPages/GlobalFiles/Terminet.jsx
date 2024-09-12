import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTerminet } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { EditFilled, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteTerminet } from "../../../../../redux/Datas/action";
const Terminet = () => {
  const columns = [
    {title:"Date",dataIndex:"dataT",key:"dataT"},
    { title: "Time", dataIndex: "ora", key: "ora" },
    { title: "Symptoms", dataIndex: "ceshtja", key: "ceshtja" },
    { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
    { title: "Email", dataIndex: ['patient', 'email'], key: ['patient', 'email'] },
    {
      title: "Actions", key: "action", render: (record) => {
        return (
          <>
            <EditFilled className="edit" onClick={() => {
        
              return navigate(`/editTermini/${record.terminetId}`);
            }} />
            <DeleteOutlined className="edit" style={{ color: "red", marginLeft: 10 }} onClick={() =>

              dispatch(DeleteTerminet(record.terminetId,token1))
            } />
          </>
        )
      }
    }
  ];

  const navigate = useNavigate();

  const { terminets } = useSelector((store) => store.data);
  const { message } = useSelector((store) => store.data);

  const {token1} = useSelector((store)=>store.auth.data);

  const dispatch = useDispatch();
  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  const user = user1;

  useEffect(() => {
    dispatch(GetAllTerminet(token1));
  }, []);

  return (
    <>

      {terminets.length &&  (user?.dentistId ||  user?.adminId) ?
        (<div className="patientDetails1">
          <h1>Appointments Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={terminets} />
          </div>
        </div>) :("")}
    

    </>
  )
}

export default Terminet;