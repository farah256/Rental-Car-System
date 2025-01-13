import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Importation des composants de l'application
import Header from './components_client/global/Header/Header.jsx';
import Footer from './components_client/global/Footer/Footer.jsx';
import LoginPage from './Login';
import RegistrationPage from './Registration';
// Pages client
import Home from './pages_client/Home.jsx';
// Pages admin
import Dashboard from "./pages_admin/Dashboard";
import Vehicles from "./pages_admin/Vehicles/VehicleTable";
import Users from "../src/pages_admin/Users/index.jsx";
import CarCollection from "./pages_client/CarCollection.jsx";
import Topbar from "./pages_admin/global/Topbar.jsx";
import Sidebar from "./pages_admin/global/Sidebar.jsx";
import AddVehicle from "./pages_admin/Vehicles/AddVehicle";
import UpdateVehicle from "./pages_admin/Vehicles/UpdateVehicle";
import Settings from "./pages_admin/Settings/index.jsx"
import Booking from "./pages_admin/Booking/index.jsx"
import ContractView from "./pages_admin/Booking/contractView.jsx"
import Calendar from "./pages_admin/CalendarPage/index.jsx"

// Service utilisateur pour vérifier l'authentification et les rôles
import UserService from "./services/UserService.js";

const theme = createTheme();

function AppLayout({ children }) {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/login', '/registration'];

    return (
        <>
            {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
            {children}
            {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
}

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    {/* Routes publiques */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cars" element={<CarCollection />} />
                    <Route path="/registration" element={<RegistrationPage />} />

                    {/* Routes utilisateur authentifié */}
                    <Route
                        path="/"
                        element={
                            UserService.isAuthenticated() ? (
                                <AppLayout>
                                    <Home />
                                </AppLayout>
                            ) : (
                                <LoginPage />
                            )
                        }
                    />

                    {/* Routes administrateur */}
                    <Route
                        path="/admin/*"
                        element={
                            UserService.adminOnly() ? (
                                <div className="app">
                                    <Sidebar isSidebar={isSidebar} />
                                    <main className="content">
                                        <Topbar setIsSidebar={setIsSidebar} />
                                        <Routes>
                                            <Route path="" element={<Dashboard />} />
                                            <Route path="users" element={<Users />} />
                                            <Route path="vehicles" element={<Vehicles />} />
                                            <Route path="vehicles/add" element={<AddVehicle/>} />
                                            <Route path="vehicles/update/:matricule" element={<UpdateVehicle/>} />
                                            <Route path="settings/:userId" element={<Settings/>} />
                                            <Route path="booking" element={<Booking/>} />
                                            <Route path="booking/contract/:reservationId" element={<ContractView/>} />
                                            <Route path="calendar" element={<Calendar/>} />
                                        </Routes>
                                    </main>
                                </div>
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
