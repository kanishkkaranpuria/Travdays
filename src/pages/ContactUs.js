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
    const [displayalert, setDisplayalert] = useState(false);
    const [temp , setTemp] = useState([])


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

    const phonenumber= (number) => {
        
        // if (number >= 9999999999){

        // }
        // console.log (number.length)
        // console.log (number)
        if (number.length == 10){
            // console.log("aum gay")
            setDisplayalert(false)
            setPhonenum(number)
            setTemp(number)
        }
        else if(number.length <= 10 && number.length > 0 ){
            // console.log("aum really gay")
            setDisplayalert(true)
            setTemp(number)
        }
        else if(number.length === 0 && number === "")
        {
            setDisplayalert(true)
            setTemp("") 
        }
    
    }
    
    
    // useEffect(() => {
    //     console.log(mainqueries[2])
        
    //     console.log(a)
    //     console.log("a")
    // }, [mainqueries])

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
        <div className=" section contact-us max-w-[1000px]rounded-lg p-8">
            <form className='flex flex-col'  onSubmit={submitquery}  action="">
                
                <div>
                    { !authenticated && <div className="">
                     <p className='flex items-center'>
                     <span className='w-52'>Enter your name :</span>
                     <input required type="text" placeholder ="Name" onChange={(e) => setName(e.target.value) } />
                     </p>
                    <p className='flex items-center'>
                    <span className='w-52'>Enter your email :</span> 
                    <input required type="email" placeholder = "Email" onChange={(e) => setEmail(e.target.value) } />
                    </p>
                </div>
                }
                    <p className='flex items-center'>
                    <span className='w-52'>Enter your Phone Number :</span>
                    <input type="number" placeholder = "9876543210" value={temp} onChange={(e) => phonenumber(e.target.value)} />
                    </p>
                    {displayalert && <p>number must contain 10 digits</p>}
                   
                    </div>
                
                       
             <div className='flex'>
             <p>your query is realted to :</p>
           
           <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
           <option id={i} value={i+1}>{mainqueries[keyName]}</option>   
            ))}   </select>          
            </div>    
                          
             enter your qwery: 
             <textarea placeHolder = "query..." name="" id="" cols="70" rows="6" onChange={(e) => setQuery(e.target.value) }></textarea>
             <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
             

            </form>
        </div>
     );
}
 
export default ContactUs;
