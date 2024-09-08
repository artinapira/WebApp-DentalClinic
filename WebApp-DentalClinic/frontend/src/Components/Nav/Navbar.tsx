import React from "react";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import './Nav.css';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Assets/logoo.png'
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { FaUser } from 'react-icons/fa';

// Define your component's props if any
const Navbars: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const { data: { user1 } } = useTypedSelector(state => state.auth);

    return (
        <Navbar expand="lg"  className="navbar">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img id="logo" src={logo} alt="logo" /> {/* Added alt attribute for accessibility */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/Knowledge">Knowledge</Nav.Link>
                        <Nav.Link as={Link} to="/Marketing">Marketing</Nav.Link>
                        <Nav.Link as={Link} to="/ContactUs">Contact Us</Nav.Link>

                        {!user1?.PatientId && (
                            <Link to="/Patients" className="nav-link">
                                <span>Patients</span>
                            </Link>
                        )}
                        {!user1?.PatientId && (
                            <Link to="/dashboard" className="nav-link">
                                <span>Dashboard</span>
                            </Link>
                        )}
                        {!user1?.PatientId && (
                            <Link to="/Dentists" className="nav-link">
                                <span>Dentists</span>
                            </Link>
                        )}
                        <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
                            {!user1?.PatientId && (
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
        </Navbar>
    );
};

export default Navbars;
