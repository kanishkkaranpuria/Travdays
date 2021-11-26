import { useEffect } from "react";
import Cookie from "../components/Cookie";
import fullaxios from "../components/FullAxios";

const Logout = () => {
    useEffect(()=>{
        // axiosInstance
        // .get('/api/auth/logout')
        fullaxios({url : 'auth/logout'})
        .then(res =>{
            console.log("here",res.data)
            // Cookie('setCookie',"accesstoken",0,-1)
            Cookie('setCookie',"csrftoken", 0, -1)
            Cookie('setCookie',"sessionid", 0, -1)
        })
        .catch(err=>
            console.log(err.data))
            
        },[])
            return(
            <div><h1>logout</h1></div>
            )
}
 
export default Logout;