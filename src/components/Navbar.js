import { Link } from "react-router-dom";
import { useEffect } from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";

const Navbar = ({isauthenticated, setIsadmin, setIsauthenticated}) => {
    
    const history = useHistory();
    // useEffect(() => {
    //     //("uerinfo status")
    //     fullaxios({url : 'userinfo/status' 
    //     })
    //     .then(res => {
    //       if (res){
    //         //(res.data)
    //     }})
    //     .catch(err => {
    //        if (err.response){if (err.response.data.detail === "Invalid page.") {
    //        }
    
    //      }})
      
    // }, [])
    
    const logout = () => {
        console.log("logout")
        fullaxios({url : 'auth/logout', sendcookie : true})
        .then(res =>{
            //("here",res.data)
            setIsadmin(false)
            setIsauthenticated(false)
            // Cookie('setCookie',"accesstoken",0,-1)
            Cookie('setCookie',"csrftoken", 0, -1)
            Cookie('setCookie',"sessionid", 0, -1)
            history.push('/')
        })
        .catch(err=>{
            //(err.data)
            })
        }
    return (
        <navbar className='navbar backdrop-filter bg-[#00000033] '>
            <nav className="logo text-2xl tracking-[5px]">
                <Link className='p-6 font-bold' to='/'>TravDays</Link>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
            {/* <Link to='/IndivisualBlogPage'>indi-blog</Link> */}
                <span className='packages btn p-6 flex items-center h-full text-lg relative'>
                    <Link to='/packagespage'>Packages</Link>
                    {/* <span className='package-list absolute left-0 bottom-[-52px] flex w-max z-[4] invisible pointer-events-none'>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/solo'><h4>Solo</h4></Link>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/pet friendly'><h4>Pet Friendly</h4></Link>
                    <Link  className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/workation'><h4>Workation</h4></Link>
                    </span> */}
                </span>
                <Link className='h-full items-center flex' to='/blogs'>Blogs</Link>
                <Link className='h-full items-center flex' to='/gallery'>Gallery</Link>
                <Link className='h-full items-center flex' to='/contactus'>Contact Us</Link>
                <Link className='h-full items-center flex' to='/faq'>FAQ</Link>
                
                {isauthenticated ? <>
                    <Link to='profile'>Profile</Link>
                     <div className='h-full items-center flex cursor-pointer' onClick = {logout}>Logout</div></>:
                <Link className='h-full items-center flex' to='/login'>Login</Link>}
                <Link className='h-full items-center flex' to=''>Our AI Coming Soon</Link>
            </nav>
        </navbar>
    );
}

export default Navbar;