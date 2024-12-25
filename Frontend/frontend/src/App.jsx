import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline } from "@mui/material";

// Importation des composants de l'application
import Navbar from './components_client/global/Header/Header.jsx';
import FooterComponent from './components_client/global/Footer/Footer.jsx';
import LoginPage from './Login';
import RegistrationPage from './Registration';

// Pages clients
import Home from './pages_client/Home.jsx';

// Pages administrateur
import Topbar from "../src/pages_admin/global/topbar";
import Sidebar from "../src/pages_admin/global/sidebar";
import Dashboard from "./pages_admin/dashboard";
import Users from "../src/pages_admin/Users";
import Vehicles from "./pages_admin/Vehicles";

// Service utilisateur pour vérifier l'authentification et les rôles
import UserService from './service/UserService.js';

const theme = createTheme();

function AppLayout({ children }) {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/login', '/registration'];

    return (
        <>
            {!noHeaderFooterRoutes.includes(location.pathname) && <Navbar />}
            {children}
            {!noHeaderFooterRoutes.includes(location.pathname) && <FooterComponent />}
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
                {/* Le BrowserRouter doit être ici, au niveau de l'app */}
                <Routes>
                    {/* Routes publiques */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />

                    {/* Routes client */}
                    <Route
                        path="/"
                        element={
                            <AppLayout>
                                <Home />
                            </AppLayout>
                        }
                    />

                    {/* Routes administrateur */}
                    {UserService.adminOnly() && (
                        <Route
                            path="/admin/*"
                            element={
                                <div className="app">
                                    <Sidebar isSidebar={isSidebar} />
                                    <main className="content">
                                        <Topbar setIsSidebar={setIsSidebar} />
                                        <Routes>
                                            <Route path="" element={<Dashboard />} />
                                            <Route path="users" element={<Users />} />
                                            <Route path="vehicles" element={<Vehicles />} />
                                        </Routes>
                                    </main>
                                </div>
                            }
                        />
                    )}

                    {/* Routes utilisateurs authentifiés */}
                    {UserService.isAuthenticated() && (
                        <Route
                            path="/"
                            element={
                                <AppLayout>
                                     <Home />
                                </AppLayout>
                            }
                        />
                    )}

                    {/* Redirection si aucune route ne correspond */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
