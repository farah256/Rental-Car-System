import React from 'react';
import './Banner.css';
import {useNavigate} from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    const handleSeeAllCars = () => {
        navigate('/cars');
    };
    return (
        <section className="banner-container">
            <img
                src="../../../public/images_client/Screenshot%202024-12-07%20at%2013.24.01.png"
                alt="Banner"
                className="banner-image"
            />
            <div className="content-overlay">
                <div className="text-content">
                    <h2 className="banner-heading">
                        Your Journey, Your<br />
                        Car, Your Way.
                    </h2>
                    <p className="banner-text">
                        Choose the perfect car for your adventure, from city drives to road
                        trips. Enjoy flexibility, comfort, and safety with our reliable rental
                        service. Travel your way, every time.
                    </p>
                    <div className="button-group">
                        <button className="banner-btn book-now" >
                            Book Now
                        </button>
                        <button className="banner-btn see-all" onClick={handleSeeAllCars}>
                            See all Cars
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;