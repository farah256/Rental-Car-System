import axios from 'axios';
import UserService from "./UserService.js";

class BookingService {
    static BASE_URL = "http://localhost:8082/api/account/reservations";

    // Helper method to get the authorization header
    static getAuthHeader() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return {
            'Authorization': `Bearer ${token}`, // Utilisation correcte des backticks
            'Content-Type': 'application/json'
        };
    }

    // Create a new reservation
    static createReservation(reservationData) {
        return axios.post(this.BASE_URL, reservationData, {
            headers: this.getAuthHeader()
        });
    }

    // Cancel a reservation
    static cancelReservation(reservationId) {
        return axios.put(`${this.BASE_URL}/${reservationId}/cancel`, null, {
            headers: this.getAuthHeader()
        });
    }

    // Confirm a reservation (download the PDF contract)
    // static confirmReservation(reservationId) {
    //     return axios.get(`${this.BASE_URL}/${reservationId}/confirmer`, {
    //         headers: this.getAuthHeader(),
    //         responseType: 'arraybuffer' // Ensure the response is treated as a binary file
    //     });
    // }
    static async confirmReservation(reservationId) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/${reservationId}/confirmer`, {
                    responseType: 'blob',
                    headers: {
                        ...this.getAuthHeader(), // Authentification si nécessaire
                        'Accept': 'application/pdf' // Indique que la réponse est un PDF
                    },
                    // Pour traiter la réponse en tant que blob
                }
            );

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            // Créer un objet URL pour le téléchargement du fichier
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `contrat_${idReservation}.pdf`);
            document.body.appendChild(link);
            link.click();

        } catch (error) {
            console.error('Erreur lors de la récupération du contrat:', error);
            throw new Error('Impossible de récupérer le contrat');
        }
    }



    // Archive a reservation
    static archiveReservation(reservationId) {
        return axios.put(`${this.BASE_URL}/${reservationId}/archive`, null, {
            headers: this.getAuthHeader()
        });
    }

    // Check vehicle availability
    static checkAvailability(matricule, startDate, endDate) {
        return axios.get(`${this.BASE_URL}/availability`, {
            headers: this.getAuthHeader(),
            params: {
                matricule: matricule,
                debut: startDate,
                fin: endDate
            }
        });
    }

    // Calculate the fixed charge for a reservation
    static calculateFixedCharge(reservationId) {
        return axios.get(`${this.BASE_URL}/${reservationId}/charge-fixe`, {
            headers: this.getAuthHeader()
        });
    }

    // Get reservations by status
    static getReservationsByStatus(status) {
        return axios.get(`${this.BASE_URL}/status/${status}`, {
            headers: this.getAuthHeader()
        });
    }

    // Get all reservations
    static getAllReservations() {
        return axios.get(this.BASE_URL, {
            headers: this.getAuthHeader()
        });
    }

    // Get paginated bookings
    static async getBookingpaginated(offset = 0, pageSize = 10) {
        try {
            const response = await axios.get(`${this.BASE_URL}/paginated`, {
                headers: this.getAuthHeader(),
                params: { offset, pageSize }
            });
            // Return the response data directly
            return response.data;
        } catch (err) {
            console.error('Error in getBookingpaginated:', err);
            throw err;
        }
    }
    // Nouvelle méthode pour récupérer les réservations d'un utilisateur
    static async getReservationsByUserId(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/reservations/user/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }
}

export default BookingService;
