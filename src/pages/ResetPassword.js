import axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";
import { Link } from 'react-router-dom';
import fullaxios from "../components/FullAxios";
import Logoutmodal from "../components/Logoutmodal";

const ResetPassword = () => {

    const [authStatus, setAuthStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [page2bool, setPage2bool] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [page3bool, setPage3bool] = useState(false);
    const history = useHistory()
    //modallll
    const [isopen, setIsopen] = useState(false)


    useEffect(() => {

        fullaxios({ url: 'userinfo/status' })
            .then(res => {
                setAuthStatus(res.data.authenticated)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    useEffect(()=>{
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
    },[authStatus])

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
                setIsopen(false)
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
                if(!authStatus){
                    history.push("/login")
                }else{
                    setIsopen(true)
                    setTimeout(() => {
                        history.push("/")
                    }, 2000);
                }
            })
    }
    console.log('authStatus',authStatus)
    return (
       <div className="section">
            {!page2bool && !page3bool && 
                <form className="flex flex-col sm:h-[300px] mx-auto h-[100px] max-w-[1000px] px-40 md:px-0 sm:px-8 items-center justify-evenly p-box-shadow-2 rounded-2xl  mt-20 " onSubmit={submit_email}>
                    <p className="text-4xl sm:text-3xl text-center">Reset Password</p>
                    {!authStatus && <div type="email" className="email flex sm:flex-col items-center">
                        <p className="w-40">Enter your email:</p >
                        <input required type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>}
                        {authStatus && <div className="p-4">An OTP will be sent to your email, Enter it to verify your request</div> }    
                    <div className=" ">
                    {authStatus && <button type="submit" onClick={()=>setIsopen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md"> Gnerate OTP </button>}
                    {!authStatus &&   <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>}
                        <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg="Waiting for otp" p1="We are generating an otp, please check your email" p2="" />

                    </div>
                </form>
            }
            {/* {!page2bool && !page3bool && authStatus && <button type="submit" onClick={submit_email} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Confirm Change Password</button>} */}

            {page2bool && !page3bool && 
                <form className="flex flex-col sm:h-[300px] mx-auto h-[500px] max-w-[1000px] px-40 md:px-0 sm:px-8 items-center justify-evenly p-box-shadow-2 rounded-2xl  mt-20 " onSubmit={submit_otp}>
                    <p className="text-4xl sm:text-3xl text-center">Enter Your OTP to Activate Your Account</p>
                    {!authStatus && <div type="email" className="email flex sm:flex-col items-center">
                        <p className="w-40">Email:</p >
                        {<input required type="text" value={email} />}</div>}

                    <div type="number" className="email flex sm:flex-col items-center">
                        <p className="w-40" >OTP:</p >
                        <input required type="text" onChange={(e) => setOtp(e.target.value)} />
                    </div>

                    <div className=" ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>
                    </div>
                </form>
            }

            {!page2bool && page3bool && 
                <form className="flex flex-col sm:h-[300px] mx-auto h-[500px] max-w-[1000px] px-40 md:px-0 sm:px-8 items-center justify-evenly p-box-shadow-2 rounded-2xl  mt-20 " onSubmit={submit_password}>
                    <p className="text-4xl sm:text-3xl text-center">Enter Your OTP to Activate Your Account</p>
                    <div type="name" className="email flex sm:flex-col items-center">
                        <p className="w-40">Email:</p >
                    <input readOnly type="text" value={email} />
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
                        <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg="Password reseted" p1="Your new password has been updated to the database" p2="" />

                    </div>
                </form>
            }
       
       </div>
    );
}

export default ResetPassword;