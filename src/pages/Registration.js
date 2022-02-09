import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";

const Registration = ({setIsauthenticated, setRegistrationPage, registrationPage}) => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bool, setBool] = useState(true);
    const [otp, setOtp] = useState('');
    const [otpReg, setOtpReg] = useState(false);
    const history = useHistory()
    const [showLoading, setShowLoading] = useState(false)
    const [error, setError] = useState(null)

    const submit_details = (e) => {
        e.preventDefault();
        if (password !== password2){
            setError("Password 1 and 2 do not match")
        }
        else{
        setError(null)
        setShowLoading(true)
        console.log("i was heere")
        axios
            .post("/api/auth/register", {
                email: email,
                name: name,
                password: password,
                password2: password2
            })
            .then(res => {
                console.log(res.data)
                setBool(false)
                setShowLoading(false)
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
        }

    }

    const submit_details2 = (e) => {
        e.preventDefault();
        setError(null)
        setShowLoading(true)
        console.log("i was heere")
        axios
            .post("/api/auth/register", {
                email: email,
                name: name
            })
            .then(res => {
                console.log(res.data)
                setBool(false)
                setShowLoading(false)
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }

    const submit_otp = (e) => {
        e.preventDefault();
        setError(null)
        setShowLoading(true)
        console.log("i was heere")
        axios
            .post("/api/auth/accountverification", {
                email: email,
                otp: otp
            })
            .then(res => {
                console.log(res.data)
                setShowLoading(false)
                if (otpReg===false){
                submit_login_details()
                }else
                {
                    console.log("tokens should be set")
                    setIsauthenticated(true)
                    history.push("/")
                }
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }
    const submit_login_details = () => {
        // e.preventDefault();
        setError(null)
        setShowLoading(true)
        console.log("i was heere")
        axios
            .post("/api/auth/login", {
                email: email,
                password: password
            })
            .then(res => {
                setShowLoading(false)
                console.log(res.data)
                setIsauthenticated(true)
                history.push("/")
            })
            .catch(err => {
                console.log("thisssssss",err.response.data.error)
                setShowLoading(false)
                setError(err.response.data.error)
            })
    }

    const view_otp_registration = () => {
        setError(null)
        setShowLoading(false)
        setOtpReg(prev=>(!prev))
    }

    return (<>
        {!otpReg && bool && <div className="flex flex-col relative mt-20 min-h-[500px] pt-5 pb-2 mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setRegistrationPage(false); setShowLoading(false); setError(null)}} id="body_1" className="absolute top-8 left-8 cursor-pointer hover:bg-[rgb(194,194,194)] rounded-md" width="51" height="38">
                            {/* <p onClick={changeboolvalue}>Click here to Login using Password</p> */}
                            <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                    <g>
                                        <path d="M188.6 453.3L504.9 137L373 137L10 500L373 863L504.9 863L189.2 547.3L990 547.3L990 546.6L990 453.89996L990 453.19995L188.6 453.19995L188.6 453.3z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </svg>
            <form className="flex flex-col h-full mx-auto max-w-[1000px] mb-6 px-40 md:px-0 sm:px-0 items-center justify-center" onSubmit={submit_details}>
                <p className="text-4xl text-center mb-2">Sign Up</p>
                <div type="email" className="email flex items-center">
                    {/* <p className="w-40">Enter Email:</p > */}
                    <input required type="email" value ={email}className="bg-white rounded-md"  placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div type="name" className="email flex items-center">
                    {/* <p className="w-40">Enter Name:</p > */}
                    <input required type="text"className="bg-white rounded-md mt-0" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="password flex items-center">
                    {/* <p className="w-40">Enter Password:</p> */}
                    <input required type="password" className="bg-white rounded-md mt-0" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="password flex items-center">
                    {/* <p className="w-40">Confirm Password:</p> */}
                    <input required type="password" className="bg-white rounded-md mt-0" placeholder="Re-enter Password" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                {error && <p className=" text-red-600 pb-2">{error}</p>}
                <div className="flex items-center">
                    <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Sign Up</button>
                    {showLoading ? <img className="ml-2" src="/image/vF9DX0rAdyp.gif" alt="" /> : null}
                </div>
            </form>
            <div className="flex flex-col items-center mb-4">
                        <p >Can't Remember Passwords?</p>
                        {/* <Link to="/register"> */}
                            <button onClick={view_otp_registration} className="bg-[rgb(66,183,42)] hover:bg-[rgb(50,139,32)] text-white font-bold py-2 px-8 rounded-md">
                                Sign Up Via OTP 
                            </button>
                        {/* </Link> */}
                    </div>
            <div className="flex flex-col items-center">
                        <p className="text-blue-500 hover:underline cursor-pointer" onClick={()=>{setRegistrationPage(false); setShowLoading(false); setError(null)}}>Already a Member? Log In</p>
                        {/* <Link to="/register"> */}
                            {/* <button onClick={view_otp_registration} className="bg-[rgb(66,183,42)] hover:bg-[rgb(50,139,32)] text-white font-bold py-2 px-8 rounded-md"> */}
                            {/* </button> */}
                        {/* </Link> */}
                    </div>
        
            {/* <div className="sm:p-8 hover:text-blue-500" onClick={view_otp_registration}>Or Register and Login using OTP. To Login use the Otp sent in your Mail</div> */}
        </div>}

        {otpReg && bool && <div className="flex flex-col relative mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={view_otp_registration} id="body_1" className="absolute top-8 left-8 cursor-pointer hover:bg-[rgb(194,194,194)] rounded-md" width="51" height="38">
                            {/* <p onClick={changeboolvalue}>Click here to Login using Password</p> */}
                            <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                    <g>
                                        <path d="M188.6 453.3L504.9 137L373 137L10 500L373 863L504.9 863L189.2 547.3L990 547.3L990 546.6L990 453.89996L990 453.19995L188.6 453.19995L188.6 453.3z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                <p className="text-4xl text-center">Sign Up Via OTP</p>
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 md:px-0 items-center justify-evenly" onSubmit={submit_details2}>
                {/* <p className="text-4xl text-centern px-0">Sign Up via OTP</p> */}
                <div type="email" className="email flex items-center">
                    {/* <p className="w-40">Enter Email:</p > */}
                    <input required type="text" className="bg-white rounded-md" value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div type="name" className="email flex items-center">
                    {/* <p className="w-40">Enter Name:</p > */}
                    <input required type="text"className="bg-white rounded-md mt-0" value={name}  placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-40 rounded-md">Send OTP to Email</button>
                    {showLoading ? <img className="ml-2" src="/image/vF9DX0rAdyp.gif" alt="" /> : null}
                </div>
                {/* An Otp will be sent in your email, Enter that to Register */}
                {/* <div onClick={view_otp_registration}>Or Register using Password</div> */}
            </form>
            {error && <p className=" text-red-600 pb-2">{error}</p>}
        </div>}

        {!bool && <div className="flex flex-col relative mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setBool(true); setShowLoading(false); setError(null)}} id="body_1" className="absolute top-8 left-8 cursor-pointer hover:bg-[rgb(194,194,194)] rounded-md" width="51" height="38">
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
            <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 md:px-0 sm:px-0 items-center justify-evenly" onSubmit={submit_otp}>
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

    </>
    );
}

export default Registration;