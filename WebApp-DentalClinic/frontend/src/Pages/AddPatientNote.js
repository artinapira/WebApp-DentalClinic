import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PatientNoteAdd } from '../redux/Datas/action'; // Import your action creator
import { useNavigate } from 'react-router-dom';

const PatientNoteModal = ({ patient, visible, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [note, setNote] = useState('');

    const handleSubmit = async () => {
        const validPatientId = patient?.patientId || user1?.patientId;

        if (!validPatientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const noteData = {
            pershkrimi: note,
            patientId: validPatientId // Use patientId from the patient prop or user1
        };

        try {
            await dispatch(PatientNoteAdd(noteData, user1?.token));
            notification.success({
                message: 'Success',
                description: 'Patient note added successfully.',
            });
            onClose(); // Close the modal
            navigate('/Patients'); // Navigate to the Patients page
        } catch (error) {
            console.error('Error adding patient note:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the patient note.',
            });
        }
    };

    return (
        <Modal
            title="Add Patient Note"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Note
                </Button>
            ]}
        >
            <Input.TextArea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Enter the note here"
            />
        </Modal>
    );
};

export default PatientNoteModal;
