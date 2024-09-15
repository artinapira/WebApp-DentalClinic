import React, { useEffect, useState } from "react";
import { GiOverdose } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { BsFillCalendarDateFill, BsPersonCircle, BsReceipt } from "react-icons/bs";
import { FaDiagnoses, FaPills } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { useParams } from "react-router-dom";
import { GetMedicalRecord, UpdateMedicalRecord } from "../../../../redux/auth/action";
import Sidebar from "../AllPages/GlobalFiles/Sidebar";
import "./Admin/CSS/Dentist_Profile.css";

// *********************************************************
const EditMedicalRecord = () => {
  const dispatch = useDispatch();

  // Get the medical records from the Redux store
  const medicalrecords = useSelector((store) => store.data.medicalrecords);
  console.log('medicalRecord: ',medicalrecords);
  const { id } = useParams();
  console.log('id: ',id);

  // Get the authentication token
  const  token1  = useSelector((store) => store.auth.data.token1);
  


  useEffect(() => {
    if (id && token1) {
      dispatch(GetMedicalRecord(id, token1)).then(response => {
        console.log('API Response:', response);
      });
    }
  }, [dispatch, id, token1]);

  // Define formData state, initialized with an empty object if data is undefined
  const [formData, setFormData] = useState({
    pershkrimi: medicalrecords?.pershkrimi || "",
    simptomat: medicalrecords?.simptomat || "",
    diagnoza: medicalrecords?.diagnoza || "",
    rezultati: medicalrecords?.rezultati || "",
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

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

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(UpdateMedicalRecord(formData, medicalrecords?.medicalRecordId, token1));
    success("Updated");
    handleOk();
  };


  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
          <div className="maindoctorProfile">
            <div className="firstBox">
              <br></br>
              <div className="singleitemdiv">
                <FaDiagnoses className="singledivicons" />
                <p>{formData.pershkrimi}</p>
              </div>
              <div className="singleitemdiv">
                <FaPills className="singledivicons" />
                <p>{formData.simptomat}</p>
              </div>
              <div className="singleitemdiv">
                <GiOverdose className="singledivicons" />
                <p>{formData.diagnoza}</p>
              </div>
              <div className="singleitemdiv">
                <BsReceipt className="singledivicons" />
                <p>{formData.rezultati}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
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
                  <label htmlFor="simptomat">Symptoms</label>
                  <input
                    name="simptomat"
                    value={formData.simptomat}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Symptoms"
                  />
                  <label htmlFor="diagnoza">Diagnosis</label>
                  <input
                    name="diagnoza"
                    value={formData.diagnoza}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Diagnosis"
                  />
                  <label htmlFor="rezultati">Results</label>
                  <input
                    name="rezultati"
                    value={formData.rezultati}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Results"
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

export default EditMedicalRecord;
