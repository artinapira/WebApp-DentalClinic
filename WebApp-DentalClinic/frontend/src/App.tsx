import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import Service from './Pages/Service';
import Dentists from './Pages/Dentists';
import Login from './Pages/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>

            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/Contactus" element={<ContactUs/>}/>
            <Route path="/Service" element={<Service/>}/>
            <Route path="/Dentists" element={<Dentists/>}/>




            </Routes>
        </Router>

  );
}

export default App;
