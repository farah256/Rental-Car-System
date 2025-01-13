import axios from 'axios';

class BookingService {
    static BASE_URL = "http://localhost:8082/api/account/reservations";

    // Helper method to get the authorization header
    static getAuthHeader() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return {
            'Authorization': `Bearer ${token}`,
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
    static confirmReservation(reservationId) {
        return axios.get(`${this.BASE_URL}/${reservationId}/confirmer`, {
            headers: this.getAuthHeader(),
            responseType: 'blob' // Ensure the response is treated as a binary file
        });
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
      static async getBookingpaginated(offset = 0, pageSize = 10) {
             try {
                 const response = await axios.get(`${BookingService.BASE_URL}/paginated`, {
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
        // Update the status of a reservation

        static async updateBookingStatus(reservationId, newStatus) {
                     try {
                         const response = axios.put(`${this.BASE_URL}/${reservationId}/status?newStatus=${newStatus}`, {}, {
                                                          headers: this.getAuthHeader()
                                                      });
                         // Return the response data directly
                         return response.data;
                     } catch (err) {
                         console.error('Error in getBookingupdated:', err);
                         throw err;
                     }
                 }
         // Get a reservation by id
             static async getReservationById(reservationId) {
                 try {
                     const response = await axios.get(`${this.BASE_URL}/${reservationId}`, {
                         headers: this.getAuthHeader()
                     });
                     return response;
                 } catch (err) {
                     throw err;
                 }
             }

}

export default BookingService;
