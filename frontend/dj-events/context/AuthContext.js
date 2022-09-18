import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  /**
   * @name register-user
   */
  const register = async ({ username, email, password }) => {
    console.log({ username, email, password });
  };

  /**
   * @name login
   */
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
      router.push('/account/dashboard')
    } else {
      setError(json.data.message);
      setError(null);
    }
  };

  /**
   * @name logout-user
   */
  const logout = async () => {
    console.log("logout");
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  /**
   * @warning useEffect infinite look
   * setUser(string)
   */
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    console.log('checkUserLoggedIn data', data)

    if (res.ok) {
      
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
