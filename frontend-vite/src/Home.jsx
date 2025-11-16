import React from "react";
const { useState, useEffect } = React;
import { useNavigate } from "react-router-dom";
import NavButton from "./components/navButton";


function Home() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Home Page</h1>
            <NavButton to="/all-reservations">View All Reservations</NavButton>
            <NavButton to="/customers">View All Customers</NavButton>
            <NavButton to="/over-average">Over Average</NavButton>

        </>
    );
}

export default Home;