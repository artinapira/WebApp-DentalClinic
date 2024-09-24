import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PrescriptionAdd } from '../redux/Datas/action'; // Import your action creator

const PrescriptionModal = ({ patient, visible, onClose, onAdded }) => {
    const dispatch = useDispatch();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [diagnosis, setDiagnosis] = useState('');
    const [medicine, setMedicine] = useState('');

    const handleSubmit = async () => {
        const validPatientId = patient?.patientId || user1?.patientId;

        if (!validPatientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const prescriptionData = {
            diagnoza: diagnosis,
            medicina: medicine,
            patientId: validPatientId // Use patientId from the patient prop or user1
        };

        try {
            await dispatch(PrescriptionAdd(prescriptionData, user1?.token));
            notification.success({
                message: 'Success',
                description: 'Prescription added successfully.',
            });
            onAdded(); // Call the onAdded callback to refetch data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding prescription:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the prescription.',
            });
        }
    };

    return (
        <Modal
            title="Add Prescription"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Prescription
                </Button>
            ]}
        >
            <Input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
            />
            <Input
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                placeholder="Medicine"
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default PrescriptionModal;
