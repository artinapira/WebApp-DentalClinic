import React from "react";
import './CSS/Knowledge.css';
import Navbar from '../Components/Nav/Navbar';
import  knowledgeImg from '../Assets/knowledge.png';
import Footer from '../Components/Footer/Footer';



const Knowledge = () => {
    return (
      <>
      <Navbar />
    <section className="knowledge-section">
        <img src={knowledgeImg} alt="img" className="img" />
    <div className="knowledge-container">
        <h3>Knowledge</h3>
        </div>
        <div className="text-box-container">
        <div className="text-box">
          <p>
          <span className="title">Welcome To Our Dental Clinic Knowledge</span>

        We have been heavily involved in the dental community for over 5 years. We 
        have attended countless CE courses related to dental implants, oral surgery, 
        and complex dental cases.That's why we've created this section
        to provide you with essential knowledge on maintaining excellent oral health.
        <span className="title">Why Is Dental Care Important?</span>
        Good oral hygiene is crucial not only for your smile but also for your
        overall health.Neglecting dental care can lead to problems such as cavities, 
        gum disease, and even more serious issues like heart disease.
        Regular dental visits can prevent these issues, allowing you to enjoy a lifetime
        of healthy teeth.
        <span className="title">Tips:</span>
        1.Brush Twice a Day: Use fluoride toothpaste and brush for two minutes.
        2.Healthy Diet: Avoid sugary snacks and drinks that can contribute to tooth decay.
        3.Visit Your Dentist Regularly: Professional cleanings and check-ups are key to preventing 
        dental problems before they start.
        <span className="title">Advanced Technology:</span>
        We use cutting-edge technology such as digital X-rays, 3D imaging, and laser dentistry to
        make your visit as comfortable and effective as possible. Our goal is to provide pain-free
        treatments and help you achieve the best possible dental outcomes.

  
          </p>
        </div>
        </div>
    </section>
    <Footer></Footer>
    </>
    );
    }

    export default Knowledge;