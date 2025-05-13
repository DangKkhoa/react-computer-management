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

      // console.log(res.data);
      if(res.data.status === 'success') {
        setUser(res.data.data);
        // console.log(res.data);
        return res.data;
      }

    }
    catch(err) {
      console.error(err)
      setIsLoading(false);
      return { status: 'failed', message: err.response?.data?.message || err.message }
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // console.log(user);
  }, [user]);

  const logout = async () => {

    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/logout', {}, {
        withCredentials: true
      });
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setUser(null);
    }
  }

  useEffect(() => {

    axios.get("http://localhost:3000/api/v1/auth/me", {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data.user);
        // console.log(res.data.user);
      })
      .catch(err => {
        console.error(err);
        setUser(null);
        // navigate('/login');
      })
      .finally(() => { 
        setIsLoading(false);
      });
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
