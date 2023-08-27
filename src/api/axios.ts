import axios from 'axios';

export default axios.create({
    baseURL: 'https://michal-luczak.pl/job-offers/api'
})