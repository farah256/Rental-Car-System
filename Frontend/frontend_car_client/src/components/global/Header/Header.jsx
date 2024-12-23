import React, { useEffect, useState } from "react";
import {
    Container,
    Navbar,
    Offcanvas,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import "./Header.css";

const Header = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        scrollTop >= 120
            ? header.classList.add("is-sticky")
            : header.classList.remove("is-sticky");
    };

    const closeMenu = () => {
        if (window.innerWidth <= 991) {
            handleClose();
        }
    };

    // Function to navigate to the login page
    const handleLoginNavigate = () => {
        navigate("/login"); // Replace "/login" with your actual login route
    };

    return (
        <header className="header-section">
            <Container>
                <Navbar expand={false} className="p-0">
                    <div className="w-100 d-flex align-items-center justify-content-between">
                        {/* Hamburger Icon */}
                        <div className="d-block d-md-none" onClick={handleShow}>
                            <FaBars className="menu-icon" /> {/* Display the menu icon */}
                        </div>

                        {/* Logo Section */}
                        <Navbar.Brand className="mx-auto">
                            <NavLink to="/">
                                <img
                                    src="../../../public/2-removebg-preview (2).png"
                                    alt="Logo"
                                    className="header-logo"
                                />
                            </NavLink>
                        </Navbar.Brand>

                        {/* Login/Register Button */}
                        <div className="ms-md-4 ms-2">
                            <button
                                className="banner-btn see-all"
                                onClick={handleLoginNavigate} // Navigate to login page
                            >
                                Login/Registre
                            </button>
                        </div>
                    </div>

                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                        show={show}
                        onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                            <h1 className="logo">Menu</h1>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                                    Home
                                </NavLink>
                                <NavLink className="nav-link" to="/about-us" onClick={closeMenu}>
                                    ABOUT US
                                </NavLink>
                                <NavLink className="nav-link" to="/tours" onClick={closeMenu}>
                                    TOURS
                                </NavLink>
                                <NavDropdown title="DESTINATION" id="offcanvasNavbarDropdown">
                                    <NavLink
                                        className="nav-link text-dark"
                                        to="/destinations"
                                        onClick={closeMenu}
                                    >
                                        SPAIN TOURS
                                    </NavLink>
                                </NavDropdown>
                                <NavLink className="nav-link" to="/gallery" onClick={closeMenu}>
                                    GALLERY
                                </NavLink>
                                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                                    CONTACT
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Navbar>
            </Container>
        </header>
    );
};

export default Header;
