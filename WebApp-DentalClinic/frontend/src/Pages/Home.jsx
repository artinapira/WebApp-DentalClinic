import React from 'react';
import foto1 from '../Assets/doctor.png';
import './CSS/Home.css';
import Navbar from '../Components/Nav/Navbar';
import About from './About';
import Footer from '../Components/Footer/Footer';
import Services2 from './Service2';
import Service from './Service';
import { useEffect, useState } from "react";
import { Container} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { GetPatientProfile,GetAdminProfile,GetDoctorProfile,GetNurseProfile } from '../redux/auth/action';



const Home = () => {
    const {token1} = useSelector((store) => store.auth.data);
const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetPatientProfile(token1)).then(res => console.log(res));
    },[])

    return (
        
        <><Navbar /><header>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 col-lg-6'>
                        <h5>Adding Care to your Life.</h5>
                        <h2>Protecting and Taking Care To Of Your Health</h2>
                        <button><a href='#'>Read More</a></button>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className="header-box">
                            <img src={foto1} />


                        </div>
                    </div>
                </div>
            </div>

        </header>
            <About></About>
            <Service></Service>
            <Services2></Services2>
            <Footer></Footer>

        </>
       

    )

};




export default Home;