import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this to style the toast notifications
import { SendContactUs } from "../redux/Datas/action";
import logo from "../Assets/logoo.png";
import './CSS/ContactUs.css';

const notifySuccess = (text) => toast.success(text, { position: "top-center", autoClose: 3000 });
const notifyError = (text) => toast.error(text, { position: "top-center", autoClose: 3000 });

function ContactUs(){
    const dispatch = useDispatch();
    const { token1 } = useSelector((store) => store.auth.data);
    const patient = useSelector((state) => state.auth.data.user1);
    const loggedInPatientId = patient?.patientId;
    const [form, setForm] = useState({ mesazhi: "" , patientId: loggedInPatientId});
    const [loading, setLoading] = useState(false); // To manage loading state

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        setLoading(true); // Set loading to true when sending message
        dispatch(SendContactUs(form, token1))
            .then((res) => {
                console.log("Response Data:", res.data);
                notifySuccess(res.data.message || "Message sent successfully");
                setForm({ mesazhi: "" 
                    
                }); // Clear the form on success
            })
            .catch((error) => {
                console.error("Error in dispatch:", error);
                notifyError("Failed to send message");
            })
            .finally(() => {
                setLoading(false); // Always stop loading once done
            });
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="section-area account-wraper2">
                <div className="container"> 
                    <div className="row2 justify-content-center">
                        <div className="col-xl-6">
                            <div className="appointment-form2 form-wraper"> 
                                <div className="logo">
                                    <img src={logo} alt="img" />
                                </div>
                                <form>
                                    <div className="form-group2">
                                        <h6>Send us a message</h6>
                                        <br></br>
                                        <input
                                            name="mesazhi"
                                            value={form.mesazhi}
                                            type="text"
                                            className="form-control2"
                                            placeholder="Your Message"
                                            onChange={onChange}
                                            disabled={loading} // Disable input while loading
                                        ></input>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn mb-30 btn-lg btn-primary w-100"
                                        onClick={handleClick}
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? "Sending..." : "Send"} {/* Show loading text when sending */}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;
