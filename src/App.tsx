import React from 'react';
import logo from './logo.svg';
import './App.css';
import Offers from './components/Offers'
import {Link} from "react-router-dom";

export default function App() {

    return (
        <div className="App">
            <header className="App-header">
                <div className="Logo-and-name">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Job Offers</h1>
                </div>
                <ul>
                    <li>
                        <Link to="/login">Home</Link>
                    </li>
                    <li>
                        <Link to="/offers">Add Offer</Link>
                    </li>
                    <li>
                        <Link to="https://michal-luczak.pl">Back to personal Website</Link>
                    </li>
                    <div className="authorization">
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <Link to="/register">Sign up</Link>
                        </li>
                    </div>
                </ul>
            </header>
            <section>
                <Offers />
            </section>
        </div>
    );
}
