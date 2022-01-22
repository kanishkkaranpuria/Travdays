import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";
import { black } from "tailwindcss/colors";
import { NavLink } from "react-router-dom";
const Navbar = ({ setNamechanged , namechanged ,isauthenticated, setIsadmin, setIsauthenticated }) => {

    const activeNavbarStyle = {fontWeight: "bold", backgroundColor : "black"};
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
        <navbar id='navbar' className='navbar backdrop-filter bg-[#00000033] ease-in-out' >
            <nav className="logo text-2xl tracking-[5px]">
                <NavLink className='p-6 font-bold' to='/'>TravDays</NavLink>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
                {/* <NavLink to='/IndivisualBlogPage'>indi-blog</NavLink> */}
                {/* <span className='packages btn p-6 flex items-center h-full text-lg relative'> */}
                <NavLink className='h-full items-center flex' to='/trips' activeStyle={activeNavbarStyle}>Packages</NavLink>
                    {/* <span className='package-list absolute left-0 bottom-[-52px] flex w-max z-[4] invisible pointer-events-none'>
                    <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/solo'><h4>Solo</h4></NavLink>
                    <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/pet friendly'><h4>Pet Friendly</h4></NavLink>
                    <NavLink  className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/workation'><h4>Workation</h4></NavLink>
                    </span> */}
                {/* </span > */}
                <NavLink className='h-full items-center flex' to='/blogs' activeStyle={activeNavbarStyle}>Blogs</NavLink>
                <NavLink className='h-full items-center flex' to='/gallery' activeStyle={activeNavbarStyle}>Gallery</NavLink>
                <NavLink className='h-full items-center flex' to='/contactus' activeStyle={activeNavbarStyle}>Contact Us</NavLink>
                <NavLink className='h-full items-center flex' to='/faq' activeStyle={activeNavbarStyle}>FAQ</NavLink>

                {isauthenticated && igotdata ? <>
                    <span className='packages btn flex items-center h-full text-lg relative'>
                        <NavLink className='h-full items-center flex' to='/' activeStyle={activeNavbarStyle}>Hello {profiledata.navbarname}</NavLink>
                        <span className='package-list absolute left-0 bottom-[-156px] flex flex-col w-max z-[4] invisible pointer-events-none'>
                            <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/profile'><h4>Change Name</h4></NavLink>
                            <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/bookings'><h4>Bookings</h4></NavLink>
                            <NavLink className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/myblogs'><h4>Blogs</h4></NavLink>
                            <p className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow cursor-pointer' onClick={logout} ><h4>Logout</h4></p>
                        </span>
                    </span>
                   </> :
                    <NavLink className='h-full items-center flex' to='/login' activeStyle={activeNavbarStyle}>Login</NavLink>}
                <NavLink className='h-full items-center flex' to='' >Our AI Coming Soon</NavLink>
            </nav>
        </navbar>
    );
}

export default Navbar;