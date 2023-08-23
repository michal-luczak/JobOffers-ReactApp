import NavBar from "../components/navbar/NavBar";
import Offers from "../components/offer/Offers";
import React from "react";

const Home = () => {
    return (
        <>
            <NavBar />
            <section>
                <Offers/>
            </section>
        </>
    );
}

export default Home;