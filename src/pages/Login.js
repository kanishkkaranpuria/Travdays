import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";
import { Link } from 'react-router-dom';
import Logoutmodal from "../components/Logoutmodal";
import Registration from "./Registration";

const Login = ({setIsauthenticated,isopen,setIsopen}) => {


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otploginbool, setOtploginbool] = useState(false);
    const [otppagebool, setOtppagebool] = useState(false);
    const [otp, setOtp] = useState('');
    //modalll

    const history = useHistory()
    const [registrationPage, setRegistrationPage] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const submit_details = (e) => {
        e.preventDefault();
        setError(null)
        setShowLoading(true)
        console.log("i was heere")
        axios
            .post("/api/auth/login", {
                email: email,
                password: password
            })
            .then(res => {
                console.log("wtaf")
                console.log(res.data)
                setIsopen(true)
                // Cookie('setCookie','accesstoken', res.data.access_token, 1)
                setIsauthenticated(true)
                setShowLoading(false)
                history.push("/")
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }
    const changeboolvalue = () => {
        setShowLoading(false)
        setError(null)
        // if (otploginbool == true) {
        //     setOtploginbool(false);
        // } else {
        //     setOtploginbool(true);
        // }
        setOtploginbool(prev=>(!prev))
    }
    const request_otp = (e) => {
        e.preventDefault();
        setShowLoading(true)
        setError(null)
        axios
            .post("/api/auth/newotp", {
                email: email
            })
            .then(res => {
                setShowLoading(false)
                console.log(res.data)
                setOtppagebool(true)
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }
    const confirm_otp = (e) => {
        e.preventDefault();
        setShowLoading(true)
        setError(null)
        axios
            .post("/api/auth/login", {
                email: email,
                otp: otp
            })
            .then(res => {
                console.log(res.data)
                setIsauthenticated(true)
                setShowLoading(false)
                history.push("/")
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }
    return (
        <div className="bg-white w-[100%] h-[91vh] z-[10] flex loginpageflex justify-evenly items-center">
            <div className="flex flex-col m-2 loginpageshit loginpage">
                <p className=" text-8xl loginpagetext1 text-[rgb(4,108,109)]">Travdays </p>
                <p className=" pt-5 text-4xl loginpagetext2 sm:hidden">Your dream holiday is just a few clicks away.</p>
            </div>
            <div className="m-2 loginpage sm:w-full">
                {!otploginbool && !otppagebool && !registrationPage && <div className="flex flex-col mt-20 loginpagemargin min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                        <p className="text-4xl text-center">Log In</p>
                    <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 md:px-0 items-center justify-evenly" onSubmit={submit_details}>
                        <div type="email" className="email flex items-center">
                            {/* <p className="w-20">Email:</p > */}
                            <input placeholder="Email address" className="bg-white rounded-md" required type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="password flex items-center">
                            {/* <p className="w-20">Password:</p> */}
                            <input placeholder="Password" className="bg-white rounded-md mt-0" required type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error && <p className=" text-red-600 pb-2">{error}</p>}
                        <div className="flex items-center">
                            <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Log In</button>
                            {showLoading ? <img className="ml-2" src="/image/vF9DX0rAdyp.gif" alt="" /> : null}
                        </div>

                    </form>
                        <p className="text-blue-500 hover:underline cursor-pointer mt-4" onClick={changeboolvalue}>Forgot Password? Login via OTP</p>
                    <div className="flex flex-col items-center">
                        <p >New to Travdays?</p>
                        {/* <Link to="/register"> */}
                            <button onClick={()=>{setRegistrationPage(true); setShowLoading(false); setError(null)}} className="bg-[rgb(66,183,42)] hover:bg-[rgb(50,139,32)] text-white font-bold py-2 px-8 rounded-md">
                                Click here to Join
                            </button>
                        {/* </Link> */}
                    </div>
                </div>}

                {otploginbool && !otppagebool && !registrationPage && <div className="flex flex-col relative  mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick = {changeboolvalue} id="body_1" className="absolute top-8 left-8 cursor-pointer hover:bg-[rgb(194,194,194)] rounded-md" width="51" height="38">
                            {/* <p onClick={changeboolvalue}>Click here to Login using Password</p> */}
                            <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                    <g>
                                        <path d="M188.6 453.3L504.9 137L373 137L10 500L373 863L504.9 863L189.2 547.3L990 547.3L990 546.6L990 453.89996L990 453.19995L188.6 453.19995L188.6 453.3z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p className="text-4xl text-center">Log In</p>
                        <form className="flex flex-col h-full mx-auto md:px-0 max-w-[1000px] px-40 items-center justify-evenly" onSubmit={request_otp}>
                            {/* <p className="text-4xl text-center">Login Page</p> */}
                            <div type="email" className="email flex items-center">
                                <input required type="email" value={email} placeholder="Email address" className=" bg-white rounded-md" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {error && <p className=" text-red-600 pb-2">{error}</p>}
                            <div className="flex items-center">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-36 rounded-md">Request OTP</button>
                                {showLoading ? <img className="ml-2" src="/image/vF9DX0rAdyp.gif" alt="" /> : null}
                            </div>
                        </form>
                        <p>New to Travdays?<span onClick={()=>{setRegistrationPage(true);setShowLoading(false);setError(null)}} className="text-blue-500 hover:underline cursor-pointer">Click here to Register </span></p>
                    </div>}
                {otppagebool && !registrationPage && <div className="flex flex-col relative mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick = {()=>{setOtppagebool(false)}} id="body_1" className="absolute top-8 left-8 cursor-pointer hover:bg-[rgb(194,194,194)] rounded-md" width="51" height="38">
                            {/* <p onClick={changeboolvalue}>Click here to Login using Password</p> */}
                            <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                    <g>
                                        <path d="M188.6 453.3L504.9 137L373 137L10 500L373 863L504.9 863L189.2 547.3L990 547.3L990 546.6L990 453.89996L990 453.19995L188.6 453.19995L188.6 453.3z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p className="text-4xl text-center">Verify Email</p>
                   <form className="flex flex-col h-full mx-auto max-w-[1000px] md:px-0 px-40 items-center justify-evenly" onSubmit={confirm_otp}>
                        {/* <p className="text-4xl text-center">Enter the Otp sent in your Email</p> */}
                        <div type="email" className="email flex items-center">
                            {/* <p className="w-20">Email:</p > */}
                            <input placeholder="Email address"  value={email} className="bg-white rounded-md" required type="email" />
                        </div>
                        <div className="password flex items-center">
                            {/* <p className="w-20">Password:</p> */}
                            <input placeholder="OTP" className="bg-white rounded-md mt-0" required type="text" onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        {error && <p className=" text-red-600 pb-2">{error}</p>}
                        <div className="flex items-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-36 rounded-md">Log In</button>
                            {showLoading ? <img className="ml-2" src="/image/vF9DX0rAdyp.gif" alt="" /> : null}
                        </div>
                    </form>
                </div>}
                {registrationPage &&
                    <Registration registrationPage = {registrationPage} setRegistrationPage = {setRegistrationPage} setIsauthenticated={setIsauthenticated} />
                }
            </div>
        </div>

    );
}

export default Login;