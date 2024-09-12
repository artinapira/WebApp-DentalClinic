import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VlersimetAdd } from '../redux/Datas/action'; // Import your action creator
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Rate, notification, Input } from 'antd';


const RatingModal = ({ dentist, visible, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [service, setService] = useState('');
    const [behaviour, setBehaviour] = useState('');

    const handleSubmit = async () => {
        if (!user1?.patientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const ratingData = {
            sherbimi: service,
            sjellja: behaviour,
            dentistId: dentist.dentistId,
            patientId: user1.patientId
        };

        try {
            await dispatch(VlersimetAdd(ratingData, user1.token));
            notification.success({
                message: 'Success',
                description: 'Rating submitted successfully.',
            });
            onClose(); // Close the modal
            navigate('/Dentists'); // Navigate to the Dentists page
        } catch (error) {
            console.error('Error submitting rating:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your rating.',
            });
        }
    };

    return (
        <Modal
            title="Rate the Dentist"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit Rating
                </Button>
            ]}
        >
            <Input.TextArea
                value={service}
                onChange={(e) => setService(e.target.value)}
                rows={4}
                placeholder="Enter your opinion on service here"
            />
            <Input.TextArea
                value={behaviour}
                onChange={(e) => setBehaviour(e.target.value)}
                rows={4}
                placeholder="Enter your opinion on behaviour here"
            />
        </Modal>
    );
};

export default RatingModal;
