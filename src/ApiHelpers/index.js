import axios from "axios";
import { BASEURL } from "../Constants";

/*
*************** CALL API HERE *******************************
*/

// LOGIN
export const login = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/signin`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

// REGISTER
export const register = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/signup`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}