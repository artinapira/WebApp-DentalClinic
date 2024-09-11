import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Nav/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPatients } from '../redux/Datas/action';
import PatientModal from './PatientModal';
import './CSS/Patients.css';

function Patients() {
    const dispatch = useDispatch();
    const token1 = useSelector((state) => state.auth.data.token1);
    const patientData = useSelector((state) => state.data.patients);
    const loading = useSelector((state) => state.data.loading);
    const error = useSelector((state) => state.data.error);
    const [selectedPatient, setSelectedPatient] = useState(null);
    console.log('Token in patients', token1);

    useEffect(() => {
        if (token1) {
            dispatch(GetAllPatients(token1));
        }
    }, [dispatch, token1]);

    // Ensure patientData is an array
    const patients = Array.isArray(patientData) ? patientData : [];

    const handleCheck = (patient) => {
        try {
            console.log("Selected patient:", patient);
            setSelectedPatient(patient);
        } catch (error) {
            console.error("Error handling patient check:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="background">
                <h1>Patients</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{typeof error === 'string' ? error : 'An error occurred'}</p>}
                <div className="patient-list">
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <div key={patient.patientId} className="patient-card">
                                <h2>{patient.emriMbiemri}</h2>
                                <p><strong>Patient ID:</strong> {patient.patientId}</p>
                                <p><strong>Birth Date:</strong> {patient.dataLindjes}</p>
                                <p><strong>Gender:</strong> {patient.gjinia}</p>
                                <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                                <button onClick={() => handleCheck(patient)}>Check</button>
                            </div>
                        ))
                    ) : (
                        <p>No patients available.</p>
                    )}
                </div>
                {selectedPatient && (
                    <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
                )}
            </div>
        </div>
    );
}

export default Patients;
