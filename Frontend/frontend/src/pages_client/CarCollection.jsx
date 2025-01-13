import React, {useEffect, useState} from 'react';
import "../../../../Frontend/frontend/src/pages_client/index.css";
import VehicleService from "../services/VehiculeService.js";
import CarList from "../components_client/CarList/CarList.jsx";
import Filters from "../components_client/Filters/Filters.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';





// Main CarCollection Component
const CarCollection = () => {
    const [carList, setCarList] = useState([]);
    // Utilisation correcte de useEffect
    useEffect(() => {
        const fetchData = async () => {
            const vehicles = await VehicleService.getAllVehicles();
            console.log(vehicles); // Ajoutez un console.log pour vérifier les données
            setCarList(vehicles);
        };
        fetchData();
    }, []);

    return (

        <div className="page-container ">
            <div className="content-container mt-5 mb-5">
                    <h1 className="main-title">Our Collection of Cars</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input
                            type="search"
                            placeholder="Search"
                            className="search-input"
                        />
                    </div>

                    {/* Date Selection */}
                    <div className="date-container">
                        <div className="date-picker">
                            <label>Pick-up date</label>
                            <input type="date" className="date-input" />
                        </div>
                        <div className="date-picker">
                            <label>Drop-off date</label>
                            <input type="date" className="date-input" />
                        </div>
                        <button className="find-button">Find</button>
                    </div>

                    {/* Main Content Area */}
                    <div className="main-content">
                        <div className="filters-section">
                            <Filters />
                        </div>
                        <div className="cars-grid">
                            <CarList carList={carList} />
                        </div>
                    </div>
                </div>
        </div>)
};

export default CarCollection;