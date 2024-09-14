import React, { useEffect, useMemo, useState } from "react";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { BsLayoutTextWindow } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous, BsPersonCircle } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { GiMedicines, GiOverdose } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { GetPrescription, UpdatePrescription } from "../../../../redux/auth/action";
import "./Admin/CSS/Dentist_Profile.css"
import Sidebar from "../AllPages/GlobalFiles/Sidebar";

//import "../../Main-Dashboard/AllPages/Admin/CSS/CommonCSS.css";

// *********************************************************
const EditPrescription = () => {
  // const { data } = useSelector((store) => store.auth);
  const  prescriptions  = useSelector((store) => store.data.prescriptions);

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
      dispatch(GetPrescription(id, token1)).then(response => {
        console.log('API Response:', response);
      });
    }
  }, [dispatch, id, token1]);

  const [formData, setFormData] = useState({
    diagnoza: prescriptions?.diagnoza || "",
    medicina: prescriptions?.medicina || "",
    patientId: prescriptions?.patientId || "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {

    dispatch(UpdatePrescription(formData, prescriptions.prescriptionId, token1));
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
                <GiOverdose className="singledivicons" />
                <p>{formData.diagnoza}</p>
              </div>
              <div className="singleitemdiv">
                <GiMedicines className="singledivicons" />
                <p>{formData.medicina}</p>
              </div>
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>{formData.patientId}</p>
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
                  <label htmlFor="diagnoza">Diagnosis</label>
                  <input
                    name="diagnoza"
                    value={formData.diagnoza}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Diagnosis"
                  />
                  <label htmlFor="medicina">Medicine</label>
                  <input
                    name="medicina"
                    value={formData.medicina}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Medicine"
                  />
                  <label htmlFor="patientId">Patient Id</label>
                  <input
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleFormChange}
                    type="number"

                    placeholder="Patient ID"
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

export default EditPrescription;
