import React, { useEffect, useState } from "react";
import {
    Container,
    Navbar,
    Offcanvas,
    Nav,
    Dropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import "../Header/Header.css";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState("/images_client/2-removebg-preview (2).png");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        checkLoginStatus();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        if (scrollTop >= 120) {
            header.classList.add("is-sticky");
            setLogo("/images_client/3-removebg-preview.png");
        } else {
            header.classList.remove("is-sticky");
            setLogo("/images_client/2-removebg-preview (2).png");
        }
    };

    const closeMenu = () => {
        if (window.innerWidth <= 991) {
            setOpen(false);
        }
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    const handleLoginNavigate = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    return (
        <header className="header-section">
            <Container>
                <Navbar expand="lg" className="p-0">
                    <Navbar.Brand>
                        <img
                            src={logo}
                            alt="Logo"
                            className="header-logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby="offcanvasNavbarLabel-expand-lg"
                        placement="start"
                        show={open}
                    >
                        <Offcanvas.Header>
                            <h1 className="logo">Weekendmonks</h1>
                            <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                                <i className="bi bi-x-lg"></i>
                            </span>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                                    Home
                                </NavLink>
                                <NavLink className="nav-link" to="/vehicles" onClick={closeMenu}>
                                    Vehicles
                                </NavLink>
                                <NavLink className="nav-link" to="/rent" onClick={closeMenu}>
                                    Rents
                                </NavLink>
                                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                                    CONTACT
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    <div className="ms-md-4 ms-2">
                        {isLoggedIn ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="banner-btn see-all p-2">
                                    <User size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleSettings}>Settings</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <button
                                className="banner-btn see-all"
                                onClick={handleLoginNavigate}
                            >
                                Login/Register
                            </button>
                        )}
                    </div>
                </Navbar>
            </Container>
        </header>
    );
};

export default Header;