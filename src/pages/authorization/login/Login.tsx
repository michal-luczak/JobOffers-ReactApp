import NavBar from "../../../components/navbar/NavBar";
import LoginCss from "./Login.module.css";
import React, {useRef, useState, useEffect, useContext, createContext} from "react";
import axios from "../../../api/axios";
import {AxiosError} from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import Cookies from 'js-cookie';
import {useAuth} from "../../../context/AuthProvider";

const LOGIN_URL = '/token';

const Login = () => {
    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>(null);

    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current!.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const token = response?.data?.token;
            console.log(token);
            Cookies.set('jwtToken', token, { httpOnly: true });
            login(user, token);
            setUser('');
            setPassword('');
            navigate(from, {replace: true});
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else {
                    setErrMsg('Login Failed');
                }
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current!.focus();
        }
    };

    return (
        <>
            <NavBar/>
            <section className={LoginCss.loginSection}>
                <form onSubmit={handleSubmit} className={LoginCss.loginForm}>
                    <h1 className={LoginCss.loginTitle}>Login</h1>
                    <label htmlFor="username">Username:</label>
                    <input
                        className={LoginCss.inputField}
                        type="text"
                        required
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    {/*<AiOutlineUser className="input-icon"/>*/}
                    <label htmlFor="password">Password:</label>
                    <input
                        className={LoginCss.inputField}
                        type="password"
                        required
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {/*<RiLockPasswordLine className="input-icon"/>*/}
                    <button className={LoginCss.loginButton}>Sign In</button>
                    <div className={LoginCss.registerLink}>
                        You have no account? <a href="/register">Sign up</a>
                    </div>
                    <p
                        ref={errRef}
                        className={errMsg ? LoginCss.errmsg : LoginCss.offscreen}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                </form>
            </section>
        </>
    );
};

export default Login;
