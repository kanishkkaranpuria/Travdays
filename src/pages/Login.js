import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";
import { Link } from 'react-router-dom';

const Login = ({setIsauthenticated}) => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otploginbool, setOtploginbool] = useState(false);
    const [otppagebool, setOtppagebool] = useState(false);
    const [otp, setOtp] = useState('');
    const history = useHistory()

    const submit_details = (e) => {
        e.preventDefault();
        console.log("i was heere")
        axios
            .post("/api/auth/login", {
                email: email,
                password: password
            })
            .then(res => {
                console.log("wtaf")
                console.log(res.data)
                // Cookie('setCookie','accesstoken', res.data.access_token, 1)
                setIsauthenticated(true)
                history.push("/")
            })
    }
    const changeboolvalue = () => {
        if (otploginbool == true) {
            setOtploginbool(false);
        } else {
            setOtploginbool(true);

        }
    }
    const request_otp = (e) => {
        e.preventDefault();
        axios
            .post("/api/auth/newotp", {
                email: email
            })
            .then(res => {
                console.log(res.data)
                setOtppagebool(true)
            })
    }
    const confirm_otp = (e) => {
        e.preventDefault();
        axios
            .post("/api/auth/login", {
                email: email,
                otp: otp
            })
            .then(res => {
                console.log(res.data)
                setIsauthenticated(true)
                history.push("/")
            })
    }
    return (
        <div className="section">
                   <div>
            {!otploginbool && !otppagebool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly bg-[#f5f5f7]">
                <p  onClick = {changeboolvalue}>Click here to Login via OTP</p>
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 sm:px-0 items-center justify-evenly" onSubmit={submit_details}>
                    <p className="text-4xl text-center">Login Page</p>
                    <div type="email" className="email flex items-center">
                        <p className="w-40">Enter your email:</p >
                        <input required type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password flex items-center">
                        <p className="w-40">Enter your password:</p>
                        <input required type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="sm:w-full sm:relative">
                        <button type="submit" className="sm:absolute sm:right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>
                    </div>
                </form>
                <p >New to Travdays?<Link className="aumptags" to="/register"> Click here to Sign Up </Link></p>
            </div>}

            {otploginbool && !otppagebool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
            <p onClick = {changeboolvalue}>Click here to Login using Password</p>
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={request_otp}>
                    <p className="text-4xl text-center">Login Page</p>
                    <div type="email" className="email flex items-center">
                        <p className="w-40">Enter your email:</p >
                        <input required type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className=" ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                    </div>
                </form>
                <p>New to Travdays?<Link to="/register"> Click here to Sign Up </Link></p>
            </div>}
            {otppagebool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={confirm_otp}>
                    <p className="text-4xl text-center">Enter the Otp sent in your Email</p>
                    <div type="email" className="email flex items-center">
                        <p className="w-40">Email:</p >
                        <input required type="email" value = {email} />
                    </div>
                    <div type="email" className="email flex items-center">
                        <p className="w-40">OTP:</p >
                        <input required type="text" onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div className=" ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                    </div>
                </form>
            </div>}
        </div>
        </div>
    );
}

export default Login;