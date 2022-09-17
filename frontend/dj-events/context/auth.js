import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const register = async ({ username, email, password }) => {
    console.log({ username, email, password });
  };

  // Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();


    if (res.ok) {
      console.info(data)
      setUser(data.user);
    } else {
      console.error(data.data.message)
      setError(data.data.message);
      setTimeout(() => setError(null), 100);
    }
  };

  // Logout user
  const logout = async () => {
    console.log("logout");
    ("logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log("Check");
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
