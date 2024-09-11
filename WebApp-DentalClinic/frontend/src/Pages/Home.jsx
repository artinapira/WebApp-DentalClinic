import React from 'react';
import foto1 from '../Assets/doctor.png';
import './CSS/Home.css';
import Navbar from '../Components/Nav/Navbar';
import About from './About';
import Footer from '../Components/Footer/Footer';
import Services2 from './Services2';
import Service from './Service';
import { useEffect, useState } from "react";
import { Container} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { GetPatientProfile,GetAdminProfile,GetDentistProfile } from '../redux/auth/action';



const Home = () => {
    const dispatch = useDispatch();
    const { token1, user1, dentist, admin } = useSelector((store) => store.auth.data);
    useEffect(() => {
        if (token1) {
            // Dispatch GetPatientProfile
            dispatch(GetPatientProfile(token1))
                .then(res => {
                    console.log('Patient Profile API response:', res);
                })
                .catch(err => {
                    console.error('Patient Profile API call error:', err);
                });

            // Dispatch GetDentistProfile
            dispatch(GetDentistProfile(token1))
                .then(res => {
                    console.log('Dentist Profile API response:', res);
                })
                .catch(err => {
                    console.error('Dentist Profile API call error:', err);
                });

            // Dispatch GetAdminProfile
            dispatch(GetAdminProfile(token1))
                .then(res => {
                    console.log('Admin Profile API response:', res);
                })
                .catch(err => {
                    console.error('Admin Profile API call error:', err);
                });
        }
}, [dispatch, token1]); // Added `token1` to the dependency array

console.log('Token from home:', token1);
console.log('Data from home page:', user1);
console.log('Data of dentist home',dentist);
console.log('Data of admin home',admin);
    return (
        
        <><Navbar /><header>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 col-lg-6'>
                        <h5>Adding Care to your Life.</h5>
                        <h2>Protecting and Taking Care To Of Your Teeth</h2>
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