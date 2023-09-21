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

//Request Deposite
export const requestDesposit = async(obj)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');

            var formdata = new FormData();
            formdata.append("amount", obj.amount);
            formdata.append("message", obj.message);
            formdata.append("attachment", obj.attachment);  

            let result = await axios.post(`${BASEURL}/users/requestDesposit`,formdata,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'multipart/form-data'
              },});

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

//Get all deposite data
export const getdepositedata = async () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.get(`${BASEURL}/users/all`,{headers:{
                'x-access-token': `${accesstoken}`,
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