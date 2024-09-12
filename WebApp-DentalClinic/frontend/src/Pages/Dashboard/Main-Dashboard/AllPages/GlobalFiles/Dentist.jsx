import { Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDentists} from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { EditFilled, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { DeleteDentist } from "../../../../../redux/Datas/action";
const Dentist = () => {
  const columns = [
    { title: "Dentist-ID", dataIndex: "dentistId", key: "dentistId" },
    { title: "Name", dataIndex:  "emriMbiemri", key:"emriMbiemri"},
    { title: "Degree", dataIndex: "degree", key: "degree" },
    { title: "Schedule", dataIndex: "orari", key: "orari" },
    { title: "Salary", dataIndex: "paga", key: "paga" },
    { title: "Email", dataIndex:  "email", key:"email"},

    {
      title: "Actions", key: "action", render: (record) => {
        return (
          <>
            <EditFilled className="edit" onClick={() => {
             
              return navigate(`/editDentist/${record.dentistId}`);
            }} />
            <DeleteOutlined className="edit" style={{ color: "red", marginLeft: 10 }} onClick={() =>

              dispatch(DeleteDentist(record.dentistId,token1))
            } />
          </>
        )
      }
    }
  ];

  const navigate = useNavigate();

  const { dentists } = useSelector((store) => store.data);
  const { message } = useSelector((store) => store.data);

  const {token1} = useSelector((store)=>store.auth.data);

  const dispatch = useDispatch();
  const {
    data: { user1 },
  } = useSelector((state) => state.auth);
  const user = user1;

  useEffect(() => {
    dispatch(GetAllDentists(token1));
  }, []);

  return (
    <>

      {dentists.length &&  (user?.dentistId) ?
        (<div className="patientDetails1">
          <h1>Dentist Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={dentists} />
          </div>
        </div>) :("")}
    

    </>
  )
}

export default Dentist;