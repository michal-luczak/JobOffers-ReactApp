import {Link} from "react-router-dom";
import React from "react";
import logo from './logo.svg'
import './NavBar.css';

export default function NavBar() {
    return(
        <header className="App-header">
            <Link to="/" className="Logo-and-name">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>Job Offers</h1>
            </Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
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
    )
}