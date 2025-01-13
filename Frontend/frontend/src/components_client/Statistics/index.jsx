import React, { useEffect, useState } from "react";
import "./index.css";
import DashboardService from "../../services/DashboardService";
import { DirectionsCarFilledOutlined, PersonAdd, AssignmentOutlined } from "@mui/icons-material";

const Statistics = () => {
  // State for statistics
  const [clientsCount, setClientsCount] = useState(null);
  const [vehiclesCount, setVehiclesCount] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(null);

  // Fetch car rental statistics on component mount
  useEffect(() => {
    fetchVehiclesCount();
    fetchBookingsCount();
    fetchClientsCount();
  }, []);

  // Fetch vehicles count
  const fetchVehiclesCount = async () => {
    try {
      const response = await DashboardService.getTotalVehicles();
      setVehiclesCount(response || 0);
    } catch (error) {
      console.error("Error fetching vehicles count:", error);
    }
  };

  // Fetch clients count
  const fetchClientsCount = async () => {
    try {
      const response = await DashboardService.getTotalClients();
      setClientsCount(response || 0);
    } catch (error) {
      console.error("Error fetching clients count:", error);
    }
  };

  // Fetch bookings count
  const fetchBookingsCount = async () => {
    try {
      const response = await DashboardService.getTotalBookings();
      setBookingsCount(response || 0);
    } catch (error) {
      console.error("Error fetching bookings count:", error);
    }
  };

  // Check if the data has been loaded before rendering the statistics
  if (clientsCount === null || vehiclesCount === null || bookingsCount === null) {
    return <div>Loading...</div>;
  }

  // Data for rendering statistics
  const rentalStats = [
    {
      icon: <PersonAdd style={{ fontSize: "40px"}} />,
      value: clientsCount.toString(),
      label: "Total Clients",
    },
    {
      icon: <DirectionsCarFilledOutlined style={{ fontSize: "40px"}} />,
      value: vehiclesCount.toString(),
      label: "Total Vehicles",
    },
    {
      icon: <AssignmentOutlined style={{ fontSize: "40px"}} />,
      value: bookingsCount.toString(),
      label: "Total Bookings",
    },
  ];

  return (
    <section className="awards padding">
      <div className="container">
        <h1>
          Our Statistics
        </h1>
        <p>Clients,Vehicles,Bookings</p>
        <div className="content grid4 mtop">
          {rentalStats.map((stat, index) => (
            <div className="box" key={index}>
              <div className="icon">{stat.icon}</div>
              <h1>{stat.value}</h1>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
