import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected, color, onClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isActive = selected === title; // Check if the item is active

    return (
        <MenuItem
            onClick={() => {
                setSelected(title);
                if (onClick) onClick();
            }}
            icon={React.cloneElement(icon, { style: { color: isActive ? colors.greenAccent[900] : 'white' } })} // Icon color changes when active
            style={{
                color: 'white', // Always white for title text
                backgroundColor: isActive ? colors.greenAccent[400] : 'transparent', // Optional: background color change when active
                borderLeft: isActive ? `4px solid ${colors.greenAccent[500]}` : 'none',
                borderRadius: '50px',
                padding: '5px 10px', // Adjust padding
                fontWeight: 'bold', // Optional: add bold text style
            }}
        >
            <Typography style={{ color: 'white' }}>{title}</Typography> {/* Title text color is explicitly white */}
            <Link to={to} />
        </MenuItem>
    );
};



const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const navigate = useNavigate();
    const sidebarColors = {
        backgroundImage: `url('/images_admin/926660d7278d417ef012516f7c877087.jpg')`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textColor: "#ffffff",
        activeColor: "#6870fa",
        hoverColor: "#868dfb",
    };
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    backgroundImage: sidebarColors.backgroundImage,
                    backgroundSize: sidebarColors.backgroundSize,
                    backgroundPosition: sidebarColors.backgroundPosition,
                    backgroundRepeat: sidebarColors.backgroundRepeat,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 10px 5px 10px !important",
                    color: sidebarColors.textColor,
                },
                "& .pro-inner-item:hover": {
                    color: sidebarColors.hoverColor,
                },
                "& .pro-menu-item.active": {
                    color: sidebarColors.activeColor,
                },
            }}
        >
            <ProSidebar>
                <Menu iconShape="square">
                    {/* LOGO */}
                    <MenuItem style={{ color: colors.grey[100] }}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Link to="/">
                                <img
                                    src="/images_admin/4-removebg-preview.png"
                                    alt="EASERENT Logo"
                                    style={{
                                        height: "55px",
                                        objectFit: "contain",
                                        marginTop: "10px",
                                    }}
                                />
                            </Link>
                        </Box>
                    </MenuItem>


                    <Box paddingLeft="10%" style={{ marginTop: "50px" }}>
                        {/* Dashboard */}
                        <Item
                            title="Dashboard"
                            to="/admin/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                        />

                        {/* Data Section */}
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px", color: colors.greenAccent[400] }} // Green for section title
                        >
                            Data
                        </Typography>
                        <Item
                            title="Users"
                            to="/admin/users"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                        />
                        <Item
                            title="Vehicles"
                            to="/admin/vehicles"
                            icon={<DirectionsCarFilledOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                        />

                        {/* Pages Section */}
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px", color: colors.greenAccent[400] }} // Green for section title
                        >
                            Pages
                        </Typography>
                        <Item
                            title="Booking"
                            to="/admin/booking"
                            icon={<AssignmentOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                        />
                        <Item
                            title="Payment"
                            to="/payment"
                            icon={<PaymentsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                        />
                        <Item
                            title="Calendar"
                            to="/admin/calendar"
                            icon={<CalendarMonthOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="white"
                        />

                        {/* Profile Section */}
                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 20px", color: colors.greenAccent[400] }} // Green for section title
                        >
                            Profile
                        </Typography>

                        <Item
                            title="Logout"
                            icon={<LogoutOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            color="#FFFFFF"
                            onClick={handleLogout}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
