import {useParams} from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

export default function Offer() {
    const {id} = useParams()

    return (
        <div className="Offer">
            <NavBar/>
        </div>
    )
}