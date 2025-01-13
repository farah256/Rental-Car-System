import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ReservationService from '../services/BookingService';
import UserService from '../services/UserService';
import VehicleService from '../services/VehiculeService';
import "../../../../Frontend/frontend/src/pages_client/index.css";
import useStyles from './useStyles.jsx'; // Remplace par le chemin correct


// Styled components
const StyledCard = styled(Card)({
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    marginBottom: "1rem",
    "&:hover": {
        transform: "scale(1.02)"
    }
});

const BookingContainer = styled('div')({
    display: "flex",
    height: "12rem",
});

const ImageContainer = styled("div")({
    width: "16rem",
    position: "relative",
    overflow: "hidden"
});

const CarImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.1)"
    }
});

const BookingContent = styled('div')({
    flex: 1,
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

const BookingInfo = styled('div')({
    flex: 1
});

const CarTitle = styled("h3")({
    fontWeight: 600,
    fontSize: "1.25rem",
    color: "#1f2937",
    marginBottom: "0.75rem"
});

const BookingDetails = styled('div')({
    color: "#6b7280",
    "& > p": {
        marginBottom: "0.5rem"
    }
});

const ViewButton = styled(Button)({
    backgroundColor: "#000000",
    color: "white",
    fontWeight: 600,
    padding: "0.75rem 2rem",
    borderRadius: "0.375rem",
    transition: "background-color 0.2s ease",
    marginLeft: "2rem",
    "&:hover": {
        backgroundColor: "#1f2937"
    }
});

const ContainerWrapper = styled('div')({
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
});

const PageTitle = styled('h1')({
    fontSize: "1.875rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "2rem"
});

const MyBookings = () => {
    const [bookingsWithVehicles, setBookingsWithVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchVehicleDetails = async (matricule, token) => {
        try {
            const vehicleDetails = await VehicleService.getVehicleById(matricule, token);
            console.log('Vehicle details:', vehicleDetails);
            return vehicleDetails;
        } catch (error) {
            console.error(`Error fetching vehicle ${matricule}:`, error);  // Corrected syntax
            return null;
        }
    };

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const userProfile = await UserService.getYourProfile(token);
            const userId = userProfile.ourUser.id;
            const reservations = await ReservationService.getReservationsByUserId(userId, token);

            const bookingsPromises = reservations.map(async (booking) => {
                const vehicleDetails = await fetchVehicleDetails(booking.matricule, token);
                return {
                    ...booking,
                    vehicle: vehicleDetails
                };
            });

            const completedBookings = await Promise.all(bookingsPromises);
            setBookingsWithVehicles(completedBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleView = (booking) => {
        navigate(`/reservation_details/${booking.idReservation}`, { state: { booking } }); // Corrected URL path
    };

    const classes = useStyles();

    return (
        <ContainerWrapper className="mt-5">
            <h1 className="main-title mt-5 mb-5">My Reservations</h1>
            {bookingsWithVehicles.map((booking) => (
                <StyledCard key={booking.idReservation}>
                    <BookingContainer>
                        <ImageContainer>
                            {booking.vehicle?.image ? (
                                <CarImage
                                    src={`data:image/jpeg;base64,${booking.vehicle.image}`} // Corrected base64 image embedding
                                    alt={`${booking.vehicle.brand} ${booking.vehicle.type}`}
                                />
                            ) : (
                                <CarImage
                                    src="/placeholder-car.jpg"
                                    alt="No image available"
                                />
                            )}
                        </ImageContainer>

                        <BookingContent>
                            <BookingInfo>
                                <CarTitle>
                                    {booking.vehicle?.brand} {booking.vehicle?.type}
                                </CarTitle>
                                <p className={classes[booking.statusReservation]}>
                                    {booking.statusReservation}
                                </p>
                                <BookingDetails>
                                    <p>Pick-up:<b> {new Date(booking.debutLocation).toLocaleDateString()}</b></p>
                                    <p>Drop-off:<b> {new Date(booking.finLocation).toLocaleDateString()}</b></p>
                                </BookingDetails>
                            </BookingInfo>

                            <ViewButton
                                variant="contained"
                                onClick={() => handleView(booking)}
                            >
                                View Details
                            </ViewButton>
                        </BookingContent>
                    </BookingContainer>
                </StyledCard>
            ))}
        </ContainerWrapper>
    );
};

export default MyBookings;
