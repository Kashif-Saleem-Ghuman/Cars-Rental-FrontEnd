import axios from "axios";

const customFetch = axios.create({
	baseURL: 'https://car-rental-api-30ex.onrender.com',
});

export default customFetch;
