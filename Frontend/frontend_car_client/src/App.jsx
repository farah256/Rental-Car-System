import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes, useLocation } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Home from './pages/Home.jsx';
import Header from "./components/global/Header/Header";
import Footer from "./components/global/Footer/Footer";

const theme = createTheme({
    // You can customize your theme here
});

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
    return (
        <ThemeProvider theme={theme}>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </AppLayout>
        </ThemeProvider>
    );
}

export default App;
