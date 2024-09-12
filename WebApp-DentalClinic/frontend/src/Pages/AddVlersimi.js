import React, { useState } from 'react';
import { Modal, Button, Rate, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { VlersimetAdd } from '../redux/Datas/action'; // Import your action creator
import { useNavigate } from 'react-router-dom';

const RatingModal = ({ dentist, visible, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: { user1 } } = useSelector((state) => state.auth);
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        if (!user1?.patientId) {
            notification.error({
                message: 'Error',
                description: 'Patient ID is missing.',
            });
            return;
        }

        const ratingData = {
            vlersimi: rating,
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
            <Rate
                value={rating}
                onChange={(value) => setRating(value)}
                style={{ fontSize: '24px' }}
            />
        </Modal>
    );
};

export default RatingModal;