import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ComplaintModal from './AddAnkesa'; // Import the updated complaint modal
import RatingModal from './AddVlersimi'; // Import the updated rating modal

const DentistModal = ({ dentist, onClose }) => {
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);
    const [isRatingVisible, setIsRatingVisible] = useState(false);

    const openComplaintModal = () => {
        setIsComplaintVisible(true);
    };

    const openRatingModal = () => {
        setIsRatingVisible(true);
    };

    const handleComplaintClose = () => {
        setIsComplaintVisible(false);
        onClose(); // Close the DentistModal after closing ComplaintModal
    };

    const handleRatingClose = () => {
        setIsRatingVisible(false);
        onClose(); // Close the DentistModal after closing RatingModal
    };

    return (
        <>
            <Modal
                title={`Dentist: ${dentist?.emriMbiemri}`}
                open={!!dentist}
                onCancel={onClose}
                footer={null} // Remove default footer to customize
                centered
                className="dentist-modal" // Custom class for additional styling
            >
                <div className="modal-content">
                    <p><strong>ID:</strong> {dentist?.dentistId}</p>
                    <p><strong>Name:</strong> {dentist?.emriMbiemri}</p>
                    <p><strong>Degree:</strong> {dentist?.degree}</p>
                    <p><strong>Schedule:</strong> {dentist?.orari}</p>
                    <p><strong>Salary:</strong> {dentist?.paga}</p>
                    <p><strong>Department ID:</strong> {dentist?.departmentId}</p>
                </div>
                
                <div className="modal-footer">
                    <Button key="complaint" type="primary" onClick={openComplaintModal}>
                        Make Complaint
                    </Button>
                    <Button key="rate" type="default" onClick={openRatingModal}>
                        Rate Dentist
                    </Button>
                </div>
            </Modal>

            {/* Complaint Modal */}
            <ComplaintModal
                dentist={dentist}
                visible={isComplaintVisible}
                onClose={handleComplaintClose}
            />

            {/* Rating Modal */}
            <RatingModal
                dentist={dentist}
                visible={isRatingVisible}
                onClose={handleRatingClose}
            />
        </>
    );
};

export default DentistModal;
