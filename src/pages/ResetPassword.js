import axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";
import { Link } from 'react-router-dom';
import fullaxios from "../components/FullAxios";

const ResetPassword = () => {

    const [authStatus, setAuthStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [page2bool, setPage2bool] = useState(false);
    const [page3bool, setPage3bool] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory()



    useEffect(() => {

        fullaxios({ url: 'userinfo/status' })
            .then(res => {
                authStatus(res.data.authenticated)
            })
            .catch(err => {
                console.log(err)
            })

        fullaxios({ url: 'userinfo/info' })
            .then(res => {
                setUserdata(res.data)
                if (authStatus === true) {
                    setEmail(res.data.email)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const submit_email = (e) => {
        console.log("email")
        console.log(email)
        console.log("email")
        e.preventDefault();
        fullaxios({
            url: 'password/confirmchange', type: 'post', data: {
                email: email,
            }
        })
            .then(res => {
                setPage2bool(true)
                console.log(res.data)
            })
    }
    const submit_otp = (e) => {
        e.preventDefault();
        fullaxios({
            url: 'password/otpverification', type: 'post', data: {
                email: email,
                verificationpin: otp,
            }
        })
            .then(res => {
                console.log(res.data)
                setPage2bool(false)
                setPage3bool(true)
            })
    }
    const submit_password = (e) => {
        e.preventDefault();
        fullaxios({
            url: 'password/setpass', type: 'post', data: {
                email: email,
                password: password,
                password2: password2
            }
        })
            .then(res => {
                console.log(res)
                history.push("/")
            })
    }
    return (
       <div className="section">
            <div>
            {!page2bool && !page3bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_email}>
                    <p className="text-4xl text-center">Reset Password</p>
                    <div type="email" className="email flex items-center">
                        <p className="w-40">Enter your email:</p >
                        {!authStatus && <input required type="text" onChange={(e) => setEmail(e.target.value)} />}
                        {authStatus && <input required type="text" value={userdata.email} />}
                    </div>
                    <div className=" ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">{!authStatus && "Submit"} {authStatus && "Confirm Change Password"}</button>
                    </div>
                </form>
            </div>}
            {/* {!page2bool && !page3bool && authStatus && <button type="submit" onClick={submit_email} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Confirm Change Password</button>} */}

            {page2bool && !page3bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_otp}>
                    <p className="text-4xl text-center">Enter Your OTP to Activate Your Account</p>
                    {!authStatus && <div type="email" className="email flex items-center">
                        <p className="w-40">Email:</p >
                        {<input required type="text" value={email} />}</div>}

                    <div type="number" className="email flex items-center">
                        <p className="w-40" >OTP:</p >
                        <input required type="text" onChange={(e) => setOtp(e.target.value)} />
                    </div>

                    <div className=" ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>
                    </div>
                </form>
            </div>}

            {!page2bool && page3bool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
                <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={submit_password}>
                    <p className="text-4xl text-center">Enter Your OTP to Activate Your Account</p>
                    <div type="name" className="email flex items-center">
                        <p className="w-40">Email:</p >
                     <input required type="text" value={email} />
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
            </div>}
        </div>
       </div>
    );
}

export default ResetPassword;