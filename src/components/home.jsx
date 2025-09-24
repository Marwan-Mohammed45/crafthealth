import React from "react";
import Hero from "../pages/Hero";
import LaptopHero from "../pages/LaptopHero";
import Benefits from "../pages/Benefits";
import Warnings from "../pages/Warnings";
import Departments from "../pages/Departments";
import MarqueeDepartments from "../pages/MarqueeDepartments";
import TitlesWithSideImage from "../pages/TitlesWithSideImage";
import TitlesWithSideImageReversed from "../pages/TitlesWithSideImageReversed";
import TitlesWithSideImageRight from "../pages/TitlesWithSideImageRight";


const Home = () => {
    return (
        <>
            <Hero/>
            <LaptopHero/>
            <Benefits/>
            <Warnings/>
            <Departments/>
            <MarqueeDepartments/>
            <TitlesWithSideImage/>
            <TitlesWithSideImageReversed/>
            <TitlesWithSideImageRight/>
            
        </>
    )
}

export default Home;