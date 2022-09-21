import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // register
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok && data.user) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.data.message);
    }
  };

  // login
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

    const json = await res.json();
    const userData = json.user;

    if (res.ok) {
      setUser(userData);
      router.push("/account/dashboard");
    } else {
      setError(json.data.message);
      setTimeout(() => {setError(null)}, 400);
    }
  };

  // logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);      
      setTimeout(() => {router.push("/")}, 400); /* 1 */
    }
  };

  useEffect(() => {
    checkUserLoggedIn(user);
  }, []);

  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

/**
 * 1. https://stackoverflow.com/questions/65706201/what-is-the-cause-of-loading-initial-props-cancelled-in-nextjs
 */