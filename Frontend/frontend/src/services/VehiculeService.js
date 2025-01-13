import axios from 'axios';

class VehicleService {
    static BASE_URL = "http://localhost:8082/api/account/vehicules";

    // Helper method to get the authorization header
      static getAuthHeader() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return { 'Authorization': `Bearer ${token}`,
                "Content-type":"application/json"

        };
    }

    // Get all vehicles
    static async getAllVehicles() {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get a vehicle by matricule (ID)
    static async getVehicleById(matricule) {
        try {
            const response = await axios.get(`${this.BASE_URL}/${matricule}`, {
                headers: this.getAuthHeader(),
                withCredentials: true
            });
            return response;
        } catch (err) {
            throw err;
        }
    }

    // Add a new vehicle
    static async addVehicle(formData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}`, formData,

                {
                    headers: {
                        ...this.getAuthHeader(),
                        "Content-Type": "multipart/form-data"
                    }
                });
            return response.data;
        }catch (err) {
            throw err;

        }
    }


    // Update a vehicle by matricule (ID)
    static async updateVehicle(matricule, formData) {
        try {
            const response = await axios.put(`${this.BASE_URL}/${matricule}`, formData, {
                headers: {
                    ...this.getAuthHeader(),
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    // Delete a vehicle by matricule (ID)
    static async deleteVehicle(matricule) {
        try {
            const response = await axios.delete(`${VehicleService.BASE_URL}/${matricule}`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Search vehicles by keyword
    static async searchVehicles(keyword) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/search`, {
                headers: this.getAuthHeader(),
                params: { keyword: keyword }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get vehicles with pagination
    static async getPaginatedVehicles(offset = 0, pageSize = 10) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/paginated`, {
                headers: this.getAuthHeader(),
                params: { offset, pageSize }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get sorted vehicles
    static async getSortedVehicles(sortBy, direction) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/sorted`, {
                headers: this.getAuthHeader(),
                params: { sortBy, direction }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get vehicles by type
    static async getVehiclesByType(type) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/by-type/${type}`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get vehicles by status
    static async getVehiclesByStatus(status) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/by-status/${status}`, {
                headers: this.getAuthHeader()
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }



    // Helper method to check if user has admin access
    static adminOnly() {
        const role = localStorage.getItem('role');
        return this.isAuthenticated() && this.isAdmin();
    }

    // Helper method to check if user is authenticated
    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    // Helper method to check if user has admin role
    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    // Helper method to check if user has user role
    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }
}

export default VehicleService;
