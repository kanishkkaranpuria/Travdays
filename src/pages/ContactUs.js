import { useState,useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";


const ContactUs = () => {

    const [email, setEmail] = useState();
    const [phonenum, setPhonenum] = useState();
    const [query,setQuery]= useState();
    const [name, setName] = useState();
    const [authenticated,setAuthenticated] = useState(false);
    const [mainqueries, setMainqueries] = useState([]);
    const history = useHistory();
    
    

    const submitquery = (e) => {
        e.preventDefault();
        console.log("well this works")
        var d = document.getElementById("selected");
        
       
        // axios({
        //     method:'POST',
        //     url: 'http://127.0.0.1:8000/query/create ',   
        //     email:email,
        //     name:name,
        //     query:query,
        //     choice:e.value,
        // })
        axios
        .post(`http://127.0.0.1:8000/query/create`,{
            email:email,
                name:name,
                query:query,
                choice:d.value,
        
          })
          .then(res => {
            console.log("it worked")
            history.push('/')
        })
        .catch(res => {
            console.log("hello didnt work")
            // if (res.status === 400)
            //     alert("invalid OTP!!")
        })
        
       

      
    }
    let a 
    useEffect(() => {
        console.log(mainqueries[2])
        
        console.log(a)
        console.log("a")
    }, [mainqueries])

    useEffect(() => {
         axios({
                method:'GET',
                url: 'http://127.0.0.1:8000/query/create ',   
                    })
                    .then(res=>{
                        setMainqueries(res.data);

                        // console.log(res.data)
                    })
                    
    }, [])
    
    //   setChoice = e.value;
    
     

    return ( 
        <div className=" section max-w-[1000px] p-box-shadow rounded-lg p-8 profile-img">
            <form className='flex flex-col'  onSubmit={submitquery}  action="">
                { !authenticated && <div className="">
                     <p className='flex items-center'>
                     <span className='w-24'>name :</span>
                     <input type="text" onChange={(e) => setName(e.target.value) } />
                     </p>
                    <p className='flex items-center'>
                    <span className='w-24'>email :</span> 
                    <input type="text" onChange={(e) => setEmail(e.target.value) } />
                    </p>
                    <p className='flex items-center'>
                    <span className='w-24'>phone no :</span>
                    <input type="text"   onChange={(e) => setPhonenum(e.target.value) } />
                    </p>
            
                   
                    </div>
                
                }       
             <div className='flex'>
             <p>your query is realted to :</p>
           
           <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
           <option id={i} value={i+1}>{mainqueries[keyName]}</option>   
            ))}   </select>          
            </div>    
                          
             enter your qwery: 
             <textarea name="" id="" cols="70" rows="6" onChange={(e) => setQuery(e.target.value) }></textarea>
             <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
             

            </form>
        </div>
     );
}
 
export default ContactUs;
