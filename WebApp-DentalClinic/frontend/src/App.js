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
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ContactUs from './Pages/ContactUs';
import DLogin from './Pages/DLogin';



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

              




            </Routes>
        </Router>
  );
}

export default App;
