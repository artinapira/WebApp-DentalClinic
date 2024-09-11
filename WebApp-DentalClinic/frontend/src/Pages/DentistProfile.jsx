import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input } from 'antd';
import { GetDentist, UpdateDentist, KnowledgeRegister, MarketingRegister } from '../redux/auth/action';
import './CSS/DentistProfile.css';
import Navbar from '../Components/Nav/Navbar';

const DentistProfile = () => {
    const dispatch = useDispatch();
    const [dentist, setDentist] = useState(null);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isKnowledgeVisible, setIsKnowledgeVisible] = useState(false);
    const [isMarketingVisible, setIsMarketingVisible] = useState(false);
    const [form] = Form.useForm();
    // Get dentist object and token from Redux state
    const token1 = useSelector((state) => state.auth?.data?.token1);
    console.log('Token dentistprofile:', token1);
    const dentistData = useSelector((state) => state.auth?.data?.dentist);

    // Extract dentistId from the dentist object
    const loggedInDentistId = dentistData?.dentistId;
    console.log('Dentist: ', dentistData);
    console.log('DentistID from DentistProfile: ', loggedInDentistId);

    const loading = useSelector((state) => state.data.loading);
    const error = useSelector((state) => state.data.error);

    const state = useSelector((state) => state);
console.log('Complete Redux State:', state);

useEffect(() => {
    console.log('DentistData Updated:', dentistData);
}, [dentistData]);

 useEffect(() => {
    console.log('Fetching dentist profile for ID:', loggedInDentistId);
    if (loggedInDentistId && token1) {
        dispatch(GetDentist(loggedInDentistId, token1));
    }
}, [dispatch, loggedInDentistId, token1]);

useEffect(() => {
    console.log('DentistData Updated:', dentistData);
    if (dentistData) {
        setDentist(dentistData);
    }
}, [dentistData]);


    const handleEdit = () => {
        setIsEditVisible(true);
        form.setFieldsValue(dentist);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            dispatch(UpdateDentist({ ...dentist, ...values }, token1));
            setIsEditVisible(false);
        });
    };

    const handleAddKnowledge = () => {
        setIsKnowledgeVisible(true);
    };

    const handleAddMarketing = () => {
        setIsMarketingVisible(true);
    };

    return (
        <div>
            <Navbar />
            <div className="dentist-profile">
                <h1>Dentist Profile</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{typeof error === 'string' ? error : 'An error occurred'}</p>}
                {dentist && (
                    <div className="profile-info">
                        <p><strong>Dentist ID:</strong> {dentist.dentistId}</p>
                        <p><strong>Name:</strong> {dentist.emriMbiemri}</p>
                        <p><strong>Degree:</strong> {dentist.degree}</p>
                        <p><strong>Schedule:</strong> {dentist.orari}</p>
                        <p><strong>Salary:</strong> {dentist.paga}</p>
                        <p><strong>Department ID:</strong> {dentist.departmentId}</p>
                        <Button onClick={handleEdit} className="edit-btn">Edit</Button>
                        <Button onClick={handleAddKnowledge} className="add-btn">Add Knowledge</Button>
                        <Button onClick={handleAddMarketing} className="add-btn">Add Marketing</Button>
                    </div>
                )}

                {/* Modals */}
                {/* Edit Dentist Modal */}
                <Modal
                    title="Edit Dentist"
                    open={isEditVisible} 
                    onOk={handleSave}
                    onCancel={() => setIsEditVisible(false)}
                >
                    <Form form={form} layout="vertical">
                        {/* Form Items */}
                    </Form>
                </Modal>

                {/* Add Knowledge Modal */}
                <Modal
                    title="Add Knowledge"
                    open={isKnowledgeVisible} 
                    onOk={() => {
                        dispatch(KnowledgeRegister(form.getFieldsValue(), token1));
                        setIsKnowledgeVisible(false);
                    }}
                    onCancel={() => setIsKnowledgeVisible(false)}
                >
                    <Form layout="vertical">
                        {/* Form Items */}
                    </Form>
                </Modal>

                {/* Add Marketing Modal */}
                <Modal
                    title="Add Marketing"
                    open={isMarketingVisible} 
                    onOk={() => {
                        dispatch(MarketingRegister(form.getFieldsValue(), token1));
                        setIsMarketingVisible(false);
                    }}
                    onCancel={() => setIsMarketingVisible(false)}
                >
                    <Form layout="vertical">
                        {/* Form Items */}
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default DentistProfile;
