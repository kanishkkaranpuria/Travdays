import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";
import { black } from "tailwindcss/colors";
import { NavLink } from "react-router-dom";
const Navbar = ({ setNamechanged , namechanged ,isauthenticated, setIsadmin, setIsauthenticated }) => {

    // const activeNavbarStyle = {fontWeight: "500", backgroundColor : "#00000033"};
    const history = useHistory();
    const [profiledata, setProfiledata] = useState([])
    const [igotdata, setIgotdata] = useState(false);


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
    
   


    const logout = () => {
        console.log("logout")
        fullaxios({ url: 'auth/logout', sendcookie: true })
            .then(res => {
                //("here",res.data)
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
        <navbar id='navbar' className='navbar backdrop-filter bg-[#046C6D]' >
            <nav className="logo text-2xl tracking-[5px]">
                <NavLink className='p-6 font-bold' to='/'>TravDays</NavLink>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
                {/* <NavLink to='/IndivisualBlogPage'>indi-blog</NavLink> */}
                {/* <span className='packages btn p-6 flex items-center h-full text-lg relative'> */}
                <NavLink className=' items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/trips'  >Packages</NavLink>
                    {/* <span className='package-list absolute left-0 bottom-[-52px] flex w-max z-[4] invisible pointer-events-none'>
                    <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/solo'><h4>Solo</h4></NavLink>
                    <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/pet friendly'><h4>Pet Friendly</h4></NavLink>
                    <NavLink  className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/workation'><h4>Workation</h4></NavLink>
                    </span> */}
                {/* </span > */}
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/blogs' >Blogs</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/gallery' >Gallery</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/contactus' >Contact Us</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/faq' >FAQ</NavLink>

                {isauthenticated && igotdata ? <>
                    <span className='packages btn flex items-center h-full text-lg relative'>
                        <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus ' to='/profilepage' >Hello {profiledata.navbarname}</NavLink>
                        <span className='package-list absolute left-0 bottom-[-260px] flex flex-col w-max z-[4] invisible pointer-events-none'>
                            <NavLink className='bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr ' to='/changename'><h4>Change Name</h4></NavLink>
                            <NavLink className=' relative top-[-15px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/bookings'><h4>Bookings</h4></NavLink>
                            <NavLink className=' relative top-[-30px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/resetpassword'><h4>Reset password</h4></NavLink>
                            <NavLink className='relative top-[-45px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/myblogs'><h4> My Blogs</h4></NavLink>
                            <p className='relative top-[-60px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2 cursor-pointer  navhoverrrr' onClick={logout} ><h4>Logout</h4></p>
                        </span>
                    </span>
                   </> :
                    <NavLink className=' items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/login' >Login</NavLink>}
                <NavLink className=' items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='' >Our AI Coming Soon</NavLink>
            </nav>
        </navbar>
    );
}

export default Navbar;