import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Nav/Navbar';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { GetAllDentists } from '../redux/Datas/action';
import DentistModal from './DentistModal';
import { RootState } from '../redux/store';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import './CSS/dentists.css';

interface Dentist {
    dentistId: number;
    emriMbiemri: string;
    degree: string;
    orari: string;
    paga: number;
    departmentId: number;
}

const Dentists: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dentists, loading, error } = useAppSelector((state: RootState) => state.data);
    const token1 = useAppSelector((store: RootState) => store.auth.data.token1);
    const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);

    useEffect(() => {
        if (token1) {
            dispatch(GetAllDentists(token1));
        }
    }, [dispatch, token1]);

    const handleCheck = (dentist: Dentist) => {
        setSelectedDentist(dentist);
    };

    const columns: ColumnsType<Dentist> = [
        { title: "Dentist ID", dataIndex: "dentistId", key: "dentistId" },
        { title: "Name", dataIndex: "emriMbiemri", key: "emriMbiemri" },
        { title: "Degree", dataIndex: "degree", key: "degree" },
        { title: "Schedule", dataIndex: "orari", key: "orari" },
        { title: "Salary", dataIndex: "paga", key: "paga" },
        { title: "Department ID", dataIndex: "departmentId", key: "departmentId" },
        {
            title: "Actions",
            key: "actions",
            render: (text: string, record: Dentist) => (
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
};

export default Dentists;
