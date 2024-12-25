import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes, useLocation } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Home from './pages_client/Home.jsx';
import HeaderC from "./components_client/global/Header/Header";
import FooterC from "./components_client/global/Footer/Footer";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline } from "@mui/material";
import Topbar from "../src/pages_admin/global/topbar";
import Sidebar from "../src/pages_admin/global/sidebar";
import Dashboard from "./pages_admin/dashboard";
import Users from "../src/pages_admin/Users";
import Vehicles from "../src/pages_admin/Vehicles";

const theme = createTheme();

function AppLayout({ children }) {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/login', '/registration'];

    return (
        <>
            {!noHeaderFooterRoutes.includes(location.pathname) && <HeaderC />}
            {children}
            {!noHeaderFooterRoutes.includes(location.pathname) && <FooterC />}
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
                    {/* Routes without Header/Footer */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />

                    {/* Client Routes */}
                    <Route
                        path="/"
                        element={
                            <AppLayout>
                                <Home />
                            </AppLayout>
                        }
                    />

                    {/* Admin Routes */}
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
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
