import React, { useEffect, useState } from "react";
import {
    Container,
    Navbar,
    Offcanvas,
    Nav,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState("/images_client/2-removebg-preview (2).png"); // Default logo
    const navigate = useNavigate(); // Hook to programmatically navigate

    const toggleMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        if (scrollTop >= 120) {
            header.classList.add("is-sticky");
            setLogo("/images_client/3-removebg-preview.png"); // Sticky logo when scrolled down
        } else {
            header.classList.remove("is-sticky");
            setLogo("/images_client/2-removebg-preview (2).png"); // Default logo
        }
    };

    const closeMenu = () => {
        if (window.innerWidth <= 991) {
            setOpen(false);
        }
    };

    // Navigate to login page
    const handleLoginNavigate = () => {
        navigate("/login");
    };

    return (
        <header className="header-section">
            <Container>
                <Navbar expand="lg" className="p-0">
                    {/* Logo Section */}
                    <Navbar.Brand>
                        <img
                            src={logo}
                            alt="Logo"
                            className={`header-logo`}
                        />
                    </Navbar.Brand>
                    {/* End Logo Section */}

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                        show={open}
                    >
                        {/* Mobile Logo Section */}
                        <Offcanvas.Header>
                            <h1 className="logo">Weekendmonks</h1>
                            <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                                <i className="bi bi-x-lg"></i>
                            </span>
                        </Offcanvas.Header>
                        {/* End Mobile Logo Section */}

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                                    Home
                                </NavLink>
                                <NavLink className="nav-link" to="/vehicles" onClick={closeMenu}>
                                    Vehicles
                                </NavLink>
                                <NavLink className="nav-link" to="/rent" onClick={closeMenu}>
                                    Rent
                                </NavLink>
                                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                                    CONTACT
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    {/* Login/Register Button */}
                    <div className="ms-md-4 ms-2">
                        <button
                            className="banner-btn see-all"
                            onClick={handleLoginNavigate}
                        >
                            Login/Register
                        </button>
                    </div>
                </Navbar>
            </Container>
        </header>
    );
};

export default Header;
