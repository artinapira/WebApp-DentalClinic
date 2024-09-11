import React from "react";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import './Nav.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Assets/logoo.png'
import { FiLogOut } from "react-icons/fi";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { FaUser } from "react-icons/fa";

function Navbars() {
    const dispatch = useDispatch();
    const {user1, dentist, admin} = useSelector(state => state.auth.data);

    console.log("Navbar User data:", user1);


    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/Home">
                    <img id="logo" src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Knowledge">Knowledge</Nav.Link>
                        <Nav.Link href="/Marketing">Marketing</Nav.Link>
                        <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        
                        {/* Links based on user role */}
                        {!user1?.patientId && (
                            <Link to="/Patients" className="nav-link">
                                <span>Patients</span>
                            </Link>
                        )}

                        {admin && (
                            <Link to="/dashboard" className="nav-link">
                                <span>Dashboard</span>
                            </Link>
                        )}
                        
                        {(user1?.patientId || admin) && !dentist && (
                            <Link to="/Dentists" className="nav-link">
                                <span>Dentists</span>
                            </Link>
                        )}
                        
                        <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
                            {user1?.patientId && (
                                <NavDropdown.Item as={Link} to="/PatientProfile">
                                    My Profile
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
        </Navbar>
    );
}

export default Navbars;
