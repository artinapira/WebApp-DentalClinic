import React from "react";
import "./CSS/Marketing.css";
import Navbar from "../Components/Nav/Navbar";
import Footer from "../Components/Footer/Footer";
import Img1 from "../Assets/image1.png";
import Img2 from "../Assets/image2.png";
import Img3 from "../Assets/image3.png";
import Img4 from "../Assets/image4.png";
import Img5 from "../Assets/image6.png";
import Img7 from "../Assets/image7.png";
import Img8 from "../Assets/image8.png";
import Img9 from "../Assets/image9.png";
import { useDispatch, useSelector } from "react-redux";

const Marketing = () => {
  const dispatch = useDispatch();
  const { token1, user1, dentist, admin } = useSelector(
    (store) => store.auth.data
  );
  return (
    <>
      <Navbar />
      <div className="first-box">
        <section className="marketing-section">
          <div className="marketing-container">
            <h3>Marketing</h3>
          </div>
          <div className="text-box-container">
            <div className="text-box">
              <p>
                <span className="title">
                  Wondering Who To Trust With Your{" "}
                  <span className="dental-care">Dental Care?</span>
                </span>
                Welcome to our clinic,where we prioritize your smile's health
                and beauty. Our experienced team offers comprehensive dental
                solutions tailored to your needs,from routine check-ups to
                advance treatments.
              </p>
            </div>
          </div>
        </section>
        <div className="image-container">
          <img src={Img1} alt="img-1" className="img-1" />
          <img src={Img2} alt="img-2" className="img-2" />
        </div>
        <div className="icon-container">
          <img src={Img3} alt="Icon" className="img-3" />
          <div className="overlay-text">
            <h4>3420 </h4>
            <p>Happy Patients</p>
          </div>
        </div>
        <div className="icon-container1">
          <img src={Img4} alt="Icon" className="img-4" />
          <div className="overlay-text">
            <h4>Easy Online </h4>
            <p>Appointment</p>
            <h2>Why Us</h2>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="main-container1">
          <img src={Img5} alt="img-5" className="img-5" />
          <p>Membership Plan</p>
        </div>
        <div className="main-container2">
          <img src={Img7} alt="img-6" className="img-6" />
          <p>Advanced Technology</p>
        </div>
        <div className="main-container3">
          <img src={Img8} alt="img-7" className="img-7" />
          <p>International Awards</p>
        </div>
        <div className="main-container4">
          <img src={Img9} alt="img-8" className="img-8" />
          <p>Professional Dentist</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Marketing;
