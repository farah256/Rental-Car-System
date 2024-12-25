import axios from 'axios';

class VehicleService {
    static BASE_URL = "http://localhost:8082/api/account/vehicules";

    // Get all vehicles
    static async getAllVehicles() {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get a vehicle by matricule (ID)
    static async getVehicleById(matricule) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/${matricule}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Add a new vehicle
    static async addVehicle(vehiculeDTO, file) {
        const formData = new FormData();
        formData.append("vehiculeDTO", JSON.stringify(vehiculeDTO));
        formData.append("image", file);

        try {
            const response = await axios.post(`${VehicleService.BASE_URL}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update a vehicle by matricule (ID)
    static async updateVehicle(matricule, vehiculeDTO, file) {
        const formData = new FormData();
        formData.append("vehiculeDTO", JSON.stringify(vehiculeDTO));
        formData.append("image", file);

        try {
            const response = await axios.put(`${VehicleService.BASE_URL}/api/admin/vehicule/${matricule}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            const response = await axios.delete(`${VehicleService.BASE_URL}/${matricule}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Search vehicles by keyword
    static async searchVehicles(keyword) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/search`, {
                params: {
                    keyword: keyword
                }
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
                params: {
                    offset: offset,
                    pageSize: pageSize
                }
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
                params: {
                    sortBy: sortBy,
                    direction: direction
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get vehicles by type
    static async getVehiclesByType(type) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/by-type/${type}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get vehicles by status
    static async getVehiclesByStatus(status) {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/by-status/${status}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get total number of vehicles
    static async getTotalNumberOfVehicles() {
        try {
            const response = await axios.get(`${VehicleService.BASE_URL}/total`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default VehicleService;
