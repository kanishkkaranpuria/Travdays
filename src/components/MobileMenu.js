import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

import logo from '../pages/images/TravDays_logos/transparent_logo.png'
const hideMenu = ()=>{
    
    document.getElementById('mobile-menu').style.transform='translateY(-100%)';
    document.getElementById('hide-menu-btn').style.display='none';
    document.getElementById('show-menu-btn').style.display='flex';
}

const MobileMenu = ({ namechanged ,isauthenticated, setIsadmin, setIsauthenticated}) => {

    const history = useHistory();
    const [profiledata, setProfiledata] = useState([])
    const [igotdata, setIgotdata] = useState(false);
    const [profile, setProfile] = useState(false);


    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                    setProfiledata(res.data)
                    setIgotdata(true)
            })
            .catch(res => {
                console.log(res)
            })
    }, [isauthenticated,namechanged])
    
    const Profile = () => {
        setProfile(true)
    }
   

    const logout = () => {
        console.log("logout")
        fullaxios({ url: 'auth/logout', sendcookie: true })
            .then(res => {
                //("here",res.data)
                setProfile(false)
                setIsadmin(false)
                alert("you have logged out")
                setIgotdata(false)
                setProfiledata([])
                setIsauthenticated(false)
                // Cookie('setCookie',"accesstoken",0,-1)
                Cookie('setCookie', "csrftoken", 0, -1)
                Cookie('setCookie', "sessionid", 0, -1)
                history.push('/login')
            })
            .catch(err => {
                //(err.data)
            })
    }
    return ( 
        <div onClick={hideMenu} id="mobile-menu" className="flex flex-col text-white bg-black fixed top-0 z-[4] w-full h-full opacity-90">
        
            <nav className="flex flex-col w-full h-full items-center justify-center">
               {profile ? <> 
                <NavLink className='p-4 text-xl' to='/changename'><h4>Change Name</h4></NavLink>
                            <NavLink className='p-4 text-xl' to='/bookings'><h4>Bookings</h4></NavLink>
                            <NavLink className='p-4 text-xl' to='/resetpassword'><h4>Reset password</h4></NavLink>
                            <NavLink className='p-4 text-xl' to='/myblogs'><h4> My Blogs</h4></NavLink>
                            <p className='p-4 text-xl' onClick={logout} ><h4>Logout</h4></p>
               </>:<>
               <Link className='p-6 text-3xl' to='/'>TravDays</Link>
                {/* <Link className='p-4 text-xl' to='/IndivisualBlogPage'>indi-blog</Link> */}
                <Link className='p-4 text-xl' to='/trips'>Packages</Link>
                {/* <Link className='p-4 text-xl' to='/blogs'>Blogs</Link> */}
                <Link className='p-4 text-xl' to='/gallery'>Gallery</Link>
                <Link className='p-4 text-xl' to='/contactus'>Contact Us</Link>
                <Link className='p-4 text-xl' to='/faq'>FAQ</Link>
                <NavLink className='p-4 text-xl' to='/blogs'><h4>Blogs</h4></NavLink>
                {/* <Link className='p-4 text-xl' to='/bookings'>Bookings</Link>
                <Link className='p-4 text-xl' to='/resetpassword'>Reset password</Link>
                <Link className='p-4 text-xl' to='/changename'>Change name </Link> */}
                
                {isauthenticated && igotdata ? <>
                        <p   onClick={Profile} className='p-4 text-xl'  >Profile</p>
                            
                   </> :
                    <NavLink className='p-4 text-xl' to='/login' >Login</NavLink>}
               </>} 

            </nav>
        </div>
     );
}
 
export default MobileMenu;