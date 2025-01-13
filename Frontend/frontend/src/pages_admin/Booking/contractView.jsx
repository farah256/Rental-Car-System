import React, { useEffect, useState } from "react";
import ReservationService from "../../services/BookingService"; // Assuming ReservationService contains getReservationById
import { useParams } from "react-router-dom";
import './ContractView.css'; // Assuming you will add styles in this CSS file

const ContractView = () => {
    const [reservation, setReservation] = useState(null); // Updated to store a single reservation object
    const [error, setError] = useState(null);
    const { reservationId } = useParams();
    console.log("reservationId:", reservationId);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await ReservationService.getReservationById(reservationId);
                if (response.status === 200) {
                    setReservation(response.data); // Set the reservation object
                }
            } catch (error) {
                console.error("Error fetching reservation:", error);
                setError("An error occurred while fetching the reservation.");
            }
        };

        fetchReservation();
    }, [reservationId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!reservation) {
        return <div className="no-reservation">No reservation found.</div>;
    }

    return (
        <div className="contract-view-container">
            <h1 className="page-title">Reservation Details</h1>
            <div className="reservation-details" key={reservation.idReservation}>
                <h2 className="reservation-title">Reservation #{reservation.idReservation}</h2>
                <div className="reservation-info">
                    <p><strong>Status:</strong> {reservation.statusReservation}</p>
                    <p><strong>Date Creation:</strong> {new Date(reservation.dateCreaction).toLocaleDateString()}</p>
                    <p><strong>Start Date:</strong> {new Date(reservation.debutLocation).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(reservation.finLocation).toLocaleDateString()}</p>
                </div>

                <h3 className="section-title">Vehicle Information</h3>
                <div className="vehicle-info">
                    <p><strong>Matricule:</strong> {reservation.vehicule ? reservation.vehicule.matricule : "Not Available"}</p>
                    <p><strong>Brand:</strong> {reservation.vehicule ? reservation.vehicule.brand : "Not Available"}</p>
                    <p><strong>Model:</strong> {reservation.vehicule ? reservation.vehicule.model : "Not Available"}</p>
                    <p><strong>Year:</strong> {reservation.vehicule ? reservation.vehicule.year : "Not Available"}</p>
                    <p><strong>Type:</strong> {reservation.vehicule ? reservation.vehicule.type : "Not Available"}</p>
                    <div className="car-image">
                        {/* Display car image if available */}
                        {reservation.vehicule && reservation.vehicule.image ? (
                            <img
                                src={reservation.vehicule.image ? `data:image/jpeg;base64,${reservation.vehicule.image}` : null}
                                alt={`${reservation.vehicule.brand} ${reservation.vehicule.model}`}
                                className="vehicle-image"
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                </div>

                <h3 className="section-title">User Information</h3>
                <div className="user-info">
                    <p><strong>Name:</strong> {reservation.user ? reservation.user.firstname + " " + reservation.user.lastname : "Not Available"}</p>
                    <p><strong>Email:</strong> {reservation.user ? reservation.user.email : "Not Available"}</p>
                    <p><strong>Phone:</strong> {reservation.user ? reservation.user.phone : "Not Available"}</p>
                </div>
            </div>
        </div>
    );
};

export default ContractView;
