import axios from 'axios';

class DashboardService {
    static BASE_URL = "http://localhost:8082/api/account";

    static getAuthHeader() {
        const token = localStorage.getItem('token');
        console.log(token);  // Check if the token is valid

        if (!token) {
            throw new Error('No authentication token found');
        }
        return {
            'Authorization': `Bearer ${token}`,
        };
    }

    // Get total number of vehicles
    static async getTotalVehicles() {
        try {
            const response = await axios.get(`${DashboardService.BASE_URL}/vehicules/total/vehicles`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching total vehicles:", err);
            throw err;  // Re-throw error after logging
        }
    }

    // Get total number of clients
    static async getTotalClients() {
        try {
            const response = await axios.get(`${DashboardService.BASE_URL}/total/clients`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching total clients:", err);
            throw err;
        }
    }

    // Get total number of bookings
    static async getTotalBookings() {
        try {
            const response = await axios.get(`${DashboardService.BASE_URL}/reservations/total/bookings`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching total bookings:", err);
            throw err;
        }
    }
}

export default DashboardService;
