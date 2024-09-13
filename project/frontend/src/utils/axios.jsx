import axios from "axios";

const instance = axios.create({
	baseURL: "http://backend:3000/api",
	withCredentials: true
});

export default instance;
