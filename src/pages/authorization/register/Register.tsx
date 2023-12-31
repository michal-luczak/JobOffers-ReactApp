import NavBar from "../../../components/navbar/NavBar";
import React, {useEffect, useRef, useState} from "react";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RegisterCss from "./Register.module.css"
import FormCss from "../../Form.module.css"
import axios from "../../../api/axios";
import {AxiosError} from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{4,24}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current!.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [user, password, matchPassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PASSWORD_REGEX.test(password);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry!");
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({username: user, password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            setSuccess(true)
        } catch(err) {
            if (err instanceof AxiosError) {
                if (!err?.response)  {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username is taken');
                } else {
                    setErrMsg('Registration Failed');
                }
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current!.focus();
        }
    };

    return (
        <>
            {success ? (
                <>
                    <NavBar/>
                    <section className={FormCss.formSection}>
                        <div className={FormCss.successTitle}>
                            <h1>Success!</h1>
                        </div>
                        <div className={FormCss.success}>
                            <p>
                                <a href="/job-offers/login">Log in!</a>
                            </p>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <NavBar/>
                    <section className={FormCss.formSection}>
                        <form className={FormCss.form} onSubmit={handleSubmit}>
                            <h1 className={FormCss.title}>Register</h1>
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? FormCss.valid : FormCss.hide}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validName || !user ? FormCss.hide : FormCss.invalid}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="text"
                                   className={FormCss.inputField}
                                   id="username"
                                   ref={userRef}
                                   autoComplete="off"
                                   onChange={(e) => setUser(e.target.value)}
                                   required
                                   aria-invalid={validName ? "false" : "true"}
                                   aria-describedby="uidnote"
                                   onFocus={() => setUserFocus(true)}
                                   onBlur={() => setUserFocus(false)}/>
                            <p id="uidnote" className={userFocus && user && !validName ? RegisterCss.instructions : FormCss.hide}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                5 to 25 characters. <br/>
                                Must begin with a letter. <br/>
                                Letter, numbers, underscores, hyphens allowed.
                            </p>
                            {/*<AiOutlineUser className="input-icon"/>*/}
                            <label htmlFor="password">
                                Password:
                                <span className={validPassword ? FormCss.valid : FormCss.hide}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validPassword || !password ? FormCss.hide : FormCss.invalid}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="password"
                                   className={FormCss.inputField}
                                   id="password"
                                   autoComplete="off"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   aria-invalid={validPassword ? "false" : "true"}
                                   aria-describedby="pwdnote"
                                   onFocus={() => setPasswordFocus(true)}
                                   onBlur={() => setPasswordFocus(false)}/>
                            <p id="pwdnote" className={passwordFocus && !validPassword ? RegisterCss.instructions : FormCss.hide}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters. <br/>
                                Must includes uppercase and lowercase letters,<br/>
                                a number and a special character.<br/>
                                Allowed special characters:
                                <span aria-label={"exclamation mark"}>!</span>
                                <span aria-label={"at symbol"}>@</span>
                                <span aria-label={"dollar sign"}>$</span>
                                <span aria-label={"percent"}>%</span>
                            </p>
                            {/*<RiLockPasswordLine className="input-icon"/>*/}
                            <label htmlFor={"confirm_pwd"}>
                                Confirm password:
                                <span className={validMatch && matchPassword ? FormCss.valid : FormCss.hide}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validMatch || !matchPassword ? FormCss.hide : FormCss.invalid}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="password"
                                   className={FormCss.inputField}
                                   id="confirm_pwd"
                                   autoComplete="off"
                                   onChange={(e) => setMatchPassword(e.target.value)}
                                   required
                                   aria-invalid={validMatch ? "false" : "true"}
                                   aria-describedby="confirmnote"
                                   onFocus={() => setMatchPasswordFocus(true)}
                                   onBlur={() => setMatchPasswordFocus(false)}/>
                            <p id="confirmnote" className={matchPasswordFocus && !validMatch ? RegisterCss.instructions : FormCss.hide}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field.
                            </p>
                            {/*<RiLockPasswordLine className="input-icon"/>*/}
                            <button className={FormCss.submitButton} disabled={!validName || !validPassword || !validMatch}>
                                Sign up
                            </button>
                            <div className={FormCss.link}>
                                You have an account? <a href="/login">Log in</a>
                            </div>
                            <p ref={errRef} className={errMsg ? FormCss.errmsg : FormCss.hide} aria-live={"assertive"}>
                                {errMsg}
                            </p>
                        </form>
                    </section>
                </>
            )}
        </>
    )
}

export default Register