import React from "react";
import Banner from "../components_client/Banner/Banner.jsx";
import Search from "../components_client/Search/Search.jsx";
import Statistics from "../components_client/Statistics/index.jsx";
import HowItWorks from "../components_client/HowItWorks/HowItWorks.jsx";
import Map from "../components_client/Map/Map.jsx";

const Home = () => {
      return (
        <>
            <Banner />
            <Search/>
            <Statistics/>
            <HowItWorks/>
            <Map />

        </>
    )
}

export default Home;