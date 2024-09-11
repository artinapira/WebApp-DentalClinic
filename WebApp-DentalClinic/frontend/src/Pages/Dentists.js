import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Nav/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllDentists } from '../redux/Datas/action';
import DentistModal from './DentistModal';
import { Table } from 'antd';
import './CSS/dentists.css';

function Dentists() {
    const dispatch = useDispatch();
    
    const token1 = useSelector(state => state.auth.data.token1);
    const dentistData = useSelector(state => state.data.dentists);
    const loading = useSelector(state => state.data.loading);
    const error = useSelector(state => state.data.error);

    const [selectedDentist, setSelectedDentist] = useState(null);

    useEffect(() => {
        if (token1) {
            dispatch(GetAllDentists(token1));
        }
    }, [dispatch, token1]);

    const dentists = dentistData?.data?.$values || [];

    const handleCheck = (dentist) => {
        setSelectedDentist(dentist);
    };

    const columns = [
        { title: "Dentist ID", dataIndex: "dentistId", key: "dentistId" },
        { title: "Name", dataIndex: "emriMbiemri", key: "emriMbiemri" },
        { title: "Degree", dataIndex: "degree", key: "degree" },
        { title: "Schedule", dataIndex: "orari", key: "orari" },
        { title: "Salary", dataIndex: "paga", key: "paga" },
        { title: "Department ID", dataIndex: "departmentId", key: "departmentId" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <button onClick={() => handleCheck(record)}>Check</button>
            ),
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="background">
                <h1>Dentists</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{typeof error === 'string' ? error : 'An error occurred'}</p>}
                <div className="table-container">
                    <Table columns={columns} dataSource={dentists} rowKey="dentistId" />
                </div>

                {selectedDentist && (
                    <DentistModal dentist={selectedDentist} onClose={() => setSelectedDentist(null)} />
                )}
            </div>
        </div>
    );
}

export default Dentists;
