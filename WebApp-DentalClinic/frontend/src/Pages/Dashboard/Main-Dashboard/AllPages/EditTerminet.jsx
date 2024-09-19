import React, { useEffect, useState } from "react";
import { GiMeditation } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { MdLockClock, MdSick } from "react-icons/md";
import { BsFillCalendarDateFill, BsPerson } from "react-icons/bs";
import { FaRegHospital, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal, Select } from "antd";
import { useParams } from "react-router-dom";
import { GetTerminet, UpdateTerminet } from "../../../../redux/auth/action";
import "./Admin/CSS/Dentist_Profile.css";
import Sidebar from "../AllPages/GlobalFiles/Sidebar";
import { GetAllPatients, GetAllDentists } from "../../../../redux/Datas/action";

const EditTerminet = () => {
  const terminets = useSelector((store) => store.data.terminets);
  console.log('Terminet:', terminets);

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log('id:', id);
  const token1 = useSelector((store) => store.auth.data.token1);
  const dentists = useSelector((state) => state.data.dentists || []);
  const patients = useSelector((state) => state.data.patients || []);

  useEffect(() => {
    if (token1) {
      dispatch(GetAllDentists(token1));
      dispatch(GetAllPatients(token1));  // Fetch all dentists on load
    }
  }, [dispatch, token1]);

  useEffect(() => {
    if (id && token1) {
      dispatch(GetTerminet(id, token1)).then(response => {
        console.log('API Response:', response);
      });
    }
  }, [dispatch, id, token1]);

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
    dataT: terminets?.dataT || '', 
    ora: terminets?.ora || '',
    ceshtja: terminets?.ceshtja || '',
    dentistId: terminets?.dentistId || '',
    patientId: terminets?.patientId || '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    const form = {
      ...formData,
      dentistId: formData.dentistId,
      patientId: formData.patientId // Adjust based on the form data
    };
    dispatch(UpdateTerminet(form, terminets.terminetId, token1));
    success("Updated");
    handleOk();
  };

  useEffect(() => {
    if (terminets) {
      setFormData({
        dataT: terminets.dataT,
        ora: terminets.ora,
        ceshtja: terminets.ceshtja,
        dentistId: terminets.dentistId,
        patientId: terminets.patientId,
      });
    }
  }, [terminets]);

  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div className="singleitemdiv">
                <BsFillCalendarDateFill className="singledivicons" />
                <p>{formData.dataT}</p>
              </div>
              <div className="singleitemdiv">
                <FaTimes className="singledivicons" />
                <p>{formData.ora}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>{formData.ceshtja}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>{formData.dentistId}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>{formData.patientId}</p>
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
                  <label htmlFor="dataT">Date</label>
                  <input
                    name="dataT"
                    value={formData.dataT}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Date"
                  />
                  <label htmlFor="ora">Time</label>
                  <input
                    name="ora"
                    value={formData.ora}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Time"
                  />
                  <label htmlFor="ceshtja">Reason</label>
                  <input
                    name="ceshtja"
                    value={formData.ceshtja}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Reason"
                  />
                  <label htmlFor="dentistId">Dentist</label>
                  <Select
                  name="dentistId"
                  value={formData.dentistId}
                  onChange={(value) => handleDropdownChange('dentistId', value)}
                  placeholder="Select Dentist"
                  style={{ width: '100%' }}
                  >
                  {dentists.map((dentist) => (
                    <Select.Option key={dentist.dentistId} value={dentist.dentistId}>
                      {dentist.emriMbiemri} {/* Adjust based on your dentist object */}
                    </Select.Option>
                  ))}
                  </Select>
                  <label htmlFor="patientId">Select Patient</label>
                  <Select
                  name="patientId"
                  value={formData.patientId}
                  onChange={(value) => handleDropdownChange('patientId', value)}
                  placeholder="Select Patient"
                  style={{ width: '100%' }}
                  >
                  {patients.map((patient) => (
                    <Select.Option key={patient.patientId} value={patient.patientId}>
                      {patient.emriMbiemri} {/* Adjust based on your patient object */}
                    </Select.Option>
                  ))}
                  </Select>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTerminet;
