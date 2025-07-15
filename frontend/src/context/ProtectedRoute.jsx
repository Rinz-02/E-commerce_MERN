
import React from 'react'
import { useContext } from 'react'
import { userContext } from './ContextProvider'
import { authContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children,roles}) {

      
    const{ authenticated,loading} = useContext(authContext);
    const role = localStorage.getItem("role");
    if(loading){
        return<div>Loading...</div>
    }
    if(!authenticated){
        return <Navigate to='/login'/>
    }

    if(!loading && !roles.includes(role)){
        return <Navigate to='/'/>
    }

    return children;
}

export default ProtectedRoute
