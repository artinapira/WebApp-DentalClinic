import React, { useEffect, useState } from "react";
import "./Dashboard/Main-Dashboard/AllPages/Dentist/Css/Dentist_Profile.css";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsPersonCircle, BsGenderAmbiguous } from "react-icons/bs";
import { FaMoneyBillWave, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import { AiOutlineUser, AiOutlineGlobal } from 'react-icons/ai';
import { GiTooth } from 'react-icons/gi';
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal, Table } from "antd";
import { GetPatient, UpdatePatient } from "../redux/auth/action";
import { GetAllMedicalRecord, GetAllPrescription, GetAllPatientNote, TerminetAdd } from '../redux/Datas/action';
import image from "../Assets/person.png";
import Navbar from '../Components/Nav/Navbar';

const PatientProfile = () => {
  const dispatch1 = useDispatch();
  const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);
  const [isUpdatePatientVisible, setIsUpdatePatientVisible] = useState(false);
  const [isMedicalRecordsVisible, setIsMedicalRecordsVisible] = useState(false);
  const [isPrescriptionsVisible, setIsPrescriptionsVisible] = useState(false);
  const [isPatientNotesVisible, setIsPatientNotesVisible] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    dataT: "",
    ora: "",
    ceshtja: "",
  });

  const dispatch = useDispatch();
  const patient = useSelector((state) => state.auth.data.user1);
  const { token1 } = useSelector((store) => store.auth.data);
  const loggedInPatientId = patient?.patientId;

  const medicalRecords = useSelector((state) => state.data.medicalrecords["$values"] || []);
  const prescriptions = useSelector((state) => state.data.prescriptions["$values"] || []);
  const patientNotes = useSelector((state) => state.data.patientnotes["$values"] || []);

  useEffect(() => {
    if (token1 && loggedInPatientId) {
      dispatch1(GetPatient(loggedInPatientId, token1));
      dispatch1(GetAllMedicalRecord(token1));
      dispatch1(GetAllPrescription(token1));
      dispatch1(GetAllPatientNote(token1));
    }
  }, [dispatch, loggedInPatientId, token1]);

  const filteredMedicalRecords = medicalRecords.filter(record => record.patientId === loggedInPatientId);
  const filteredPrescriptions = prescriptions.filter(prescription => prescription.patientId === loggedInPatientId);
  const filteredPatientNotes = patientNotes.filter(note => note.patientId === loggedInPatientId);

  const [formData, setFormData] = useState({
    emriMbiemri: '',
    dataLindjes: '',
    gjinia: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        emriMbiemri: patient.emriMbiemri,
        dataLindjes: patient.dataLindjes,
        gjinia: patient.gjinia,
        username: patient.username,
        email: patient.email,
      });
    }
  }, [patient]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    const form = {
      ...formData,
      email: patient.email,
      password: patient.password,
    };
    dispatch(UpdatePatient(form, patient.patientId, token1));
    message.success("Updated");
    setIsUpdatePatientVisible(false);
  };

  // Appointment modal handlers
  const handleShowAppointmentModal = () => setIsAppointmentVisible(true);
  const handleCancelAppointment = () => setIsAppointmentVisible(false);

  const handleAppointmentSubmit = () => {
    const { dataT, ora, ceshtja } = appointmentData;
    const requestBody = {
      dataT,
      ora,
      ceshtja,
      pacientiId: loggedInPatientId,
    };

    dispatch(TerminetAdd(requestBody, token1));
    setIsAppointmentVisible(false);
    message.success("Appointment made successfully.");
  };

  // Modal handlers for other sections
  const handleShowMedicalRecordsModal = () => setIsMedicalRecordsVisible(true);
  const handleCancelMedicalRecordsModal = () => setIsMedicalRecordsVisible(false);

  const handleShowPrescriptionsModal = () => setIsPrescriptionsVisible(true);
  const handleCancelPrescriptionsModal = () => setIsPrescriptionsVisible(false);

  const handleShowPatientNotesModal = () => setIsPatientNotesVisible(true);
  const handleCancelPatientNotesModal = () => setIsPatientNotesVisible(false);

  // Columns for Medical Records, Prescriptions, and Patient Notes
  const medicalRecordColumns = [
    { title: 'Description', dataIndex: 'pershkrimi', key: 'pershkrimi' },
    { title: 'Symptoms', dataIndex: 'simptomat', key: 'simptomat' },
    { title: 'Diagnosis', dataIndex: 'diagnoza', key: 'diagnoza' },
    { title: 'Results', dataIndex: 'rezultati', key: 'rezultati' },
  ];

  const prescriptionColumns = [
    { title: 'Diagnosis', dataIndex: 'diagnoza', key: 'diagnoza' },
    { title: 'Medicine', dataIndex: 'medicina', key: 'medicina' },
  ];

  const patientNoteColumns = [
    { title: 'Description', dataIndex: 'pershkrimi', key: 'pershkrimi' },
  ];

  return (
    <>
      <Navbar />
      <div className="container1">
        <div className="AfterSideBar1">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <img src={image} alt="patientimg" />
              <hr />
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
                <MdEmail className="singledivicons" />
                <p>{formData.email}</p>
              </div>

              <div className="singleitemdiv">
                <button onClick={() => setIsUpdatePatientVisible(true)} className="singleitemdiv buttonstyle">
                  <AiFillEdit />
                  Edit profile
                </button>
              </div>

              <Modal
                title="Edit Patient Details"
                open={isUpdatePatientVisible}
                onCancel={() => setIsUpdatePatientVisible(false)}
                footer={[
                  <Button key="back" onClick={() => setIsUpdatePatientVisible(false)}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleFormSubmit}>
                    Save Changes
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
                  />
                  <label htmlFor="gjinia">Gender</label>
                  <select name="gjinia" value={formData.gjinia} onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                  <label htmlFor="username">Username</label>
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

            {/* ***********  Second Div (Other Info Section) ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center" }}>Make an Appointment</h2>

                <div className="singleitemdiv">
                  <Button type="primary" onClick={handleShowAppointmentModal} className="singleitemdiv buttonstyle">
                    Add Appointment
                  </Button>
                  <p>Add Appointment</p>
                </div>
                <Modal
                  title="Add Appointment"
                  open={isAppointmentVisible}
                  onCancel={handleCancelAppointment}
                  footer={[
                    <Button key="cancel" onClick={handleCancelAppointment}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAppointmentSubmit}>
                      Submit
                    </Button>,
                  ]}
                >
                  <form className="inputForm">
                    <label>Date</label>
                    <input
                      name="dataT"
                      value={appointmentData.dataT}
                      onChange={(e) => setAppointmentData({ ...appointmentData, dataT: e.target.value })}
                      type="date"
                    />
                    <label>Time</label>
                    <input
                      name="ora"
                      value={appointmentData.ora}
                      onChange={(e) => setAppointmentData({ ...appointmentData, ora: e.target.value })}
                      type="text"
                    />
                    <label>Issue</label>
                    <input
                      name="ceshtja"
                      value={appointmentData.ceshtja}
                      onChange={(e) => setAppointmentData({ ...appointmentData, ceshtja: e.target.value })}
                      type="text"
                      placeholder="Issue"
                    />
                  </form>
                </Modal>
                </div>

                <div className="subfirstbox">
                <h2 style={{ textAlign: "center" }}>Medical Records</h2>

                <div className="singleitemdiv">
                  <Button type="primary" onClick={handleShowMedicalRecordsModal} className="singleitemdiv buttonstyle">
                    My Medical Records
                  </Button>
                  <p>My Medical Records</p>
                </div>
                <Modal
                  title="My Medical Records"
                  open={isMedicalRecordsVisible}
                  onCancel={handleCancelMedicalRecordsModal}
                  footer={[
                    <Button key="cancel" onClick={handleCancelMedicalRecordsModal}>
                      Close
                    </Button>,
                  ]}
                >
                  <Table
                    dataSource={filteredMedicalRecords}
                    columns={medicalRecordColumns}
                    pagination={false}
                    rowKey="medicalRecordId"
                  />
                </Modal>
                </div>
                <div className="subfirstbox">
                <h2 style={{ textAlign: "center" }}>Prescriptions</h2>
                <div className="singleitemdiv">
                  <Button type="primary" onClick={handleShowPrescriptionsModal} className="singleitemdiv buttonstyle">
                    My Prescriptions
                  </Button>
                  <p>My Prescriptions</p>
                </div>
                <Modal
                  title="My Prescriptions"
                  open={isPrescriptionsVisible}
                  onCancel={handleCancelPrescriptionsModal}
                  footer={[
                    <Button key="cancel" onClick={handleCancelPrescriptionsModal}>
                      Close
                    </Button>,
                  ]}
                >
                  <Table
                    dataSource={filteredPrescriptions}
                    columns={prescriptionColumns}
                    pagination={false}
                    rowKey="prescriptionId"
                  />
                </Modal>
                </div>
                <div className="subfirstbox">
                <h2 style={{ textAlign: "center" }}>Patient Notes</h2>
                <div className="singleitemdiv">
                  <Button type="primary" onClick={handleShowPatientNotesModal} className="singleitemdiv buttonstyle">
                    My Patient Notes
                  </Button>
                  <p>My Patient Notes</p>
                </div>
                <Modal
                  title="My Patient Notes"
                  open={isPatientNotesVisible}
                  onCancel={handleCancelPatientNotesModal}
                  footer={[
                    <Button key="cancel" onClick={handleCancelPatientNotesModal}>
                      Close
                    </Button>,
                  ]}
                >
                  <Table
                    dataSource={filteredPatientNotes}
                    columns={patientNoteColumns}
                    pagination={false}
                    rowKey="patientNoteId"
                  />
                </Modal>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
