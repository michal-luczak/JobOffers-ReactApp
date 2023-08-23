import {useEffect, useState} from "react";
import './Offers.css';
import companyIcon from './companyIcon.png';
import salaryIcon from './salaryIcon.png';

interface Offer {
    uniqueID: string,
    url: number,
    companyName: string,
    jobName: string,
    salary: string
}

export default function Offers() {
    const [offers, setOffers] = useState<Offer[]>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/offers");
            const jsonData = await response.json();
            setOffers(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <ul id="offers-list">
            {offers && offers.map((offer) => (
                <li>
                    <a className="offer-link" href={`${offer.url}`}>
                        <div className="offer">
                            <h5>{offer.jobName}</h5>
                            <div className="offer-info">
                                <div className="offer-info-low">
                                    <img className="icon" src={companyIcon} alt="company icon"/>
                                    <p>{offer.companyName}</p>
                                </div>
                                <div className="offer-info-low">
                                    <img className="icon" src={salaryIcon} alt="company icon"/>
                                    <p >{offer.salary}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    )
}