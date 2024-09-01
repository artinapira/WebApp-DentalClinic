import React from "react";
import { Navbar, Container, NavDropdown, Collapse, Nav } from 'react-bootstrap';
import './Nav.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Assets/logoo.png'
import { FiLogOut } from "react-icons/fi";
import { MdDashboard} from "react-icons/md";
function Navbars() {

    const dispatch = useDispatch();
    const {
      data: { user1 },
    } = useSelector((state) => state.auth);
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/Home">
                    <img id="logo" src={logo} title="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Knowledge">Knowledge</Nav.Link>
                        <Nav.Link href="/Marketing">Marketing</Nav.Link>
                        <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        <Nav.Link href="/Partners">Partners</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        
                        

            {!user1?.PatientId && ( <Link to="/Patients" className="nav-link">
                <span>Patients</span>
                    
                 
              </Link>)}
            {!user1?.PatientId && (<Link to="/dashboard" className="nav-link">
                <span>Dashboard</span>
                   
                 
              </Link>)}
              
            {user1?.PatientId && (<Link to="/Dentists" className="nav-link">
                <span>Dentists</span>
              </Link>)}
              <NavDropdown title="Profile" id="basic-nav-dropdown">
  {user1?.PatientId && (
    <NavDropdown.Item as={Link} to="/patient-profile">
      Patient Profile
    </NavDropdown.Item>
  )}
  {!user1?.PatientId && user1?.DentistId && (
    <NavDropdown.Item as={Link} to="/dentist-profile">
      Dentist Profile
    </NavDropdown.Item>
  )}
  <NavDropdown.Divider />
  <NavDropdown.Item
    onClick={() => {
      dispatch({ type: "AUTH_LOGOUT" });
    }}
    as={Link}
    to="/"
  >
    Logout
  </NavDropdown.Item>
</NavDropdown>
     </Nav>
                    
            </Navbar.Collapse>
        </Container>
        </Navbar >

    )
}
export default Navbars;