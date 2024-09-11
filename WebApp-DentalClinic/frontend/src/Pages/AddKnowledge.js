import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { KnowledgeRegister } from '../redux/Datas/action';

const AddKnowledgeModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        try {
            const data = { pershkrimi: description };
            await dispatch(KnowledgeRegister(data));
            message.success('Knowledge added successfully');
            onClose();
        } catch (error) {
            message.error('Failed to add knowledge');
        }
    };

    return (
        <Modal
            title="Add Knowledge"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Knowledge
                </Button>,
            ]}
        >
            <Input.TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter knowledge description"
            />
        </Modal>
    );
};

export default AddKnowledgeModal;
