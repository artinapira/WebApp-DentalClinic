import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store"; // Typed dispatch and selector hooks
import Navbar from '../Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import { SendContactUs } from "../redux/Datas/action";
import logo from "../Assets/logoo.png";
import { Link } from "react-router-dom";
import './CSS/ContactUs.css';

// Notification function typed
const notify = (text: string) => toast(text);

// Typing the form data
interface FormState {
  mesazhi: string;
}

const ContactUs: React.FC = () => {
  const dispatch = useAppDispatch(); // Typed dispatch
  const [form, setForm] = useState<FormState>({ mesazhi: "" }); // Type the form state
  const token1 = useAppSelector((state) => state.auth.data.token1); // Type-safe selector

  // Handle input change with proper typing
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle button click with proper typing
  const handleClick = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (token1) {
      try {
        const response = await dispatch(SendContactUs(form, token1));
        if (response) {
          notify(response.data.message);
        }
      } catch (error) {
        notify("An error occurred.");
      }
    } else {
      notify("User is not authenticated.");
    }
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
                  <img src={logo} alt="logo" />
                </div>
                <form action="#">
                  <div className="form-group2">
                    <h6>Send a message to inform us about your inputs</h6>
                    <br />
                    <input
                      name="mesazhi"
                      value={form.mesazhi}
                      type="text"
                      className="form-control2"
                      placeholder="Your Message"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group" onClick={handleClick}>
                    <Link
                      to="#"
                      className="btn mb-30 btn-lg btn-primary w-100"
                    >
                      Send
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
