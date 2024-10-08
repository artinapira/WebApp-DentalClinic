import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllMedicalRecord,
  GetAllPrescription,
  GetAllPatientNote,
} from "../redux/Datas/action";
import MedicalRecordModal from "./AddMedicalRecord";
import PrescriptionModal from "./AddPrescription";
import PatientNoteModal from "./AddPatientNote";
import "./CSS/PatientModal.css";

const PatientModal = ({ patient, onClose }) => {
  const dispatch = useDispatch();
  const token1 = useSelector((state) => state.auth.data.token1);
  const [isMedicalRecordVisible, setIsMedicalRecordVisible] = useState(false);
  const [isPrescriptionVisible, setIsPrescriptionVisible] = useState(false);
  const [isPatientNoteVisible, setIsPatientNoteVisible] = useState(false);

  const medicalrecords = useSelector(
    (state) => state.data.medicalrecords["$values"] || []
  );
  const prescriptions = useSelector(
    (state) => state.data.prescriptions["$values"] || []
  );
  const patientnotes = useSelector(
    (state) => state.data.patientnotes["$values"] || []
  );
  const error = useSelector((state) => state.data.error);

  const refetchData = () => {
    dispatch(GetAllMedicalRecord(token1));
    dispatch(GetAllPrescription(token1));
    dispatch(GetAllPatientNote(token1));
  };

  useEffect(() => {
    if (patient) {
      refetchData();
    }
  }, [dispatch, patient, token1]);

  const filteredMedicalRecords = medicalrecords.filter(
    (record) => record.patientId === patient.patientId
  );
  const filteredPrescriptions = prescriptions.filter(
    (prescription) => prescription.patientId === patient.patientId
  );
  const filteredPatientNotes = patientnotes.filter(
    (note) => note.patientId === patient.patientId
  );

  if (!patient) {
    return <p>No patient data available.</p>;
  }
  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div className="patient-modal-window">
      <div className="patient-modal-header">
        <h2>Patient: {patient.emriMbiemri}</h2>
        <Button onClick={onClose} className="close-btn">
          Close
        </Button>
      </div>

      <div className="patient-modal-body">
        <div className="patient-details">
          <p><strong>Patient ID:</strong> {patient.patientId}</p>
          <p><strong>Name:</strong> {patient.emriMbiemri}</p>
          <p><strong>Birth Date:</strong> {patient.dataLindjes}</p>
          <p><strong>Gender:</strong> {patient.gjinia}</p>
          <p><strong>Email:</strong> {patient.email}</p>
        </div>

        <div className="data-sections">
          <div className="data-section">
            <h3>Medical Records</h3>
            <ul>
              {filteredMedicalRecords.length > 0 ? (
                filteredMedicalRecords.map((record) => (
                  <div key={record.id}>
                    <p><strong>Record ID:</strong> {record.medicalRecordId}</p>
                    <p><strong>Description:</strong> {record.pershkrimi}</p>
                    <p><strong>Symptoms:</strong> {record.simptomat}</p>
                    <p><strong>Diagnosis:</strong> {record.diagnoza}</p>
                    <p><strong>Results:</strong> {record.rezultati}</p>
                  </div>
                ))
              ) : (
                <p>No medical records available for this patient.</p>
              )}
            </ul>
            <Button
              onClick={() => setIsMedicalRecordVisible(true)}
              className="add-btn"
            >
              Add Medical Record
            </Button>
          </div>

          <div className="data-section">
            <h3>Prescriptions</h3>
            <ul>
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <div key={prescription.prescriptionId}>
                    <p><strong>Prescription ID:</strong> {prescription.prescriptionId}</p>
                    <p><strong>Diagnosis:</strong> {prescription.diagnoza}</p>
                    <p><strong>Medicine:</strong> {prescription.medicina}</p>
                  </div>
                ))
              ) : (
                <p>No prescriptions available for this patient.</p>
              )}
            </ul>
            <Button
              onClick={() => setIsPrescriptionVisible(true)}
              className="add-btn"
            >
              Add Prescription
            </Button>
          </div>

          <div className="data-section">
            <h3>Patient Notes</h3>
            <ul>
              {filteredPatientNotes.length > 0 ? (
                filteredPatientNotes.map((note) => (
                  <div key={note.patientnoteId}>
                    <p><strong>Note ID:</strong> {note.patientNoteId}</p>
                    <p><strong>Note:</strong> {note.pershkrimi}</p>
                  </div>
                ))
              ) : (
                <p>No patient notes available for this patient.</p>
              )}
            </ul>
            <Button
              onClick={() => setIsPatientNoteVisible(true)}
              className="add-btn"
            >
              Add Note
            </Button>
          </div>
        </div>
      </div>

      {/* Modals for adding new data */}
      <MedicalRecordModal
        patient={patient}
        visible={isMedicalRecordVisible}
        onClose={() => setIsMedicalRecordVisible(false)}
        onAdded={refetchData} // Pass the refetch function
      />
      <PrescriptionModal
        patient={patient}
        visible={isPrescriptionVisible}
        onClose={() => setIsPrescriptionVisible(false)}
        onAdded={refetchData} // Pass the refetch function
      />
      <PatientNoteModal
        patient={patient}
        visible={isPatientNoteVisible}
        onClose={() => setIsPatientNoteVisible(false)}
        onAdded={refetchData} // Pass the refetch function
      />
    </div>
  );
};

export default PatientModal;
