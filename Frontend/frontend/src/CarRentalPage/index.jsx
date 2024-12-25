// CarRentalPage.js
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './index.css';  // Assurez-vous que le chemin est correct

const CarRentalPage = () => {
    const [selectedDates, setSelectedDates] = useState({
        pickup: '',
        dropoff: ''
    });

    return (
        <div className="rental-page min-h-screen bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-serif text-white mb-12 text-center">Our Collection of Cars</h1>

                {/* Search Bar */}
                <div className="search-container relative w-full max-w-md mx-auto mb-12">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-6 py-3 rounded-full bg-gray-800 text-white border border-gray-700"
                    />
                    <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="flex gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-72 shrink-0">
                        <div className="filter-container bg-gray-800 p-8 rounded-xl">
                            {/* Year Filter */}
                            <div className="filter-group mb-8">
                                <h3 className="text-white text-lg mb-4">Year</h3>
                                <select className="w-full bg-gray-700 text-white p-3 rounded-lg">
                                    <option>2024</option>
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="filter-group mb-8">
                                <h3 className="text-white text-lg mb-4">Type</h3>
                                <div className="space-y-4">
                                    {['Sport (10)', 'SUV (8)', 'Classic (16)', 'Family (20)', 'Luxury (14)', 'Economy (14)'].map((type) => (
                                        <label key={type} className="filter-checkbox flex items-center text-white">
                                            <input type="checkbox" className="mr-3" />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="filter-group mb-8">
                                <h3 className="text-white text-lg mb-4">Brand</h3>
                                <select className="w-full bg-gray-700 text-white p-3 rounded-lg">
                                    <option>Select a brand</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="filter-group mb-8">
                                <h3 className="text-white text-lg mb-4">Price</h3>
                                <input
                                    type="range"
                                    className="price-slider w-full"
                                    min="0"
                                    max="300"
                                />
                                <div className="text-gray-400 text-sm mt-2">Max: $300.00/day</div>
                            </div>

                            <button className="search-button w-full bg-blue-600 text-white py-3 rounded-lg text-lg">
                                Search
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Date Picker */}
                        <div className="date-picker bg-white p-6 rounded-xl mb-8">
                            <div className="flex items-center justify-between">
                                <div className="date-field">
                                    <div className="text-gray-600 mb-2">Pick-up date</div>
                                    <input
                                        type="date"
                                        className="border p-2 rounded-lg"
                                        value={selectedDates.pickup}
                                        onChange={(e) => setSelectedDates({...selectedDates, pickup: e.target.value})}
                                    />
                                </div>
                                <div className="date-field">
                                    <div className="text-gray-600 mb-2">Drop-off date</div>
                                    <input
                                        type="date"
                                        className="border p-2 rounded-lg"
                                        value={selectedDates.dropoff}
                                        onChange={(e) => setSelectedDates({...selectedDates, dropoff: e.target.value})}
                                    />
                                </div>
                                <button className="find-button bg-blue-100 px-8 py-3 rounded-lg text-blue-800 font-medium">
                                    Find
                                </button>
                            </div>
                        </div>

                        {/* Car Grid */}
                        <div className="car-grid grid grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="car-card bg-gray-800 rounded-xl overflow-hidden">
                                    <img
                                        src="/api/placeholder/400/240"
                                        alt="Car"
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-white text-lg font-medium">Porsche Cayenne GTS 2022</h3>
                                        <div className="text-3xl text-white font-bold mt-4">
                                            ${item <= 3 ? [78.90, 94.90, 63.45][item - 1] : 35.90}
                                            <span className="text-sm text-gray-400 ml-1">/day</span>
                                        </div>
                                        <button className="rent-button w-full bg-black text-white py-3 rounded-lg mt-6 text-lg">
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CarRentalPage;