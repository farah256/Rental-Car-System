import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components_admin/Header.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import UsersService from "../../services/UserService.js";
import useStyles from './index.styles.js';
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";


const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);  // Holds all users
    const [filteredUsers, setFilteredUsers] = useState([]);  // Holds filtered users
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });
    const [roleFilter, setRoleFilter] = useState("ALL"); // Default to "ALL"

    const classes = useStyles();

    useEffect(() => {
        fetchUsers();  // Fetch users when pagination or roleFilter changes
    }, [paginationModel, roleFilter]);

    // Fetch all users without filtering
    const fetchUsers = async () => {
        setLoading(true); // Set loading state to true before fetching
        try {
            const response = await UsersService.getPaginatedUsers(
                paginationModel.page * paginationModel.pageSize,
                paginationModel.pageSize
            );
            setUsers(response.content || []); // Ensure response.content exists
            filterUsers(response.content || []); // Apply filter after fetching
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Filter users based on the selected role
    const filterUsers = (allUsers) => {
        if (roleFilter === "ALL") {
            setFilteredUsers(allUsers);
        } else {
            setFilteredUsers(allUsers.filter(user => user.role === roleFilter));
        }
    };

    const handleDelete = async (userId) => {
        if (!userId) {
            console.error("No user ID provided for deletion.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await UsersService.deleteUser(userId); // Delete the user
                fetchUsers(); // Refresh the users list after deletion
            } catch (error) {
                console.error("Error during delete operation:", error);
            }
        }
    };

    const handleEdit = async (userId, currentRole) => {
        // Toggle the role
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

        try {
            await UsersService.changeUserRole(userId, newRole); // Update the user role
            fetchUsers(); // Refresh the users list after role change
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const handleFilterChange = (role) => {
        setRoleFilter(role); // Change the role filter based on the button clicked
    };

    const columns = [
        {
            field: "id",
            headerName: "Id",
            flex: 1,
            renderCell: (params) => {
                if (!params.row.id) {
                    console.error('Id is missing for row:', params.row);
                    return null; // Safely handle rows without id
                }
                return params.row.id;
            }
        },
        {
            field: "firstname",
            headerName: "Firstname",
            flex: 1,
        },
        {
            field: "lastname",
            headerName: "Lastname",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            type: "string", // Changed type to "string" for email
            width: 200,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                if (!params.row.email) {
                    console.error('Email is missing for row:', params.row);
                    return "N/A"; // Default value for missing email
                }
                return params.row.email;
            }
        },
        {
            field: "adresse",
            headerName: "Adresse",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            renderCell: (params) => {
                if (!params.row.phone) {
                    console.error('Phone number is missing for row:', params.row);
                    return "N/A"; // Default value for missing phone
                }
                return params.row.phone;
            }
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: (params) => {
                const statusStyles = {
                    ADMIN: classes.ADMIN,
                    USER: classes.USER,
                };
                const statusClass = statusStyles[params.value] || classes.other;
                if (!params.value) {
                    console.error('Role is missing for row:', params.row);
                    return "Unknown"; // Default value if role is missing
                }
                return (
                    <Box className={statusClass}>
                        {params.value}
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => {
                console.log('Row data:', params.row);
                if (!params.row.id) {
                    console.error('Id is missing for row:', params.row);
                    return null; // Safely handle rows without id
                }
                return (
                    <Box display="flex" gap="8px">
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => handleEdit(params.row.id, params.row.role)} sx={{ color: colors.blueAccent[500] }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(params.row.id)} sx={{ color: colors.redAccent[500] }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Users" subtitle="Managing all the Users" />
            </Box>
            <Box display="flex" gap="10px" mb="20px"> {/* Filter Buttons */}
                <Button variant="contained" onClick={() => handleFilterChange("ALL")} color={roleFilter === "ALL" ? "primary" : "default"}>
                    All
                </Button>
                <Button variant="contained" onClick={() => handleFilterChange("ADMIN")} color={roleFilter === "ADMIN" ? "primary" : "default"}>
                    Admin
                </Button>
                <Button variant="contained" onClick={() => handleFilterChange("USER")} color={roleFilter === "USER" ? "primary" : "default"}>
                    User
                </Button>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.greenAccent[500],
                    },
                }}
            >
                <DataGrid
                    rows={Array.isArray(filteredUsers) ? filteredUsers : []}  // Display filtered users
                    columns={columns}
                    loading={loading}
                    pagination
                    pageSize={paginationModel.pageSize}
                    page={paginationModel.page}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    autoHeight
                />
            </Box>
        </Box>
    );
};

export default Users;
