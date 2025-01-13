import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReservationService from '../../services/BookingService.js';
import UserService from "../../services/UserService.js"; // Créez ce service

const CarBookingForm = () => {
    const location = useLocation();
    const vehicle = location.state?.vehicle;

    const [driverLicense, setDriverLicense] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');

    const handleBookingRequest = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            const userData = response.ourUser;
            const userId = userData.id; // Récupère l'ID depuis le profil
            console.log("######"+userId);

            const reservationData = {
                statusReservation: "PENDING", // Statut initial
                dateCreaction: new Date().toISOString(),
                debutLocation: new Date(pickUpDate).toISOString(),
                finLocation: new Date(dropOffDate).toISOString(),
                userId: userId,
                matricule: vehicle.matricule // Assurez-vous que votre objet vehicle contient le matricule
            };

            await ReservationService.createReservation(reservationData);
            alert('Réservation créée avec succès !');
            // Redirection ou autre logique après succès
        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error);
            alert('Erreur lors de la création de la réservation');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '800px', margin: 'auto',marginTop:'160px', backgroundColor: '#f8f9fa', color: '#000' }}>
            <div style={{ flex: 1 }}>
                <img
                    src={vehicle?.image || "https://via.placeholder.com/400"}
                    alt={vehicle?.brand}
                    style={{ width: '100%', borderRadius: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div>
                        <h3>Year</h3>
                        <p>{vehicle?.year}</p>
                    </div>
                    <div>
                        <h3>Brand</h3>
                        <p>{vehicle?.brand}</p>
                    </div>
                    <div>
                        <h3>Type</h3>
                        <p>{vehicle?.type}</p>
                    </div>
                    <div>
                        <h3>Price/day</h3>
                        <p>{vehicle?.price?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div style={{ flex: 1, marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h2>Book your car</h2>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Driver License</label>
                        <input
                            type="text"
                            value={driverLicense}
                            onChange={(e) => setDriverLicense(e.target.value)}
                            placeholder="Your driver License"
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label>Pick-up date</label>
                            <input
                                type="date"
                                value={pickUpDate}
                                onChange={(e) => setPickUpDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Drop-off date</label>
                            <input
                                type="date"
                                value={dropOffDate}
                                onChange={(e) => setDropOffDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleBookingRequest}
                    style={{ width: '400px', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#007BFF', color: '#fff', fontSize: '14px', alignSelf: 'flex-end', marginTop: '20px' }}>
                    Send Booking Request
                </button>
            </div>
        </div>
    );
};

export default CarBookingForm;