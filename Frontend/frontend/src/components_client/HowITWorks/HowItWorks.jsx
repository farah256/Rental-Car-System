import React, { useEffect, useState } from "react";
import "./HowItWorks.css";
import DashboardService from "../../services/DashboardService";
import { DirectionsCarFilledOutlined, PaymentOutlined, AssignmentOutlined } from "@mui/icons-material";

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
      icon: <AssignmentOutlined  style={{ fontSize: "40px"}} />,
      value:"Fill the form",
      label: "Choose the Check-in and Check-out date with your preferable options.",
    },
    {
      icon: <DirectionsCarFilledOutlined style={{ fontSize: "40px"}} />,
      value: "Book your car",
      label: "By pressing Book Now, wait the confirmation notification with the contract.",
    },
    {
      icon: <PaymentOutlined style={{ fontSize: "40px"}} />,
      value: "Make the payment",
      label: "Pay easily from your place with the bill in your hand, and enjoy your ride.",
    },
  ];

  return (
    <section className="works padding">
      <div className="container">
        <h1>
          How it works
        </h1>
        <p>Drive Your Dream, Rent with Ease!</p>
        <div className="content grid4 mtop">
          {rentalStats.map((stat, index) => (
            <div className="box" key={index}>
              <div className="icon">{stat.icon}</div>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
