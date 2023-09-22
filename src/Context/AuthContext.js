import { createContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { getuserDetail } from '../ApiHelpers';
export const AuthContext = createContext("");

export const AuthProvider = ({children}) => {
    const [userDetail,setUserdetail] = useState({username:"",mainWallet:0,investmentWallet:0,email:'',mobileNo:'',userId:""});
    const token = localStorage.getItem('authToken');

    const getUserDetails = async () => {
        if(!token) return;
        try{
            let result = await getuserDetail();
            setUserdetail(result.result);
        }catch(err){
            console.log(err);
        }
    }

    const checktokenValid = async () => {        
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
        getUserDetails();
    },[]);
    return (
        <AuthContext.Provider value={{userDetail,getUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}