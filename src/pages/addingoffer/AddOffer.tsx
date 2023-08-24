import NavBar from "../../components/navbar/NavBar";
import AddOfferCss from "./AddOffer.module.css"
import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import {AxiosError} from "axios";
import FormCss from "../Form.module.css"

export default function AddOffer() {
    const authContext = useContext(AuthContext);

    const [isSuccess, setSuccess] = useState(false);

    const errRef = useRef<HTMLParagraphElement>(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setMsg('');
    }, []);

    const [offer, setOffer] = useState({
        offerUrl: '',
        company: '',
        title: '',
        salary: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!authContext?.isLoggedIn || !authContext?.token) {
            console.error('Użytkownik nie jest zalogowany.');
            return;
        }

        try {
            const response = await axios.post(
                '/offers',
                offer,
                {
                    headers: {
                        Authorization: `Bearer ${authContext.token}`,
                    },
                }
            );
            setSuccess(true);
            setMsg('Offer has been added')
        } catch (error) {
            setSuccess(false)
            if (error instanceof AxiosError) {
                if (!error.response) {
                    setMsg('No Server Response');
                } else if (error.response?.status === 401) {
                    setMsg('Unauthorized');
                } else if (error.response?.status === 409) {
                    setMsg('Offer already exists');
                } else {
                    setMsg('Offer adding failed');
                }
            } else {
                setMsg('Offer adding failed');
            }
        }
    }

    return (
        <>
            <NavBar/>
            <section className={FormCss.formSection}>
                <form className={FormCss.form} onSubmit={handleSubmit}>
                    <h1 className={FormCss.title}>New offer</h1>
                    <label htmlFor="jobTitle">Job title:</label>
                    <input className={FormCss.inputField}
                           type="text"
                           id="jobTitle"
                           required
                           onChange={(e) => setOffer({
                               ...offer,
                               title: e.target.value
                           })}
                    />
                    {/*<IoIosMan className="input-icon"/>*/}
                    <label htmlFor="companyName">Company name:</label>
                    <input className={FormCss.inputField}
                           type="text"
                           id="companyName"
                           required
                           onChange={(e) => setOffer({
                               ...offer,
                               company: e.target.value
                           })}
                    />
                    {/*<HiOutlineBuildingOffice2 className="input-icon"/>*/}
                    <label htmlFor="salary">Salary:</label>
                    <input className={FormCss.inputField}
                           type="text"
                           id="salary"
                           required
                           onChange={(e) => setOffer({
                               ...offer,
                               salary: e.target.value
                           })}
                    />
                    {/*<GiReceiveMoney className="input-icon"/>*/}
                    <label htmlFor="offerUrl">Url:</label>
                    <input className={FormCss.inputField}
                           type="text"
                           id="offerUrl"
                           required
                           onChange={(e) => setOffer({
                               ...offer,
                               offerUrl: e.target.value
                           })}
                    />
                    {/*<AiOutlineLink className="input-icon"/>*/}
                    <button className={FormCss.submitButton} type="submit">Add new offer</button>
                    <p
                        ref={errRef}
                        className={isSuccess ? AddOfferCss.successMsg : msg ? FormCss.errmsg : FormCss.hide}
                        aria-live="assertive"
                    >
                        {msg}
                    </p>
                </form>
            </section>
        </>
    )
}
