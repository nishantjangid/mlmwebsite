import { createContext, useEffect } from 'react';
export const UserDetailContext = createContext("");
import {getuserDetail} from "../ApiHelpers";

export const UserdetailProvider = ({children}) => {
    const [userData, setuserData] = useState(null);
    const getuserdata = async()=>{
            try{
                let data = await getuserDetail();   
                if(result){
                    setuserData(data);
                }  
            }catch(err){
                console.log(err,'err');
            }   
    }
    useEffect(()=>{
        getuserdata();
    },[])

   
    return (
        <UserDetailContext.Provider value={{userData}}>
            {children}
        </UserDetailContext.Provider>
    )
}