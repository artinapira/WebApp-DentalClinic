import React, { useEffect, useState } from "react";
import "./Css/Dentist_Profile.css";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdSchool, MdEmail } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaMoneyBillWave, FaMapMarkedAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlineGlobal } from 'react-icons/ai';
import { GiTooth } from 'react-icons/gi';
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateDentist } from "../../../../../redux/auth/action";
import { GetAllDepartment } from "../../../../../redux/Datas/action";
import image from "../../../../../Assets/dentisti.png";
import Sidebar from "../GlobalFiles/Sidebar";

const DentistProfile = () => {
  const dispatch = useDispatch();
  const dentist = useSelector((state) => state.auth.data.dentist);
  console.log('Dentist: ',dentist);
  const { token1 } = useSelector((store) => store.auth.data);
  
  // Add a loading state to handle undefined dentist
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dentist) {
      setLoading(false);
      setFormData({
        emriMbiemri: dentist.emriMbiemri,
        degree: dentist.degree,
        orari: dentist.orari,
        paga: dentist.paga,
        departmentId: dentist.departmentId,
        username: dentist.username,
        email: dentist.email,
      });
    }
  }, [dentist]); // Dependency array to re-run the effect when `dentist` changes

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => setOpen(true);

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

  const handleCancel = () => setOpen(false);

  const { departments } = useSelector((store) => store.data);
  const { token2 } = useSelector((store2) => store2.auth.data);

  const dispatch4 = useDispatch();
  useEffect(() => {
    dispatch4(GetAllDepartment(token2));
  }, []);

  const [formData, setFormData] = useState({
    emriMbiemri: '',
    degree: '',
    orari: '',
    paga: '',
    departmentId: '',
    username: '',
    email: '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    const form = {
      ...formData,
      email: dentist.email,
      password: dentist.password
    };
    dispatch(UpdateDentist(form, dentist.dentistId, token1));
    success("Updated");
    handleOk();
  };

  // Show loading state or fallback if data is undefined
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div>
                <img src={image} alt="docimg" />
              </div>

              <hr />
              <div className="singleitemdiv">
                <BsPersonLinesFill className="singledivicons" />
                <p>{formData.emriMbiemri}</p>
              </div>
              <div className="singleitemdiv">
                <MdSchool className="singledivicons" />
                <p>{formData.degree}</p>
              </div>
              <div className="singleitemdiv">
                <BiTime className="singledivicons" />
                <p>{formData.orari}</p>
              </div>
              <div className="singleitemdiv">
                <AiOutlineUser className="singledivicons" />
                <p>{formData.username}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  <AiFillEdit />
                  Edit profile
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
                  <label htmlFor="degree">Degree</label>
                  <input
                    name="degree"
                    value={formData.degree}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Degree"
                  />
                  <label htmlFor="orari">Schedule</label>
                  <input
                    name="orari"
                    value={formData.orari}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Schedule"
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <MdEmail className="singledivicons" />
                  <p>{formData.email}</p>
                </div>
                <div className="singleitemdiv">
                  <AiOutlineUser className="singledivicons" />
                  <p>{formData.username}</p>
                </div>
                <div className="singleitemdiv">
                  <FaMoneyBillWave className="singledivicons" />
                  <p>{formData.paga}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Clinic Details
                </h2>
                <div className="singleitemdiv">
                  <AiOutlineGlobal className="singledivicons" />
                  <p>English, Albanian</p>
                </div>
                <div className="singleitemdiv">
                  <GiTooth className="singledivicons" />
                  <p> Ama Dent </p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                    Prishtine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DentistProfile;
