import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components_admin/Header.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';
import BookingService from "../../services/BookingService";
import useStyles from './index.styles.js';
import { Link } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const Bookings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const classes = useStyles(); // Ensure useStyles is used properly.
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState("list"); // 'list' or 'history'
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });
    const [editingRowId, setEditingRowId] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [Count, setCount] = useState({});

    useEffect(() => {
        fetchBookings();
    }, [paginationModel, viewType]);

    const fetchCount = async (reservationId) => {
        try {
            const response = await BookingService.calculateFixedCharge(reservationId);
            console.log("count:", response.data); // Log the response to debug
            setCount(prevCount => ({
                ...prevCount,
                [reservationId]: response.data || 0,
            }));
        } catch (error) {
            console.error("Error fetching count:", error);
        }
    };

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await BookingService.getBookingpaginated(
                paginationModel.page * paginationModel.pageSize,
                paginationModel.pageSize
            );

            const transformedBookings = response.content.map((booking) => ({
                ...booking,
                matricule: booking.vehicule.matricule,
                userFullName: `${booking.user.firstname} ${booking.user.lastname}`,
                formattedCreationDate: formatDate(booking.dateCreaction),
                formattedStartDate: formatDate(booking.debutLocation),
                formattedEndDate: formatDate(booking.finLocation),
            }));

            // Fetch charge fixe count for each booking
            transformedBookings.forEach((booking) => {
                fetchCount(booking.idReservation);
            });

            const filteredBookings =
                viewType === "history"
                    ? transformedBookings.filter(
                          (booking) =>
                              booking.statusReservation === "CANCELLED" ||
                              booking.statusReservation === "COMPLETED"
                      )
                    : transformedBookings.filter(
                          (booking) =>
                              booking.statusReservation !== "CANCELLED" &&
                              booking.statusReservation !== "COMPLETED"
                      );

            setBookings(filteredBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (reservationId, newStatus) => {
        try {
            const updatedBookings = bookings.map((booking) =>
                booking.idReservation === reservationId
                    ? { ...booking, statusReservation: newStatus }
                    : booking
            );
            setBookings(updatedBookings);
            await BookingService.updateBookingStatus(reservationId, newStatus);
            alert('Booking status updated successfully!');
        } catch (err) {
            console.error('Failed to update booking status:', err);
            alert('Error updating booking status.');
            fetchBookings();
        }
    };

    const handleDelete = async (reservationId) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await BookingService.cancelReservation(reservationId);
                fetchBookings();
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    };

    const columns = [
        {
            field: "idReservation",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "matricule",
            headerName: "Vehicle ID",
            flex: 1,
        },
        {
            field: "userFullName",
            headerName: "User Name",
            flex: 1,
        },
        {
            field: "formattedCreationDate",
            headerName: "Creation Date",
            flex: 1.2,
        },
        {
            field: "formattedStartDate",
            headerName: "Start Date",
            flex: 1.2,
        },
        {
            field: "formattedEndDate",
            headerName: "End Date",
            flex: 1.2,
        },
        {
            field: "chargeFixe",
            headerName: "Charge Fixe",
            flex: 1,
            renderCell: (params) => {
                const chargeFixe = Count[params.row.idReservation];
                return <Box>{chargeFixe.toString()} DH</Box>;
            },

        },
        {
            field: "statusReservation",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => {
                const isEditing = editingRowId === params.row.idReservation;

                if (viewType === "history") {
                    return <Box className={classes[params.value] || ""}>{params.value}</Box>;
                }

                return isEditing ? (
                    <Select
                        value={newStatus || params.value}
                        onChange={(e) => setNewStatus(e.target.value)}
                        onBlur={() => {
                            if (newStatus && newStatus !== params.value) {
                                handleStatusChange(params.row.idReservation, newStatus);
                            } else {
                                setEditingRowId(null);
                            }
                        }}
                        sx={{ width: "100%" }}
                        autoFocus
                    >
                        {["PENDING", "IN_PROGRESS", "CONFIRMED", "CANCELLED", "ACTIVE", "COMPLETED"].map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    <Box
                        onClick={() => {
                            setEditingRowId(params.row.idReservation);
                            setNewStatus(params.value);
                        }}
                        className={classes[params.value] || ""}
                        style={{ cursor: "pointer" }}
                    >
                        {params.value}
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box display="flex" gap="8px">
                    {viewType === "history" ? (
                        <Tooltip title="View">
                            <IconButton sx={{ color: colors.blueAccent[500] }} component={Link} to={`/admin/booking/contract/${params.row.idReservation}`}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="View">
                                <IconButton sx={{ color: colors.blueAccent[500] }} component={Link} to={`/admin/booking/contract/${params.row.idReservation}`}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => handleDelete(params.row.idReservation)} sx={{ color: "#f44336" }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={viewType === "history" ? "Booking History" : "Current Bookings"} subtitle="Manage all bookings" />
            </Box>

            <Box display="flex" gap="10px" mb="20px">
                <Button
                    variant="contained"
                    onClick={() => setViewType("list")}
                    sx={{
                        backgroundColor: viewType === "list" ? colors.greenAccent[600] : colors.grey[500],
                        "&:hover": { backgroundColor: viewType === "list" ? colors.greenAccent[700] : colors.grey[600] },
                    }}
                >
                    List
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setViewType("history")}
                    sx={{
                        backgroundColor: viewType === "history" ? colors.greenAccent[600] : colors.grey[500],
                        "&:hover": { backgroundColor: viewType === "history" ? colors.greenAccent[700] : colors.grey[600] },
                    }}
                >
                    History
                </Button>
            </Box>

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.greenAccent[500] },
                }}
            >
                <DataGrid
                    rows={bookings}
                    columns={columns}
                    loading={loading}
                    getRowId={(row) => row.idReservation}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    autoHeight
                />
            </Box>
        </Box>
    );
};

export default Bookings;
