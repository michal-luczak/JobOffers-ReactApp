import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import logo from './logo.svg'
import NavbarCss from './NavBar.module.css';
import AuthContext from "../../context/AuthProvider";
import {BiLogOut, BiSolidDownArrow} from "react-icons/bi";

const NavBar = () => {
    const authContext = useContext(AuthContext);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLogout = () => {
        authContext?.logout();
    };

    const handleClick = () => {
        const burgerButton = document.querySelector('.' + NavbarCss.burger);
        const menu = document.querySelector('.' + NavbarCss.mainBar);

        if (!menu || !burgerButton) {
            return;
        }

        if (menu.classList.contains(NavbarCss.active)) {
            menu.classList.remove(NavbarCss.active);
        } else {
            menu.classList.toggle(NavbarCss.active);
        }
    }

    return(
        <>
            <header className={NavbarCss.AppHeader}>
                <Link to="/" className={NavbarCss.LogoAndName}>
                    <img src={logo} alt="logo"/>
                    <h1>Job Offers</h1>
                </Link>
                <ul className={NavbarCss.mainBar}>
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
                        ? <li className={NavbarCss.username}>
                            <p onClick={() => setIsLoginOpen(!isLoginOpen)}>{authContext.username} <BiSolidDownArrow fontSize={"1rem"}/></p>
                            {isLoginOpen && (
                                <ul className={NavbarCss.menuDropdown}>
                                    <li onClick={handleLogout}><BiLogOut/>Logout</li>
                                </ul>
                            )}
                        </li>
                        : <li className={NavbarCss.authorization}>
                            <li>
                                <Link to="/login">Log in</Link>
                            </li>
                            <li>
                                <Link to="/register">Sign up</Link>
                            </li>
                        </li>
                    }
                </ul>
                <button className={NavbarCss.burger} onClick={() => handleClick()}>
                    <div className={NavbarCss.line}></div>
                    <div className={NavbarCss.line}></div>
                    <div className={NavbarCss.line}></div>
                </button>
            </header>
        </>
    )
}

export default NavBar;