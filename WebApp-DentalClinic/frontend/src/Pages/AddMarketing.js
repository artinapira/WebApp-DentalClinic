import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { MarketingRegister } from '../redux/Datas/action';

const AddMarketingModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = async () => {
        try {
            const data = { img, pershkrimi: description };
            await dispatch(MarketingRegister(data));
            message.success('Marketing added successfully');
            onClose();
        } catch (error) {
            message.error('Failed to add marketing');
        }
    };

    return (
        <Modal
            title="Add Marketing"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Marketing
                </Button>,
            ]}
        >
            <Input
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Enter image URL"
                style={{ marginBottom: 16 }}
            />
            <Input.TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter marketing description"
            />
        </Modal>
    );
};

export default AddMarketingModal;
