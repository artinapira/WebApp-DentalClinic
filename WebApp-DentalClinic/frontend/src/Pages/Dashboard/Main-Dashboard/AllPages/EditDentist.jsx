import React, { useEffect, useMemo, useState } from "react";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { MdSchool,  } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { Button, message, Modal } from "antd";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { GetDentist, UpdateDentist } from "../../../../redux/auth/action";
import Sidebar from "../AllPages/GlobalFiles/Sidebar";
import "./Admin/CSS/Dentist_Profile.css";

//import "../../Main-Dashboard/AllPages/Admin/CSS/CommonCSS.css";

// *********************************************************
const EditDentist = () => {
  // const { data } = useSelector((store) => store.auth);
  const { dentists } = useSelector((store) => store.data);

  const dispatch = useDispatch();
  const { id } = useParams();
  const dat = dentists.filter((d) => d.dentistId == id);
  const data = dat[0];
  const { token1 } = useSelector((store) => store.auth.data);
  useEffect(() => {
    dispatch(GetDentist(id, token1));
  }, []);

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
  };

  const [formData, setFormData] = useState({
    emriMbiemri: data.emriMbiemri,
    degree: data.degree,
    orari: data.orari,
    paga: data.paga,
    username: data.username,
    email: data.email,
    password: data.password,
    departmentId: data.departmentId,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(UpdateDentist(formData, data.dentistId, token1));
    success(" updated");
    handleOk();
  };

  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />

        <div
          className="AfterSideBar1"
          style={{ marginLeft: "26%", marginTop: "5%" }}
        >
          <div className="maindoctorProfile">
            <div className="firstBox">
              <br></br>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDentist;
