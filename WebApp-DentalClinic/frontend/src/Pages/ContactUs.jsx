import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import { SendContactUs } from "../redux/Datas/action";
import logo from "../Assets/logoo.png";
import { Link, useNavigate } from "react-router-dom";
import { GetPatientProfile } from "../redux/auth/action";
import './CSS/contactus.css'
const notify = (text) => toast(text);

function ContactUs(){
    const dispatch = useDispatch();
    const [form,setForm] = useState({mesazhi:""});
    const {token1} = useSelector((store)=>store.auth.data);
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleClick = (e) => {
        try {
  
            dispatch(SendContactUs(form,token1)).then((res)=>{

                notify(res.data.message);
            })

        }
        catch(error){
            ;
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
                  <img src={logo} alt="img" />
                </div>
                <form action="#">
                  <div className="form-group2">
                    <h6>Send message to inform us about your inputs</h6>
                    <br></br>
                    
                    <input
                      name="mesazhi"
                      value={form.mesazhi}
                      type="text"
                      className="form-control2"
                      placeholder="Your Message"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="form-group" onClick={handleClick}>
                    <Link
                      type="botton"
                      className="btn mb-30 btn-lg btn-primary w-100"
                    >  Send
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
    )

}
export default ContactUs;