import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import fullaxios from "../components/FullAxios";


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

                    alert("Form submission is complete! ")
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
            <form className='flex flex-col mx-auto max-w-[800px] p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] ' onSubmit={submitquery} action="">
                <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Contact Us</span>

                <div className='sm:pb-4'>
                
                    {!authenticated && <div className="">
                        <p className='flex items-center'>
                            <span className='w-52'>Enter your name :</span>
                            {predefinedname ?
                                <input required type="text" value={predefinedname} placeholder="Name" /> :
                                <input required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            }
                        </p>
                        <p className='flex items-center'>
                            <span className='w-52'>Enter your email :</span>
                            {predefinedemail ?
                                <input required type="email" value={predefinedemail} placeholder="Email" id="name" /> :
                                <input required type="email" placeholder="Email" id="name" onChange={(e) => setEmail(e.target.value)} />}
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
                    <p className="w-52">your query is realted to :</p>

                    <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
                        <option id={i} value={i + 1}>{mainqueries[keyName]}</option>
                    ))}   </select>
                </div>

                enter your qwery:
                <textarea value={query} placeHolder="query..." name="" id="" cols="70" rows="6" onChange={(e) => setQuery(e.target.value)}></textarea>
                <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>



            </form>
        </div>
    );
}

export default ContactUs;
