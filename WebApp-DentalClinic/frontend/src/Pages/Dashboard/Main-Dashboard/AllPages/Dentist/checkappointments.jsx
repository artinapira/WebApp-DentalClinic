import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTerminet } from "../../../../../redux/Datas/action";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { EditFilled, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { GetDentist } from "../../../../../redux/auth/action";
import Sidebar from "../GlobalFiles/Sidebar";
import "../GlobalFiles/CommonCSS.css";

const CheckAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all appointments
  const dentist = useSelector((state) => state.auth.data.dentist);
    console.log('dentist',dentist);
  const { token1 } = useSelector((store) => store.auth.data);
  const loggedInDentistId = dentist?.dentistId;
  console.log('loggedin dentist',loggedInDentistId);// Assuming dentistId is stored in auth state
  const terminets = useSelector((store) => store.data?.terminets?.["$values"] || []);
  console.log('terminet in app',terminets);

  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    dispatch(GetDentist(loggedInDentistId, token1));
    dispatch(GetAllTerminet(token1));
  }, [refresh, dispatch, token1]);

  // Filter appointments for the logged-in dentist
  const dentistAppointments = terminets.filter(appointment => appointment.dentistId === loggedInDentistId);
  console.log('dentists app',dentistAppointments);

  const columns = [
    { title: "Date", dataIndex: "dataT", key: "dataT" },
    { title: "Time", dataIndex: "ora", key: "ora" },
    { title: "Symptoms", dataIndex: "ceshtja", key: "ceshtja" },
    { title: "Dentist-ID", dataIndex: "dentistId", key: "dentistId" },
    { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
    
  ];

  return (
    <div className="container1">
    <Sidebar />
    <div className="AfterSideBar1">
  {dentistAppointments  && dentistAppointments.length > 0 ? (<div className="patientDetails1">
      <h1>My Appointments</h1>
      <div className="patientBox1">
        <Table columns={columns} dataSource={dentistAppointments} rowKey="terminetId" />
      </div>
    </div>): ("")}
  </div>
</div>
  );
};

export default CheckAppointments;
