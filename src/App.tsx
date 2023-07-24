import React from 'react';
import './App.css';
import Offers from './components/offer/Offers'
import NavBar from "./components/navbar/NavBar";

export default function App() {

    return (
        <div className="App">
            <NavBar />
            <section>
                <Offers />
            </section>
        </div>
    );
}
