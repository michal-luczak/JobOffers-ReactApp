import {useEffect, useState} from "react";
import OffersCss from './Offers.module.css';
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
            const response = await fetch("https://michal-luczak.pl/job-offers/api/offers");
            const jsonData = await response.json();
            setOffers(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <ul className={OffersCss.offersList}>
            {offers && offers.map((offer) => (
                <li>
                    <a href={`${offer.url}`}>
                        <div className={OffersCss.offer}>
                            <h5>{offer.jobName}</h5>
                            <div className={OffersCss.offerInfo}>
                                <div className={OffersCss.offerInfoLow}>
                                    <img className={OffersCss.icon} src={companyIcon} alt="company icon"/>
                                    <p>{offer.companyName}</p>
                                </div>
                                <div className={OffersCss.offerInfoLow}>
                                    <img className={OffersCss.icon} src={salaryIcon} alt="company icon"/>
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