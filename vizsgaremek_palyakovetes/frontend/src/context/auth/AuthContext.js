import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8080/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    console.log(res.token);
  };

  const logout = async () => {
    await axios.get("http://localhost:8080/auth/logout", {
      withCredentials: true,
    });
    setCurrentUser(null);
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
