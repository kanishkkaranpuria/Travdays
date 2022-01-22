import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const NotLoggedIn = () => {
    const [time, setTime] = useState(5)
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            if(time === 0){
                history.push('/login')
            }
            else if (time > 0){
                setTime(prev => (prev - 1))
            }
            else{
                setTime(0)
            }
        }, 1000);
    }, [time])

    return (
        <div className="flex flex-col items-center z-[5]">


            <p className="text-4xl pt-5"> Access Denied </p>
            
<svg width="400px" height="400px" className = "md:hidden"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g> 
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"/>
    </g>
</svg>

<svg width="200px" height="200px" className = "hidden md:block"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g> 
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"/>
    </g>
</svg>
            <p className="text-2xl pt-5 sm:text-lg "> You have to be logged in to access this page.</p>
            <p className="text-lg sm:text-md">
                Redirecting you to the log in page in {time} seconds.
            </p>
        </div>
    );
}

export default NotLoggedIn;