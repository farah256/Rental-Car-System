import React from 'react';
// import "../../App.css";
import  "../../pages_client/index.css";

// Filters Component
const Filters = () => {
    const years = ["2022", "2023", "2024"];
    const types = ["Sport (10)", "SUV (12)", "Classic (16)", "Family (20)", "Luxury (14)", "Economy (14)"];

    return (
        <div className="filters-container">
            {/* Year Filter */}
            <div className="filter-section">
                <h3 className="filter-title">Year</h3>
                <select className="filter-select">
                    <option value="">2024</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Type Filter */}
            <div className="filter-section">
                <h3 className="filter-title">Type</h3>
                <div className="checkbox-group">
                    {types.map((type) => (
                        <div key={type} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={type}
                                name={type}
                                className="filter-checkbox"
                            />
                            <label htmlFor={type} className="checkbox-label">
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/*/!* Brand Filter *!/*/}
            {/*<div className="filter-section">*/}
            {/*    <h3 className="filter-title">Brand</h3>*/}
            {/*    <select className="filter-select">*/}
            {/*        <option value="">Select a brand</option>*/}
            {/*        <option value="porsche">Porsche</option>*/}
            {/*        <option value="bmw">BMW</option>*/}
            {/*        <option value="mercedes">Mercedes</option>*/}
            {/*    </select>*/}
            {/*</div>*/}

            {/* Price Filter */}
            <div className="filter-section">
                <h3 className="filter-title">Price</h3>
                <div className="range-container">
                    <input
                        type="range"
                        min="0"
                        max="3000"
                        defaultValue="1500"
                        className="filter-range"
                    />
                    <div className="range-labels">
                        <span>$0</span>
                        <span>Max. $3000.00/day</span>
                    </div>
                </div>
            </div>

            <button className="search-btn">Search</button>
        </div>
    );
};

export default Filters;