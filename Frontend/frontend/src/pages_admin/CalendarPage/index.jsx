import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components_admin/Header.jsx";
import { tokens } from "../../theme";
import BookingService from "../../services/BookingService";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await BookingService.getAllReservations();
      console.log("Raw booking data:", response.data);

      const transformedBookings = response.data
        .map((booking) => {
          return {
            id: booking.idReservation || Math.random().toString(),
            title: `Reservation ID: ${booking.idReservation}`, // Ensure ID is the main title
            start: booking.debutLocation,
            end: booking.finLocation,
            backgroundColor: getStatusColor(booking.statusReservation),
            extendedProps: {
              status: booking.statusReservation || 'Unknown',
              vehicleId: booking.matricule || 'Unknown Vehicle',
              userFullName: booking.userId ? `${booking.userId}` : 'Unknown User', // Placeholder for userFullName
            },
          };
        })
        .filter((booking) => {
          const isValid = booking.start && booking.end;
          if (!isValid) {
            console.log("Filtered out booking due to missing dates:", booking);
          }
          return isValid;
        });

      console.log("Final transformed bookings:", transformedBookings);
      setBookings(transformedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      console.error("Full error details:", error.response?.data || error.message);
    }
  };



  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return colors.greenAccent[500];
      case "PENDING":
        return colors.greenAccent[700];
      case "CANCELLED":
        return colors.redAccent[500];
      case "COMPLETED":
        return colors.blueAccent[500];
      default:
        return colors.blueAccent[400];
    }
  };

  const handleEventClick = (selected) => {
    const eventDetails = `
      Vehicle: ${selected.event.extendedProps.vehicleId}
      Customer: ${selected.event.extendedProps.userFullName}
      Status: ${selected.event.extendedProps.status}
      Start: ${formatDate(selected.event.start, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
      End: ${formatDate(selected.event.end, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    `;
    alert(eventDetails);
  };

  return (
    <Box m="20px">
      <Header title="Booking Calendar" subtitle="View All Vehicle Bookings" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Current Bookings</Typography>
          <List>
            {bookings.filter(event =>
              new Date(event.start) <= new Date() &&
              new Date(event.end) >= new Date()
            ).map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: event.backgroundColor,
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ color: "white" }}>
                      {event.title}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: "white", opacity: 0.7 }}>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {" - "}
                      {formatDate(event.end, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            events={bookings}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;