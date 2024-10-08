import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MedicalRecordAdd } from '../redux/Datas/action'; // Import your action creator

const MedicalRecordModal = ({ patient, visible, onClose, onAdded }) => { // Accept onAdded as a prop
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const user1 = authState.data?.user1;

    const [description, setDescription] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {
        if (!patient?.patientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const medicalRecordData = {
            pershkrimi: description,
            simptomat: symptoms,
            diagnoza: diagnosis,
            rezultati: result,
            patientId: patient.patientId // Use patientId from the patient prop
        };

        try {
            await dispatch(MedicalRecordAdd(medicalRecordData, user1?.token));
            notification.success({
                message: 'Success',
                description: 'Medical record added successfully.',
            });
            onAdded(); // Call the onAdded callback to refetch data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding medical record:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the medical record.',
            });
        }
    };

    return (
        <Modal
            title="Add Medical Record"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Record
                </Button>
            ]}
        >
            <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <Input
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Symptoms"
                style={{ marginTop: '10px' }}
            />
            <Input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
                style={{ marginTop: '10px' }}
            />
            <Input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Result"
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default MedicalRecordModal;
