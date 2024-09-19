import React, { useEffect, useMemo, useState } from "react";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { BsLayoutTextWindow } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous, BsPersonCircle } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { GetPatientNote, UpdatePatientNote } from "../../../../redux/auth/action";
import "./Admin/CSS/Dentist_Profile.css"
import Sidebar from "../AllPages/GlobalFiles/Sidebar";

//import "../../Main-Dashboard/AllPages/Admin/CSS/CommonCSS.css";

// *********************************************************
const EditPatientNote = () => {
  // const { data } = useSelector((store) => store.auth);
  const  patientnotes  = useSelector((store) => store.data.patientnotes);

  const dispatch = useDispatch();
  const { id } = useParams();


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
  const  token1  = useSelector((store) => store.auth.data.token1);

  useEffect(() => {
    if (id && token1) {
      dispatch(GetPatientNote(id, token1)).then(response => {
        console.log('API Response:', response);
      });
    }
  }, [dispatch, id, token1]);


  const [formData, setFormData] = useState({
    pershkrimi: patientnotes?.pershkrimi || '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {

    dispatch(UpdatePatientNote(formData, patientnotes?.patientNoteId, token1));
    success(" updated");
    handleOk();
  };

  useEffect(() => {
    if (patientnotes) {
      setFormData({
        pershkrimi: patientnotes.pershkrimi,
      });
    }
  }, [patientnotes]);


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
                <BsLayoutTextWindow className="singledivicons" />
                <p>{formData.pershkrimi}</p>
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
                  <label htmlFor="pershkrimi">Description</label>
                  <input
                    name="pershkrimi"
                    value={formData.pershkrimi}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Description"
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

export default EditPatientNote;
