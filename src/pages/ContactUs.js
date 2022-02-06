import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import fullaxios from "../components/FullAxios";
import Logoutmodal from "../components/Logoutmodal";


const ContactUs = () => {

    const [email, setEmail] = useState();
    const [phonenum, setPhonenum] = useState();
    const [query, setQuery] = useState();
    const [name, setName] = useState();
    const [authenticated, setAuthenticated] = useState(false);
    const [mainqueries, setMainqueries] = useState([]);
    const history = useHistory();
    const [displayalert, setDisplayalert] = useState(false);
    const [temp, setTemp] = useState([])
    const [predefinedname, setPredefinedname] = useState(null)
    const [predefinedemail, setPredefinedemail] = useState(null)
    //modalll
    const [isopen, setIsopen] = useState(false);
  
  const Cancelmodal = () => {
      
    }
   


    useEffect(() => {
        
      //email)
    }, [email])


    const submitquery = (e) => {
        e.preventDefault();
        //"well this works")
        var d = document.getElementById("selected");


        // axios({
        //     method:'POST',
        //     url: 'http://127.0.0.1:8000/query/create ',   
        //     email:email,
        //     name:name,
        //     query:query,
        //     choice:e.value,
        // })
        fullaxios({
            url: 'query/create', type: 'post', data: {
                email: email,
                name: name,
                query: query,
                choice: d.value,
                phoneNumber: phonenum

            }
        })
            .then(res => {
                if (res) {

                    // alert("Form submission is complete! ")
                    setIsopen(true)
                    setTemp('')
                    setQuery('')
                    //"it worked")
                    // history.push('/')
                }
            })
            .catch(res => {
                //"hello didnt work")
                // if (res.status === 400)
                //     alert("invalid OTP!!")
            })




    }





    const phonenumber = (number) => {

        // if (number >= 9999999999){

        // }
        // console.log (number.length)
        // console.log (number)
        if (number.length == 10) {
            setDisplayalert(false)
            setPhonenum(number)
            setTemp(number)
        }
        else if (number.length <= 10 && number.length > 0) {
            setDisplayalert(true)
            setTemp(number)
        }
        else if (number.length === 0 && number === "") {
            setDisplayalert(true)
            setTemp("")
        }

    }



    useEffect(() => {

        fullaxios({ url: 'query/create' })
            .then(res => {
                if (res) {
                    setMainqueries(res.data);

                    // //res.data)
                }
            })
        // document.getElementById("name").setCustomValidity("Teawari gay and that is a fact");


    }, [])


    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                if (res) {
                    //res.data)
                    setPredefinedname(res.data.name)
                    setPredefinedemail(res.data.email)
                    // setName(res.data.name)
                    // setEmail(res.data.email)
                    // //"")
                    // history.push('/')1
                }
            })
            .catch(res => {
                //"hello didnt work")
                // if (res.status === 400)
                //     alert("invalid OTP!!")
            })
    }, [])

    //   setChoice = e.value;



    return (
        <div className=" section contact-us">
            <form className='flex flex-col mx-auto max-w-[800px] p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] sm:p-4 ' onSubmit={submitquery} action="">
                <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Contact Us</span>

                <div className='sm:pb-4'>
                
                    {!authenticated && <div className="">
                        <p className='flex items-center'>
                            <span className='w-52'>Enter your name :</span>
                            {predefinedname ?
                                <input required type="text" value={predefinedname} placeholder="Name" /> :
                                <input required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} maxLength={100}/>
                            }
                        </p>
                        <p className='flex items-center'>
                            <span className='w-52'>Enter your email :</span>
                            {predefinedemail ?
                                <input required type="email" value={predefinedemail} placeholder="Email" id="name" /> :
                                <input required type="email" placeholder="Email" id="name" onChange={(e) => setEmail(e.target.value)} maxLength={254}/>}
                        </p>
                    </div>
                    }
                    <p className='flex items-center sm:relative'>
                        <span className='w-52'>Enter your Phone Number :</span>
                        <input type="number" placeholder="9876543210" value={temp} onChange={(e) => phonenumber(e.target.value)} />
                        {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>}
                    </p>
                </div>


                <div className='flex items-center'>
                    <p className="w-52">Your query is realted to :</p>

                    <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
                        <option id={i} value={i + 1}>{mainqueries[keyName]}</option>
                    ))}   </select>
                </div>

                Enter your query:
                <textarea value={query} placeHolder="Query..." name="" id="" cols="70" rows="6" onChange={(e) => setQuery(e.target.value)} maxLength={1000}></textarea>
                <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  ' type="submit"  >submit</button>
               <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg="Thank you for contacting us" p1="Your response has been submitted" p2="One of our team member will be contacting you shortly" />
                {/* <Logoutmodal open={isopen} >
             <div className=" z-50 bg-black bg-opacity-50 inset-0 fixed" id="small-modal">
                <div  class=" xoverflow-y-auto overflow-x-hidden fixed left-1/3 top-1/3  justify-center items-center md:inset-0    sm:h-full" >
    <div class="relative px-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Thank you for contacting
                </h3>
                <button onClick={()=>{setIsopen(false)}} type="button" class=" animate-bounce text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="small-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Your response has been submitted 
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    you will be contacted by one of your crew members shortly
                </p>
            </div>
            
        </div>
    </div>
</div></div>
                </Logoutmodal> */}
            </form>
        </div>
    );
}

export default ContactUs;
