import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table, Form, Input, DatePicker, notification } from 'antd';
import { GetPatient, UpdatePatient } from '../redux/auth/action';
import { GetAllMedicalRecord, GetAllPrescription, GetAllPatientNote, TerminetAdd } from '../redux/Datas/action';
import './CSS/PatientProfile.css';
import Navbar from '../Components/Nav/Navbar';
import moment from 'moment';
import dayjs from 'dayjs';

const PatientProfile = () => {
    const dispatch = useDispatch();
    const [isMedicalRecordVisible, setIsMedicalRecordVisible] = useState(false);
    const [isPrescriptionVisible, setIsPrescriptionVisible] = useState(false);
    const [isPatientNoteVisible, setIsPatientNoteVisible] = useState(false);
    const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);
    const [isUpdatePatientVisible, setIsUpdatePatientVisible] = useState(false);

    const [appointmentData, setAppointmentData] = useState({
        dataT: "",
        ora: "",
        ceshtja: "",
        stafiId: "",
    });

    const [updatePatientData, setUpdatePatientData] = useState({
        emriMbiemri: "",
        dataLindjes: "",
        gjinia: "",
        email: "",
    });

    const token1 = useSelector((state) => state.auth.data.token1);
    const patientData = useSelector((state) => state.auth.data.user1);
    const loggedInPatientId = patientData?.patientId;

    const medicalRecords = useSelector((state) => state.data.medicalrecords["$values"] || []);
    const prescriptions = useSelector((state) => state.data.prescriptions["$values"] || []);
    const patientNotes = useSelector((state) => state.data.patientnotes["$values"] || []);
    const loading = useSelector((state) => state.data.loading);
    const error = useSelector((state) => state.data.error);

    console.log('Loggedin patient: ',patientData);
    console.log('Patients id: ',loggedInPatientId);
    const tokenid = token1 && loggedInPatientId;
    console.log('token id', tokenid);
    useEffect(() => {
        if (token1 && loggedInPatientId) {
            dispatch(GetPatient(loggedInPatientId, token1));
            dispatch(GetAllMedicalRecord(token1));
            dispatch(GetAllPrescription(token1));
            dispatch(GetAllPatientNote(token1));
        }
    }, [dispatch, loggedInPatientId, token1]);
    

    const filteredMedicalRecords = medicalRecords.filter(record => record.patientId === loggedInPatientId);
    const filteredPrescriptions = prescriptions.filter(prescription => prescription.patientId === loggedInPatientId);
    const filteredPatientNotes = patientNotes.filter(note => note.patientId === loggedInPatientId);

    const handleShowMedicalRecords = () => setIsMedicalRecordVisible(true);
    const handleShowPrescriptions = () => setIsPrescriptionVisible(true);
    const handleShowPatientNotes = () => setIsPatientNoteVisible(true);

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
        notification.success({
            message: 'Success',
            description: 'Appointment made successfully.',
        });
    };

    const handleUpdatePatientSubmit = async () => {
        const { emriMbiemri, dataLindjes, gjinia, username, email } = updatePatientData;
        const requestBody = {
            emriMbiemri,
            dataLindjes,
            gjinia,
            username,
            email,
        };

        try {
            await dispatch(UpdatePatient(requestBody, loggedInPatientId, token1));
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            notification.error({
                message: 'Update Failed',
                description: 'There was an error updating your profile. Please try again later.',
            });
        }

        setIsUpdatePatientVisible(false);
    };

    const handleAppointmentChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdatePatientChange = (e) => {
        const { name, value } = e.target;
        setUpdatePatientData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date, dateString) => {
        setAppointmentData((prevData) => ({ ...prevData, dataT: dateString }));
    };

    const medicalRecordColumns = [
        { id: 'MR-ID', title: 'Description', dataIndex: 'pershkrimi', key: 'pershkrimi' },
        { id: 'MR-ID', title: 'Symptoms', dataIndex: 'simptomat', key: 'simptomat' },
        { id: 'MR-ID', title: 'Diagnosis', dataIndex: 'diagnoza', key: 'diagnoza' },
        { id: 'MR-ID', title: 'Results', dataIndex: 'rezultati', key: 'rezultati' },
    ];

    const prescriptionColumns = [
        { id: 'P-ID', title: 'Diagnosis', dataIndex: 'diagnoza', key: 'diagnoza' },
        { id: 'P-ID', title: 'Medicine', dataIndex: 'medicina', key: 'medicina' },
    ];

    const patientNoteColumns = [
        { id: 'PN-ID', title: 'Description', dataIndex: 'pershkrimi', key: 'pershkrimi' },
    ];

    return (
        <div>
            <Navbar />
            <div className="patient-profile">
                <h1>Patient Profile</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{typeof error === 'string' ? error : 'An error occurred'}</p>}
                {patientData && (
                    <div className="profile-info">
                        <p><strong>Patient ID:</strong> {patientData.patientId}</p>
                        <p><strong>Name:</strong> {patientData.emriMbiemri}</p>
                        <p><strong>Birthdate:</strong> {patientData.dataLindjes}</p>
                        <p><strong>Gender:</strong> {patientData.gjinia}</p>
                        <p><strong>Username:</strong> {patientData.username}</p>
                        <p><strong>Email:</strong> {patientData.email}</p>

                        <Button onClick={handleShowMedicalRecords} className="add-btn">My Medical Records</Button>
                        <Button onClick={handleShowPrescriptions} className="add-btn">My Prescriptions</Button>
                        <Button onClick={handleShowPatientNotes} className="add-btn">My Patient Notes</Button>
                        <Button onClick={() => setIsAppointmentVisible(true)} className="add-btn">Add Appointment</Button>
                        <Button onClick={() => setIsUpdatePatientVisible(true)} className="add-btn">Update Profile</Button>
                    </div>
                )}

                {/* Appointment Modal */}
                <Modal
                    title="Add Appointment"
                    open={isAppointmentVisible}
                    onCancel={() => setIsAppointmentVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsAppointmentVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleAppointmentSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item label="Date">
                            <DatePicker 
                                format="YYYY-MM-DD" 
                                value={appointmentData.dataT ? dayjs(appointmentData.dataT) : null} 
                                onChange={handleDateChange} 
                            />
                        </Form.Item>
                        <Form.Item label="Time">
                            <Input name="ora" onChange={handleAppointmentChange} />
                        </Form.Item>
                        <Form.Item label="Reason">
                            <Input name="ceshtja" onChange={handleAppointmentChange} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Update Patient Profile Modal */}
                <Modal
                    title="Update Patient Profile"
                    open={isUpdatePatientVisible}
                    onCancel={() => setIsUpdatePatientVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsUpdatePatientVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleUpdatePatientSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item label="Full Name">
                            <Input name="emriMbiemri" value={updatePatientData.emriMbiemri} onChange={handleUpdatePatientChange} />
                        </Form.Item>
                        <Form.Item label="Birthdate">
                            <DatePicker 
                                format="YYYY-MM-DD" 
                                value={updatePatientData.dataLindjes ? dayjs(updatePatientData.dataLindjes) : null} 
                                onChange={(date, dateString) => setUpdatePatientData((prevData) => ({ ...prevData, dataLindjes: dateString }))} 
                            />
                        </Form.Item>
                        <Form.Item label="Gender">
                            <Input name="gjinia" value={updatePatientData.gjinia} onChange={handleUpdatePatientChange} />
                        </Form.Item>
                        <Form.Item label="Username">
                            <Input name="username" value={updatePatientData.username} onChange={handleUpdatePatientChange} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name="email" value={updatePatientData.email} onChange={handleUpdatePatientChange} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Medical Records Table */}
                <Modal
                    title="Medical Records"
                    open={isMedicalRecordVisible}
                    onCancel={() => setIsMedicalRecordVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsMedicalRecordVisible(false)}>
                            Close
                        </Button>,
                    ]}
                >
                    <Table columns={medicalRecordColumns} dataSource={filteredMedicalRecords} rowKey="MR-ID" />
                </Modal>

                {/* Prescriptions Table */}
                <Modal
                    title="Prescriptions"
                    open={isPrescriptionVisible}
                    onCancel={() => setIsPrescriptionVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsPrescriptionVisible(false)}>
                            Close
                        </Button>,
                    ]}
                >
                    <Table columns={prescriptionColumns} dataSource={filteredPrescriptions} rowKey="P-ID" />
                </Modal>

                {/* Patient Notes Table */}
                <Modal
                    title="Patient Notes"
                    open={isPatientNoteVisible}
                    onCancel={() => setIsPatientNoteVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsPatientNoteVisible(false)}>
                            Close
                        </Button>,
                    ]}
                >
                    <Table columns={patientNoteColumns} dataSource={filteredPatientNotes} rowKey="PN-ID" />
                </Modal>
            </div>
        </div>
    );
};

export default PatientProfile;
