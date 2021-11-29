import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router";
import Cookie from "../components/Cookie";
import { Link } from 'react-router-dom';

const Login = ({setIsadmin}) => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory()

    const submit_details = (e) => {
        e.preventDefault();
        console.log("i was heere")
        axios
            .post("/api/auth/login", {
                email: email,
                password: password
            })
            .then(res =>{
                console.log(res.data)
                // Cookie('setCookie','accesstoken', res.data.access_token, 1)
                history.push("/")
            })
    }

    return (
        <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center bg-[#dddddd] shadow-2xl rounded-2xl justify-evenly">
            <form className = "flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit = {submit_details}>
                <p className="text-4xl text-center">Login Page</p>
                <div type="email" className="email flex items-center">
                    <p className="w-40">Enter your email:</p >
                    <input required type="text" onChange ={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="password flex items-center">
                    <p className="w-40">Enter your password:</p>
                    <input required type="password" onChange ={(e)=> setPassword(e.target.value)} />
                </div>
                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                </div>
            </form>
            New to Travdays?<Link to="/register"> Click here to Sign Up </Link>
        </div>
    );
}

export default Login;