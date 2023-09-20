import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('authToken');
    

    if(!token){
        return <Navigate to="/login" replace />
    }else{
    return children;        
    }
}

export default ProtectedRoute;