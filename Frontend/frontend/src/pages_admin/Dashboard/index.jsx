import { Box } from "@mui/material";
import Header from "../../components_admin/Header";


const Dashboard = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Dashboard" subtitle="Welcome to your dashbord" />

            </Box>
        </Box>
    )
}
export default Dashboard;