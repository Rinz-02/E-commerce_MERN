import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'

export  const userContext = createContext();

const ContextProvider = ({children}) => {
    const [role,setRole] = useState('');
    const [authenticated,setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            
        const token = localStorage.getItem("token");
        if(!token){
            setAuthenticated(false);
            setRole('');
        }
        try{
        const res =  await axios.get('http://localhost:8080/auth/userData' , {headers : {
            Authorization: `Bearer ${token}`,
        }});
        
        if(res.data && res.data.user){
            setAuthenticated(true);
            setRole(res.data.user.role);
        }else{
            setAuthenticated(false);
            setRole('');
        }
        }catch(err){
            console.log("Error fetching userData",err);
            setAuthenticated(false);
            setRole('');
        }
        }
        fetchUserData();
    },[])
    return(
        <userContext.Provider value={{role,authenticated,setRole,setAuthenticated}}>
            {children}
        </userContext.Provider>
    )
}

export default ContextProvider;