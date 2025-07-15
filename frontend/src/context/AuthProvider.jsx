import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

function AuthProvider({children}) {
  const navigate = useNavigate();  
  const [role, setRole] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthenticated(false);
        setRole("");
        setUser(null);
        setLoading(false);
        return;
      }

      try{
        const res = await axios.get("http://localhost:8080/auth/userData", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(res.data.user){
            setAuthenticated(true);
            setRole(res.data.user.role);
            setUser(res.data.user);

        }else{
            logout();
        }

       
      }catch(err){
         console.log("Auth check failed:", err);
        logout();
      }
      finally{
        setLoading(false);  
      }
    };
    checkUser();
    
  },[]);

  const login = ({token,role}) => {
    localStorage.setItem("token",token);
    localStorage.setItem("role" , role)    
    setAuthenticated(true);
    setRole(role);

  
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthenticated(false);
    setRole('');
    setUser(null);
  }

  return <authContext.Provider value={{
    authenticated,
    role,
    user,
    loading,
    login,
    logout
  }}>
    {children}
  </authContext.Provider>;
}

export default AuthProvider;
