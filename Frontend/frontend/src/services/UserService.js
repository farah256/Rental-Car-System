import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8082/api/account"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-profile`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId){
        try{
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        const role = localStorage.getItem('role');
        console.log('Admin only check, role:', role);
        return this.isAuthenticated() && this.isAdmin();
    }
    // Get Users with pagination
    static async getPaginatedUsers(offset = 0, pageSize = 10) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${UserService.BASE_URL}/paginated`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    offset,
                    pageSize,
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async changeUserRole(userId, newRole) {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `${UserService.BASE_URL}/admin/${userId}/role?newRole=${newRole}`, // newRole as a query parameter
                {},
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }}


    export default UserService;
