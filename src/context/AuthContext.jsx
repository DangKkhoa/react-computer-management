import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        username,
        password,
      }, { withCredentials: true });

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    }
    catch(err) {
      console.error(err)
      return { status: 'failed', message: err.response?.data?.message || err.message }
    }
    finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setUser(null);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/logout', {}, {
        withCredentials: true
      });

      if(res.status === 200) {
        navigate('/login');
      }
      else {
        alert('Something went wrong while logging out');
      }
    }
    catch(err) {
      console.log(err);
      navigate('/login');
    }
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
      })
      .finally(() => { 
        setIsLoading(false);
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
