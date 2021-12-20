import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";

const Registration = () => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bool, setBool] = useState(true);
    const [otp, setOtp] = useState('');
    const [otpReg, setOtpReg] = useState(false);
    const history = useHistory()

    const submit_details = (e) => {
        e.preventDefault();
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
            })
    }

    const submit_details2 = (e) => {
        e.preventDefault();
        console.log("i was heere")
        axios
            .post("/api/auth/register", {
                email: email,
                name: name
            })
            .then(res => {
                console.log(res.data)
                setBool(false)
            })
    }

    const submit_otp = (e) => {
        e.preventDefault();
        console.log("i was heere")
        axios
            .post("/api/auth/accountverification", {
                email: email,
                otp: otp
            })
            .then(res => {
                console.log(res.data)
                if (otpReg===false){
                submit_login_details()
                }else
                {
                    console.log("tokens should be set")
                    history.push("/")
                }
            })
    }
    const submit_login_details = () => {
        // e.preventDefault();
        console.log("i was heere")
        axios
            .post("/api/auth/login", {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res.data)
                history.push("/")
            })
    }

    const view_otp_registration = () => {
        if (otpReg == true){
        setOtpReg(false);
    }else{
            setOtpReg(true);

        }
    }

    return (<div className="section">
        {!otpReg && bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
            <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_details}>
                <p className="text-4xl text-center">Sign Up for Travdays</p>
                <div type="email" className="email flex items-center">
                    <p className="w-40">Enter Email:</p >
                    <input required type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div type="name" className="email flex items-center">
                    <p className="w-40">Enter Name:</p >
                    <input required type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="password flex items-center">
                    <p className="w-40">Enter Password:</p>
                    <input required type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="password flex items-center">
                    <p className="w-40">Confirm Password:</p>
                    <input required type="password" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>
                </div>
            </form>
            <div onClick={view_otp_registration}>Or Register and Login using OTP. To Login use the Otp sent in your Mail</div>
        </div>}

        {otpReg && bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_details2}>
                <p className="text-4xl text-center">Register using OTP</p>
                <div type="email" className="email flex items-center">
                    <p className="w-40">Enter Email:</p >
                    <input required type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div type="name" className="email flex items-center">
                    <p className="w-40">Enter Name:</p >
                    <input required type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                </div>
                {/* An Otp will be sent in your email, Enter that to Register */}
                <div onClick={view_otp_registration}>Or Register using Password</div>
            </form>
        </div>}

        {!bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
            <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_otp}>
                <p className="text-4xl text-center">Enter Your OTP to Activate Your Account</p>
                <div type="email" className="email flex items-center">
                    <p className="w-40">Email:</p >
                    <input required type="text" value={email} />
                </div>

                <div type="number" className="email flex items-center">
                    <p className="w-40" >OTP:</p >
                    <input required type="text" onChange={(e) => setOtp(e.target.value)} />
                </div>

                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                </div>
            </form>
        </div>}

    </div>
    );
}

export default Registration;