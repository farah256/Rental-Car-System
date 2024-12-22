import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const sidebarColors = {
      backgroundImage: `url('/images/926660d7278d417ef012516f7c877087.jpg')`,
      backgroundSize: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      textColor: "#FFFFFF",
      activeColor: "#6870fa",
      hoverColor: "#868dfb",
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
                <img 
                  src="/images/4-removebg-preview.png" 
                  alt="EASERENT Logo" 
                  style={{ 
                    height: "55px", 
                    objectFit: "contain",
                    marginTop: "10px",
                  }}
                />
              </Box>
            </MenuItem>

            <Box paddingLeft="10%" style={{ marginTop: "50px" }}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
              <Item
                title="Users"
                to="/users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Vehicles"
                to="/vehicles"
                icon={<DirectionsCarFilledOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="Booking"
                to="/booking"
                icon={<AssignmentOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Payment"
                to="/payment"
                icon={<PaymentsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarMonthOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Notifications"
                to="/notifications"
                icon={<MessageOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                sx={{ m: "15px 0 5px 20px" }}
              >
                Profile
              </Typography>
              <Item
                title="Settings"
                to="/settings"
                icon={<SettingsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/logout"
                icon={<LogoutOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
};

export default Sidebar;
