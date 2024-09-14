import React, { useEffect, useMemo, useState } from "react";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous, BsPersonCircle } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { GetPatient, UpdatePatient } from "../../../../redux/auth/action";
import "./Admin/CSS/Dentist_Profile.css";
import Sidebar from "../AllPages/GlobalFiles/Sidebar";

//import "../../Main-Dashboard/AllPages/Admin/CSS/CommonCSS.css";

// *********************************************************
const EditPatient = () => {
  // const { data } = useSelector((store) => store.auth);
  const { patients } = useSelector((store) => store.data);

  const dispatch = useDispatch();
  const { id } = useParams();
  const dat = patients.filter(p => p.patientId == id);
  const data = dat[0]



  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };




  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);

  }
  const { token1 } = useSelector((store) => store.auth.data);



  const [formData, setFormData] = useState({
    emriMbiemri: data.emriMbiemri,
    dataLindjes: data.dataLindjes,
    gjinia: data.gjinia,
    username: data.username,
    email: data.email,
    password: data.password
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {

    dispatch(UpdatePatient(formData, data.patientId, token1));
    success(" updated");
    handleOk();
  };



  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
          <div className="maindoctorProfile">
            <div className="firstBox" style={{ marginLeft: '-15%' }}>

              <br></br>
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>{formData.emriMbiemri}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{formData.dataLindjes}</p>
              </div>
              <div className="singleitemdiv">
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{formData.gjinia}</p>
                </div>
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>{formData.username}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{formData.email}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="emriMbiemri">Full Name</label>
                  <input
                    name="emriMbiemri"
                    value={formData.emriMbiemri}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Full name"
                  />
                  <label htmlFor="dataLindjes">Birthdate</label>
                  <input
                    name="dataLindjes"
                    value={formData.dataLindjes}
                    onChange={handleFormChange}
                    type="date"

                    placeholder="Date of birth"
                  />
                  <label htmlFor="gjinia">Gender</label>
                  <select name="gjinia" onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                  <label htmlFor="username">Usename</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Username"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Email"
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox" style={{ width: '25%', height: '40%', marginLeft: '10%' }}>
              <div className="subfirstbox" >
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{formData.gjinia}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}

            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default EditPatient;
