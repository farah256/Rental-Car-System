import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Download } from 'lucide-react';
import './index.css'; // Importation du fichier CSS
import BookingService from "../services/BookingService"; // Assurez-vous que ce chemin est correct

const ReservationPayment = () => {
        const location = useLocation();
        const booking = location.state?.booking;

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        // Fonction pour télécharger le contrat PDF
    // Fonction pour télécharger le contrat PDF
    const downloadContract = async (reservationId) => {
        setLoading(true);
        setError(null); // Réinitialiser l'erreur avant chaque tentative

        try {
            const success = await BookingService.confirmReservation(reservationId);
            if (success) {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            setError("Impossible de télécharger le contrat. Veuillez réessayer.");
            console.error("Erreur lors du téléchargement du contrat:", err);
        }
    };


    return (
        <div className="container">
            {/* Section de confirmation */}
            <div className="card">
                <h2 className="title">Deal NO: {booking?.idReservation || '209'}</h2>
                <p className="description">
                    Votre demande a été confirmée, merci d'avoir choisi <strong>EASERENT</strong>.
                    Nous avons hâte de vous servir et de garantir une expérience de location fluide et agréable.
                </p>
                <p className="description">Cordialement,</p>

                <div className="contract-box">
                    <div className="contract-content">
                        <div className="icon-box">
                            <Download className="icon" />
                        </div>
                        <span
                            onClick={() => downloadContract(booking.idReservation)}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            {loading ? 'Téléchargement en cours...' : 'Contract.pdf'}
                        </span>
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Affichage des erreurs */}
                </div>

                <div className="button-group">
                    <button className="cancel-button">Annuler la réservation</button>
                    <button className="pay-button">Payer</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationPayment;
