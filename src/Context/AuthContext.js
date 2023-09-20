import { createContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";
export const AuthContext = createContext("");

export const AuthProvider = ({children}) => {
    const token = localStorage.getItem('authToken');
    const checktokenValid = async () => {
        console.log(token);
        if(!token) return;
        let tokenDetail = jwt_decode(token);
        let currentTimestamp = Math.floor(new Date().getTime() /1000);
        if(tokenDetail.exp < currentTimestamp){
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.reload();
        }
    }

    useEffect(()=>{
        checktokenValid();
    },[]);
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}