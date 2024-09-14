import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { GiOverdose } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import { BsFillCalendarDateFill, BsPersonCircle } from "react-icons/bs";
import { FaDiagnoses, FaPills, FaUserNurse, FaRegHospital } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal, Select } from "antd";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { GetAdmin, UpdateAdmin } from "../../../../redux/auth/action";
import Sidebar from "../AllPages/GlobalFiles/Sidebar";
import "./Admin/CSS/Dentist_Profile.css";

const { Option } = Select;

//import "../../Main-Dashboard/AllPages/Admin/CSS/CommonCSS.css";

// *********************************************************
const EditAdmin = () => {
    // const { data } = useSelector((store) => store.auth);
    const { admins } = useSelector((store) => store.data);

    const dispatch = useDispatch();
    const { id } = useParams();
    const dat = admins.filter(a => a.adminId == id);
    const data = dat[0]
    const { token1 } = useSelector((store) => store.auth.data);
    useEffect(() => {

        dispatch(GetAdmin(id, token1));

    }, []);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const success = (text) => {
        messageApi.success(text);
    };

    const handleCancel = () => {
        setOpen(false);

    }


    const [formData, setFormData] = useState({
        emriMbiemri: data.emriMbiemri,
        username: data.username,
        email: data.email,
        password: data.password,
    });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = () => {

        dispatch(UpdateAdmin(formData, data.adminId, token1));
        success(" updated");
        handleOk();
    };



    return (
        <>
            {contextHolder}
            <div className="container1">
                <Sidebar />
                <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
                    <div className="maindoctorProfile">
                        <div className="firstBox">

                            <div className="singleitemdiv">
                                <AiOutlineUser className="singledivicons" />
                                <p>{formData.emriMbiemri}</p>
                            </div>
                            <div className="singleitemdiv">
                                <BsPersonCircle className="singledivicons" />
                                <p>{formData.username}</p>
                            </div>
                            <div className="singleitemdiv">
                                <MdEmail className="singledivicons" />
                                <p>{formData.email}</p>
                            </div>
                            <div className="singleitemdiv">
                                <button onClick={showModal}>
                                    {" "}
                                    <AiFillEdit />
                                    Edit profile
                                </button>
                            </div>

                            <Modal
                                title="Edit details"
                                open={open}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="submit" onClick={handleFormSubmit}>
                                        Edit
                                    </Button>,
                                ]}
                            >
                                <form className="inputForm">
                                    <input
                                        name="emriMbiemri"
                                        value={formData.emriMbiemri}
                                        onChange={handleFormChange}
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleFormChange}
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        type="text"
                                        placeholder="Email"
                                    />
                                </form>
                            </Modal>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );

};

export default EditAdmin;