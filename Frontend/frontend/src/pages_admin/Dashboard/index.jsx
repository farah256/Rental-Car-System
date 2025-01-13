import { useEffect, useState } from "react";
import Header from "../../components_admin/Header";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import StatBox from "../../components_admin/StatBox.jsx"; // Ensure this component is implemented
import DashboardService from "../../services/DashboardService"; // Replace with your actual service

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for statistics
  const [clientsCount, setClientsCount] = useState(null);
  const [vehiclesCount, setVehiclesCount] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    fetchVehiclesCount();
    fetchBookingsCount();
    fetchClientsCount();
  }, []);

  // Fetch clients count
  const fetchVehiclesCount = async () => {
    try {
      const response = await DashboardService.getTotalVehicles();
      console.log("Vehicles count:", response); // Log the response to debug
      setVehiclesCount(response || 0); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching vehicles count:", error);
    }
  };

  const fetchClientsCount = async () => {
    try {
      const response = await DashboardService.getTotalClients();
      console.log("Clients count:", response); // Log the response to debug
      setClientsCount(response|| 0); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching clients count:", error);
    }
  };

  const fetchBookingsCount = async () => {
    try {
      const response = await DashboardService.getTotalBookings();
      console.log("Bookings count:", response); // Log the response to debug
      setBookingsCount(response|| 0); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching bookings count:", error);
    }
  };

  // Check if the data has been loaded before rendering the statistics
  if (clientsCount === null || vehiclesCount === null || bookingsCount === null) {
    return <Typography>Loading...</Typography>; // Show a loading state while data is being fetched
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(9, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        padding= "50px 60px"

      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="12px"
        >
          <StatBox
            title={clientsCount.toString()}
            subtitle="Total Clients"

            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="12px"
        >
          <StatBox
            title={vehiclesCount.toString()}
            subtitle="Total Vehicles"
            icon={
              <DirectionsCarFilledOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="12px"
        >
          <StatBox
            title={bookingsCount.toString()}
            subtitle="Total Bookings"
            icon={
              <AssignmentOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
