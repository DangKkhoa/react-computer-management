import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        username,
        password,
      }, { withCredentials: true });

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data
    }
    catch(err) {
      console.error(err)
      return { status: 'failed', message: err.response?.data?.message || err.message }
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/auth/me", {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch(err => {
        console.error(err);
        logout();
      });
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
