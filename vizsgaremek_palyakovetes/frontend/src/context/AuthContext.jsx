import axios from "../utils/axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	const login = async (inputs) => {
		try {
			const response = await axios.post("/auth/login", inputs);
			setCurrentUser(response.data.user);
			return response.data.user;
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		await axios.post("/auth/logout");
		setCurrentUser(null);
		toast.success("Sikeres kijelentkeztél!");
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
