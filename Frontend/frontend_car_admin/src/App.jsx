import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard"; 
import Users from "./scenes/Users";
import Vehicles from "./scenes/Vehicles";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
// import Booking from "./scenes/Booking";
// import Payment from "./scenes/Payment";
// import Notifications from "./scenes/Notifications";
// import Calendar from "./scenes/Calendar";
// import Settings from "./scenes/Settings";


function App(){
    const [theme,colorMode]=useMode();
    const [isSidebar, setIsSidebar] = useState(true);


    return (<ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className="app">
                        <Sidebar isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar}/>
                            <Routes>
                                 <Route path="/" element={<Dashboard/>} />
                                <Route path="/users" element={<Users/>} />
                                <Route path="/vehicles" element={<Vehicles/>} />
                                <Route path="/login" element={<Login/>} />
                                <Route path="/registration" element={<Registration/>} />

                                {/*<Route path="/" element={<Booking/>} />
                                <Route path="/" element={<Payment/>} />
                                <Route path="/" element={<Notifications/>} />
                                <Route path="/" element={<Calendar/>} />
                                <Route path="/" element={<Settings/>} /> */}

                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
             </ColorModeContext.Provider>
       
        );
}
export default App;