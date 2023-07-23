import {useParams} from "react-router-dom";

export default function Offer() {
    const {id} = useParams()

    return <div>{id}</div>
}