import {
    Box,
    IconButton,
    useTheme,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Divider,
    InputAdornment,
    Typography
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import UserService from "../../services/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // State management
    const [anchorEl, setAnchorEl] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        adresse: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const open = Boolean(anchorEl);

    // Profile menu handlers
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Settings dialog handlers
    const handleSettingsOpen = () => {
        setSettingsOpen(true);
        setEditedUserInfo(userInfo);
        handleClose();
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
        setError("");
    };

    const validateForm = () => {
        // Basic validation for empty fields
        for (const key in editedUserInfo) {
            if (!editedUserInfo[key]) {
                setError(`${key} is required`);
                return false;
            }
        }

        // Password match check
        if (editedUserInfo.password !== editedUserInfo.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(editedUserInfo.email)) {
            setError("Invalid email format");
            return false;
        }

        // Phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(editedUserInfo.phone)) {
            setError("Invalid phone number format");
            return false;
        }

        setError("");
        return true;
    };

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await UserService.getYourProfile(token);
                    const userData = response.ourUser; // Check if `id` exists in `userData`
                    setUserInfo({
                        id: userData.id, // Ensure `id` is included
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        email: userData.email,
                        adresse: userData.adresse || "",
                        phone: userData.phone || "",
                        password: "",
                        confirmPassword: "",
                    });
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };


        fetchUserProfile();
    }, []);

    const handleSaveSettings = async () => {
        try {
            // Validate the form before submission
            if (!validateForm()) {
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            // Create an object with only the updated fields or retain original values
            const updatedData = {};
            for (const key in userInfo) {
                if (editedUserInfo[key] !== userInfo[key]) {
                    updatedData[key] = editedUserInfo[key];
                } else {
                    updatedData[key] = userInfo[key];
                }
            }

            // Make the API call with the updated data
            const response = await UserService.updateUser(userInfo.id, updatedData, token);
            console.log("User updated successfully:", response);

            // Update state with the new user info
            setUserInfo(updatedData); // Replace the current user info with the updated one
            handleSettingsClose(); // Close the dialog
        } catch (err) {
            console.error("Error updating user settings:", err);
        }
    };



    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* Search Bar */}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            {/* Profile Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem disabled>
                    <Box>
                        <div style={{ fontWeight: "bold" }}>
                            {`${userInfo.firstname || ""} ${userInfo.lastname || ""}`}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: colors.grey[400] }}>
                            {userInfo.email || ""}
                        </div>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleSettingsOpen}>
                    <SettingsOutlinedIcon sx={{ mr: 1 }} />
                    Settings
                </MenuItem>
            </Menu>

            {/* Settings Dialog */}
            <Dialog open={settingsOpen} onClose={handleSettingsClose} maxWidth="sm" fullWidth>
                <DialogTitle>User Settings</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        {["firstname", "lastname", "email", "adresse", "phone"].map((field) => (
                            <TextField
                                key={field}
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                fullWidth
                                value={editedUserInfo[field]}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, [field]: e.target.value })
                                }
                                error={error.includes(field)}
                                helperText={error.includes(field) && error}
                            />
                        ))}
                        <Divider sx={{ my: 2 }} />
                        {["password", "confirmPassword"].map((field) => (
                            <TextField
                                key={field}
                                label={
                                    field === "password"
                                        ? "New Password"
                                        : "Confirm New Password"
                                }
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                value={editedUserInfo[field]}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, [field]: e.target.value })
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword((prev) => !prev)
                                                }
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        ))}
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSettingsClose}>Cancel</Button>
                    <Button onClick={handleSaveSettings} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Topbar;
