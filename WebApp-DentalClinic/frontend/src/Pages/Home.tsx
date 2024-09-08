import React, { useEffect } from 'react';
import foto1 from '../Assets/doctor.png';
import './CSS/Home.css';
import Navbar from '../Components/Nav/Navbar';
import About from './About';
import Footer from '../Components/Footer/Footer';
import Services2 from './Service2';
import  Service  from './Service';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Ensure you have a RootState type defined
import { GetPatientProfile } from '../redux/auth/action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Define types for your component
const Home: React.FC = () => {
    // Selector
    const token1 = useSelector((store: RootState) => store.auth.data.token1);

    // Typed dispatch
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

    useEffect(() => {
        if (token1) {
            dispatch(GetPatientProfile(token1))
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Error fetching patient profile:', error);
                });
        }
    }, [dispatch, token1]);

    return (
        <>
            <Navbar />
            <header>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 col-lg-6'>
                            <h5>Adding Care to your Life.</h5>
                            <h2>Protecting and Taking Care Of Your Teath</h2>
                            <button><a href='#'>Read More</a></button>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="header-box">
                                <img src={foto1} alt="Doctor" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <About />
            <Service/>
            <Services2 />

            <Footer />
        </>
    );
};

export default Home;
