import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import logo from './logo.svg'
import './NavBar.css';
import AuthContext from "../../context/AuthProvider";
import {BiLogOut, BiSolidDownArrow} from "react-icons/bi";

const NavBar = () => {
    const authContext = useContext(AuthContext);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLogout = () => {
        authContext?.logout();
    };

    const handleClick = () => {
        const burgerButton = document.querySelector('.burger');
        const menu = document.querySelector('.main-bar');

        if (!menu || !burgerButton) {
            return;
        }

        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
        } else {
            menu.classList.toggle("active");
        }
    }

    return(
        <>
            <header className="App-header">
                <Link to="/" className="Logo-and-name">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Job Offers</h1>
                </Link>
                <ul className="main-bar">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/offers/new">Add Offer</Link>
                    </li>
                    <li>
                        <Link to="https://michal-luczak.pl">Back to personal Website</Link>
                    </li>
                    { authContext?.isLoggedIn
                        ? <li className="username">
                            <p onClick={() => setIsLoginOpen(!isLoginOpen)}>{authContext.username} <BiSolidDownArrow fontSize={"1rem"}/></p>
                            {isLoginOpen && (
                                <ul className="menu-dropdown">
                                    <li onClick={handleLogout}><BiLogOut/>Logout</li>
                                </ul>
                            )}
                        </li>
                        : <li className="authorization">
                            <li>
                                <Link to="/login">Log in</Link>
                            </li>
                            <li>
                                <Link to="/register">Sign up</Link>
                            </li>
                        </li>
                    }
                </ul>
                <button className="burger" onClick={() => handleClick()}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
            </header>
        </>
    )
}

export default NavBar;