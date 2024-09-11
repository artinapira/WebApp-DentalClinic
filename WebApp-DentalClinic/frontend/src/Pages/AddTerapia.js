import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TerapiaAdd } from '../redux/Datas/action'; // Import your action creator
import { useNavigate } from 'react-router-dom';

const TerapiaModal = ({ patient, visible, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        const validPatientId = patient?.patientId || user1?.patientId;

        if (!validPatientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const terapiaData = {
            emri: name,
            pershkrimi: description,
            patientId: validPatientId // Use patientId from the patient prop or user1
        };

        try {
            await dispatch(TerapiaAdd(terapiaData, user1?.token));
            notification.success({
                message: 'Success',
                description: 'Terapia added successfully.',
            });
            onClose(); // Close the modal
            navigate('/Patients'); // Navigate to the Patients page
        } catch (error) {
            console.error('Error adding terapia:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the terapia.',
            });
        }
    };

    return (
        <Modal
            title="Add Terapia"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Terapia
                </Button>
            ]}
        >
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default TerapiaModal;
