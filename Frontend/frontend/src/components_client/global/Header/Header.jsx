import React, { useEffect, useState } from "react";
import {
    Container,
    Navbar,
    Offcanvas,
    Nav,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import UserService from "../../../services/UserService.js"; // Importez votre service
import "../Header/Header.css";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState("/images_client/2-removebg-preview (2).png");
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const isAuthenticated = UserService.isAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProfile();
        }
    }, [isAuthenticated]);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const profile = await UserService.getYourProfile(token);
            setUserInfo(profile);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
        }
    };

    // Gestion du menu profil
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSettingsClick = () => {
        navigate('/settings');
        handleCloseMenu();
    };

    const handleBookingsClick = () => {
        navigate('/my-bookings');
        handleCloseMenu();
    };

    const handleLogout = () => {
        UserService.logout();
        UserService.logout();
         navigate('/');
        handleCloseMenu();
    };

    // Autres fonctions existantes
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

    const handleLoginNavigate = () => {
        navigate("/login");
    };

    return (
        <header className="header-section">
            <Container>
                <Navbar expand="lg" className="p-0">
                    <Navbar.Brand>
                        <img src={logo} alt="Logo" className="header-logo" />
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
                                <NavLink className="nav-link" to="/cars" onClick={closeMenu}>
                                    Vehicles
                                </NavLink>
                                {isAuthenticated ? (
                                        <NavLink className="nav-link" to="/my-bookings" onClick={closeMenu}>
                                            MY BOOKING
                                        </NavLink>
                                    ):null},
                                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                                    CONTACT
                                </NavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    {/* Bouton Login/Register OU Icon Profil */}
                    <div className="ms-md-4 ms-2">
                        {!isAuthenticated ? (
                            <button
                                className="banner-btn see-all"
                                onClick={handleLoginNavigate}
                            >
                                Login/Register
                            </button>
                        ) : (
                            <>
                                <IconButton onClick={handleProfileClick}>
                                    <PersonOutlinedIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    <MenuItem disabled>
                                        <Box>
                                            <div style={{ fontWeight: "bold" }}>
                                                {`${userInfo?.firstname || ""} ${userInfo?.lastname || ""}`}
                                            </div>
                                            <div style={{ fontSize: "0.875rem", color: "grey" }}>
                                                {userInfo?.email || ""}
                                            </div>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={handleSettingsClick}>
                                        <SettingsOutlinedIcon sx={{ mr: 1 }} />
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 1 }} />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                </Navbar>
            </Container>
        </header>
    );
};

export default Header;