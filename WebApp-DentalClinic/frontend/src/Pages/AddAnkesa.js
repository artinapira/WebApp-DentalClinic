import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AnkesatAdd } from '../redux/Datas/action'; // Import your action creator
import { useNavigate } from 'react-router-dom';

const ComplaintModal = ({ dentist, visible, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [complaint, setComplaint] = useState('');

    const handleSubmit = async () => {
        if (!user1?.patientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const complaintData = {
            ankesa: complaint,
            dentistId: dentist.dentistId,
            patientId: user1.patientId
        };

        try {
            await dispatch(AnkesatAdd(complaintData, user1.token));
            notification.success({
                message: 'Success',
                description: 'Complaint submitted successfully.',
            });
            onClose(); // Close the modal
            navigate('/Dentists'); // Navigate to the Dentists page
        } catch (error) {
            console.error('Error submitting complaint:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your complaint.',
            });
        }
    };

    return (
        <Modal
            title="Make a Complaint"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit Complaint
                </Button>
            ]}
        >
            <Input.TextArea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={4}
                placeholder="Enter your complaint here"
            />
        </Modal>
    );
};

export default ComplaintModal;
