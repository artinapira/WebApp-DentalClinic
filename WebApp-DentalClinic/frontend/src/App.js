import './App.css';
import Footer from './Components/Footer/Footer';
import About from './Pages/About';
import Home from './Pages/Home';
import Dentists from './Pages/Dentists';
import Patients from './Pages/Patients';
import Services2 from './Pages/Services2';
import Login from './Pages/Login';
import AddAnkesa from './Pages/AddAnkesa';
import AddVlersimi from './Pages/AddVlersimi';
import DentistProfile from './Pages/DentistProfile';
import PatientProfile from './Pages/PatientProfile';
import Admin from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Admin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ContactUs from './Pages/ContactUs';
import DLogin from './Pages/DLogin';
import FrontPage from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/FrontPage';
import Kontaktet from './Pages/Dashboard/Main-Dashboard/AllPages/GetKontakti';
import Dentist from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Dentist';
import Terminet from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Terminet';
import Ankesat from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Ankesat';
import Vlersimet from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Vlersimet';
import MedicalRecord from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/MedicalRecord';
import PatientNote from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/PatientNote';
import Prescription from './Pages/Dashboard/Main-Dashboard/AllPages/GlobalFiles/Prescription';
import Marketing from './Pages/Marketing';
import Knowledge from './Pages/Knowledge';




function App() {
  return (
    <Router>

            <Routes>
                
                <Route path="/" element={<DLogin/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/About" element={<About />} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/Services2" element={<Services2 />} />
                <Route path="/Footer" element={<Footer />} />
                <Route path="/Contactus" element={<ContactUs/>}/>
                <Route path="/Dentists" element={<Dentists/>}/>
                <Route path="/Patients" element={<Patients/>}/>
                <Route path="/AddAnkesa" element={<AddAnkesa/>}/>
                <Route path="/AddVlersimi" element={<AddVlersimi/>}/>
                <Route path="/DentistProfile" element={<DentistProfile/>}/>
                <Route path="/PatientProfile" element={<PatientProfile/>}/>
                <Route path="/kontaktet" element={<Kontaktet/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/dentist" element={<Dentist/>}/>
                <Route path="/dashboard" element={<FrontPage/>}/>
                <Route path="/terminet" element={<Terminet/>}/>
                <Route path="/ankesat" element={<Ankesat/>}/>
                <Route path="/vlersimet" element={<Vlersimet/>}/>
                <Route path="/medicalRecord" element={<MedicalRecord/>}/>
                <Route path="/patientNote" element={<PatientNote/>}/>
                <Route path="/prescription" element={<Prescription/>}/>
                <Route path="/Marketing" element={<Marketing/>}/>
                <Route path="/Knowledge" element={<Knowledge/>}/>



              




            </Routes>
        </Router>
  );
}

export default App;
